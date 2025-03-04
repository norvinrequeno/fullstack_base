import React from "react";

export default function CardOptions({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex gap-4 py-6 px-4 my-2 border border-gray-400 rounded-lg">
      {children}
    </div>
  );
}
