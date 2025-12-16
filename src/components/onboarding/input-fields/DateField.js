import React from "react";

const DateField = ({ value, onChange, placeholder }) => {
  return (
    <div>
      <input
        type="date"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required
        placeholder={placeholder}
        className="w-full px-4 py-2 border rounded-[12px] mt-1 block h-[55px] focus:outline-none focus:ring-2 focus:ring-primary"
      />
    </div>
  );
};

export default DateField;
