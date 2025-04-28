'use client'
import React, { useState, useEffect } from 'react';
import Scenario3Message1 from '../Scenario3Message1';
import Scenario3Message2 from '../Scenario3Message2';
import Scenario3Message3 from '../Scenario3Message3';
import Question from '../Question'; // Your dynamic Question component
import Button from '@/components/Button';
import { useRouter } from 'next/navigation';
const Scenario3 = () => {
  const [showMessage1, setShowMessage1] = useState(true);
  const [showMessage2, setShowMessage2] = useState(false);
  const [showMessage3, setShowMessage3] = useState(false);
  const [showQuestion1, setShowQuestion1] = useState(false);
  const [showQuestion2, setShowQuestion2] = useState(false);
  const [showQuestion3, setShowQuestion3] = useState(false);
  const [showContinueButton, setShowContinueButton] = useState(false);
  const router=useRouter()
  useEffect(() => {
    if (showMessage1) {
      const timer = setTimeout(() => {
        setShowContinueButton(true);
      }, 15000); // 15 seconds delay for Message 1
      return () => clearTimeout(timer);
    }
    if (showMessage2) {
      const timer = setTimeout(() => {
        setShowContinueButton(true);
      }, 15000); // 15 seconds delay for Message 2
      return () => clearTimeout(timer);
    }
    if (showMessage3) {
      const timer = setTimeout(() => {
        setShowContinueButton(true);
      }, 15000); // 15 seconds delay for Message 3
      return () => clearTimeout(timer);
    }
  }, [showMessage1, showMessage2, showMessage3]);

  const handleContinue = () => {
    if (showMessage1) {
      setShowMessage1(false);
      setShowQuestion1(true);
      setShowContinueButton(false);
    } else if (showQuestion1) {
      setShowQuestion1(false);
      setShowMessage2(true);
      setShowContinueButton(false);
    } else if (showMessage2) {
      setShowMessage2(false);
      setShowQuestion2(true);
      setShowContinueButton(false);
    } else if (showQuestion2) {
      setShowQuestion2(false);
      setShowMessage3(true);
      setShowContinueButton(false);
    } else if (showMessage3) {
      setShowMessage3(false);
      setShowQuestion3(true);
      setShowContinueButton(false);
    }
    else
    {
        router.push('/thanksyou')
    }
  };

  return (
    <div className="p-4">
      {/* Scenario Message 1 */}
      {showMessage1 && <Scenario3Message1 />}

      {/* First Question */}
      {showQuestion1 && (
        <Question
          questionText="Have you ever felt guilty about drinking?"
          options={[
            "Yes, sometimes I regret drinking.",
            "No, I don’t feel bad about it.",
          ]}
          correctAnswerIndex={0}
          explanationCorrect="That feeling of guilt can be a sign that drinking is affecting you in ways you don’t want it to."
          explanationIncorrect="That’s good! Just remember—if drinking ever starts to make you feel bad emotionally, it’s okay to take a step back and reflect."
          onContinue={handleContinue}
        />
      )}

      {/* Scenario Message 2 */}
      {showMessage2 && <Scenario3Message2 />}

      {/* Second Question */}
      {showQuestion2 && (
        <Question
          questionText="Which of these is a good alternative to drinking when stressed?"
          options={[
            "Running or yoga",
            "Painting or playing video games",
            "Calling a friend",
            "All of the above",
          ]}
          correctAnswerIndex={3}
          explanationCorrect="That’s right! There are so many ways to manage stress without alcohol. Finding what works best for you is key."
          explanationIncorrect="It’s good to explore other ways of managing stress that don’t involve alcohol. Consider some of these options!"
          onContinue={handleContinue}
        />
      )}

      {/* Scenario Message 3 */}
      {showMessage3 && <Scenario3Message3 />}

      {/* Third Question */}
      {showQuestion3 && (
        <Question
          questionText="Which of these tips do you think would work best for you?"
          options={[
            "Setting a drink limit",
            "Alternating drinks with water",
            "Avoiding drinking games",
            "Drinking more slowly",
          ]}
          correctAnswerIndex={0}
          explanationCorrect="Great choice! Even one small change can help you drink less without feeling like you're missing out."
          explanationIncorrect="It’s great that you’re considering cutting back! There are plenty of strategies to help you drink less responsibly."
          onContinue={handleContinue}
        />
      )}

      {/* Continue Button */}
      {showContinueButton && !showQuestion1  && !showQuestion2  && !showQuestion3 && (
        <div className='max-w-2xl mx-auto mt-3'>
        <Button onClick={handleContinue} className="px-4 py-2 bg-blue-500 text-white rounded">
          Continue
        </Button>
        </div>
      )}
    </div>
  );
};

export default Scenario3;
