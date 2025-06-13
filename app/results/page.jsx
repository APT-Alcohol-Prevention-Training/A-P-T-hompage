'use client'
import React, { useEffect, useState } from 'react';
import Scenario1 from '@/components/onboarding/scoring-scenarios/Scenario1';
import Scenario2 from '@/components/onboarding/scoring-scenarios/Scenario2';
import Scenario3 from '@/components/onboarding/scoring-scenarios/Scenario3';
import Scenario4 from '@/components/onboarding/scoring-scenarios/Scenario4';

const Page = () => {
  const [scenario, setScenario] = useState(null);

  useEffect(() => {
    
    const totalPoints = parseInt(localStorage.getItem('totalPoints'), 10) || 0;

    
    if (totalPoints >= 0 && totalPoints <= 3) {
      setScenario(<Scenario1 />);
    } else if (totalPoints >= 4 && totalPoints <= 7) {
      setScenario(<Scenario2 />);
    } else if (totalPoints >= 8 && totalPoints <= 12) {
     
      setScenario(<Scenario3 />);
    } else if (totalPoints >= 13) {
      setScenario(<Scenario4 />);
    }
  }, []); 
  return (
    <div className='mt-16'>
      {scenario}
    </div>
  );
};

export default Page;
