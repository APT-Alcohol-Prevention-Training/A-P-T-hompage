'use client';

import React, { useEffect, useMemo, useState } from 'react';
import Scenario1 from '@/components/onboarding/scoring-scenarios/Scenario1';
import Scenario2 from '@/components/onboarding/scoring-scenarios/Scenario2';
import Scenario3 from '@/components/onboarding/scoring-scenarios/Scenario3';
import Scenario4 from '@/components/onboarding/scoring-scenarios/Scenario4';
import { scoringSystem } from '@/misc/constants';
import { results } from './data';

const scenarioComponentMap = {
  '0-3': <Scenario1 />,
  '4-7': <Scenario2 />,
  '8-12': <Scenario3 />,
  '13+': <Scenario4 />,
};

const determineRangeKey = (score) => {
  if (Number.isNaN(score)) return null;
  if (score <= 3) return '0-3';
  if (score <= 7) return '4-7';
  if (score <= 12) return '8-12';
  return '13+';
};

const Page = () => {
  const [rangeKey, setRangeKey] = useState(null);

  useEffect(() => {
    const rawScore = localStorage.getItem('totalPoints');
    const parsedScore = rawScore !== null ? parseInt(rawScore, 10) : null;
    if (!Number.isNaN(parsedScore)) {
      setRangeKey(determineRangeKey(parsedScore));
    } else {
      setRangeKey('0-3');
    }
  }, []);

  const activeScenarioData = rangeKey ? results[rangeKey] : null;

  const scenarioComponent = rangeKey ? scenarioComponentMap[rangeKey] : null;

  return (
    <div className="mt-8 px-4 pb-12">
      <div className="max-w-4xl mx-auto">
        {scenarioComponent}
      </div>
    </div>
  );
};

export default Page;
