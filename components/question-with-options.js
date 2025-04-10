import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Heading from "@/components/Heading";

// Add transition duration constant
const TRANSITION_DURATION = 0.2;

export default function QuestionWithOptions({
  question,
  options,
  selectedOption,
  onOptionSelect,
  customImageProps,
}) {
  const defaultImageProps = {
    src: "/eden.svg",
    alt: "eden logo",
    width: 100,
    height: 100,
    className: "py-2 mb-4 mt-7 brightness-0 object-contain pl-0",
  };

  const imageProps = customImageProps || defaultImageProps;

  const shouldScroll = options.length > 8;

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
                ? "max-h-[400px] overflow-y-auto pr-4 custom-scrollbar"
                : ""
            }`}
          >
            {options.map((option, _index) => (
              <Button
                key={option.id}
                onClick={() => onOptionSelect(option.id)}
                className={`w-full h-[5rem] bg-white text-black rounded-2xl p-2 border-[1px] ${
                  selectedOption === option.id
                    ? "border-[#05C48E] hover:border-[#05C48E]"
                    : "border-gray-200 hover:border-gray-300"
                } hover:bg-gray-50 cursor-pointer`}
              >
                <div className="flex flex-row w-full justify-between">
                  <span className="flex-1 text-left pl-4 pt-5 pb-5 text-base font-title font-medium">
                    {option.label}
                  </span>
                </div>
              </Button>
            ))}
          </div>
        </motion.div>
      </div>

      <div className="mt-20">
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            transition={{ duration: TRANSITION_DURATION }}
            className="mt-6"
          ></motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
