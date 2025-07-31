import React from "react";
import MultipleChoiceMessage from "./message-types/MultipleChoiceMessage";
import SuccessMessage from "./message-types/SuccessMessage";
import OptionsMessage from "./message-types/OptionsMessage";
import TextMessage from "./message-types/TextMessage";
import LoadingMessage from "./message-types/LoadingMessage";

const ChatMessage = ({
  message,
  isUser = false,
  onAnswer,
  onOptionSelect,
  currentUser,
}) => {
  if (message.type === "loading") {
    return <LoadingMessage />;
  }

  if (isUser) {
    return (
      <TextMessage
        message={message}
        isUser={isUser}
        icon={currentUser?.avatar || "https://github.com/shadcn.png"}
        userName={currentUser?.name || "You"}
      />
    );
  }

  // Render different message types based on the message data
  switch (message.type) {
    case "multiple-choice":
      return <MultipleChoiceMessage message={message} onAnswer={onAnswer} />;
    case "success":
      return <SuccessMessage message={message} />;
    case "options":
      return (
        <OptionsMessage message={message} onOptionSelect={onOptionSelect} />
      );
    case "text":
    default:
      return <TextMessage message={message} />;
  }
};

export default ChatMessage;
