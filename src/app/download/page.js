"use client";

import React, { useMemo, useState } from "react";
import Button from "@/components/Button";

function encodeBasicAuth(username, password) {
  const encoder = new TextEncoder();
  const bytes = encoder.encode(`${username}:${password}`);
  let binary = "";
  for (let i = 0; i < bytes.length; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
}

function filenameFromContentDisposition(headerValue) {
  if (!headerValue) return null;
  const match = headerValue.match(/filename\\*?=(?:UTF-8''|\"?)([^\";]+)/i);
  if (!match?.[1]) return null;
  try {
    return decodeURIComponent(match[1].replace(/\"/g, ""));
  } catch {
    return match[1].replace(/\"/g, "");
  }
}

export default function DownloadPage() {
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const canDownload = useMemo(() => password.trim().length > 0, [password]);

  const handleDownload = async () => {
    setError("");
    setSuccess("");
    setLoading(true);
    try {
      const token = encodeBasicAuth("user", password);
      const res = await fetch("/api/survey", {
        method: "GET",
        headers: { authorization: `Basic ${token}` },
      });

      if (res.status === 401) {
        throw new Error("Unauthorized: wrong password.");
      }
      if (!res.ok) {
        const message = await res.text().catch(() => "");
        throw new Error(
          message ? `Download failed: ${message}` : `Download failed (${res.status})`
        );
      }

      const blob = await res.blob();
      const contentDisposition = res.headers.get("content-disposition");
      const filename =
        filenameFromContentDisposition(contentDisposition) ||
        "survey_responses.csv";

      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      link.remove();
      URL.revokeObjectURL(url);
      setSuccess("Downloaded.");
    } catch (e) {
      setError(e?.message || String(e));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[70vh] px-4 py-10">
      <div className="mx-auto w-full max-w-md rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
        <h1 className="text-xl font-bold text-black">Download CSV</h1>
        <p className="mt-2 text-sm text-gray-600">
          Enter the download password to fetch <span className="font-mono">/api/survey</span>.
        </p>

        <label className="mt-6 block text-sm font-medium text-gray-800">
          Password
        </label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="CSV_DOWNLOAD_PASSWORD"
          className="mt-2 w-full rounded-xl border border-gray-300 px-4 py-3 text-black outline-none focus:border-[#0364B3]"
          autoComplete="current-password"
        />

        <div className="mt-6">
          <Button
            onClick={handleDownload}
            loading={loading}
            disabled={!canDownload || loading}
          >
            Download CSV
          </Button>
        </div>

        {error ? (
          <p className="mt-4 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </p>
        ) : null}
        {success ? (
          <p className="mt-4 rounded-xl bg-green-50 px-4 py-3 text-sm text-green-700">
            {success}
          </p>
        ) : null}
      </div>
    </div>
  );
}

