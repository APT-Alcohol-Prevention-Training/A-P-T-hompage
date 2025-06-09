// components/Question.js
"use client";

import React, { useState } from "react";
import Image from "next/image";
import PropTypes from "prop-types";
import Button from "../Button"; // adjust path to your Button component

export default function Question({
  logoSrc = "/logo.svg",
  questionText,
  options,
  correctAnswerIndex,
  explanationCorrect,
  explanationIncorrect,
  onContinue,
}) {
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [answered, setAnswered] = useState(false);

  function handleOptionClick(idx) {
    if (answered) return;
    setSelectedIndex(idx);
    setAnswered(true);
  }

  const isCorrect = selectedIndex === correctAnswerIndex;

  return (
    <div className="max-w-[600px] mx-auto p-6 mt-8">
      {/* Logo */}
      <div className="flex justify-center mb-4">
        <Image src={logoSrc} width={120} height={80} alt="Logo" />
      </div>

      {/* Question */}
      <h2 className="text-xl font-bold mb-6">{questionText}</h2>

      {/* Options */}
      <div className="grid gap-3 mb-6">
        {options.map((opt, idx) => {
          let bgClass = "bg-white hover:border-[#0364B3] border-2";
          if (answered && idx === selectedIndex) {
            bgClass = isCorrect ? "bg-green-200" : "bg-red-200";
          }
          return (
            <button
              key={idx}
              onClick={() => handleOptionClick(idx)}
              className={`${bgClass} text-left px-4 py-4 border rounded-md`}
            >
              {opt}
            </button>
          );
        })}
      </div>

      {/* Explanation */}
      {answered && (
        <div className="mb-6 p-4 bg-gray-50 rounded">
          <p className="font-medium">
            {isCorrect ? "✅ Correct!" : "❌ Incorrect!"}
          </p>
          <p className="mt-2 text-sm">
            {isCorrect ? explanationCorrect : explanationIncorrect}
          </p>
        </div>
      )}

      {/* Continue Button */}
      {answered && (
        <div className="text-right">
          <Button onClick={onContinue}>Continue</Button>
        </div>
      )}
    </div>
  );
}

Question.propTypes = {
  logoSrc: PropTypes.string,
  questionText: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
  correctAnswerIndex: PropTypes.number.isRequired,
  explanationCorrect: PropTypes.string.isRequired,
  explanationIncorrect: PropTypes.string.isRequired,
  onContinue: PropTypes.func.isRequired,
};
