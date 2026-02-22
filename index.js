const fs = require("fs");
const path = require("path");
const crypto = require("crypto");
const http = require("http");
const https = require("https");
const { exec } = require("child_process");
const cheerio = require("cheerio");
const cron = require("node-cron");
const notifier = require("node-notifier");
const { ENTRIES, KEYWORDS } = require("./config/urls");
const {
  extractDateRanges,
  categorizeRanges,
  rangesToSerializable,
  findNewRanges,
} = require("./lib/dates");
const { generateReport } = require("./lib/report");

const DATA_FILE = path.join(__dirname, "data", "hashes.json");
const HISTORY_FILE = path.join(__dirname, "data", "history.json");
const LOG_FILE = path.join(__dirname, "logs", "monitor.log");
const REPORTS_DIR = path.join(__dirname, "reports");
const MAX_RETRIES = 3;
const REQUEST_TIMEOUT = 10000;
const MAX_HISTORY = 10;

// --- Logging ---

function log(message) {
  const timestamp = new Date().toISOString();
  const line = `[${timestamp}] ${message}`;
  console.log(line);
  fs.appendFileSync(LOG_FILE, line + "\n");
}

// --- JSON persistence ---

function loadJSON(filepath, fallback) {
  try {
    return JSON.parse(fs.readFileSync(filepath, "utf-8"));
  } catch {
    return fallback !== undefined ? fallback : {};
  }
}

function saveJSON(filepath, data) {
  fs.writeFileSync(filepath, JSON.stringify(data, null, 2));
}

// --- HTTP fetch ---

function fetchPage(url, retries = MAX_RETRIES) {
  return new Promise((resolve, reject) => {
    const client = url.startsWith("https") ? https : http;
    const req = client.get(
      url,
      {
        timeout: REQUEST_TIMEOUT,
        headers: { "User-Agent": "Mozilla/5.0 MonitorNaborow/1.0" },
      },
      (res) => {
        if (
          res.statusCode >= 300 &&
          res.statusCode < 400 &&
          res.headers.location
        ) {
          const redirectUrl = new URL(res.headers.location, url).href;
          return fetchPage(redirectUrl, retries).then(resolve).catch(reject);
        }
        if (res.statusCode !== 200) {
          return reject(new Error(`HTTP ${res.statusCode}`));
        }
        const chunks = [];
        res.on("data", (chunk) => chunks.push(chunk));
        res.on("end", () => resolve(Buffer.concat(chunks).toString("utf-8")));
      }
    );
    req.on("timeout", () => {
      req.destroy();
      reject(new Error("Timeout"));
    });
    req.on("error", (err) => {
      if (retries > 1) {
        log(`  Retry (pozostalo ${retries - 1}) dla ${url}: ${err.message}`);
        setTimeout(
          () => fetchPage(url, retries - 1).then(resolve).catch(reject),
          2000
        );
      } else {
        reject(err);
      }
    });
  });
}

// --- Analysis ---

function extractText(html) {
  const $ = cheerio.load(html);
  $("script, style, noscript, iframe").remove();
  return $("body").text().replace(/\s+/g, " ").trim();
}

function findKeywords(text) {
  const lower = text.toLowerCase();
  return KEYWORDS.filter((kw) => lower.includes(kw.toLowerCase()));
}

function computeHash(text) {
  return crypto.createHash("md5").update(text.toLowerCase()).digest("hex");
}

// --- Desktop notification ---

function sendNotification(changedCount, newDatesCount, reportPath) {
  const lines = [];
  if (changedCount > 0) lines.push(`${changedCount} stron ze zmianami`);
  if (newDatesCount > 0) lines.push(`${newDatesCount} nowych terminów`);
  const message =
    lines.length > 0
      ? lines.join(", ") + ". Kliknij aby otworzyć raport."
      : "Sprawdzanie zakończone. Kliknij aby otworzyć raport.";

  notifier.notify(
    {
      title: changedCount > 0 || newDatesCount > 0
        ? "🔔 Monitor Naborów - Wykryto zmiany!"
        : "✅ Monitor Naborów - Sprawdzanie zakończone",
      message,
      icon: path.join(__dirname, "icon.png"),
      timeout: 15,
      actions: ["Otwórz raport"],
    },
    (err, response, metadata) => {
      if (metadata && metadata.activationValue === "Otwórz raport") {
        openFile(reportPath);
      }
    }
  );

  // Also open on any click for Linux (notify-send)
  notifier.on("click", () => {
    openFile(reportPath);
  });
}

function openFile(filepath) {
  const cmd =
    process.platform === "darwin"
      ? "open"
      : process.platform === "win32"
        ? "start"
        : "xdg-open";
  exec(`${cmd} "${filepath}"`, (err) => {
    if (err) log(`Nie udalo sie otworzyc: ${err.message}`);
  });
}

// --- Main check ---

