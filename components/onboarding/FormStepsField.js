"use client";

import { useOnboarding } from "@/context/OnboardingContext";
import React, { FormEvent, useEffect, useState } from "react";
import RadioField from "./inputFields/RadioField";
import { FaArrowLeftLong } from "react-icons/fa6";
import TextField from "./inputFields/TextField";
import NumberField from "./inputFields/NumberField";
import DateField from "./inputFields/DateField";
import Button from "../Button";

const FormStepsField = ({
  inputType,
  title,
  description,
  options,
  fieldName,
}) => {
  const { activeStep, setFormValues, goToNextStep, data } = useOnboarding();

  const handleSubmit = (e) => {
    e.preventDefault();
    goToNextStep();
  };

  const [inputValue, setInputValue] = useState(data[fieldName] || "");
  const [continueButton, setContinueButton] = useState(false);

  const handleChange = (val) => {
    setFormValues({ [fieldName]: val });
    localStorage.setItem(
      "formValues",
      JSON.stringify({ ...data, [fieldName]: val })
    );
    setInputValue(val);
    setContinueButton(true);
  };

  useEffect(() => {
    const storedValues = JSON.parse(localStorage.getItem("formValues") || "{}");
    if (storedValues[fieldName]) {
      setContinueButton(true);
      setInputValue(storedValues[fieldName]);
    } else {
      setContinueButton(true);
      setInputValue("");
    }
  }, [fieldName]);

  const renderField = () => {
    const fieldProps = {
      value: inputValue,
      onChange: handleChange,
      placeholder: title,
    };

    switch (inputType) {
      case "text":
        return <TextField {...fieldProps} value={String(inputValue)} />;
      case "number":
        return (
          <NumberField
            onChange={handleChange}
            placeholder={title}
            value={inputValue}
          />
        );
      case "date":
        return <DateField {...fieldProps} value={String(inputValue)} />;
      case "select":
        return (
          <RadioField
            options={options || []}
            selectedValue={inputValue}
            onChange={handleChange}
          />
        );
      case "content":
        return (
          <div className="flex flex-col ">
            <p className=" text-gray-500">{description}</p>
          </div>
        );
      case "image":
        return (
          <div className="flex flex-col items-center">
            <img src="/images/graph.png" alt="graph" />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-6 animate-slideIn">
        <h2 className="text-xl font-bold text-black">{title}</h2>

        {renderField()}

        {continueButton && (
          <div className="flex flex-col items-center">
            <Button type="submit">Continue</Button>
          </div>
        )}

        {activeStep > 0 && (
          <h3
            className="flex items-center gap-2 mt-2 cursor-pointer text-blue-500 cusrsor-pointer"
            onClick={() => window.history.back()}
          >
            <FaArrowLeftLong /> Back
          </h3>
        )}
      </form>
    </>
  );
};

export default FormStepsField;
