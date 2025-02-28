import React from "react";
interface inputProps {
  label?: string;
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  placeholder?: string;
  className?: string;
}

export default function InputText({
  label,
  value,
  setValue,
  placeholder = "Escriba aquí",
  className = "",
}: inputProps) {
  return (
    <div className="mb-4">
      {label && (
        <label
          htmlFor={label}
          className="block text-sm font-medium text-gray-700"
        >
          {label}
        </label>
      )}

      <input
        type="text"
        id={label ?? ""}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={placeholder}
        className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 p-3 ${className}`}
      />
    </div>
  );
}