async function checkAllPages() {
  log("=== START SPRAWDZANIA ===");

  const data = loadJSON(DATA_FILE, {});
  const history = loadJSON(HISTORY_FILE, []);
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // Flatten ENTRIES to tasks: 1 task = 1 URL with metadata
  const tasks = [];
  for (const entry of ENTRIES) {
    for (const url of entry.urls) {
      tasks.push({
        url,
        type: entry.type,
        wojewodztwo: entry.wojewodztwo,
        subregion: entry.subregion,
        operator: entry.operator,
        projekt: entry.projekt,
      });
    }
  }

  const results = [];
  let okCount = 0;
  let changedCount = 0;
  let errorCount = 0;
  let totalActiveNabory = 0;
  let totalNewDates = 0;

  for (const task of tasks) {
    const url = task.url;
    try {
      log(`Sprawdzam: ${url}`);
      const html = await fetchPage(url);
      const text = extractText(html);
      const hash = computeHash(text);
      const keywords = findKeywords(text);
      const dateRanges = extractDateRanges(text);
      const categories = categorizeRanges(dateRanges, today);

      const entry = data[url] || {};
      const isNew = !entry.hash;
      const hasChanged = entry.hash && entry.hash !== hash;

      // Find new date ranges compared to saved
      const savedRanges = entry.dates || [];
      const newRanges = isNew ? [] : findNewRanges(dateRanges, savedRanges);

      if (dateRanges.length > 0) {
        log(`  Daty: ${dateRanges.length} zakresów (${categories.active.length} trwających, ${categories.future.length} przyszłych)`);
      }
      if (newRanges.length > 0) {
        log(`  🔥 NOWE TERMINY: ${newRanges.length}`);
      }
      if (keywords.length > 0) {
        log(`  Slowa kluczowe: ${keywords.join(", ")}`);
      }

      // Update stored data
      data[url] = {
        hash,
        dates: rangesToSerializable(dateRanges),
        lastCheck: new Date().toISOString(),
      };

      totalActiveNabory += categories.active.length;
      totalNewDates += newRanges.length;

      if (isNew) {
        log(`  NOWA STRONA - zapisuje hash`);
        results.push({
          ...task, status: "changed", keywords, categories,
          newRanges: [], isNew: true,
        });
        changedCount++;
      } else if (hasChanged) {
        log(`  ZMIANA WYKRYTA!`);
        results.push({
          ...task, status: "changed", keywords, categories,
          newRanges, isNew: false,
        });
        changedCount++;
      } else {
        log(`  Bez zmian`);
        results.push({
          ...task, status: "ok", keywords, categories,
          newRanges, isNew: false,
        });
        okCount++;
      }
    } catch (err) {
      log(`  BLAD: ${url} - ${err.message}`);
      results.push({
        ...task, status: "error", error: err.message,
        keywords: [], categories: { finished: [], active: [], future: [] },
        newRanges: [],
      });
      errorCount++;
    }
  }

  saveJSON(DATA_FILE, data);

  const stats = {
    total: tasks.length,
    ok: okCount,
    changed: changedCount,
    errors: errorCount,
    activeNabory: totalActiveNabory,
    newDates: totalNewDates,
  };

  log(`=== PODSUMOWANIE: ${okCount} OK, ${errorCount} błędów, ${changedCount} zmian, ${totalActiveNabory} trwających naborów, ${totalNewDates} nowych terminów ===`);

  const reportHtml = generateReport(results, stats, Array.isArray(history) ? history : []);
  const { filepath, filename } = saveAndOpenReport(reportHtml);

  // Save to history
  const histArr = Array.isArray(history) ? history : [];
  histArr.unshift({
    date: new Date().toLocaleString("pl-PL", { timeZone: "Europe/Warsaw" }),
    total: stats.total,
    ok: stats.ok,
    changed: stats.changed,
    errors: stats.errors,
    newDates: totalNewDates,
    reportFile: filename,
  });
  if (histArr.length > MAX_HISTORY) histArr.length = MAX_HISTORY;
  saveJSON(HISTORY_FILE, histArr);

  // Desktop notification
  sendNotification(changedCount, totalNewDates, filepath);

  log("=== KONIEC SPRAWDZANIA ===\n");
  return filepath;
}

function saveAndOpenReport(html) {
  const date = new Date();
  const filename = `raport-${date.toISOString().slice(0, 10)}_${date.toTimeString().slice(0, 8).replace(/:/g, "-")}.html`;
  const filepath = path.join(REPORTS_DIR, filename);

  fs.writeFileSync(filepath, html);
  log(`Raport zapisany: ${filepath}`);
  openFile(filepath);

  return { filepath, filename };
}

// --- Entry point ---

const runNow = process.argv.includes("--now");

if (runNow) {
  log("Uruchomiono reczne sprawdzanie (--now)");
  checkAllPages();
} else {
  // Co niedzielę o 11:20 czasu polskiego (Europe/Warsaw)
  log("Monitor naborow uruchomiony. Harmonogram: co niedziele o 11:20 (Europe/Warsaw)");
  cron.schedule(
    "20 11 * * 0",
    () => {
      checkAllPages();
    },
    { timezone: "Europe/Warsaw" }
  );
}
