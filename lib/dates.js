// --- Polish month mapping ---

const MONTHS_PL = {
  // Genitive (used after day numbers: "5 marca")
  stycznia: 1, lutego: 2, marca: 3, kwietnia: 4,
  maja: 5, czerwca: 6, lipca: 7, sierpnia: 8,
  września: 9, października: 10, listopada: 11, grudnia: 12,
  // Nominative (used standalone: "marzec 2026")
  styczeń: 1, luty: 2, marzec: 3, kwiecień: 4,
  maj: 5, czerwiec: 6, lipiec: 7, sierpień: 8,
  wrzesień: 9, październik: 10, listopad: 11, grudzień: 12,
};

const MONTH_NAMES = Object.keys(MONTHS_PL).join("|");

function mkDate(day, month, year) {
  const d = parseInt(day, 10);
  const m = parseInt(month, 10);
  const y = parseInt(year, 10);
  if (d < 1 || d > 31 || m < 1 || m > 12 || y < 2020 || y > 2035) return null;
  return {
    iso: `${y}-${String(m).padStart(2, "0")}-${String(d).padStart(2, "0")}`,
    display: `${String(d).padStart(2, "0")}.${String(m).padStart(2, "0")}.${y}`,
    ts: new Date(y, m - 1, d).getTime(),
  };
}

function monthNum(name) {
  return MONTHS_PL[name.toLowerCase()] || null;
}

/**
 * Extract date ranges from text. Returns array of { from: DateObj, to: DateObj|null, raw: string }
 */
