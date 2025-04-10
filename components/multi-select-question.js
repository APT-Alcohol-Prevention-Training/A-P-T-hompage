import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useEffect, useState, useCallback } from "react";
import { ContinueButton } from "@/components/ui/ContinueButton";
import Heading from "@/components/Heading";

// Add transition duration constant
const TRANSITION_DURATION = 0.2;

export default function MultiSelectQuestion({
  question,
  options,
  onSubmit,
  initialSelectedOptions = [],
  customImageProps,
  noneOptionId,
}) {
  const [selectedOptions, setSelectedOptions] = useState(
    initialSelectedOptions
  );
  const [isExiting, setIsExiting] = useState(false);

  const defaultImageProps = {
    src: "/eden.svg",
    alt: "eden logo",
    width: 100,
    height: 100,
    className: "py-2 mb-4 mt-7 brightness-0 object-contain pl-0",
  };

  const imageProps = customImageProps || defaultImageProps;

  const toggleOption = (optionId) => {
    setSelectedOptions((prev) => {
      // If clicking the "none" option
      if (optionId === noneOptionId) {
        // If "none" was already selected, unselect it
        if (prev.includes(noneOptionId)) {
          return prev.filter((id) => id !== noneOptionId);
        }
        // If "none" wasn't selected, select only it
        return [noneOptionId];
      }

      // If clicking any other option
      if (noneOptionId) {
        // Remove "none" option if it was selected
        const withoutNone = prev.filter((id) => id !== noneOptionId);

        // Toggle the clicked option
        if (withoutNone.includes(optionId)) {
          return withoutNone.filter((id) => id !== optionId);
        }
        return [...withoutNone, optionId];
      }

      // Default toggle behavior if no noneOptionId is provided
      return prev.includes(optionId)
        ? prev.filter((id) => id !== optionId)
        : [...prev, optionId];
    });
  };

  const handleContinue = useCallback(() => {
    if (selectedOptions.length > 0) {
      setIsExiting(true);
      setTimeout(() => {
        onSubmit(selectedOptions);
      }, TRANSITION_DURATION * 1000);
    }
  }, [selectedOptions, onSubmit]);

  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.key === "Enter" && !isExiting && selectedOptions.length > 0) {
        handleContinue();
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [isExiting, selectedOptions, handleContinue]);

  const shouldScroll = options.length > 6;

  return (
    <div className="flex flex-col h-full">
      <div className="space-y-6 flex-1">
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: TRANSITION_DURATION, ease: "easeOut" }}
        >
          <div>
            <Image {...imageProps} alt={imageProps.alt} />
            <Heading text={question} />
          </div>

          <div
            className={`space-y-4 ${
              shouldScroll
                ? "max-h-[65vh] overflow-y-auto pr-4 custom-scrollbar"
                : ""
            }`}
          >
            {options.map((option) => (
              <Button
                key={option.id}
                onClick={() => toggleOption(option.id)}
                className={`w-full min-h-[5rem] bg-white text-black rounded-2xl p-4 border-[1px] ${
                  selectedOptions.includes(option.id)
                    ? "border-[#05C48E] hover:border-[#05C48E]"
                    : "border-gray-200 hover:border-gray-300"
                } hover:bg-gray-50 cursor-pointer`}
              >
                <div className="flex flex-row w-full justify-between items-center gap-4">
                  <span className="flex-1 text-left text-base font-title font-medium whitespace-normal">
                    {option.label}
                  </span>
                  {selectedOptions.includes(option.id) ? (
                    <div className="flex-shrink-0 w-6 h-6 flex items-center justify-center">
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M20 6L9 17L4 12"
                          stroke="rgba(5, 196, 142, 1)"
                          strokeWidth="3"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                  ) : (
                    <div className="flex-shrink-0 w-6 h-6 border-1 border-[#0E121B1A] bg-[#0E121B1A] rounded-lg"></div>
                  )}
                </div>
              </Button>
            ))}
          </div>
        </motion.div>
      </div>

      <div className="mt-auto">
        <AnimatePresence>
          {!isExiting && (
            <motion.div
              initial={{ opacity: 0, y: 0 }}
              animate={{ opacity: 1, y: 10 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: TRANSITION_DURATION, ease: "easeOut" }}
              className="mt-6"
            >
              <ContinueButton
                onClick={handleContinue}
                disabled={selectedOptions.length === 0}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
