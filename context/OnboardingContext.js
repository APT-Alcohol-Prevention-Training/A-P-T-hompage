"use client";

import { formSteps } from "@/misc/constants";
import { formFields } from "@/misc/onboardingFields";
import { routes } from "@/misc/routes";
import next from "next";
import { useRouter, useSearchParams } from "next/navigation";
import React, {
  useState,
  useEffect,
  ReactNode,
  createContext,
  useContext,
} from "react";

console.log("form Data", FormData);

export const OnboardingContext = createContext(undefined);

export const OnboardingProvider = ({ children }) => {
  const [step, setStep] = useState(null);

  const [data, setData] = useState({ photoURLs: [null, null, null, null] });

  useEffect(() => {
    const stored = localStorage.getItem("formValues");
    if (stored) {
      setData(JSON.parse(stored));
    }
  }, []);

  const [activeStep, setActiveStep] = useState(0); // Safe default

  useEffect(() => {
    const storedStep = localStorage.getItem("activeStep");

    if (step && storedStep) {
      setActiveStep(Number(storedStep));
    }
  }, [step]);

  const setFormValues = (values) => {
    setData((prev) => {
      const updatedData = { ...prev, ...values };
      localStorage.setItem("formValues", JSON.stringify(updatedData));
      return updatedData;
    });
  };

  useEffect(() => {
    localStorage.setItem("activeStep", activeStep.toString());
  }, [activeStep]);

  const router = useRouter();

  const [currentStep, setCurrentStep] = useState(step || "intro");

  useEffect(() => {
    if (step) {
      setCurrentStep(step);
    }
  }, [step]);

  const handleNext = (nextStep) => {
    setCurrentStep(nextStep);
  };

  const goToNextStep = () => {
    const currentStepData = formFields.find((s) => s.fieldName === step);
    if (currentStepData?.last === true) {
      const totalPoints = formFields.reduce((acc, field) => {
        const selectedOption = field.options?.find(
          (option) => option.value === data[field.fieldName]
        );
        return acc + (selectedOption ? selectedOption.points : 0);
      }, 0);
      localStorage.setItem("totalPoints", totalPoints.toString());
      router.push(`/results`);
    }
    console.log("currentStepData", currentStepData);
    let nextStep = currentStepData?.nextField;
    if (data[currentStepData.fieldName]) {
      const selectedOption = currentStepData.options?.find(
        (option) => option.value === data[currentStepData.fieldName]
      );
      if (selectedOption) {
        nextStep = selectedOption.nextField;
      }
    }
    if (!nextStep) {
      nextStep = data[currentStep].nextField;
    }
    console.log("nextStep", nextStep);
    if (nextStep) {
      router.push(`${routes.onboarding}/${nextStep}`);
      const nextStepIndex = formSteps.findIndex((step) => step === nextStep);
      if (nextStepIndex === -1) {
        console.error(`Step "${nextStep}" not found in formSteps.`);
        return;
      }
      // Update the active step in local storage
      localStorage.setItem("activeStep", nextStepIndex.toString());
      setActiveStep(nextStepIndex);
      handleNext(nextStep); // Notify parent component
    } else {
      // Handle final submission or navigate to a confirmation page
      console.log("Form submitted with values:", data);
      router.push(`${routes.onboarding}/confirmation`);
    }
  };

  const handleBack = () => {
    const prevStepIndex = activeStep - 1;
    const prevStep = formSteps[prevStepIndex];
    if (prevStep) {
      router.push(`${routes.onboarding}/${prevStep}`);
      setActiveStep(prevStepIndex);
    }
  };

  return (
    <OnboardingContext.Provider
      value={{
        data,
        setStep,
        setFormValues,
        activeStep,
        setActiveStep,
        goToNextStep,
        handleBack,
        currentStep,
        setCurrentStep,
      }}
    >
      {children}
    </OnboardingContext.Provider>
  );
};

export const useOnboarding = () => {
  const context = useContext(OnboardingContext);
  if (context === undefined) {
    throw new Error("useOnboarding must be used within a OnboardingProvider");
  }
  return context;
};
