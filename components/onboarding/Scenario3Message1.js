import React from "react";
import Image from "next/image";
const Scenario3Message1 = () => {
  return (
    <section className="max-w-2xl mx-auto p-8  mt-8">
      {/* <div className="p-4 absolute left-3 top-2">
              <Image src="/logo2.svg" width={80} height={80} alt="logo" />
            </div> */}
      <div className="flex justify-center mb-4">
        <Image src="/logo.svg" width={150} height={80} alt="Logo" />
      </div>
      {/* Section Heading */}
      <h2 className="text-2xl font-bold text-gray-900 mb-6">
        What You’ll Learn Today:
      </h2>

      {/* Learning Objectives */}
      <ul className="list-disc list-inside text-gray-700 space-y-2 mb-8">
        <li>How to Recognize Problematic Drinking Patterns</li>
        <li>Stress Management Techniques (Without Alcohol)</li>
        <li>How to Reduce Drinking Safely</li>
      </ul>

      {/* Subheading */}
      <h3 className="text-xl font-semibold text-gray-800 mb-4">
        Recognizing Problematic Drinking
      </h3>

      {/* Warning Signs */}
      <ul className="space-y-3 text-gray-700 mb-6">
        {[
          "Drinking more than you planned.",
          "Feeling guilty about drinking.",
          "Drinking to cope with stress or emotions.",
          "Blacking out or forgetting events while drinking.",
        ].map((sign, idx) => (
          <li key={idx} className="flex items-start">
            <span className="mr-2 text-red-600">❌</span>
            <span>{sign}</span>
          </li>
        ))}
      </ul>

      {/* Tip */}
      <div className="flex items-start bg-gray-50 p-4 rounded-md border-l-4 border-yellow-400">
        <span className="mr-3 text-yellow-500">💡</span>
        <p className="text-gray-700">
          Tip: If you notice these signs, it might be time to take a step back
          and reevaluate your drinking habits.
        </p>
      </div>
    </section>
  );
};

export default Scenario3Message1;
