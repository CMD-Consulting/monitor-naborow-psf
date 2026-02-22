const { formatRange } = require("./dates");

const MAX_HISTORY = 10;

function renderRangeBadge(r, isNew) {
  const text = formatRange(r);
  const approx = r.approximate ? ' title="data przybliżona"' : "";
  if (isNew) {
    return `<span class="range-badge range-new"${approx}>&#x1F525; ${text}</span>`;
  }
  return `<span class="range-badge"${approx}>${text}</span>`;
}

function renderCategoryCell(ranges, newRanges, emptyText) {
  if (!ranges || ranges.length === 0) {
    return `<span class="none">${emptyText || "—"}</span>`;
  }
  const newKeys = new Set(
    (newRanges || []).map((r) => `${r.from?.iso || "x"}_${r.to?.iso || "x"}`)
  );
  return ranges
    .slice(0, 3)
    .map((r) => {
      const key = `${r.from?.iso || "x"}_${r.to?.iso || "x"}`;
      return renderRangeBadge(r, newKeys.has(key));
    })
    .join(" ") + (ranges.length > 3 ? ` <span class="none">+${ranges.length - 3}</span>` : "");
}

// --- Grouping: type -> województwo -> subregion ---

function groupResults(results) {
  const typeOrder = { indywidualny: 0, firmowy: 1 };
  const groups = {};

  for (const r of results) {
    const type = r.type || "inne";
    const woj = r.wojewodztwo || "inne";
    const sub = r.subregion || "";

    if (!groups[type]) groups[type] = {};
    if (!groups[type][woj]) groups[type][woj] = {};
    if (!groups[type][woj][sub]) groups[type][woj][sub] = [];
    groups[type][woj][sub].push(r);
  }

  // Sort: within each group, changed first, then errors, then ok
  const statusOrder = { changed: 0, error: 1, ok: 2 };
  for (const type of Object.keys(groups)) {
    for (const woj of Object.keys(groups[type])) {
      for (const sub of Object.keys(groups[type][woj])) {
        groups[type][woj][sub].sort(
          (a, b) => (statusOrder[a.status] ?? 2) - (statusOrder[b.status] ?? 2)
        );
      }
    }
  }

  // Build ordered structure
  const ordered = [];
  const types = Object.keys(groups).sort(
    (a, b) => (typeOrder[a] ?? 99) - (typeOrder[b] ?? 99)
  );

  for (const type of types) {
    const wojs = Object.keys(groups[type]).sort((a, b) => a.localeCompare(b, "pl"));
    const typeGroup = { type, wojewodztwa: [] };
    for (const woj of wojs) {
      const subs = Object.keys(groups[type][woj]).sort((a, b) => a.localeCompare(b, "pl"));
      const wojGroup = { wojewodztwo: woj, subregiony: [] };
      for (const sub of subs) {
        wojGroup.subregiony.push({ subregion: sub, results: groups[type][woj][sub] });
      }
      typeGroup.wojewodztwa.push(wojGroup);
    }
    ordered.push(typeGroup);
  }

  return ordered;
}

