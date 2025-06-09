"use client";

import React from "react";
import ProgressBar from "@/components/ProgressBar";
import { useOnboarding } from "@/context/OnboardingContext";
import Image from "next/image";

const OnboardingLayout = ({ children }) => {
  const { activeStep } = useOnboarding();
  return (
    <>
     
      <div className="w-[90%] mx-auto max-w-2xl mt-[100px]">
        <ProgressBar />
        {activeStep && (
          <div className="my-[35px]">
            <h1 className="text-[#000000] text-[24px] font-medium">
              <Image src="/logo3.svg" width={150} height={150} alt="" />
            </h1>
      
          </div>
        )}
        <div className="form-step">{children}</div>
      </div>
    </>
  );
};

export default OnboardingLayout;
