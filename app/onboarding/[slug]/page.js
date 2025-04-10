"use client";

import React, { useEffect } from "react";
import { formFields } from "@/misc/onboardingFields";
import FormStepsField from "@/components/onboarding/FormStepsField";
import { useOnboarding } from "@/context/OnboardingContext";
import { useParams } from "next/navigation";

function Page() {
  const { slug } = useParams();
  const { setStep, currentStep, setActiveStep, setCurrentStep } =
    useOnboarding();

  useEffect(() => {
    setStep(slug);
    setCurrentStep(slug);
    const stepIndex = formFields.findIndex((f) => f.fieldName === slug);
    console.log("stepIndex", stepIndex);
    setActiveStep(stepIndex > -1 ? stepIndex : 0);
  }, [slug, setStep]);

  console.log("currentStep", currentStep);

  const field = formFields.find((f) => f.fieldName === currentStep);
  console.log("field", field);
  if (field?.inputType) {
    return <FormStepsField {...field} />;
  }

  return <div>page {slug}</div>;
}

export default Page;
