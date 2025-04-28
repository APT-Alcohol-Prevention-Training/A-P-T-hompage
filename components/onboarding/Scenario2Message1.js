import React from 'react'
import Image from 'next/image'
const Scenario2Message1 = () => {
  return (
    <section className="max-w-2xl mx-auto  p-8  mt-8">
        <div className="p-4 absolute left-3 top-2">
              <Image src="/logo2.svg" width={80} height={80} alt="logo" />
            </div>
         <div className="flex justify-center mb-4">
                          <Image src="/logo.svg" width={150} height={80} alt="Logo" />
                        </div>
      {/* Section Heading */}
      <h2 className="text-2xl font-bold text-gray-900 mb-6">
        What You’ll Learn Today:
      </h2>

      {/* Overview List */}
      <ul className="list-disc list-inside space-y-2 text-gray-700 mb-8">
        <li>Setting Drinking Limits</li>
        <li>How to Say No to Alcohol</li>
        <li>Alternatives to Drinking at Social Events</li>
      </ul>

      {/* Subsection: Setting Drinking Limits */}
      <h3 className="text-xl font-semibold text-gray-800 mb-4">
        Setting Drinking Limits
      </h3>
      <p className="text-gray-700 mb-4">
        Here’s how you can stay in control:
      </p>
      <ul className="list-disc list-inside space-y-3 text-gray-700">
        <li>Set a drink limit before going out.</li>
        <li>Alternate between alcoholic and non-alcoholic drinks.</li>
        <li>Drink slowly—sip, don’t chug!</li>
        <li>Avoid drinking games that encourage excessive drinking.</li>
      </ul>
    </section>
  )
}

export default Scenario2Message1