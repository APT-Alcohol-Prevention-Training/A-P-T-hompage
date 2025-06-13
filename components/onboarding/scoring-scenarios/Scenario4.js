"use client";
import React from "react";
import ScenarioFlow from "../ScenarioFlow";
import { scenarioQuestions } from "../scenarioQuestions";

const Scenario4 = () => {
  return (
    <ScenarioFlow
      scenarioNumber={4}
      messages={[1, 2]} 
      questions={scenarioQuestions.scenario4}
    />
  );
};

export default Scenario4;
