"use client";
import React from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
const Page = () => {
  const router = useRouter();

  const handleRedirect = () => {
    // Redirect user to a different page after thanking them
    router.push("/");
  };

  return (
    <div className="min-h-screen flex justify-center items-center  p-8">
      {/* <div className="p-4 absolute left-3 top-2">
                <Image src="/logo2.svg" width={80} height={80} alt="logo" />
              </div> */}
      <div className="max-w-xl mx-auto text-center  p-8 ">
        <h1 className="text-3xl font-semibold text-[#374557] mb-4">
          Thank You!
        </h1>
        <p className="text-lg text-gray-600 mb-6">
          {`You’ve just completed a short alcohol prevention training.`}
        </p>
        <p className="text-md text-gray-500 mb-4">
          {`We appreciate your time and participation. If you found this helpful, we hope you’ll consider joining future sessions to explore more content and build on what you’ve learned.`}
        </p>

        {/* <div className="mt-6">
          <button
            onClick={handleRedirect}
            className="px-6 py-3 bg-gradient-to-r from-[#28AAE1] via-[#0364B3] to-[#012B4D] hover:bg-gray-800 text-white rounded-md transition duration-300"
          >
            Go to Home
          </button>
        </div> */}
      </div>
    </div>
  );
};

export default Page;
