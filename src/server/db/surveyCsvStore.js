import fs from "fs";
import path from "path";
import crypto from "crypto";
import { formFields } from "@/lib/onboardingFields";

function resolveCsvPath() {
  if (process.env.SURVEY_CSV_PATH) return process.env.SURVEY_CSV_PATH;

  const legacyPath = path.join(process.cwd(), "survey_responses.csv");
  const defaultPath = path.join(process.cwd(), "data", "survey_responses.csv");

  try {
    if (fs.existsSync(legacyPath)) return legacyPath;
  } catch {
    // ignore fs errors and fall back to defaultPath
  }
  return defaultPath;
}

const CSV_PATH = resolveCsvPath();

/**
 * Stable CSV columns:
 * - metadata columns first (sessionId, timestamp, ip, userAgent, totalPoints, rangeKey, completionCode)
 * - then all onboarding fieldNames (plus photoURLs)
 * - finally answers_json for perfect raw capture
 */
const ANSWER_COLUMNS = Array.from(
  new Set(["photoURLs", ...formFields.map((field) => field.fieldName)])
);

const CSV_COLUMNS = [
  "sessionId",
  "timestamp",
  "ip",
  "userAgent",
  "totalPoints",
  "rangeKey",
  "completionCode",
  ...ANSWER_COLUMNS,
  "answers_json",
];

