"use client";

import React, {
  useState,
  useEffect,
  ReactNode,
  createContext,
  useContext,
} from "react";
import { formSteps } from "@/misc/constants";
import { formFields } from "@/misc/onboardingFields";
import { routes } from "@/misc/routes";
import { useRouter } from "next/navigation";

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

      // Store total points for later use
      localStorage.setItem("totalPoints", totalPoints.toString());

      // Send survey answers to backend for logging (fire-and-forget)
      try {
        fetch("/api/survey", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ answers: data }),
        });
      } catch (err) {
        console.error("Failed to log survey response", err);
      }

      router.push(`/results`);
      return; 
    }

    let nextStep = currentStepData?.nextField;

    if (data[currentStepData?.fieldName]) {
      const selectedOption = currentStepData?.options?.find(
        (option) => option.value === data[currentStepData.fieldName]
      );
      if (selectedOption?.nextField) {
        nextStep = selectedOption.nextField;
      }
    }

    if (!nextStep && currentStepData?.nextField) {
      nextStep = currentStepData.nextField;
    }

    if (nextStep) {
      router.push(`${routes.onboarding}/${nextStep}`);
      const nextStepIndex = formSteps.findIndex((step) => step === nextStep);
      if (nextStepIndex === -1) {
        console.error(`Step "${nextStep}" not found in formSteps.`);
        return;
      }
      localStorage.setItem("activeStep", nextStepIndex.toString());
      setActiveStep(nextStepIndex);
      handleNext(nextStep);
    } else {
      router.push(`${routes.onboarding}/confirmation`);
    }
  };

  const handleBack = () => {
    const prevStepIndex = activeStep - 1;
    const prevStep = formSteps[prevStepIndex];
    if (prevStep) {
      window.history.back();
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
