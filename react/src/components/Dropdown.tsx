import { EllipsisVertical } from "lucide-react";
import React, { useState } from "react";

export default function Dropdown({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const [menu, setMenu] = useState(false);
  return (
    <>
      <EllipsisVertical
        size={18}
        onClick={() => setMenu(!menu)}
        className="cursor-pointer"
      />
      {menu && (
        <div
          className={`absolute mt-2 w-60 bg-stone-100 text-gray-900 rounded-md shadow-2xl p-2 z-50 ${className}`}
          onClick={() => setMenu(false)}
        >
          {children}
        </div>
      )}
    </>
  );
}
