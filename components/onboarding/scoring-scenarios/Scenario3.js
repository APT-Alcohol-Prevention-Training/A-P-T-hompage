"use client";
import React from "react";
import ScenarioFlow from "../ScenarioFlow";
import { scenarioQuestions } from "../scenarioQuestions";

const Scenario3 = () => {
  return (
    <ScenarioFlow
      scenarioNumber={3}
      messages={[1, 2]} 
      questions={scenarioQuestions.scenario3}
    />
  );
};

export default Scenario3;
