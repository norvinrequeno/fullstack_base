import { EllipsisVertical } from "lucide-react";
import React, { useState } from "react";

export default function Dropdown({ children }: { children: React.ReactNode }) {
  const [menu, setMenu] = useState(false);
  return (
    <>
      <EllipsisVertical size={18} onClick={() => setMenu(!menu)} />
      {menu && (
        <div
          className="absolute mt-2 w-48 bg-white text-gray-900 rounded-md shadow-xl p-2 z-50"
          onClick={() => setMenu(false)}
        >
          {children}
        </div>
      )}
    </>
  );
}
