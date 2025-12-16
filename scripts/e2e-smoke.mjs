import { spawn } from "child_process";
import fs from "fs";
import net from "net";
import os from "os";
import path from "path";

const projectRoot = process.cwd();
const nextBin =
  process.platform === "win32"
    ? path.join(projectRoot, "node_modules", ".bin", "next.cmd")
    : path.join(projectRoot, "node_modules", ".bin", "next");

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

function getFreePort() {
  return new Promise((resolve, reject) => {
    const server = net.createServer();
    server.on("error", reject);
    server.listen(0, "127.0.0.1", () => {
      const address = server.address();
      const port = typeof address === "object" && address ? address.port : null;
      server.close(() => resolve(port));
    });
  });
}

async function fetchWithTimeout(url, options = {}, timeoutMs = 15000) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);
  try {
    return await fetch(url, { ...options, signal: controller.signal });
  } finally {
    clearTimeout(timeout);
  }
}

async function waitForHttpOk(url, timeoutMs = 60000) {
  const start = Date.now();
  while (Date.now() - start <= timeoutMs) {
    try {
      const res = await fetchWithTimeout(url, {}, 5000);
      if (res.ok) return;
    } catch {
      // ignore until timeout
    }
    await new Promise((r) => setTimeout(r, 500));
  }
  throw new Error(`Timed out waiting for server: ${url}`);
}

function run(cmd, args, { env } = {}) {
  return new Promise((resolve, reject) => {
    const child = spawn(cmd, args, {
      cwd: projectRoot,
      env: env || process.env,
      stdio: "inherit",
      shell: false,
    });
    child.on("error", reject);
    child.on("exit", (code) => {
      if (code === 0) resolve();
      else reject(new Error(`${cmd} ${args.join(" ")} exited with ${code}`));
    });
  });
}

async function stopProcess(proc) {
  if (!proc || proc.killed) return;
  proc.kill("SIGTERM");
  const exited = await Promise.race([
    new Promise((resolve) => proc.once("exit", resolve)),
    new Promise((resolve) => setTimeout(() => resolve(false), 8000)),
  ]);
  if (!exited) proc.kill("SIGKILL");
}

async function main() {
  if (typeof fetch !== "function") {
    throw new Error("Node fetch is not available; please use Node 18+.");
  }
  if (!fs.existsSync(nextBin)) {
    throw new Error(`Next.js binary not found at ${nextBin}. Did you run npm install?`);
  }

  const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), "apt-e2e-"));
  const csvPath = path.join(tempDir, "survey_responses.csv");
  const password = "e2e-password";
  const port = await getFreePort();
  if (!port) throw new Error("Failed to acquire a free port.");

  const env = {
    ...process.env,
    PORT: String(port),
    CSV_DOWNLOAD_PASSWORD: password,
    SURVEY_CSV_PATH: csvPath,
    NEXT_DIST_DIR: ".next-e2e",
  };

  if (!process.env.E2E_SKIP_BUILD) {
    await run("npm", ["run", "build"], { env });
  }

  const server = spawn(nextBin, ["start", "-p", String(port)], {
    cwd: projectRoot,
    env,
    stdio: "inherit",
    shell: false,
  });

  try {
    await waitForHttpOk(`http://127.0.0.1:${port}/`);

    const resRoot = await fetchWithTimeout(`http://127.0.0.1:${port}/`);
    if (!resRoot.ok) throw new Error(`GET / failed: ${resRoot.status}`);

    const resOnboarding = await fetchWithTimeout(
      `http://127.0.0.1:${port}/onboarding/sectionCode`
    );
    if (!resOnboarding.ok) {
      throw new Error(
        `GET /onboarding/sectionCode failed: ${resOnboarding.status}`
      );
    }

    const resTraining = await fetchWithTimeout(
      `http://127.0.0.1:${port}/training-complete`
    );
    if (!resTraining.ok) {
      throw new Error(
        `GET /training-complete failed: ${resTraining.status}`
      );
    }

    const resDownload = await fetchWithTimeout(
      `http://127.0.0.1:${port}/download`
    );
    if (!resDownload.ok) {
      throw new Error(
        `GET /download failed: ${resDownload.status}`
      );
    }

    const sessionId = `e2e-${Date.now()}`;
    const completionCode = "ABC123";
    const payload = {
      sessionId,
      completionCode,
      totalPoints: 5,
      rangeKey: "4-7",
      answers: {
        sectionCode: "SC0001",
        ageCheck: "yes",
        alcoholExperience: "no",
        photoURLs: [null, null, null, null],
        debugField: 'hello, "world"',
      },
    };

    const resPost = await fetchWithTimeout(`http://127.0.0.1:${port}/api/survey`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (!resPost.ok) throw new Error(`POST /api/survey failed: ${resPost.status}`);
    const postJson = await resPost.json();
    if (postJson?.status !== "ok" || postJson?.sessionId !== sessionId) {
      throw new Error(`Unexpected POST response: ${JSON.stringify(postJson)}`);
    }

    // Verify CSV was written and contains the row.
    const csv = fs.readFileSync(csvPath, "utf8");
    const lines = csv.trimEnd().split(/\r?\n/);
    if (lines.length < 2) throw new Error("CSV missing data rows");

    const header = parseCsvLine(lines[0]);
    const colIndex = Object.fromEntries(header.map((name, i) => [name, i]));
    if (colIndex.sessionId === undefined) throw new Error("CSV missing sessionId column");
    if (colIndex.completionCode === undefined)
      throw new Error("CSV missing completionCode column");
    if (colIndex.answers_json === undefined)
      throw new Error("CSV missing answers_json column");

    const rowLine = lines.find((line) => line.startsWith(`${sessionId},`));
    if (!rowLine) throw new Error("CSV missing sessionId row");

    const row = parseCsvLine(rowLine);
    if (row[colIndex.completionCode] !== completionCode) {
      throw new Error("CSV completionCode mismatch");
    }

    const answersJson = row[colIndex.answers_json];
    const parsedAnswers = JSON.parse(answersJson);
    if (parsedAnswers.debugField !== 'hello, "world"') {
      throw new Error("CSV answers_json missing debugField");
    }

    const auth = Buffer.from(`user:${password}`).toString("base64");
    const resCsv = await fetchWithTimeout(`http://127.0.0.1:${port}/api/survey`, {
      headers: { authorization: `Basic ${auth}` },
    });
    if (!resCsv.ok) throw new Error(`GET /api/survey failed: ${resCsv.status}`);
    const contentType = resCsv.headers.get("content-type") || "";
    if (!contentType.includes("text/csv")) {
      throw new Error(`Unexpected CSV content-type: ${contentType}`);
    }
    const csvBody = await resCsv.text();
    if (!csvBody.includes(sessionId)) throw new Error("Downloaded CSV missing row");
  } finally {
    await stopProcess(server);
    try {
      fs.rmSync(tempDir, { recursive: true, force: true });
    } catch {
      // ignore cleanup failures
    }
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
