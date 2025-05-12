"use client";
import React, { useState, useEffect } from "react";
import Scenario1Message1 from "../Scenario1Message1";
import Scenario1Message2 from "../Scenario1Message2";
import Question from "../Question"; // Your dynamic Question component
import { useRouter } from "next/navigation";
import Button from "@/components/Button";
const Scenario1 = () => {
  const [showMessage1, setShowMessage1] = useState(true);
  const [showMessage2, setShowMessage2] = useState(false);
  const [showQuestion1, setShowQuestion1] = useState(false);
  const [showQuestion2, setShowQuestion2] = useState(false);
  const [showContinueButton, setShowContinueButton] = useState(false); // New state for showing Continue button
  const router = useRouter();
  useEffect(() => {
    if (showMessage1) {
      const timer = setTimeout(() => {
        setShowContinueButton(true); // Show Continue button after 15 seconds
      }, 3000); // 15 seconds delay for Message 1
      return () => clearTimeout(timer);
    }
    if (showMessage2) {
      const timer = setTimeout(() => {
        setShowContinueButton(true); // Show Continue button after 15 seconds
      }, 3000); // 15 seconds delay for Message 2
      return () => clearTimeout(timer);
    }
  }, [showMessage1, showMessage2]); // Add effect to run when messages change

  const handleContinue = () => {
    if (showMessage1) {
      setShowMessage1(false);
      setShowQuestion1(true);
      setShowContinueButton(false); // Reset the Continue button after click
    } else if (showQuestion1) {
      setShowQuestion1(false);
      setShowMessage2(true);
      setShowContinueButton(false); // Reset the Continue button after click
    } else if (showMessage2) {
      setShowMessage2(false);
      setShowQuestion2(true);
      setShowContinueButton(false); // Reset the Continue button after click
    } else {
      router.push("/thanksyou");
    }
  };

  return (
    <div className="p-4">
      {/* Scenario Message 1 */}
      {showMessage1 && <Scenario1Message1 />}

      {/* First Question */}
      {showQuestion1 && (
        <Question
          questionText="What do you think counts as a 'standard drink'?"
          options={[
            "A full glass of wine, a bottle of beer, or a shot of liquor",
            "Any amount of alcohol in a cup",
            "A cocktail with multiple types of alcohol",
          ]}
          correctAnswerIndex={0}
          explanationCorrect="Yes! A standard drink is 12 oz beer, 5 oz wine, or 1.5 oz liquor."
          explanationIncorrect="Not quite! A cocktail can have more than one standard drink."
          onContinue={handleContinue}
        />
      )}

      {/* Scenario Message 2 */}
      {showMessage2 && <Scenario1Message2 />}

      {/* Second Question */}
      {showQuestion2 && (
        <Question
          questionText="If I don’t feel drunk, am I okay to drive?"
          options={[
            "Yes, if I feel fine, I’m good to drive.",
            "No, alcohol can affect me before I feel drunk.",
          ]}
          correctAnswerIndex={1}
          explanationCorrect="Exactly! Alcohol impairs judgment and reaction time before you actually ‘feel’ drunk."
          explanationIncorrect="Be careful! You may not feel drunk, but even small amounts of alcohol slow down your reaction time and thinking."
          onContinue={handleContinue}
        />
      )}

      {/* Continue Button */}
      {showContinueButton && !showQuestion1 && !showQuestion2 && (
        <div className="max-w-2xl mx-auto mt-3">
          <Button
            onClick={handleContinue}
            className="px-4 py-2 bg-blue-500 text-white rounded"
          >
            Continue
          </Button>
        </div>
      )}
    </div>
  );
};

export default Scenario1;
