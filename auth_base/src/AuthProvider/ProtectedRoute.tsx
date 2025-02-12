import { JSX } from "react";
import useAuth from "./useAuth";
import { Navigate } from "react-router-dom";

type ProtectedRoute = {
  children: JSX.Element;
  allowedRoles?: string[];
  allowedPermissions?: string[];
};

export default function ProtectedRoute({
  children,
  allowedRoles = [],
  allowedPermissions = [],
}: ProtectedRoute) {
  const { user, hasRole, hasPermission, loading } = useAuth();

  if (loading) return;

  if (!user && user === null) return <Navigate to="/login" replace />;

  if (allowedRoles.length > 0 && !hasRole(allowedRoles))
    return <Navigate to="/unauthorized" replace />;

  if (allowedPermissions.length > 0 && !hasPermission(allowedPermissions))
    return <Navigate to="/unauthorized" replace />;

  return children;
}
