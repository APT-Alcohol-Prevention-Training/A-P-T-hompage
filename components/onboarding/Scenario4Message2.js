import React from "react";
import Image from "next/image";
const Scenario4Message2 = () => {
  const tips = [
    "Gradually reduce drinking instead of stopping suddenly.",
    "Set a plan (e.g., no more than 2 drinks per occasion).",
    "Find a support system (friends, family, therapist).",
  ];

  return (
    <section className="max-w-2xl mx-auto  p-8  mt-8">
      {/* <div className="p-4 absolute left-3 top-2">
                  <Image src="/logo2.svg" width={80} height={80} alt="logo" />
                </div> */}
      <div className="flex justify-center mb-4">
        <Image src="/logo.svg" width={150} height={80} alt="Logo" />
      </div>
      {/* Section Title */}
      <h2 className="text-2xl font-bold text-gray-900 mb-4">
        How to Cut Back Safely
      </h2>

      {/* Tip List */}
      <ul className="list-disc list-inside space-y-2 text-gray-700">
        {tips.map((tip, idx) => (
          <li key={idx}>{tip}</li>
        ))}
      </ul>
    </section>
  );
};

export default Scenario4Message2;
