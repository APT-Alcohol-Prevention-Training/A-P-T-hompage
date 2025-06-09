import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Button from "@/components/Button";
import Question from "./Question";
import ScenarioMessage from "./ScenarioMessage";

const ScenarioFlow = ({ scenarioNumber, messages, questions }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [showContinueButton, setShowContinueButton] = useState(false);
  const router = useRouter();

  useEffect(() => {
  
    if (currentStep % 2 === 0) { 
      const timer = setTimeout(() => {
        setShowContinueButton(true);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [currentStep]);

  const handleContinue = () => {
    if (currentStep < messages.length + questions.length - 1) {
      setCurrentStep(prev => prev + 1);
      setShowContinueButton(false);
    } else {
      router.push("/thanksyou");
    }
  };

  const renderCurrentStep = () => {
    const isMessage = currentStep % 2 === 0;
    const index = Math.floor(currentStep / 2);

    if (isMessage) {
      return <ScenarioMessage scenarioNumber={scenarioNumber} messageNumber={index + 1} />;
    } else {
      const question = questions[index];
      return (
        <Question
          questionText={question.questionText}
          options={question.options}
          correctAnswerIndex={question.correctAnswerIndex}
          explanationCorrect={question.explanationCorrect}
          explanationIncorrect={question.explanationIncorrect}
          onContinue={handleContinue}
        />
      );
    }
  };

  return (
    <div className="p-4">
      {renderCurrentStep()}
      
      {showContinueButton && currentStep % 2 === 0 && (
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

export default ScenarioFlow; 