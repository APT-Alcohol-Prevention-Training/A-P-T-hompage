import React from "react";
import Image from "next/image";
const Scenario4Message1 = () => {
  const learnPoints = [
    "Understanding Alcohol Dependence",
    "How to Cut Back Safely",
    "Where to Get Professional Help",
  ];

  const signs = [
    "Drinking even when it causes problems.",
    "Feeling the need to drink.",
    "Experiencing withdrawal symptoms (shakiness, anxiety).",
  ];

  return (
    <section className="max-w-2xl mx-auto p-8 mt-8">
      {/* <div className="p-4 absolute left-3 top-2">
                    <Image src="/logo2.svg" width={80} height={80} alt="logo" />
                  </div> */}
      <div className="flex justify-center mb-4">
        <Image src="/logo.svg" width={150} height={80} alt="Logo" />
      </div>
      {/* "What You’ll Learn Today" */}
      <h2 className="text-2xl font-bold text-gray-900 mb-4">
        What You’ll Learn Today:
      </h2>
      <ul className="list-disc list-inside mb-8 space-y-2 text-gray-700">
        {learnPoints.map((point, idx) => (
          <li key={idx}>{point}</li>
        ))}
      </ul>

      {/* "Understanding Alcohol Dependence" */}
      <h3 className="text-xl font-semibold text-gray-800 mb-3">
        Understanding Alcohol Dependence
      </h3>
      <ul className="list-disc list-inside mb-4 space-y-2 text-gray-700">
        {signs.map((sign, idx) => (
          <li key={idx}>{sign}</li>
        ))}
      </ul>

      {/* Fact callout */}
      <div className="bg-purple-50 border-l-4 border-purple-600 p-4 rounded">
        <p className="font-medium text-purple-800">
          <strong>Fact:</strong> If you find it hard to stop drinking once you
          start, seeking support can help.
        </p>
      </div>
    </section>
  );
};

export default Scenario4Message1;
