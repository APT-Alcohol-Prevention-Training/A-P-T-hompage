import React from "react";
import MessageTemplate from "./MessageTemplate";
import { scenarioMessages } from "./scenarioMessages";

const ScenarioMessage = ({ scenarioNumber, messageNumber }) => {
  const messageData = scenarioMessages[`scenario${scenarioNumber}`]?.[`message${messageNumber}`];

  if (!messageData) {
    console.error(`Message not found for scenario ${scenarioNumber}, message ${messageNumber}`);
    return null;
  }

  return (
    <MessageTemplate
      title={messageData.title}
      learningPoints={messageData.learningPoints}
      sections={messageData.sections}
      tip={messageData.tip}
      className={messageData.className}
    />
  );
};

export default ScenarioMessage; 