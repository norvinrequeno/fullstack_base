import React from "react";
export default function Container({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-100 py-4">
      <div className="w-full max-w-7xl mx-auto sm:px-6 lg:px-8 bg-white shadow-lg rounded-2xl min-h-screen p-8">
        {children}
      </div>
    </div>
  );
}
