/**
 * @jest-environment node
 */

import fs from "fs";
import os from "os";
import path from "path";

function parseCsvLine(line) {
  const out = [];
  let current = "";
  let inQuotes = false;

  for (let i = 0; i < line.length; i++) {
    const ch = line[i];
    if (inQuotes) {
      if (ch === '"') {
        if (line[i + 1] === '"') {
          current += '"';
          i++;
        } else {
          inQuotes = false;
        }
      } else {
        current += ch;
      }
      continue;
    }

    if (ch === ",") {
      out.push(current);
      current = "";
      continue;
    }
    if (ch === '"') {
      inQuotes = true;
      continue;
    }
    current += ch;
  }
  out.push(current);
  return out;
}

function makeMockRequest(payload, ip, userAgent, delayMs) {
  return {
    json: jest.fn(
      () =>
        new Promise((resolve) => {
          setTimeout(() => resolve(payload), delayMs);
        })
    ),
    headers: {
      get: jest.fn((header) => {
        const key = String(header || "").toLowerCase();
        if (key === "x-forwarded-for") return ip;
        if (key === "user-agent") return userAgent;
        return null;
      }),
    },
  };
}

describe("Survey CSV load test (N users)", () => {
  let tempDir;
  let csvPath;
  let POST;

  beforeAll(async () => {
    tempDir = fs.mkdtempSync(path.join(os.tmpdir(), "apt-survey-load-"));
    csvPath = path.join(tempDir, "survey_responses.csv");

    process.env.SURVEY_CSV_PATH = csvPath;

    jest.resetModules();
    ({ POST } = await import("./route"));
  });

  afterAll(() => {
    delete process.env.SURVEY_CSV_PATH;
    try {
      fs.rmSync(tempDir, { recursive: true, force: true });
    } catch {
      // ignore cleanup failures
    }
  });

  it("writes exactly N rows (1 user = 1 row) and preserves raw answers_json", async () => {
    const USERS = Number(process.env.SURVEY_LOAD_USERS || 300);
    const width = String(USERS).length;

    const payloads = Array.from({ length: USERS }, (_, idx) => {
      const userNumber = String(idx + 1).padStart(width, "0");
      return {
        sessionId: `user-${userNumber}`,
        completionCode: `KEY${userNumber}`,
        totalPoints: idx % 14,
        rangeKey: idx % 14 <= 3 ? "0-3" : idx % 14 <= 7 ? "4-7" : idx % 14 <= 12 ? "8-12" : "13+",
        answers: {
          sectionCode: `SC${userNumber}`,
          ageCheck: idx % 2 === 0 ? "yes" : "no",
          alcoholExperience: idx % 3 === 0 ? "yes" : "no",
          photoURLs: [null, null, null, null],
          // Include comma/quotes to validate CSV escaping
          debugField: `hello, "world" ${userNumber}`,
        },
      };
    });

    const requests = payloads.map((payload, idx) =>
      makeMockRequest(
        payload,
        `203.0.113.${(idx % 250) + 1}`,
        `jest-load-test/${idx + 1}`,
        Math.floor(Math.random() * 10)
      )
    );

    await Promise.all(requests.map((req) => POST(req)));

    // Send some duplicates and ensure row count does not change
    const dupes = payloads.slice(0, Math.min(10, USERS)).map((payload) =>
      makeMockRequest(payload, "203.0.113.250", "jest-load-test/dupe", 0)
    );
    await Promise.all(dupes.map((req) => POST(req)));

    const csv = fs.readFileSync(csvPath, "utf8");
    const lines = csv.trimEnd().split(/\r?\n/);

    expect(lines.length).toBe(USERS + 1); // header + 300 rows

    const header = parseCsvLine(lines[0]);
    const colIndex = Object.fromEntries(header.map((name, i) => [name, i]));

    expect(colIndex.sessionId).toBeDefined();
    expect(colIndex.completionCode).toBeDefined();
    expect(colIndex.answers_json).toBeDefined();

    const seenSessions = new Set();
    for (let i = 1; i < lines.length; i++) {
      const row = parseCsvLine(lines[i]);
      expect(row.length).toBe(header.length);

      const sessionId = row[colIndex.sessionId];
      const completionCode = row[colIndex.completionCode];
      const answersJson = row[colIndex.answers_json];

      expect(sessionId).toMatch(/^user-\d+$/);
      expect(completionCode).toMatch(/^KEY\d+$/);
      expect(seenSessions.has(sessionId)).toBe(false);
      seenSessions.add(sessionId);

      const parsedAnswers = JSON.parse(answersJson);
      expect(parsedAnswers).toMatchObject({
        sectionCode: expect.any(String),
        ageCheck: expect.any(String),
        alcoholExperience: expect.any(String),
        photoURLs: [null, null, null, null],
        debugField: expect.stringContaining('hello, "world"'),
      });
    }

    expect(seenSessions.size).toBe(USERS);
  }, 60000);
});
