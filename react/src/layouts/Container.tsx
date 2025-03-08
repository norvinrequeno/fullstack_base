import React from "react";
export default function Container({
  children,
  bg,
}: {
  children: React.ReactNode;
  bg?: string;
}) {
  return (
    <div className={`min-h-screen py-4 ${bg ?? "bg-stone-300"}`}>
      <div className="w-full max-w-7xl mx-auto sm:px-6 lg:px-8 bg-white shadow-lg rounded-2xl min-h-screen p-8">
        {children}
      </div>
    </div>
  );
}
