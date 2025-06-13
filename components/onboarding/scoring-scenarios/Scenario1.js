"use client";
import React from "react";
import ScenarioFlow from "../ScenarioFlow";
import { scenarioQuestions } from "../scenarioQuestions";

const Scenario1 = () => {
  return (
    <ScenarioFlow
      scenarioNumber={1}
      messages={[1, 2]} 
      questions={scenarioQuestions.scenario1}
    />
  );
};

export default Scenario1;
