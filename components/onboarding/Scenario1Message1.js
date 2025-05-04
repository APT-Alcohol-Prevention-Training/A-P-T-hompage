import React from "react";
import Image from "next/image";
const Scenario1Message1 = () => {
  return (
    <section className="max-w-2xl mx-auto p-8 ">
      {/* <div className="p-4 absolute left-3 top-2">
              <Image src="/logo2.svg" width={80} height={80} alt="logo" />
            </div> */}
      <div className="flex justify-center mb-4">
        <Image src="/logo.svg" width={150} height={80} alt="Logo" />
      </div>
      {/* Heading */}
      <h2 className="text-2xl font-bold text-gray-900 mb-6">
        What You’ll Learn Today:
      </h2>

      {/* Key Topics */}
      <ul className="list-disc list-inside space-y-2 mb-8 text-gray-700">
        <li>What is a Standard Drink?</li>
        <li>How Alcohol Affects the Body</li>
        <li>Alcohol Myths vs. Facts</li>
      </ul>

      {/* Standard Drink Definition */}
      <h3 className="text-xl font-semibold text-gray-800 mb-4">
        What is a Standard Drink?
      </h3>
      <p className="text-gray-700 mb-4">
        A standard drink contains <strong>0.6 ounces (14 g)</strong> of pure
        alcohol:
      </p>

      <ul className="space-y-3 mb-6 text-gray-700">
        <li>
          <span className="font-medium">Beer (5% alcohol):</span> 12 oz (
          <em>1 can</em>)
        </li>
        <li>
          <span className="font-medium">Wine (12% alcohol):</span> 5 oz (
          <em>1 glass</em>)
        </li>
        <li>
          <span className="font-medium">Liquor (40% alcohol):</span> 1.5 oz (
          <em>1 shot</em>)
        </li>
      </ul>

      {/* Tip Box */}
      <div className="border-l-4 border-purple-500 bg-purple-50 p-4 rounded">
        <p className="text-gray-800 italic">
          Tip: Just because a drink is smaller or lighter doesn’t mean it
          contains less alcohol! Cocktails and mixed drinks often have more than
          one standard drink in them.
        </p>
      </div>
    </section>
  );
};

export default Scenario1Message1;
