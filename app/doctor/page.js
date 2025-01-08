"use client";
import Image from "next/image";
import React, { useState, useEffect, useRef } from "react";

export default function ChatBox() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: "assistant",
      text: "Greeting, I'm here to offer information and support on Substance Use Disorder. Familiar with it?",
      timestamp: "12:30 PM",
      // date: "Mar 29, 2024",
    },
    {
      id: 2,
      type: "user",
      text: "Hello, I've heard but don’t fully understand Substance Use Disorder.",
      timestamp: "12:31 PM",
      // date: "Mar 29, 2024",
    },
    {
      id: 3,
      type: "assistant",
      text: "Good to seek information. SUD involves problematic substance use causing significant distress. Know signs and symptoms?",
      timestamp: "12:32 PM",
      // date: "Mar 29, 2024",
    },
    {
      id: 4,
      type: "user",
      text: "Not really, I know withdrawal but unsure about the other signs.",
      timestamp: "12:33 PM",
      // date: "Mar 29, 2024",
    },
    {
      id: 5,
      type: "assistant",
      text: "I can help. Signs include continued substance use despite problem cause.",
      timestamp: "12:34 PM",
      // date: "Mar 29, 2024",
    },
  ]);

  const [inputValue, setInputValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(true);
  const chatContainerRef = useRef(null);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [messages, loading]);

  const handleAddMessage = () => {
    if (!inputValue.trim()) return;

    const newUserMessage = {
      id: Date.now(),
      type: "user",
      text: inputValue.trim(),
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      date: new Date().toLocaleDateString("en-US", {
        day: "numeric",
        month: "short",
        year: "numeric",
      }),
    };

    setMessages((prev) => [...prev, newUserMessage]);
    setInputValue("");
    simulateAssistantResponse();
  };

  const simulateAssistantResponse = () => {
    setLoading(true);
    setTimeout(() => {
      const newAssistantMessage = {
        id: Date.now(),
        type: "assistant",
        text: "This is a simulated assistant response. Replace with backend integration.",
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
        // date: new Date().toLocaleDateString("en-US", {
        //   day: "numeric",
        //   month: "short",
        //   year: "numeric",
        // }),
      };
      setMessages((prev) => [...prev, newAssistantMessage]);
      setLoading(false);
    }, 1500);
  };
  const today = new Date().toLocaleDateString("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
  return (
    <div className="grid md:grid-cols-[30%,auto] lg:grid-cols-[40%,auto] xl:grid-cols-[30%,auto] ">

      <div className="px-[15px] lg:px-[20px] xl:px-[40px] py-[40px]" >

        <Image
          src="/logo.svg"
          width={182} height={40}
          className=""
          alt="logo"
        />

        <div className="flex flex-col mt-[89px] justify-center items-center">


          <div className="mb-[80px]">
            <Image
              src="/sky.svg"
              width={132}
              height={44}
              alt="sky"
            />
          </div>
          <div>
            <Image
              src="/doctor.svg"
              width={245}
              height={329}
              alt="doctor"
            />
          </div>

          <div className="bg-[#F6F6F2] custom-shadow mt-[14px] font-semibold text-[16px] leading-[19px] px-[24px] rounded-[16px] flex justify-center items-center py-[14px] text-center text-[#232C3C]">
            Just know that I’m
            here for you. Always.
          </div>

          <div>
          </div>
        </div>
      </div>
      <div className="flex px-[20px]  xl:px-[40px] py-[32px] flex-col md:h-screen justify-between bg-white flex-grow">
        <div className="flex items-center pb-[40px] gap-2 px-4">

          <div className="h-[1px] w-[40%] flex-grow bg-[#D9D9D9]">

          </div>
          <p className="flex-shrink-0">{today}</p>
          <div className="h-[1px] w-[40%] flex-grow-0 bg-[#D9D9D9]">

          </div>
        </div>
        <div className="   flex-grow overflow-y-auto custom-scrollbar" ref={chatContainerRef}>

          <div className="flex flex-col gap-2">

            {messages.map((msg) => {
              const isAssistant = msg.type === "assistant";
              const alignmentClass = isAssistant ? "self-start" : "self-end";
              const bubbleClass = isAssistant
                ? "bg-[#EEF2FD] text-black"
                : "bg-[#F6F6F2] text-black";
              return (
                <div
                  key={msg.id}
                  className={`${alignmentClass} ${msg.type == "assistant" ? 'flex items-center justify-center ' : ''}} max-w-[85%] lg:max-w-[70%] mb-2`}
                >
                  <div
                    className={`${bubbleClass} px-4 py-3 rounded-2xl text-sm`}
                  >
                    {msg.text}
                  </div>
                  {
                    msg.type == "assistant" &&
                    <span className="text-xs ml-[16px] flex-shrink-0 text-gray-400">
                      {msg.timestamp}
                    </span>
                  }
                </div>
              );
            })}
          </div>

          {loading && (
            <div className="self-start w-fit">
              <div className="bg-[#EEF2FD] text-black px-4 py-3 rounded-2xl text-sm">
                <div className="flex gap-1">
                  <span className="dot-animation bg-gray-400 w-2 h-2 rounded-full"></span>
                  <span className="dot-animation bg-gray-400 w-2 h-2 rounded-full"></span>
                  <span className="dot-animation bg-gray-400 w-2 h-2 rounded-full"></span>
                </div>
              </div>
            </div>
          )}
        </div>
        {showSuggestions && (
          <div className=" flex pt-[24px]  pb-[24px] overflow-y-hidden items-center gap-3  overflow-x-auto  relative">

            <Image
              onClick={() => setShowSuggestions(false)}
              src="/cross.svg"
              width={50}
              height={50}
              alt="x"
            />

            {[
              "Schedule availability",
              "Tell me something about..",
              "Clinic Information",
              "Make a reservation",
            ].map((suggestion, index) => (

              <button
                key={index}
                onClick={() => setInputValue(suggestion)}
                className="bg-white custom-shadow flex-shrink-0  text-[#363A3D] font-bold text-[16px] leading-[19px] rounded-[40px] border border-gray-300  px-[20px] py-[12px] text-sm hover:shadow-md transition-all"
              >
                {suggestion}
              </button>
            ))}

          </div>
        )}
        <div className=" py-[24px] px-[12px] lg:px-[24px] rounded-[20px] border border-[#D9D9D9] bg-[#F6F6F2]  flex items-center">
          <input
            type="text"
            placeholder="What you want to share today?"
            className="flex-grow bg-transparent   font-400 text-[16px] leading-[19px] outline-none"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleAddMessage();
            }}
          />
          <button
            onClick={handleAddMessage}
            className="bg-gradient-to-r w-[48px] h-[48px] from-[#28AAE1] via-[#0364B3] to-[#012B4D] text-white px-4 py-2 rounded-[12px] text-sm ml-2"
          >
            <Image
              src="/send.svg"
              width={24}
              height={24}
              alt="send"
            />
          </button>
        </div>
        <div className="flex items-center gap-[24px] mt-[12px]">
          <Image
            src="/A.svg"
            width={24}
            height={24}
            alt="A"
          />
          <Image
            src="/A2.svg"
            width={24}
            height={24}
            alt="A2"
          />
          <Image
            src="/smile.svg"
            width={24}
            height={24}
            alt="smile"
          />
          <Image
            src="/drive.svg"
            width={24}
            height={24}
            alt="drive"
          />
          <Image
            src="/lock.svg"
            width={24}
            height={24}
            alt="lock"
          />
          <Image
            src="/pen.svg"
            width={24}
            height={24}
            alt="pen"
          />
          <Image
            src="/vertical.svg"
            width={24}
            height={24}
            alt="vertical"
          />
        </div>
      </div>
    </div>
  );
}
