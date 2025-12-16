import React from "react";

const RadioField = ({ options, selectedValue, onChange }) => {
  return (
    <div>
      <div className="space-y-4 ">
        {options?.map((option, i) => (
          <label
            key={i}
            onClick={() => onChange && onChange(option.value)}
            className={`flex items-center capitalize w-full min-h-[75px] p-4 border-[2px] rounded-[12px] transition-all cursor-pointer duration-200
                        hover:border-primary  ${
                          selectedValue === option.value ||
                          (Array.isArray(selectedValue) &&
                            selectedValue.includes(option.value))
                            ? "border-[#0364B3] border-[3px] bg-brown-50 scale-98 "
                            : ""
                        } relative`}
          >
            <span className="text-gray-600">{option.label}</span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default RadioField;
