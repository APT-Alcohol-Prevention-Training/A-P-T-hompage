"use client";
import React, { useState } from "react";
import Logo from "./Logo";
import Image from "next/image";
import Button from "./Button";
import Header from "./Header";
import {
  simulateAIResponse,
  getInitialMessages,
  generateTimestamp,
} from "./chatService";
import ChatList from "./ChatList";

const StudentChatbot = () => {
  const [showSidebar, setShowSidebar] = useState(false);
  const [showChatList, setShowChatList] = useState(true);
  const [messages, setMessages] = useState(getInitialMessages());
  const [isLoading, setIsLoading] = useState(false);
  const [pendingInteractiveMessage, setPendingInteractiveMessage] =
    useState(false);

  const currentUser = {
    name: "John Doe",
    avatar: "https://github.com/shadcn.png",
  };

  const handleShowSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  const isInteractiveMessage = (message) => {
    return message.type === "multiple-choice" || message.type === "options";
  };

  const handleSendMessage = async (userMessage) => {
    // Don't allow new messages if there's a pending interactive message
    if (pendingInteractiveMessage) {
      return;
    }

    // Add user message
    const userMsg = {
      id: Date.now(),
      type: "text",
      content: userMessage,
      timestamp: generateTimestamp(),
      isUser: true,
    };

    setMessages((prev) => [...prev, userMsg]);

    // Show loading state
    setIsLoading(true);
    const loadingMsg = {
      id: Date.now() + 1,
      type: "loading",
      timestamp: generateTimestamp(),
      isUser: false,
    };
    setMessages((prev) => [...prev, loadingMsg]);

    try {
      // Simulate AI response
      const aiResponse = await simulateAIResponse(userMessage, messages);
      const aiMsg = {
        id: Date.now() + 2,
        ...aiResponse,
        isUser: false,
      };

      // Remove loading message and add AI response
      setMessages((prev) =>
        prev.filter((msg) => msg.type !== "loading").concat(aiMsg)
      );

      // Set pending interactive message flag
      if (isInteractiveMessage(aiMsg)) {
        setPendingInteractiveMessage(true);
      }
    } catch (error) {
      console.error("Error getting AI response:", error);
      // Remove loading message on error
      setMessages((prev) => prev.filter((msg) => msg.type !== "loading"));
    } finally {
      setIsLoading(false);
    }
  };

  const handleOptionSelect = async (option) => {
    // Add user's selection as a message
    const userMsg = {
      id: Date.now(),
      type: "text",
      content: option,
      timestamp: generateTimestamp(),
      isUser: true,
    };

    setMessages((prev) => [...prev, userMsg]);

    // Clear pending interactive message flag
    setPendingInteractiveMessage(false);

    // Show loading state
    setIsLoading(true);
    const loadingMsg = {
      id: Date.now() + 1,
      type: "loading",
      timestamp: generateTimestamp(),
      isUser: false,
    };
    setMessages((prev) => [...prev, loadingMsg]);

    try {
      // Simulate AI response based on the option selected
      const aiResponse = await simulateAIResponse(option, messages);
      const aiMsg = {
        id: Date.now() + 2,
        ...aiResponse,
        isUser: false,
      };

      // Remove loading message and add AI response
      setMessages((prev) =>
        prev.filter((msg) => msg.type !== "loading").concat(aiMsg)
      );

      // Set pending interactive message flag if the new response is interactive
      if (isInteractiveMessage(aiMsg)) {
        setPendingInteractiveMessage(true);
      }
    } catch (error) {
      console.error("Error getting AI response:", error);
      // Remove loading message on error
      setMessages((prev) => prev.filter((msg) => msg.type !== "loading"));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-full flex flex-row gap-[10px]">
      <Sidebar />
      {/* Main Content */}
      <div className="flex-grow rounded-[16px] box-shadow border-[1px] border-[#F0F2F5] h-full flex flex-col">
        {/* Header */}
        <Header handleShowSidebar={handleShowSidebar} />
        {/* Chat Container */}
        <div className="flex-grow p-[40px] flex flex-col justify-center items-center overflow-hidden bg-[url('/bg-gradient.png')] bg-cover bg-center">
          {showChatList ? (
            <ChatList
              messages={messages}
              onSendMessage={handleSendMessage}
              onOptionSelect={handleOptionSelect}
              isLoading={isLoading}
              currentUser={currentUser}
              pendingInteractiveMessage={pendingInteractiveMessage}
            />
          ) : (
            <WelcomeSection setShowChatList={setShowChatList} />
          )}
        </div>
      </div>
    </div>
  );
};

export default StudentChatbot;

const Sidebar = () => {
  return (
    <div className="relative h-full w-[296px] flex flex-col justify-between items-center max-w-[296px] p-[17px] rounded-[16px] border-[1px] border-[#F0F2F5] box-shadow bg-[url('/student-bg.png')] bg-cover bg-center">
      <div className="self-start">
        <Logo />
      </div>
      <div className="h-[513px]">
        <Image
          src="/student-cartoon.png"
          width={100}
          height={100}
          alt="logo"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="flex flex-col gap-[3px] max-w-[90%] mx-auto">
        <span className="text-[#C59191] text-center font-bold text-[12px] tracking-[4px] leading-[130%]">
          Get Started
        </span>
        <h1 className="text-[24px] text-[#023E6E] font-medium text-center leading-[120%] tracking-0">
          Hi! Ready to boost your learning?
        </h1>
        <p className="text-[12px] font-medium text-[#023E6EB2] text-center leading-[150%] tracking-0">
          Assists students with courses, homework, and quick answers to
          educational queries.
        </p>
      </div>
    </div>
  );
};

const WelcomeSection = ({ setShowChatList }) => {
  return (
    <div className="flex flex-col justify-center items-center gap-[16px] max-w-[700px]">
      <div>
        <Image src={"/element.png"} width={100} height={100} alt="element" />
      </div>
      <h1 className="text-[#0E121B] font-medium text-[40px] leading-[48px] tracking-[-1%] text-center">
        Welcome Sky AI
      </h1>
      <p className="text-[#666F8D] font-normal text-[18px] leading-[26px] text-center max-w-[90%]">
        👋 Hi there! I’m here to help you make smarter choices when it comes to
        alcohol. Ready to get started?
      </p>
      <Button
        className="w-fit mt-[24px]"
        onClick={() => {
          setShowChatList(true);
          console.log("Btn clicked!!!");
        }}
      >
        Get Started
      </Button>
    </div>
  );
};
