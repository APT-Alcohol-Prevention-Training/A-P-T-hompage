"use client";

import React, { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Button from "@/components/Button";

const generateCode = () => {
  if (typeof window !== "undefined" && window.crypto?.getRandomValues) {
    const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
    const randomValues = new Uint32Array(6);
    window.crypto.getRandomValues(randomValues);
    return Array.from(randomValues, (value) => chars[value % chars.length]).join(
      ""
    );
  }
  return Math.random()
    .toString(36)
    .toUpperCase()
    .replace(/[^A-Z0-9]/g, "")
    .slice(0, 6)
    .padEnd(6, "0");
};

const encouragementMessage =
  "You're not alone in making healthy choices. It's okay to take small steps, ask for help, and keep practicing.";

const completionSteps = [
  "Please close this browser tab to exit the training.",
  "Return to the original survey browser where you started.",
  "Please enter the following completion code:",
];

const Page = () => {
  const router = useRouter();
  const [completionCode, setCompletionCode] = useState("");
  const [copyMessage, setCopyMessage] = useState("");
  const [introCountdown, setIntroCountdown] = useState(3);
  const [showContinue, setShowContinue] = useState(false);
  const [showCompletionCard, setShowCompletionCard] = useState(false);

  useEffect(() => {
    setCompletionCode(generateCode());
  }, []);

  useEffect(() => {
    setIntroCountdown(3);
    const timer = setTimeout(() => {
      setShowContinue(true);
    }, 3000);
    const interval = setInterval(() => {
      setIntroCountdown(prev => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => {
      clearTimeout(timer);
      clearInterval(interval);
    };
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

  const handleContinue = () => {
    setShowCompletionCard(true);
  };

  return (
    <div className="min-h-screen flex justify-center items-center p-8">
      <div className="max-w-xl mx-auto text-center p-8 space-y-8">
        {!showCompletionCard && (
          <div className="space-y-4">
            <h1 className="text-2xl font-semibold text-[#374557]">
              You're not alone in making healthy choices.
            </h1>
            <p className="text-gray-700">{encouragementMessage}</p>
            {!showContinue && (
              <div className="text-sm text-gray-500">
                Continue button will appear in {introCountdown} seconds...
              </div>
            )}
            {showContinue && (
              <div className="flex justify-center">
                <Button onClick={handleContinue}>Continue</Button>
              </div>
            )}
          </div>
        )}

        {showCompletionCard && (
          <div className="space-y-6">
            <div>
              <p className="text-2xl mb-2">🎉 You’ve completed the training!</p>
              <p className="text-gray-700">
                Thank you for your time and thoughtful participation.
              </p>
            </div>
            <div className="space-y-3 text-left bg-gray-50 border border-gray-200 rounded-lg p-4">
              <p className="font-semibold text-gray-800">To wrap things up:</p>
              <ol className="list-decimal list-inside space-y-2 text-gray-700">
                {completionSteps.slice(0, 2).map((step) => (
                  <li key={step}>{step}</li>
                ))}
                <li>
                  {completionSteps[2]}
                  <div className="mt-2 flex flex-col sm:flex-row sm:items-center gap-3">
                    <div className="font-mono text-xl tracking-widest rounded-md border border-gray-200 bg-white px-4 py-2 text-gray-900">
                      {completionCode}
                    </div>
                    <Button onClick={handleCopy}>Copy Code</Button>
                  </div>
                  {copyMessage && (
                    <p className="mt-2 text-sm text-gray-600">{copyMessage}</p>
                  )}
                </li>
              </ol>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Page;
