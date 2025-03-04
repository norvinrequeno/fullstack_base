import { Link } from "react-router-dom";
import useAuth from "../AuthProvider/useAuth";
import React from "react";

export default function LinkDropdown({
  children,
  label,
  to,
  permiso,
  rol,
  className,
}: {
  children?: React.ReactNode;
  label?: string;
  to: string;
  permiso?: Array<string>;
  rol?: Array<string>;
  className?: string;
}) {
  const { hasRole, hasPermission } = useAuth();
  return (
    (!permiso && !rol) ||
    hasPermission(permiso ?? []) ||
    (hasRole(rol ?? []) && (
      <Link
        to={to}
        className={`flex gap-2 px-4 py-2 hover:bg-gray-100 ${className}`}
      >
        {label ?? children}
      </Link>
    ))
  );
}