function renderResultRow(r) {
  let statusIcon, statusClass;
  if (r.status === "error") {
    statusIcon = "&#x1F7E1;";
    statusClass = "error";
  } else if (r.status === "changed") {
    statusIcon = "&#x1F534;";
    statusClass = "changed";
  } else {
    statusIcon = "&#x1F7E2;";
    statusClass = "ok";
  }

  const cat = r.categories || { finished: [], active: [], future: [] };
  const newRanges = r.newRanges || [];
  const hasNewRanges = newRanges.length > 0;

  const finishedHtml = renderCategoryCell(cat.finished, newRanges, "—");
  const activeHtml = renderCategoryCell(cat.active, newRanges, "—");
  const futureHtml = renderCategoryCell(cat.future, newRanges, "—");

  let changesHtml;
  if (r.status === "error") {
    changesHtml = `<span class="none">—</span>`;
  } else if (hasNewRanges) {
    changesHtml = `<span class="change-new">&#x1F525; ${newRanges.length} nowy(ch)</span>`;
  } else if (r.status === "changed") {
    changesHtml = `<span class="change-content">Zmiana treści</span>`;
  } else {
    changesHtml = `<span class="change-none">Brak</span>`;
  }

  // Operator + projekt + link cell
  const operatorName = r.operator || "";
  const projektName = r.projekt || "";
  const urlDomain = r.url.replace(/^https?:\/\//, "").replace(/\/.*$/, "");

  let operatorHtml = "";
  if (operatorName) {
    operatorHtml += `<div class="operator-name">${escapeHtml(operatorName)}</div>`;
  }
  if (projektName) {
    operatorHtml += `<div class="projekt-name">${escapeHtml(projektName)}</div>`;
  }
  operatorHtml += `<a href="${r.url}" target="_blank" class="operator-url">${urlDomain}</a>`;

  return `
      <tr class="row-${statusClass}${hasNewRanges ? " row-hot" : ""}">
        <td class="status-cell">${statusIcon}</td>
        <td class="operator-cell">${operatorHtml}</td>
        <td class="cat-cell">${finishedHtml}</td>
        <td class="cat-cell">${activeHtml}</td>
        <td class="cat-cell">${futureHtml}</td>
        <td class="changes-cell">${changesHtml}</td>
      </tr>`;
}

function escapeHtml(str) {
  return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

function typeLabel(type) {
  if (type === "indywidualny") return "BUR INDYWIDUALNY";
  if (type === "firmowy") return "BUR FIRMOWY";
  return type.toUpperCase();
}

function generateReport(results, stats, history) {
  const date = new Date();
  const dateStr = date.toLocaleString("pl-PL", { timeZone: "Europe/Warsaw" });

  // Group results hierarchically
  const grouped = groupResults(results);

  // Build grouped table rows
  let rows = "";
  for (const typeGroup of grouped) {
    // Type header row
    rows += `
      <tr class="group-type">
        <td colspan="6">${typeLabel(typeGroup.type)}</td>
      </tr>`;

    for (const wojGroup of typeGroup.wojewodztwa) {
      // Województwo header row
      rows += `
      <tr class="group-woj">
        <td colspan="6">${escapeHtml(wojGroup.wojewodztwo)}</td>
      </tr>`;

      for (const subGroup of wojGroup.subregiony) {
        // Subregion header row (only if non-empty)
        if (subGroup.subregion) {
          rows += `
      <tr class="group-sub">
        <td colspan="6">${escapeHtml(subGroup.subregion)}</td>
      </tr>`;
        }

        for (const r of subGroup.results) {
          rows += renderResultRow(r);
        }
      }
    }
  }

  const historyRows = history
    .slice(0, MAX_HISTORY)
    .map(
      (h) => `
      <tr>
        <td>${h.date}</td>
        <td>${h.total}</td>
        <td class="h-ok">${h.ok}</td>
        <td class="h-changed">${h.changed}</td>
        <td class="h-errors">${h.errors}</td>
        <td class="h-new">${h.newDates || 0}</td>
        <td>${h.reportFile ? `<a href="${h.reportFile}">Otwórz</a>` : "—"}</td>
      </tr>`
    )
    .join("\n");

  return `<!DOCTYPE html>
<html lang="pl">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Monitor Naborów - Raport ${date.toLocaleDateString("pl-PL")}</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      background: #f0f2f5;
      color: #1a1a2e;
      padding: 20px;
    }
    .container { max-width: 1500px; margin: 0 auto; }

    header {
      background: linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%);
      color: white;
      padding: 30px 40px;
      border-radius: 16px;
      margin-bottom: 24px;
      box-shadow: 0 4px 24px rgba(0,0,0,0.15);
    }
    header h1 { font-size: 1.8em; margin-bottom: 8px; }
    header .date { opacity: 0.8; font-size: 0.95em; }

    .stats {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
      gap: 16px;
      margin-bottom: 24px;
    }
    .stat-card {
      background: white;
      border-radius: 12px;
      padding: 18px 20px;
      box-shadow: 0 2px 12px rgba(0,0,0,0.06);
      text-align: center;
    }
    .stat-card .number { font-size: 2em; font-weight: 700; }
    .stat-card .label { font-size: 0.82em; color: #666; margin-top: 4px; }
    .stat-card.total .number { color: #1a1a2e; }
    .stat-card.ok .number { color: #2ecc71; }
    .stat-card.changed .number { color: #e74c3c; }
    .stat-card.errors .number { color: #f39c12; }
    .stat-card.active .number { color: #3498db; }
    .stat-card.new-dates .number { color: #e74c3c; }

    .section-title {
      font-size: 1.3em;
      font-weight: 700;
      margin: 32px 0 16px;
      padding-left: 4px;
      color: #1a1a2e;
    }

    .table-wrapper {
      background: white;
      border-radius: 16px;
      box-shadow: 0 2px 12px rgba(0,0,0,0.06);
      overflow-x: auto;
      margin-bottom: 24px;
    }
    table { width: 100%; border-collapse: collapse; }
    thead th {
      background: #1a1a2e;
      color: white;
      padding: 12px 14px;
      text-align: left;
      font-weight: 600;
      font-size: 0.8em;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      white-space: nowrap;
    }
    thead th.th-finished { background: #555; }
    thead th.th-active { background: #2563eb; }
    thead th.th-future { background: #16a34a; }
    tbody tr { border-bottom: 1px solid #f0f0f0; transition: background 0.15s; }
    tbody tr:hover { background: #f8f9ff; }
    tbody tr.row-hot { background: #fff8f0; }
    tbody tr.row-hot:hover { background: #fff0e0; }
    td { padding: 10px 14px; vertical-align: middle; font-size: 0.88em; }

    .status-cell { text-align: center; width: 44px; font-size: 1.15em; }

    /* Group header rows */
    .group-type td {
      background: linear-gradient(135deg, #1a1a2e, #0f3460);
      color: white;
      font-weight: 700;
      font-size: 1.05em;
      padding: 14px 18px;
      letter-spacing: 0.5px;
    }
    .group-woj td {
      background: #e8eaf6;
      color: #1a1a2e;
      font-weight: 700;
      font-size: 0.95em;
      padding: 10px 18px;
      text-transform: uppercase;
      letter-spacing: 0.3px;
    }
    .group-sub td {
      background: #f5f5f5;
      color: #555;
      font-size: 0.85em;
      padding: 8px 18px 8px 28px;
      font-style: italic;
    }
    .group-type:hover td,
    .group-woj:hover td,
    .group-sub:hover td { background: inherit; }

    /* Operator cell */
    .operator-cell { min-width: 250px; }
    .operator-name {
      font-weight: 600;
      font-size: 0.92em;
      color: #1a1a2e;
      margin-bottom: 2px;
    }
    .projekt-name {
      font-size: 0.82em;
      color: #666;
      margin-bottom: 3px;
    }
    .operator-url {
      color: #2563eb;
      text-decoration: none;
      font-size: 0.8em;
      word-break: break-all;
    }
    .operator-url:hover { text-decoration: underline; }

    .cat-cell { min-width: 130px; }
    .changes-cell { min-width: 100px; white-space: nowrap; }

    .range-badge {
      display: inline-block;
      background: #f0f0f0;
      color: #333;
      padding: 2px 9px;
      border-radius: 12px;
      font-size: 0.82em;
      margin: 2px;
      font-weight: 500;
      font-variant-numeric: tabular-nums;
      white-space: nowrap;
    }
    .range-badge.range-new {
      background: #fde8e8;
      color: #c0392b;
      font-weight: 700;
      animation: pulse 2s infinite;
    }
    @keyframes pulse {
      0%, 100% { box-shadow: 0 0 0 0 rgba(231,76,60,0.3); }
      50% { box-shadow: 0 0 0 4px rgba(231,76,60,0); }
    }

    .change-new { color: #c0392b; font-weight: 700; font-size: 0.85em; }
    .change-content { color: #e67e22; font-weight: 600; font-size: 0.85em; }
    .change-none { color: #999; font-size: 0.85em; }

    .none { color: #ccc; }
    .row-changed .operator-name { color: #c0392b; }
    .row-error td { opacity: 0.7; }

    .h-ok { color: #2ecc71; font-weight: 600; }
    .h-changed { color: #e74c3c; font-weight: 600; }
    .h-errors { color: #f39c12; font-weight: 600; }
    .h-new { color: #c0392b; font-weight: 600; }
    .history-table a { color: #2563eb; text-decoration: none; }
    .history-table a:hover { text-decoration: underline; }

    .legend {
      display: flex;
      flex-wrap: wrap;
      gap: 16px;
      margin-bottom: 16px;
      padding: 12px 16px;
      background: white;
      border-radius: 12px;
      font-size: 0.85em;
      box-shadow: 0 2px 8px rgba(0,0,0,0.04);
    }
    .legend-item { display: flex; align-items: center; gap: 6px; }

    footer {
      text-align: center;
      margin-top: 32px;
      padding: 16px;
      color: #999;
      font-size: 0.85em;
    }

    @media (max-width: 900px) {
      body { padding: 10px; }
      header { padding: 20px; }
      header h1 { font-size: 1.3em; }
      .stats { grid-template-columns: repeat(2, 1fr); }
      td { padding: 8px 8px; font-size: 0.8em; }
    }
  </style>
</head>
<body>
  <div class="container">
    <header>
      <h1>Monitor Naborów Szkoleniowych</h1>
      <div class="date">Raport wygenerowany: ${dateStr}</div>
    </header>

    <div class="stats">
      <div class="stat-card total">
        <div class="number">${stats.total}</div>
        <div class="label">Wszystkich stron</div>
      </div>
      <div class="stat-card ok">
        <div class="number">${stats.ok}</div>
        <div class="label">Bez zmian</div>
      </div>
      <div class="stat-card changed">
        <div class="number">${stats.changed}</div>
        <div class="label">Zmienione strony</div>
      </div>
      <div class="stat-card active">
        <div class="number">${stats.activeNabory}</div>
        <div class="label">Trwające nabory</div>
      </div>
      <div class="stat-card new-dates">
        <div class="number">${stats.newDates}</div>
        <div class="label">Nowe terminy &#x1F525;</div>
      </div>
      <div class="stat-card errors">
        <div class="number">${stats.errors}</div>
        <div class="label">Błędy</div>
      </div>
    </div>

    <div class="legend">
      <div class="legend-item">&#x1F7E2; Bez zmian</div>
      <div class="legend-item">&#x1F534; Wykryto zmiany</div>
      <div class="legend-item">&#x1F7E1; Błąd pobierania</div>
      <div class="legend-item">&#x1F525; Nowy termin naboru</div>
      <div class="legend-item"><span class="range-badge" style="margin:0">12.03.2026</span> Data</div>
      <div class="legend-item"><span class="range-badge" style="margin:0">01.03 - 31.03.2026</span> Zakres dat</div>
    </div>

    <h2 class="section-title">Wyniki sprawdzania</h2>
    <div class="table-wrapper">
      <table>
        <thead>
          <tr>
            <th></th>
            <th>Operator / Projekt</th>
            <th class="th-finished">Zakończone</th>
            <th class="th-active">Trwające</th>
            <th class="th-future">Przyszłe</th>
            <th>Zmiany</th>
          </tr>
        </thead>
        <tbody>
          ${rows}
        </tbody>
      </table>
    </div>

    <h2 class="section-title">Historia sprawdzeń (ostatnie ${MAX_HISTORY})</h2>
    <div class="table-wrapper">
      <table class="history-table">
        <thead>
          <tr>
            <th>Data sprawdzenia</th>
            <th>Stron</th>
            <th>OK</th>
            <th>Zmiany</th>
            <th>Błędy</th>
            <th>Nowe terminy</th>
            <th>Raport</th>
          </tr>
        </thead>
        <tbody>
          ${historyRows || '<tr><td colspan="7" style="text-align:center;color:#999;padding:20px">Brak historii — to pierwsze sprawdzenie</td></tr>'}
        </tbody>
      </table>
    </div>

    <footer>Monitor Naborów v4.0 &mdash; automatyczne sprawdzanie stron szkoleniowych</footer>
  </div>
</body>
</html>`;
}

module.exports = { generateReport };