function extractDateRanges(text) {
  const ranges = [];
  let m;

  // Pattern 1: "DD.MM.YYYY - DD.MM.YYYY" or "DD.MM - DD.MM.YYYY" or "DD.MM.YYYY-DD.MM.YYYY"
  const numRangeRe = /(\d{1,2})[.\-/](\d{1,2})(?:[.\-/](20\d{2}))?\s*[-–—]\s*(\d{1,2})[.\-/](\d{1,2})[.\-/](20\d{2})/g;
  while ((m = numRangeRe.exec(text)) !== null) {
    const year1 = m[3] || m[6];
    const from = mkDate(m[1], m[2], year1);
    const to = mkDate(m[4], m[5], m[6]);
    if (from && to) {
      ranges.push({ from, to, raw: m[0] });
    }
  }

  // Pattern 2: "DD miesiąca - DD miesiąca YYYY" or "DD miesiąca do DD miesiąca YYYY"
  const wordRangeRe = new RegExp(
    `(\\d{1,2})\\s+(${MONTH_NAMES})\\s*(?:[-–—]|do)\\s*(\\d{1,2})\\s+(${MONTH_NAMES})\\s+(20\\d{2})`,
    "gi"
  );
  while ((m = wordRangeRe.exec(text)) !== null) {
    const m1 = monthNum(m[2]);
    const m2 = monthNum(m[4]);
    if (m1 && m2) {
      const from = mkDate(m[1], m1, m[5]);
      const to = mkDate(m[3], m2, m[5]);
      if (from && to) {
        ranges.push({ from, to, raw: m[0] });
      }
    }
  }

  // Pattern 3: "DD - DD miesiąca YYYY" (same month range: "10-20 lutego 2026")
  const sameMonthRe = new RegExp(
    `(\\d{1,2})\\s*[-–—]\\s*(\\d{1,2})\\s+(${MONTH_NAMES})\\s+(20\\d{2})`,
    "gi"
  );
  while ((m = sameMonthRe.exec(text)) !== null) {
    const mn = monthNum(m[3]);
    if (mn) {
      const from = mkDate(m[1], mn, m[4]);
      const to = mkDate(m[2], mn, m[4]);
      if (from && to) {
        ranges.push({ from, to, raw: m[0] });
      }
    }
  }

  // Pattern 4: "od DD.MM.YYYY do DD.MM.YYYY"
  const odDoNumRe = /od\s+(\d{1,2})[.\-/](\d{1,2})[.\-/](20\d{2})\s+do\s+(\d{1,2})[.\-/](\d{1,2})[.\-/](20\d{2})/gi;
  while ((m = odDoNumRe.exec(text)) !== null) {
    const from = mkDate(m[1], m[2], m[3]);
    const to = mkDate(m[4], m[5], m[6]);
    if (from && to) {
      ranges.push({ from, to, raw: m[0] });
    }
  }

  // Pattern 5: "od DD miesiąca do DD miesiąca YYYY"
  const odDoWordRe = new RegExp(
    `od\\s+(\\d{1,2})\\s+(${MONTH_NAMES})\\s+do\\s+(\\d{1,2})\\s+(${MONTH_NAMES})\\s+(20\\d{2})`,
    "gi"
  );
  while ((m = odDoWordRe.exec(text)) !== null) {
    const m1 = monthNum(m[2]);
    const m2 = monthNum(m[4]);
    if (m1 && m2) {
      const from = mkDate(m[1], m1, m[5]);
      const to = mkDate(m[3], m2, m[5]);
      if (from && to) {
        ranges.push({ from, to, raw: m[0] });
      }
    }
  }

  // Pattern 6: "do DD.MM.YYYY" (deadline only)
  const doNumRe = /do\s+(\d{1,2})[.\-/](\d{1,2})[.\-/](20\d{2})/gi;
  while ((m = doNumRe.exec(text)) !== null) {
    const to = mkDate(m[1], m[2], m[3]);
    if (to) {
      ranges.push({ from: null, to, raw: m[0] });
    }
  }

  // Pattern 7: "do DD miesiąca YYYY"
  const doWordRe = new RegExp(
    `do\\s+(\\d{1,2})\\s+(${MONTH_NAMES})\\s+(20\\d{2})`,
    "gi"
  );
  while ((m = doWordRe.exec(text)) !== null) {
    const mn = monthNum(m[2]);
    if (mn) {
      const to = mkDate(m[1], mn, m[3]);
      if (to) {
        ranges.push({ from: null, to, raw: m[0] });
      }
    }
  }

  // Pattern 8: standalone "DD.MM.YYYY"
  const singleNumRe = /(\d{1,2})[.\-/](\d{1,2})[.\-/](20\d{2})/g;
  while ((m = singleNumRe.exec(text)) !== null) {
    const d = mkDate(m[1], m[2], m[3]);
    if (d) {
      // Only add if not already part of a range
      const alreadyCovered = ranges.some(
        (r) =>
          (r.from && r.from.iso === d.iso) || (r.to && r.to.iso === d.iso)
      );
      if (!alreadyCovered) {
        ranges.push({ from: d, to: null, raw: m[0] });
      }
    }
  }

  // Pattern 9: standalone "DD miesiąca YYYY"
  const singleWordRe = new RegExp(
    `(\\d{1,2})\\s+(${MONTH_NAMES})\\s+(20\\d{2})`,
    "gi"
  );
  while ((m = singleWordRe.exec(text)) !== null) {
    const mn = monthNum(m[2]);
    if (mn) {
      const d = mkDate(m[1], mn, m[3]);
      if (d) {
        const alreadyCovered = ranges.some(
          (r) =>
            (r.from && r.from.iso === d.iso) || (r.to && r.to.iso === d.iso)
        );
        if (!alreadyCovered) {
          ranges.push({ from: d, to: null, raw: m[0] });
        }
      }
    }
  }

  // Pattern 10: standalone "miesiąc YYYY" (approximate: "kwiecień 2026")
  const monthOnlyRe = new RegExp(
    `(${MONTH_NAMES})\\s+(20\\d{2})`,
    "gi"
  );
  while ((m = monthOnlyRe.exec(text)) !== null) {
    const mn = monthNum(m[1]);
    if (mn) {
      const from = mkDate(1, mn, m[2]);
      const lastDay = new Date(parseInt(m[2], 10), mn, 0).getDate();
      const to = mkDate(lastDay, mn, m[2]);
      if (from && to) {
        const alreadyCovered = ranges.some(
          (r) =>
            (r.from && r.from.iso.startsWith(`${m[2]}-${String(mn).padStart(2, "0")}`)) ||
            (r.to && r.to.iso.startsWith(`${m[2]}-${String(mn).padStart(2, "0")}`))
        );
        if (!alreadyCovered) {
          ranges.push({ from, to, raw: m[0], approximate: true });
        }
      }
    }
  }

  // Deduplicate by raw match position (keep unique ranges)
  const seen = new Set();
  return ranges.filter((r) => {
    const key = `${r.from?.iso || "x"}_${r.to?.iso || "x"}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

/**
 * Categorize date ranges relative to today
 */
function categorizeRanges(ranges, today) {
  const todayTs = today.getTime();
  const todayStr = today.toISOString().slice(0, 10);

  const finished = [];  // zakończone
  const active = [];    // trwające
  const future = [];    // przyszłe

  for (const r of ranges) {
    const endTs = r.to ? r.to.ts : r.from ? r.from.ts : null;
    const startTs = r.from ? r.from.ts : r.to ? r.to.ts : null;

    if (endTs === null && startTs === null) continue;

    // Range with both from and to
    if (r.from && r.to) {
      if (r.to.ts < todayTs) {
        finished.push(r);
      } else if (r.from.ts <= todayTs && r.to.ts >= todayTs) {
        active.push(r);
      } else if (r.from.ts > todayTs) {
        future.push(r);
      }
    }
    // Only "to" date (deadline: "do DD.MM.YYYY")
    else if (r.to && !r.from) {
      if (r.to.ts < todayTs) {
        finished.push(r);
      } else {
        active.push(r); // deadline in future = possibly active
      }
    }
    // Only "from" date (single date)
    else if (r.from && !r.to) {
      if (r.from.ts < todayTs) {
        finished.push(r);
      } else if (r.from.iso === todayStr) {
        active.push(r);
      } else {
        future.push(r);
      }
    }
  }

  // Sort: finished by end date desc, active by end date asc, future by start date asc
  finished.sort((a, b) => (b.to || b.from).ts - (a.to || a.from).ts);
  active.sort((a, b) => (a.to || a.from).ts - (b.to || b.from).ts);
  future.sort((a, b) => (a.from || a.to).ts - (b.from || b.to).ts);

  return { finished, active, future };
}

function formatRange(r) {
  if (r.from && r.to) {
    return r.from.iso === r.to.iso
      ? r.from.display
      : `${r.from.display} - ${r.to.display}`;
  }
  if (r.to) return `do ${r.to.display}`;
  if (r.from) return r.from.display;
  return "—";
}

function rangesToSerializable(ranges) {
  return ranges.map((r) => ({
    from: r.from?.iso || null,
    to: r.to?.iso || null,
    raw: r.raw,
    approximate: r.approximate || false,
  }));
}

function findNewRanges(currentRanges, savedRanges) {
  if (!savedRanges || savedRanges.length === 0) return [];
  const savedKeys = new Set(
    savedRanges.map((r) => `${r.from || "x"}_${r.to || "x"}`)
  );
  return currentRanges.filter((r) => {
    const key = `${r.from?.iso || "x"}_${r.to?.iso || "x"}`;
    return !savedKeys.has(key);
  });
}

module.exports = {
  extractDateRanges,
  categorizeRanges,
  formatRange,
  rangesToSerializable,
  findNewRanges,
};
