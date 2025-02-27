import { Route } from "react-router-dom";
import ProtectedRoute from "../AuthProvider/ProtectedRoute";
import { MenuLinks } from "./RouteStore";

export default function RoutesApp() {
  return (
    <>
      {MenuLinks.map((link, index) => (
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
