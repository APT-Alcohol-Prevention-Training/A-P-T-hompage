import React from "react";
import Image from "next/image";
const Scenario4Message3 = () => {
  const resources = [
    "Helplines & Support Groups",
    "Counseling & Treatment Programs",
    "Self-Help Guides",
  ];

  return (
    <section className="max-w-2xl mx-auto p-8  mt-8">
      {/* <div className="p-4 absolute left-3 top-2">
                    <Image src="/logo2.svg" width={80} height={80} alt="logo" />
                  </div> */}
      <div className="flex justify-center mb-4">
        <Image src="/logo.svg" width={150} height={80} alt="Logo" />
      </div>
      {/* Section Header */}
      <h2 className="text-2xl font-bold text-gray-900 mb-4">
        Where to Get Help
      </h2>

      {/* Resource List */}
      <ul className="list-disc list-inside space-y-2 text-gray-700">
        {resources.map((item, idx) => (
          <li key={idx}>{item}</li>
        ))}
      </ul>
    </section>
  );
};

export default Scenario4Message3;
