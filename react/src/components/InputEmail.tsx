import React, { useState, useEffect } from "react";

interface InputProps {
  label?: string;
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  placeholder?: string;
  className?: string;
}

export default function InputEmail({
  label,
  value,
  setValue,
  placeholder = "Escriba aquí",
  className = "",
}: InputProps) {
  const [isValid, setIsValid] = useState<boolean | null>(null);

  useEffect(() => {
    if (value === "") {
      setIsValid(null);
    } else {
      setIsValid(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value));
    }
  }, [value]);

  return (
    <div>
      {label && (
        <label
          htmlFor={label}
          className="block text-sm font-medium text-gray-700"
        >
          {label}
        </label>
      )}

      <input
        type="email"
        id={label ?? ""}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={placeholder}
        className={`mt-1 block w-full rounded-md shadow-sm p-3 border transition-colors duration-200 outline-none appearance-none ring-0 focus:ring-0 focus:outline-none ${
          isValid === null
            ? "border-gray-400 focus:border-blue-500"
            : isValid
            ? "border-green-500 focus:border-green-500"
            : "border-red-500 focus:border-red-500"
        } ${className}`}
      />
    </div>
  );
}
