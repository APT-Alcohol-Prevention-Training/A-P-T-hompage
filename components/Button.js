// components/Button.tsx
"use client";

import React, { ButtonHTMLAttributes } from "react";

const Button = ({
  children,
  className = "",
  type = "button",
  loading = false,
  variant = "primary",
  ...props
}) => {
  const variantClasses =
    variant === "primary"
      ? "bg-gradient-to-r from-[#28AAE1] via-[#0364B3] to-[#012B4D] hover:bg-gray-800 text-white"
      : "bg-white hover:bg-gray-100 text-black border border-gray-300";

  return (
    <button
      type={type}
      className={`px-6 py-2 w-full rounded-full h-[48px] hover:shadow-md hover:scale-105 transition flex items-center justify-center ${variantClasses} ${className}`}
      disabled={loading || props.disabled}
      {...props}
    >
      {loading ? (
        <svg
          className="animate-spin h-5 w-5 mr-3 text-white"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8v8H4z"
          ></path>
        </svg>
      ) : null}
      {children}
    </button>
  );
};

export default Button;
