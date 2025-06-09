import { Input } from "@/components/ui/input";
import { ContinueButton } from "@/components/ui/ContinueButton";
import { motion, AnimatePresence } from "framer-motion";
import Heading from "@/components/Heading";
import { useState, useCallback, useEffect } from "react";

const TRANSITION_DURATION = 0.2;

export default function QuestionWithTextInput({
  question,
  placeholder,
  value,
  onChange,
  onContinue,
  disabled = false,
  inputType = "text",
  textAreaHeight = false,
  customImageProps,
}) {
  const [isExiting, setIsExiting] = useState(false);

  const defaultImageProps = {
    src: "/eden.svg",
    alt: "eden logo",
    width: 100,
    height: 100,
    className: "py-2 mb-4 mt-7 brightness-0 object-contain pl-0",
  };

  const imageProps = customImageProps || defaultImageProps;

  const handleInputChange = (e) => {
    const newValue = e.target.value;
    // For number inputs, only allow numbers and decimal points
    if (inputType === "number") {
      if (newValue === "" || /^\d*\.?\d*$/.test(newValue)) {
        onChange(newValue);
      }
    } else {
      onChange(newValue);
    }
  };

  const handleContinue = useCallback(() => {
    setIsExiting(true);
    setTimeout(onContinue, TRANSITION_DURATION * 1000);
  }, [onContinue]);

  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.key === "Enter" && !isExiting) {
        handleContinue();
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [isExiting, handleContinue]);

  return (
    <div className="flex flex-col h-full">
      <motion.div
        className="space-y-6 flex-1"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -50 }}
        transition={{ duration: TRANSITION_DURATION, ease: "easeOut" }}
      >
        <div className="mb-6">
          <Image {...imageProps} alt={imageProps.alt} />
        </div>
        <Heading text={question} />

        <div className="space-y-6 pt-5">
          {textAreaHeight ? (
            <textarea
              placeholder={placeholder}
              value={value}
              onChange={handleInputChange}
              className="w-full mt-2 rounded-2xl font-normal font-title tracking-tight leading-tight text-base focus-within:border-[#05C48E] border-[1px] p-6 h-[250px] resize-none focus:outline-none"
            />
          ) : (
            <Input
              type={inputType}
              placeholder={placeholder}
              value={value}
              onChange={handleInputChange}
              className="mt-2 h-20 rounded-2xl font-normal font-title tracking-tight leading-tight !text-base focus-within:border-[#05C48E] border-[1px]}"
            />
          )}
        </div>
      </motion.div>

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
                disabled={disabled || !value.trim()}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
