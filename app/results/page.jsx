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
  const [totalPoints, setTotalPoints] = useState(null);
  const [rangeKey, setRangeKey] = useState(null);

  useEffect(() => {
    const rawScore = localStorage.getItem('totalPoints');
    const parsedScore = rawScore !== null ? parseInt(rawScore, 10) : null;
    if (!Number.isNaN(parsedScore)) {
      setTotalPoints(parsedScore);
      setRangeKey(determineRangeKey(parsedScore));
    } else {
      setTotalPoints(0);
      setRangeKey('0-3');
    }
  }, []);

  const activeScenarioData = rangeKey ? results[rangeKey] : null;

  const activeScoringRow = useMemo(() => {
    if (totalPoints === null) return null;
    return scoringSystem.find((row) => {
      const withinMin = totalPoints >= row.minScore;
      const withinMax = row.maxScore === null ? true : totalPoints <= row.maxScore;
      return withinMin && withinMax;
    });
  }, [totalPoints]);

  const scenarioComponent = rangeKey ? scenarioComponentMap[rangeKey] : null;

  return (
    <div className="mt-16 px-4 pb-12">
      <div className="max-w-5xl mx-auto space-y-12">
        <section className="space-y-4">
          <h1 className="text-3xl font-bold text-gray-900">
            Customized Training for Each Risk Level
          </h1>
          <p className="text-gray-700">
            Your responses unlock a training pathway tailored to your current risk level. Review the levels below, then continue into your personalized coaching scenario.
          </p>
          <div className="overflow-x-auto rounded-lg border border-gray-200 bg-white shadow-sm">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-600">
                    Total Score
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-600">
                    Risk Level
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-600">
                    Description
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-600">
                    Training Recommendation
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {scoringSystem.map((row) => {
                  const isActive =
                    totalPoints !== null &&
                    totalPoints >= row.minScore &&
                    (row.maxScore === null || totalPoints <= row.maxScore);
                  return (
                    <tr
                      key={row.riskLevel}
                      className={isActive ? 'bg-blue-50' : 'bg-white'}
                    >
                      <td className="px-4 py-3 text-sm font-medium text-gray-900">
                        {row.maxScore === null
                          ? `${row.minScore}+`
                          : `${row.minScore} - ${row.maxScore}`}
                      </td>
                      <td className="px-4 py-3 text-sm font-semibold text-gray-900">
                        {row.riskLevel}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-700">{row.description}</td>
                      <td className="px-4 py-3 text-sm text-gray-700">
                        {row.trainingRecommendation}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </section>

        {activeScenarioData && (
          <section className="space-y-6 rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
            <div className="flex flex-col gap-2">
              <span className="text-sm uppercase tracking-wide text-gray-500">
                Your Assessment Snapshot
              </span>
              <h2 className="text-2xl font-semibold text-gray-900">
                {activeScenarioData.scenario}
              </h2>
              {totalPoints !== null && (
                <p className="text-gray-700">
                  Total Score: <span className="font-semibold">{totalPoints}</span>
                </p>
              )}
              {activeScoringRow && (
                <p className="text-gray-700">
                  Focus: {activeScoringRow.trainingRecommendation}
                </p>
              )}
            </div>
            {activeScenarioData.sections?.map((section) => (
              <div key={section.title} className="space-y-2">
                <h3 className="text-xl font-semibold text-gray-900">{section.title}</h3>
                {Array.isArray(section.content) ? (
                  <ul className="list-disc list-inside space-y-1 text-gray-700">
                    {section.content.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                ) : typeof section.content === 'object' ? (
                  <div className="space-y-1 text-gray-700">
                    {Object.entries(section.content).map(([key, value]) => (
                      <p key={key}>
                        <span className="font-medium capitalize">{key}:</span> {value}
                      </p>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-700">{section.content}</p>
                )}
              </div>
            ))}
          </section>
        )}

        <section>
          {scenarioComponent}
        </section>
      </div>
    </div>
  );
};

export default Page;
