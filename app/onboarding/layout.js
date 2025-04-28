"use client";

import ProgressBar from "@/components/ProgressBar";
import { useOnboarding } from "@/context/OnboardingContext";
import Image from "next/image";
import { ReactNode } from "react";

const OnboardingLayout = ({ children }) => {
  const { activeStep } = useOnboarding();
  const isBasicInformation = activeStep >= 0 && activeStep <= 1;
  return (
    <>
      <div className="p-4 absolute left-3 top-2">
        <Image src="/logo2.svg" width={80} height={80} alt="logo" />
      </div>
      {" "}
      <div className="w-[90%] mx-auto max-w-2xl mt-[100px]">
      
        <ProgressBar />
        {activeStep < 7 && (
          <div className="my-[35px]">
            <h1 className="text-[#000000] text-[24px] font-medium">
              <Image src="/logo3.svg" width={150} height={150} alt="" />
            </h1>
            {/* <h1 className="text-[#000000] text-[24px] font-medium">{isBasicInformation ? "Basic Information" : "Treatment Information"}</h1>
          <p className="text-[#8A8A8A] text-[16px] font-normal">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry.
          </p> */}
          </div>
        )}
        <div className="form-step">{children}</div>
      </div>
    </>
  );
};

export default OnboardingLayout;
