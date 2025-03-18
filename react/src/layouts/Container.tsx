import React from "react";
export default function Container({
  children,
  bg,
  w = "w-full max-w-7xl",
  h = "min-h-screen",
}: {
  children: React.ReactNode;
  bg?: string;
  w?: string;
  h?: string;
}) {
  return (
    <div className={`min-h-screen py-4 ${bg ?? "bg-stone-300"}`}>
      <div
        className={`${w} ${h} mx-auto sm:px-6 lg:px-8 bg-white shadow-lg rounded-2xl  p-8`}
      >
        {children}
      </div>
    </div>
  );
}
