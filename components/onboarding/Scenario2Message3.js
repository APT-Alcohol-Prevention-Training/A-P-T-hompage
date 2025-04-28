

import React from 'react'
import Image from 'next/image'
const Scenario2Message3 = () => {
  return (
    <section className="max-w-2xl mx-auto p-8 mt-8">
        <div className="p-4 absolute left-3 top-2">
              <Image src="/logo2.svg" width={80} height={80} alt="logo" />
            </div>
         <div className="flex justify-center mb-4">
                          <Image src="/logo.svg" width={150} height={80} alt="Logo" />
                        </div>
      {/* Section Heading */}
      <h2 className="text-2xl font-bold text-gray-900 mb-6">
        Alternatives to Drinking
      </h2>

      {/* Intro Text */}
      <p className="text-gray-700 mb-4">
        Not drinking? You can still have fun!
      </p>

      {/* Bullet List */}
      <ul className="space-y-3 text-gray-700">
        <li className="flex items-start">
          <span className="mr-2 text-green-600">✅</span>
          <span>Try a mocktail instead of alcohol.</span>
        </li>
        <li className="flex items-start">
          <span className="mr-2 text-green-600">✅</span>
          <span>Be the designated driver for the night.</span>
        </li>
        <li className="flex items-start">
          <span className="mr-2 text-green-600">✅</span>
          <span>Get involved in games, dancing, or socializing.</span>
        </li>
      </ul>
    </section>
  )
}

export default Scenario2Message3