import React from "react";
import useAuth from "../AuthProvider/useAuth";

export default function ButtonDropdown({
  onClickAction,
  children,
  label,
  className,
  permiso,
  rol,
}: {
  onClickAction: () => void;
  children?: React.ReactNode;
  label?: string;
  className?: string;
  permiso?: Array<string>;
  rol?: Array<string>;
}) {
  const { hasRole, hasPermission } = useAuth();
  return (
    ((!permiso && !rol) ||
      hasPermission(permiso ?? []) ||
      hasRole(rol ?? [])) && (
      <button
        onClick={onClickAction}
        className={`flex gap-2 items-center px-4 py-2 border-0 hover:bg-stone-200 w-full cursor-pointer ${className}`}
      >
        {label ?? children}
      </button>
    )
  );
}
