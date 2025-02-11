import { JSX } from "react";
import useAuth from "./useAuth";
import { Navigate } from "react-router-dom";

type ProtectedRoute = {
  children: JSX.Element;
  allowedRoles?: string[];
  allowedPermissions: string[];
};

export default function ProtectedRoute({
  children,
  allowedRoles = [],
  allowedPermissions = [],
}: ProtectedRoute) {
  const { user, hasRole, hasPermission, loading } = useAuth();

  if (loading) {
    console.log("Cargando... [protección de rutas]");

    return;
  }
  console.log(user);

  if (!user && user === null) {
    console.log("No tiene un usuario");
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles.length > 0 && !hasRole(allowedRoles)) {
    console.log("No tiene asignado el rol requerido");
    return <Navigate to="/unauthorized" replace />;
  }
  if (allowedPermissions.length > 0 && !hasPermission(allowedPermissions)) {
    console.log("No tiene asignado el permiso requerido");
    return <Navigate to="/unauthorized" replace />;
  }
  return children;
}
