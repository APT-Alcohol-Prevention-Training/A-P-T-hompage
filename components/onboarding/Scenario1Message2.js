import React from "react";
import Image from "next/image";
const Scenario1Message2 = () => {
  return (
    <section className="max-w-2xl mx-auto  p-8  mt-8">
      {/* <div className="p-4 absolute left-3 top-2">
                <Image src="/logo2.svg" width={80} height={80} alt="logo" />
              </div> */}
      <div className="flex justify-center mb-4">
        <Image src="/logo.svg" width={150} height={80} alt="Logo" />
      </div>
      {/* Effects Heading */}
      <h2 className="text-2xl font-bold text-gray-900 mb-6">
        How Alcohol Affects Your Body
      </h2>

      {/* Effects List */}
      <ul className="list-disc list-inside space-y-3 text-gray-700 mb-6">
        <li>
          <span className="font-medium">Brain</span> – Slows down processing
          speed and decision-making.
        </li>
        <li>
          <span className="font-medium">Liver</span> – Can cause damage over
          time with excessive use.
        </li>
        <li>
          <span className="font-medium">Sleep</span> – Can interfere with deep
          sleep cycles.
        </li>
      </ul>

      {/* Did You Know Callout */}
      <div className="border-l-4 border-purple-500 bg-purple-50 p-4 rounded mb-8">
        <p className="text-gray-800 italic">
          <strong>Did You Know?</strong> Even small amounts of alcohol can
          impair judgment and coordination, making activities like driving
          dangerous.
        </p>
      </div>

      {/* Myths vs Facts */}
      <h3 className="text-xl font-semibold text-gray-800 mb-4">
        Myths vs. Facts
      </h3>
      <div className="space-y-6 text-gray-700">
        {/* Myth/Fact Pair 1 */}
        <div>
          <p className="font-medium">Myth:</p>
          <blockquote className="pl-4 italic border-l-2 border-gray-300 mb-2">
            “Drinking coffee will sober you up.”
          </blockquote>
          <p>
            <span className="font-medium">Fact:</span> Only time helps your body
            process alcohol. Coffee won’t make you sober—just more awake.
          </p>
        </div>
        {/* Myth/Fact Pair 2 */}
        <div>
          <p className="font-medium">Myth:</p>
          <blockquote className="pl-4 italic border-l-2 border-gray-300 mb-2">
            “If I don’t feel drunk, I’m okay to drive.”
          </blockquote>
          <p>
            <span className="font-medium">Fact:</span> Alcohol can impair
            judgment before you feel drunk.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Scenario1Message2;
