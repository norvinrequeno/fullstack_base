import { Route } from "react-router-dom";
import ProtectedRoute from "../AuthProvider/ProtectedRoute";
import { RoutesConfig } from "./RouteStore";

export default function RoutesApp() {
  return (
    <>
      {RoutesConfig.map((link, index) => (
        <Route
          key={index}
          path={link.href}
          element={
            <ProtectedRoute
              allowedPermissions={link.permiso ?? []}
              allowedRoles={link.roles ?? []}
            >
              {link.element}
            </ProtectedRoute>
          }
        />
      ))}
    </>
  );
}
