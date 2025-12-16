import { NextResponse } from "next/server";
import {
  appendSurveyResponseRow,
  generateSurveySessionId,
  readSurveyCsvSync,
} from "@/server/db/surveyCsvStore";

// Ensure this route uses Node runtime so we can access file system
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request) {
  try {
    const payload = await request.json();
    const {
      sessionId: sessionIdRaw = "",
      completionCode = "",
      totalPoints = "",
      rangeKey = "",
      answers = {},
    } = payload || {};

    const sessionId = sessionIdRaw || generateSurveySessionId();

    // Attempt to detect client IP (works behind most proxies)
    const ipHeader =
      request.headers.get("x-forwarded-for") ||
      request.headers.get("x-real-ip") ||
      request.headers.get("cf-connecting-ip") || // Cloudflare
      "";
    const ip = ipHeader.split(",")[0].trim() || "unknown";

    const timestamp = new Date().toISOString();
    const userAgent = request.headers.get("user-agent") || "";

    appendSurveyResponseRow({
      sessionId,
      timestamp,
      ip,
      userAgent,
      totalPoints,
      rangeKey,
      completionCode,
      answers,
    });

    return NextResponse.json({ status: "ok", sessionId });
  } catch (err) {
    console.error("Error logging survey response:", err);
    return NextResponse.json(
      { status: "error", message: err?.message || String(err) },
      { status: 500 }
    );
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
    const csv = readSurveyCsvSync();
    if (csv === null) {
      return new Response("CSV not found", { status: 404 });
    }
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
