"use client";
import Image from "next/image";
import React, { useState } from "react";
import Button from "../Button";
import { ArrowRight } from "lucide-react";

const OptionsMessage = ({ message, onOptionSelect }) => {
  const [isAnswered, setIsAnswered] = useState(false);

  const handleOptionSelect = (option) => {
    if (onOptionSelect && message.options.includes(option)) {
      onOptionSelect(option);
      setIsAnswered(true);
    }
  };

  return (
    <div className="flex items-center gap-[12px] border-[2px] border-[#F0F2F5] box-shadow rounded-[16px] p-[24px] bg-white">
      <div className="min-w-[24px] min-h-[24px] rounded-full self-start">
        <Image src={"/element.png"} alt="element" width={24} height={24} />
      </div>
      <div className="flex flex-col gap-[8px] w-full">
        <div className="flex items-center gap-[12px]">
          <h3 className="text-[#19213D] font-medium text-[14px] leading-[130%]">
            Sky
          </h3>
          <div className="w-[1px] h-[16px] bg-[#F0F2F5]"></div>
          <span className="text-[#666F8D] font-medium text-[12px] leading-[130%]">
            {message.timestamp}
          </span>
        </div>
        <div className="flex flex-col gap-[16px]">
          <p className="text-[#666F8D] font-normal text-[14px] leading-[150%]">
            {message.content}
          </p>
          <div className="flex gap-[12px]">
            <Button
              disabled={isAnswered}
              onClick={() => handleOptionSelect(message.options[0])}
              className="flex items-center gap-[8px]"
            >
              {message.options[0]}
              <ArrowRight size={12} />
            </Button>
            <button
              disabled={isAnswered}
              onClick={() => handleOptionSelect(message.options[1])}
              className="px-[16px] py-[8px] rounded-[8px] border-[1px] border-[#F0F2F5] bg-white text-[#666F8D] font-medium text-[12px] hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {message.options[1]}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OptionsMessage;
