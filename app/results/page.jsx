"use client";
import { scoringSystem } from "@/misc/constants";
import { useEffect, useState } from "react";
import { results } from "./data";

const ResultsPage = () => {
  const [score, setScore] = useState(0);

  useEffect(() => {
    const scoreValue = JSON.parse(localStorage.getItem("totalPoints") || "{}");
    setScore(scoreValue);
  }, []);

  const scoreDetails = scoringSystem.find((item) => {
    if (item.maxScore === null) {
      return score >= item.minScore;
    }
    return score >= item.minScore && score <= item.maxScore;
  });

  if (!scoreDetails) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-xl text-gray-600">No score details found</p>
      </div>
    );
  }

  const { minScore, maxScore } = scoreDetails;
  const key = `${minScore}${maxScore ? "-" + maxScore : "+"}`;
  const result = results[key];

  return (
    <div className="flex justify-center items-center h-screen bg-gray-50">
      <div className="w-full max-w-4xl p-6 bg-white shadow-md rounded-lg">
        <h2 className="text-2xl font-semibold text-center mb-6">
          Your Alcohol Risk Assessment
        </h2>
        <table className="min-w-full bg-white border border-gray-300 rounded-md shadow-sm">
          <thead>
            <tr className="bg-gray-100 text-gray-700">
              <th className="px-6 py-3 text-left">Score Range</th>
              <th className="px-6 py-3 text-left">Risk Level</th>
              <th className="px-6 py-3 text-left">Description</th>
              <th className="px-6 py-3 text-left">Training Recommendation</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-t border-gray-200">
              <td className="px-6 py-4">
                {scoreDetails.minScore}
                {scoreDetails.maxScore ? "-" + scoreDetails.maxScore : "+"}
              </td>
              <td className="px-6 py-4">{scoreDetails.riskLevel}</td>
              <td className="px-6 py-4">{scoreDetails.description}</td>
              <td className="px-6 py-4">
                {scoreDetails.trainingRecommendation}
              </td>
            </tr>
          </tbody>
        </table>

        {/* Loop through sections and render them dynamically */}
        {/* {result?.sections?.map((section, index) => (
          <div key={index} className="mt-6">
            <h3 className="text-xl font-semibold">{section.title}</h3>
            <div className="mt-4">
              {Array.isArray(section.content) ? (
                <ul className="list-disc pl-6">
                  {section.content.map((item, idx) => (
                    <li key={idx} className="text-gray-700">
                      {item}
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="text-gray-700">
                  {Object.entries(section.content).map(([key, value], idx) => (
                    <div key={idx} className="mb-2">
                      <strong className="text-gray-800">{key}:</strong> {value}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))} */}

        {/* Loop through and render questions */}
        {result?.questions?.map((question, idx) => (
          <div key={idx} className="mt-6">
            <h3 className="text-xl font-semibold">{question.question}</h3>
            <ul className="list-disc pl-6 mt-2">
              {question.options.map((option, optionIdx) => (
                <li key={optionIdx} className="text-gray-700">
                  <span>{option.label}</span>
                  {option.correct && (
                    <span className="text-green-500 ml-2">(Correct)</span>
                  )}
                </li>
              ))}
            </ul>
            <div className="mt-2 text-gray-600">
              {question.answerExplanation}
            </div>
          </div>
        ))}

        {/* Loop through and render myth/fact sections */}
        {result?.sections?.map((section, index) =>
          section.content?.mythsAndFacts ? (
            <div key={index} className="mt-6">
              <h3 className="text-xl font-semibold">Myths vs. Facts</h3>
              <ul className="list-disc pl-6">
                {section.content.mythsAndFacts.map((mythFact, idx) => (
                  <li key={idx} className="text-gray-700">
                    <strong>Myth: </strong>
                    {mythFact.myth}
                    <br />
                    <strong>Fact: </strong>
                    {mythFact.fact}
                  </li>
                ))}
              </ul>
            </div>
          ) : null
        )}
      </div>
    </div>
  );
};

export default ResultsPage;
