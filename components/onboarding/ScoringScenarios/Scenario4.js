'use client'
import React, { useState, useEffect } from 'react';
import Scenario4Message1 from '../Scenario4Message1';
import Scenario4Message2 from '../Scenario4Message2';
import Scenario4Message3 from '../Scenario4Message3';
import Question from '../Question'; // Your dynamic Question component
import Button from '@/components/Button';
import { useRouter } from 'next/navigation';

const Scenario4 = () => {
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
      {showMessage1 && <Scenario4Message1 />}

      {/* First Question */}
      {showQuestion1 && (
        <Question
          questionText="If drinking started causing problems in your work, school, or relationships, what would you do?"
          options={[
            "Try to cut back on my own.",
            "Talk to someone I trust.",
            "Ignore it and hope it improves.",
          ]}
          correctAnswerIndex={1}
          explanationCorrect="Talking to someone is a great idea! Support from friends, family, or a professional can make a big difference."
          explanationIncorrect="Ignoring it might seem easier, but problems tend to grow over time. Want to see some simple ways to manage drinking?"
          onContinue={handleContinue}
        />
      )}

      {/* Scenario Message 2 */}
      {showMessage2 && <Scenario4Message2 />}

      {/* Second Question */}
      {showQuestion2 && (
        <Question
          questionText="What’s a good strategy to help limit alcohol consumption?"
          options={[
            "Set a drink limit before going out.",
            "Space out drinks with water or food.",
            "Find supportive friends or family to check in with.",
            "All of the above.",
          ]}
          correctAnswerIndex={3}
          explanationCorrect="That’s right! Setting limits, drinking water, and having a support system all help you drink less."
          explanationIncorrect="Actually, combining multiple strategies—setting a limit, spacing out drinks, and seeking support—is the best way to cut back safely."
          onContinue={handleContinue}
        />
      )}

      {/* Scenario Message 3 */}
      {showMessage3 && <Scenario4Message3 />}

      {/* Third Question */}
      {showQuestion3 && (
        <Question
          questionText="If you needed help with drinking, where would you feel most comfortable starting?"
          options={[
            "Talking to a trusted friend or family member.",
            "Looking up online resources or self-help guides.",
            "Reaching out to a counselor or support group.",
            "I’m not sure—I haven’t thought about it.",
          ]}
          correctAnswerIndex={3}
          explanationCorrect="That’s okay! If you ever want to explore options, I can share resources with you."
          explanationIncorrect="That’s a great step! Whether it’s a trusted person, online research, or professional help, taking action is what matters."
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

export default Scenario4;
