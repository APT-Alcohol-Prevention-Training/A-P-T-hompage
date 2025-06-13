"use client";
import React from "react";
import ScenarioFlow from "../ScenarioFlow";
import { scenarioQuestions } from "../scenarioQuestions";

const Scenario2 = () => {
  return (
    <ScenarioFlow
      scenarioNumber={2}
      messages={[1, 2]} 
      questions={scenarioQuestions.scenario2}
    />
  );
};

export default Scenario2;
