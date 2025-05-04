import React from "react";
import Image from "next/image";
const Scenario3Message2 = () => {
  const strategies = [
    { icon: "🏃", label: "Exercise – Running, yoga, or gym workouts." },
    { icon: "🧘", label: "Mindfulness – Meditation or deep breathing." },
    { icon: "🎨", label: "Hobbies – Painting, gaming, or reading." },
    { icon: "💬", label: "Talking – Reaching out to a friend or therapist." },
  ];

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
        Stress Management (Without Alcohol)
      </h2>

      {/* Strategies List */}
      <ul className="space-y-4 text-gray-700">
        {strategies.map((item, idx) => (
          <li key={idx} className="flex items-start">
            <span className="mr-3 text-xl">{item.icon}</span>
            <span>{item.label}</span>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default Scenario3Message2;
