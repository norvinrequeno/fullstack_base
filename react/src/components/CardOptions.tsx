import React from "react";

export default function CardOptions({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`flex gap-4 py-6 px-4 my-2 border border-gray-400 rounded-lg ${className}`}
    >
      {children}
    </div>
  );
}
