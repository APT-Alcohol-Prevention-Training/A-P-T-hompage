import React from "react";
import Image from "next/image";
const Scenario2Message2 = () => {
  return (
    <section className="max-w-2xl mx-auto p-8 mt-8">
      {/* <div className="p-4 absolute left-3 top-2">
              <Image src="/logo2.svg" width={80} height={80} alt="logo" />
            </div> */}
      <div className="flex justify-center mb-4">
        <Image src="/logo.svg" width={150} height={80} alt="Logo" />
      </div>
      {/* Section Heading */}
      <h2 className="text-2xl font-bold text-gray-900 mb-6">
        How to Say No to Alcohol (Without Feeling Awkward)
      </h2>

      {/* Prompt */}
      <p className="text-gray-700 mb-4">If Someone Offers You a Drink:</p>

      {/* Suggested Phrases */}
      <ul className="list-disc list-inside space-y-2 mb-6 text-gray-700">
        <li>"No thanks, I’m good with this one."</li>
        <li>"I have an early morning, so I’m skipping tonight."</li>
        <li>"I’m taking a break from drinking right now."</li>
      </ul>

      {/* Tip Box */}
      <div className="bg-gray-50 p-4 rounded-md">
        <p className="font-semibold text-gray-800 mb-2">Tip:</p>
        <p className="text-gray-700">
          Keep a non-alcoholic drink in your hand—it helps avoid repeated
          offers.
        </p>
      </div>
    </section>
  );
};

export default Scenario2Message2;
