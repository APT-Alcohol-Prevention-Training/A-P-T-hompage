import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

// Ensure this route uses Node runtime so we can access file system
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const CSV_PATH = path.join(process.cwd(), "survey_responses.csv");

/**
 * Converts answers object to a CSV row string.
 * Example: { ageCheck: "yes", alcoholExperience: "no" } -> "yes,no"
 */
function answersToCsvRow(answersObj) {
  // Preserve key order by sorting alphabetically
  const sortedKeys = Object.keys(answersObj).sort();
  const values = sortedKeys.map((k) => {
    const val = answersObj[k];
    // Escape commas and quotes
    if (typeof val === "string" && (val.includes(",") || val.includes("\""))) {
      return `"${val.replace(/\"/g, '"')}"`;
    }
    return val;
  });
  return values.join(",");
}

export async function POST(request) {
  try {
    const { answers = {} } = await request.json();

    // Get client IP (works behind proxies too)
    // Attempt to detect client IP (works behind most proxies)
    const ipHeader =
      request.headers.get("x-forwarded-for") ||
      request.headers.get("x-real-ip") ||
      request.headers.get("cf-connecting-ip") || // Cloudflare
      "";
    const ip = ipHeader.split(",")[0].trim() || "unknown";

    const timestamp = new Date().toISOString();

    // Build CSV line: timestamp,ip,...answers
    const csvRow = `${timestamp},${ip},${answersToCsvRow(answers)}\n`;

    // If file doesn't exist or empty, write header first
    if (!fs.existsSync(CSV_PATH) || fs.statSync(CSV_PATH).size === 0) {
      const header = `timestamp,ip,${Object.keys(answers).sort().join(',')}\n`;
      fs.writeFileSync(CSV_PATH, header + csvRow, { encoding: 'utf8' });
    } else {
      fs.appendFileSync(CSV_PATH, csvRow, { encoding: 'utf8' });
    }

    return NextResponse.json({ status: "ok" });
  } catch (err) {
    console.error("Error logging survey response:", err);
    return NextResponse.json({ status: "error", message: err.message }, { status: 500 });
  }
}

// GET: download CSV file
export async function GET(request) {
  // Basic auth password stored in env CSV_DOWNLOAD_PASSWORD
  const authHeader = request.headers.get("authorization") || "";
  const passwordFromEnv = process.env.CSV_DOWNLOAD_PASSWORD;
  if (!passwordFromEnv) {
    return new Response("Server not configured", { status: 500 });
  }
  const valid = (() => {
    if (!authHeader.startsWith("Basic ")) return false;
    try {
      const decoded = Buffer.from(authHeader.replace("Basic ", ""), "base64").toString();
      // decoded format: username:password, we ignore username
      const [, pass] = decoded.split(":");
      return pass === passwordFromEnv;
    } catch {
      return false;
    }
  })();
  if (!valid) {
    return new Response("Unauthorized", {
      status: 401,
      headers: { "WWW-Authenticate": "Basic realm=\"survey\"" },
    });
  }
  try {
    if (!fs.existsSync(CSV_PATH)) {
      return new Response("CSV not found", { status: 404 });
    }
    const csv = fs.readFileSync(CSV_PATH, "utf8");
    return new Response(csv, {
      headers: {
        "Content-Type": "text/csv; charset=utf-8",
        "Content-Disposition": "attachment; filename=survey_responses.csv",
      },
    });
  } catch (err) {
    console.error("Error reading CSV:", err);
    return new Response("Server error", { status: 500 });
  }
}
