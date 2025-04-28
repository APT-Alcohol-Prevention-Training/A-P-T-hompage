'use client'
import React, { useState, useEffect } from 'react';
import Scenario2Message1 from '../Scenario2Message1';
import Scenario2Message2 from '../Scenario2Message2';
import Scenario2Message3 from '../Scenario2Message3';
import Question from '../Question'; // Your dynamic Question component
import Button from '@/components/Button';
import { useRouter } from 'next/navigation';
const Scenario2 = () => {
  const [showMessage1, setShowMessage1] = useState(true);
  const [showMessage2, setShowMessage2] = useState(false);
  const [showMessage3, setShowMessage3] = useState(false);
  const [showQuestion1, setShowQuestion1] = useState(false);
  const [showQuestion2, setShowQuestion2] = useState(false);
  const [showQuestion3, setShowQuestion3] = useState(false);
  const [showContinueButton, setShowContinueButton] = useState(false); // To control when to show the continue button
  const router=useRouter()
  useEffect(() => {
    if (showMessage1) {
      const timer = setTimeout(() => {
        setShowContinueButton(true); // Show Continue button after 15 seconds for Message 1
      }, 15000); // 15 seconds delay for Message 1
      return () => clearTimeout(timer);
    }
    if (showMessage2) {
      const timer = setTimeout(() => {
        setShowContinueButton(true); // Show Continue button after 15 seconds for Message 2
      }, 15000); // 15 seconds delay for Message 2
      return () => clearTimeout(timer);
    }
    if (showMessage3) {
      const timer = setTimeout(() => {
        setShowContinueButton(true); // Show Continue button after 15 seconds for Message 3
      }, 15000); // 15 seconds delay for Message 3
      return () => clearTimeout(timer);
    }
  }, [showMessage1, showMessage2, showMessage3]);

  const handleContinue = () => {
    if (showMessage1) {
      setShowMessage1(false);
      setShowQuestion1(true);
      setShowContinueButton(false); // Reset continue button after click
    } else if (showQuestion1) {
      setShowQuestion1(false);
      setShowMessage2(true);
      setShowContinueButton(false); // Reset continue button after click
    } else if (showMessage2) {
      setShowMessage2(false);
      setShowQuestion2(true);
      setShowContinueButton(false); // Reset continue button after click
    } else if (showQuestion2) {
      setShowQuestion2(false);
      setShowMessage3(true);
      setShowContinueButton(false); // Reset continue button after click
    } else if (showMessage3) {
      setShowMessage3(false);
      setShowQuestion3(true);
      setShowContinueButton(false); // Reset continue button after click
    }
    else
    {
      router.push('/thanksyou')
    }
  };

  return (
    <div className="p-4">
      {/* Scenario Message 1 */}
      {showMessage1 && <Scenario2Message1 />}

      {/* First Question */}
      {showQuestion1 && (
        <Question
          questionText="How long does it take for your body to process ONE standard drink?"
          options={[
            "15 minutes",
            "1 hour",
            "3 hours",
          ]}
          correctAnswerIndex={1}
          explanationCorrect="Yes! On average, your liver processes about one standard drink per hour."
          explanationIncorrect="Actually, it takes about one hour per drink. If you drink multiple drinks in a short period, the alcohol stays in your system longer, increasing the risk of impairment."
          onContinue={handleContinue}
        />
      )}

      {/* Scenario Message 2 */}
      {showMessage2 && <Scenario2Message2 />}

      {/* Second Question */}
      {showQuestion2 && (
        <Question
          questionText="You’re at a party, and a friend offers you a drink. You don’t want to drink tonight—how do you respond?"
          options={[
            "No thanks, I’m good with this one.",
            "I have an early morning, so I’m skipping tonight.",
            "I’m taking a break from drinking right now.",
            "Uhh… I don’t know, I guess I’ll take it.",
          ]}
          correctAnswerIndex={3}
          explanationCorrect="Great choice! Keeping it simple and confident works best. Most people respect a direct but friendly response."
          explanationIncorrect="It can be hard to say no, but remember—you always have the choice. Want to see some strategies for handling these situations?"
          onContinue={handleContinue}
        />
      )}

      {/* Scenario Message 3 */}
      {showMessage3 && <Scenario2Message3 />}

      {/* Third Question */}
      {showQuestion3 && (
        <Question
          questionText="Let’s say you’re at a party, and you don’t feel like drinking. What’s a fun alternative?"
          options={[
            "Try a mocktail instead of alcohol",
            "Be the designated driver for the night",
            "Get involved in games, dancing, or socializing",
            "Stand awkwardly in the corner and pretend to text",
          ]}
          correctAnswerIndex={2}
          explanationCorrect="Exactly! There are plenty of ways to enjoy yourself without drinking."
          explanationIncorrect="That doesn’t sound like much fun! There are better ways to enjoy the party. Want to see some easy conversation starters?"
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

export default Scenario2;