function toCsvCell(value) {
  if (value === null || value === undefined) return "";

  let str;
  if (typeof value === "string") str = value;
  else if (
    typeof value === "number" ||
    typeof value === "boolean" ||
    typeof value === "bigint"
  )
    str = String(value);
  else str = JSON.stringify(value);

  const escaped = str.replace(/"/g, '""');
  const mustQuote = /[",\n\r]/.test(escaped);
  return mustQuote ? `"${escaped}"` : escaped;
}

function getExpectedHeaderLine() {
  return CSV_COLUMNS.join(",");
}

function readFirstLineSync(filePath, maxBytes = 64 * 1024) {
  const fd = fs.openSync(filePath, "r");
  try {
    const buf = Buffer.alloc(maxBytes);
    const bytesRead = fs.readSync(fd, buf, 0, buf.length, 0);
    if (bytesRead <= 0) return "";
    const content = buf.toString("utf8", 0, bytesRead);
    const newlineIdx = content.indexOf("\n");
    const line = newlineIdx === -1 ? content : content.slice(0, newlineIdx);
    return line.replace(/\r$/, "");
  } finally {
    fs.closeSync(fd);
  }
}

function extractFirstCsvCell(line) {
  if (!line) return "";
  if (line[0] === '"') {
    let out = "";
    for (let i = 1; i < line.length; i++) {
      const ch = line[i];
      if (ch === '"') {
        if (line[i + 1] === '"') {
          out += '"';
          i++;
          continue;
        }
        return out;
      }
      out += ch;
    }
    return out;
  }
  const commaIdx = line.indexOf(",");
  return commaIdx === -1 ? line : line.slice(0, commaIdx);
}

function loadSessionIdsFromCsvSync(filePath) {
  const sessionIds = new Set();
  const fd = fs.openSync(filePath, "r");
  try {
    const buf = Buffer.alloc(64 * 1024);
    let leftover = "";
    let headerSkipped = false;

    let bytesRead;
    while ((bytesRead = fs.readSync(fd, buf, 0, buf.length, null)) > 0) {
      const chunk = leftover + buf.toString("utf8", 0, bytesRead);
      const parts = chunk.split("\n");
      leftover = parts.pop() ?? "";

      for (const rawLine of parts) {
        const line = rawLine.replace(/\r$/, "");
        if (!headerSkipped) {
          headerSkipped = true;
          continue;
        }
        if (!line) continue;
        const sessionId = extractFirstCsvCell(line);
        if (sessionId) sessionIds.add(sessionId);
      }
    }

    if (leftover) {
      const line = leftover.replace(/\r$/, "");
      if (!headerSkipped) {
        // file contained only a single line (header)
      } else if (line) {
        const sessionId = extractFirstCsvCell(line);
        if (sessionId) sessionIds.add(sessionId);
      }
    }
  } finally {
    fs.closeSync(fd);
  }
  return sessionIds;
}

let csvReady = false;
let sessionIdIndexLoaded = false;
let knownSessionIds = new Set();

export function ensureSurveyCsvReady() {
  // Fast path: if we already initialized and the file still exists, skip extra work.
  if (csvReady) {
    try {
      if (fs.existsSync(CSV_PATH) && fs.statSync(CSV_PATH).size > 0) return;
    } catch {
      // Fall through to re-initialize.
    }
  }

  const expectedHeaderLine = getExpectedHeaderLine();
  const headerForWrite = `${expectedHeaderLine}\n`;

  try {
    fs.mkdirSync(path.dirname(CSV_PATH), { recursive: true });
  } catch {
    // ignore mkdir failures (e.g. mocked fs in tests)
  }

  if (!fs.existsSync(CSV_PATH)) {
    fs.writeFileSync(CSV_PATH, headerForWrite, { encoding: "utf8" });
    knownSessionIds = new Set();
    sessionIdIndexLoaded = true;
    csvReady = true;
    return;
  }

  let stats;
  try {
    stats = fs.statSync(CSV_PATH);
  } catch (err) {
    if (err?.code === "ENOENT") {
      fs.writeFileSync(CSV_PATH, headerForWrite, { encoding: "utf8" });
      knownSessionIds = new Set();
      sessionIdIndexLoaded = true;
      csvReady = true;
      return;
    }
    throw err;
  }

  if (!stats || stats.size === 0) {
    fs.writeFileSync(CSV_PATH, headerForWrite, { encoding: "utf8" });
    knownSessionIds = new Set();
    sessionIdIndexLoaded = true;
    csvReady = true;
    return;
  }

  const firstLine = readFirstLineSync(CSV_PATH);
  if (firstLine !== expectedHeaderLine) {
    const safeTimestamp = new Date().toISOString().replace(/[:.]/g, "-");
    const backupPath = path.join(
      process.cwd(),
      `survey_responses.legacy.${safeTimestamp}.csv`
    );
    fs.renameSync(CSV_PATH, backupPath);
    fs.writeFileSync(CSV_PATH, headerForWrite, { encoding: "utf8" });
    knownSessionIds = new Set();
    sessionIdIndexLoaded = true;
    csvReady = true;
    return;
  }

  if (!sessionIdIndexLoaded) {
    knownSessionIds = loadSessionIdsFromCsvSync(CSV_PATH);
    sessionIdIndexLoaded = true;
  }

  csvReady = true;
}

function buildCsvRow({
  sessionId,
  timestamp,
  ip,
  userAgent,
  totalPoints,
  rangeKey,
  completionCode,
  answers,
}) {
  const answersJson = JSON.stringify(answers ?? {});
  const valuesByColumn = {
    sessionId,
    timestamp,
    ip,
    userAgent,
    totalPoints,
    rangeKey,
    completionCode,
    answers_json: answersJson,
  };

  for (const key of ANSWER_COLUMNS) {
    valuesByColumn[key] = answers?.[key];
  }

  return `${CSV_COLUMNS.map((col) => toCsvCell(valuesByColumn[col])).join(
    ","
  )}\n`;
}

export function generateSurveySessionId() {
  // Prefer UUID for uniqueness; fallback to random bytes.
  if (typeof crypto.randomUUID === "function") return crypto.randomUUID();
  return crypto.randomBytes(16).toString("hex");
}

export function appendSurveyResponseRow({
  sessionId,
  timestamp,
  ip,
  userAgent,
  totalPoints,
  rangeKey,
  completionCode,
  answers,
}) {
  ensureSurveyCsvReady();

  if (knownSessionIds.has(sessionId)) return false;

  const csvRow = buildCsvRow({
    sessionId,
    timestamp,
    ip,
    userAgent,
    totalPoints,
    rangeKey,
    completionCode,
    answers,
  });
  fs.appendFileSync(CSV_PATH, csvRow, { encoding: "utf8" });
  knownSessionIds.add(sessionId);
  return true;
}

export function readSurveyCsvSync() {
  if (!fs.existsSync(CSV_PATH)) return null;
  return fs.readFileSync(CSV_PATH, "utf8");
}

export function getSurveyCsvPath() {
  return CSV_PATH;
}

export function getSurveyCsvHeaderLine() {
  return getExpectedHeaderLine();
}

