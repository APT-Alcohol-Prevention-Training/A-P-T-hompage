import { useOnboarding } from "@/context/OnboardingContext";
import { formSteps } from "@/misc/constants";
import React from "react";

function ProgressBar() {
  const { activeStep } = useOnboarding();
  const percentage = (activeStep / formSteps.length) * 100;
  return (
    <div className="mb-[30px]">
      <div className=" flex items-center gap-4 p-2 px-0 w-full">
        <div className="w-full rounded-full">
          <div
            className="h-[20px] min-w-[15px] shadow-[0_0_10px_0_#00000000] bg-gradient-to-r from-[#28AAE1] via-[#0364B3] to-[#012B4D] rounded-full w-full transition-all duration-700"
            style={{ maxWidth: `${percentage}%` }}
          />
          {/* <div
            className="absolute top-0 left-0 h-full min-w-[15px] shadow-inner shadow-white rounded-full w-full transition-all duration-700 z-10"
            style={{ maxWidth: `${percentage}%` }}
          /> */}
        </div>
      </div>
      {/* there it should show the percentage of these 8 steps like 1/8 2/8 */}
      <div className="flex justify-between mt-[10px]">
        <p className="text-[#012B4D] text-[14px] font-bold">
          {activeStep}/{formSteps.length}
        </p>
        <p className="text-[#8F9BBA] text-[14px] font-medium">
          {formSteps.length} Steps
        </p>
      </div>
    </div>
  );
}

export default ProgressBar;
