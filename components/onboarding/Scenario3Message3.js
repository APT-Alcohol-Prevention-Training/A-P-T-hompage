import React from "react";
import Image from "next/image";
const Scenario3Message3 = () => {
  const tips = [
    {
      icon: "🏁",
      title: "Set a Drink Limit",
      description:
        "Before you start drinking, decide how many drinks you’ll have—and stick to it.",
    },
    {
      icon: "💧",
      title: "Alternate with Water",
      description: "Have a glass of water or soda between alcoholic drinks.",
    },
    {
      icon: "🎲",
      title: "Avoid Drinking Games",
      description:
        "They make it easy to lose track of how much you're drinking.",
    },
    {
      icon: "🍽️",
      title: "Eat Before & During Drinking",
      description:
        "Food slows down alcohol absorption, helping you stay more in control.",
    },
    {
      icon: "🐢",
      title: "Drink Slowly",
      description:
        "Take sips, not gulps—your body needs time to process alcohol.",
    },
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
        Practical Tips for Cutting Back on Alcohol
      </h2>

      {/* Tips List */}
      <ul className="space-y-6">
        {tips.map((tip, idx) => (
          <li key={idx} className="flex items-start">
            <div className="flex-shrink-0 text-2xl mr-4">{tip.icon}</div>
            <div>
              <h3 className="font-semibold text-lg text-gray-800">
                {tip.title}
              </h3>
              <p className="mt-1 text-gray-600">{tip.description}</p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default Scenario3Message3;
