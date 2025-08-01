"use client";

import React, { useEffect } from "react";
import { formFields } from "@/misc/onboardingFields";
import { useOnboarding } from "@/context/OnboardingContext";
import { useParams } from "next/navigation";
import FormStepsField from "@/components/onboarding/FormStepsField";

function Page() {
  const { slug } = useParams();
  const { setStep, currentStep, setActiveStep, setCurrentStep } =
    useOnboarding();

  useEffect(() => {
    setStep(slug);
    setCurrentStep(slug);
    const stepIndex = formFields.findIndex((f) => f.fieldName === slug);
    setActiveStep(stepIndex > -1 ? stepIndex : 0);
  }, [slug, setStep]);

  const field = formFields.find((f) => f.fieldName === currentStep);
  if (field?.inputType) {
    return <FormStepsField {...field} />;
  }

  return <div>page {slug}</div>;
}

export default Page;
