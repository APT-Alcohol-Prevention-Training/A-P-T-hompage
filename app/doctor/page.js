"use client";
import React, { useState, useEffect, useRef } from "react";

export default function ChatBox() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: "assistant",
      text: "Greeting, I'm here to offer information and support on Substance Use Disorder. Familiar with it?",
      timestamp: "12:30 PM",
      date: "Mar 29, 2024",
    },
    {
      id: 2,
      type: "user",
      text: "Hello, I've heard but don’t fully understand Substance Use Disorder.",
      timestamp: "12:31 PM",
      date: "Mar 29, 2024",
    },
    {
      id: 3,
      type: "assistant",
      text: "Good to seek information. SUD involves problematic substance use causing significant distress. Know signs and symptoms?",
      timestamp: "12:32 PM",
      date: "Mar 29, 2024",
    },
    {
      id: 4,
      type: "user",
      text: "Not really, I know withdrawal but unsure about the other signs.",
      timestamp: "12:33 PM",
      date: "Mar 29, 2024",
    },
    {
      id: 5,
      type: "assistant",
      text: "I can help. Signs include continued substance use despite problem cause.",
      timestamp: "12:34 PM",
      date: "Mar 29, 2024",
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
        date: new Date().toLocaleDateString("en-US", {
          day: "numeric",
          month: "short",
          year: "numeric",
        }),
      };
      setMessages((prev) => [...prev, newAssistantMessage]);
      setLoading(false);
    }, 1500);
  };

  return (
    <div>
      <div className="flex flex-col h-screen justify-between bg-white mx-auto max-w-[1000px]">
        <div className="p-4 flex-grow overflow-y-auto" ref={chatContainerRef}>
          {Object.entries(
            messages.reduce((acc, msg) => {
              acc[msg.date] = acc[msg.date] || [];
              acc[msg.date].push(msg);
              return acc;
            }, {})
          ).map(([date, msgs]) => (
            <div key={date} className="flex flex-col gap-2">
              <div className="text-center text-gray-500 text-xs mb-2">
                {date}
              </div>
              {msgs.map((msg) => {
                const isAssistant = msg.type === "assistant";
                const alignmentClass = isAssistant ? "self-start" : "self-end";
                const bubbleClass = isAssistant
                  ? "bg-[#EEF2FD] text-black"
                  : "bg-[#F6F6F2] text-black";
                return (
                  <div
                    key={msg.id}
                    className={`${alignmentClass} max-w-[70%] mb-2`}
                  >
                    <div
                      className={`${bubbleClass} px-4 py-3 rounded-2xl text-sm`}
                    >
                      {msg.text}
                    </div>
                    <span className="text-xs text-gray-400">
                      {msg.timestamp}
                    </span>
                  </div>
                );
              })}
            </div>
          ))}
          {loading && (
            <div className="self-start max-w-[70%]">
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
          <div className="p-3 flex items-center gap-3 overflow-x-auto bg-gray-50 border-t border-gray-200 relative">
            {[
              "Schedule availability",
              "Tell me something about..",
              "Clinic Information",
              "Make a reservation",
            ].map((suggestion, index) => (
              <button
                key={index}
                onClick={() => setInputValue(suggestion)}
                className="bg-white text-black border border-gray-300 rounded-full px-4 py-2 text-sm hover:shadow-md transition-all"
              >
                {suggestion}
              </button>
            ))}
            <button
              onClick={() => setShowSuggestions(false)}
              className="absolute right-3 text-sm text-gray-500 hover:text-red-500 transition-all"
            >
              ✖
            </button>
          </div>
        )}
        <div className="p-3 bg-gray-50 border-t border-gray-200 flex items-center">
          <input
            type="text"
            placeholder="What you want to share today?"
            className="flex-grow px-4 py-2 border border-gray-300 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleAddMessage();
            }}
          />
          <button
            onClick={handleAddMessage}
            className="bg-gradient-to-r from-[#28AAE1] via-[#0364B3] to-[#012B4D] text-white px-4 py-2 rounded-full text-sm ml-2"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
