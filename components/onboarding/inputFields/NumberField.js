import React from "react";

const NumberField = ({ value, onChange, placeholder }) => {
  const handleInputChange = (e) => {
    const val = e.target.value;
    if (val === "") {
      onChange(undefined); // Pass undefined for empty input
    } else {
      const num = Number(val);
      if (!isNaN(num)) {
        onChange(num); // Pass the valid number
      } else {
        onChange(undefined); // Pass undefined for invalid number
      }
    }
  };

  return (
    <div>
      <input
        type="number"
        value={value !== undefined ? value : ""} // Display empty if undefined
        onChange={handleInputChange}
        required
        placeholder={placeholder}
        className="w-full px-4 py-2 border rounded-[12px] mt-1 block h-[55px] focus:outline-none focus:ring-2 focus:ring-primary"
      />
    </div>
  );
};

export default NumberField;
