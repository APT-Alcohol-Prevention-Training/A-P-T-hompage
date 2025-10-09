"use client";

import React, { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const generateCode = () => {
  if (typeof window !== "undefined" && window.crypto?.getRandomValues) {
    const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
    const randomValues = new Uint32Array(6);
    window.crypto.getRandomValues(randomValues);
    return Array.from(randomValues, (value) => chars[value % chars.length]).join(
      ""
    );
  }
  return Math.random().toString(36).toUpperCase().replace(/[^A-Z0-9]/g, "").slice(0, 6).padEnd(6, "0");
};

const Page = () => {
  const router = useRouter();
  const [completionCode, setCompletionCode] = useState("");
  const [copyMessage, setCopyMessage] = useState("");

  useEffect(() => {
    setCompletionCode(generateCode());
  }, []);

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(completionCode);
      setCopyMessage("Code copied!");
      setTimeout(() => setCopyMessage(""), 2000);
    } catch (error) {
      setCopyMessage("Unable to copy. Please select and copy manually.");
    }
  }, [completionCode]);

  const handleRedirect = () => {
    router.push("/");
  };

  return (
    <div className="min-h-screen flex justify-center items-center p-8">
      <div className="max-w-xl mx-auto text-center p-8">
        <h1 className="text-3xl font-semibold text-[#374557] mb-4">
          Thank You!
        </h1>
        <p className="text-lg text-gray-600 mb-6">
          {`You've just completed a short alcohol prevention training.`}
        </p>
        <p className="text-md text-gray-500 mb-6">
          {`We appreciate your time and participation. If you found this helpful, we hope you'll consider joining future sessions to explore more content and build on what you've learned.`}
        </p>

        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-3">
            Your 6-digit verification code
          </h2>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <div className="font-mono text-2xl tracking-widest rounded-md border border-gray-200 bg-gray-50 px-6 py-2 text-gray-900">
              {completionCode}
            </div>
            <button
              onClick={handleCopy}
              className="px-4 py-2 bg-[#0364B3] text-white rounded-md shadow hover:bg-[#024d89] transition"
              type="button"
            >
              Copy Code
            </button>
          </div>
          {copyMessage && (
            <p className="mt-2 text-sm text-gray-600">{copyMessage}</p>
          )}
        </div>

        <div className="mt-6">
          <button
            onClick={handleRedirect}
            className="px-6 py-3 bg-gradient-to-r from-[#28AAE1] via-[#0364B3] to-[#012B4D] hover:bg-gray-800 text-white rounded-md transition duration-300"
          >
            Go to Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default Page;
