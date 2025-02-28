import React from "react";
import { PermissionsPage } from "../pages/PermissionsPage";
import { RolesPage } from "../pages/roles/RolesPage";

export interface menuItem {
  label: string;
  href: string;
  roles?: string[];
  permiso?: string[];
  element: React.ReactElement;
}
export const MenuLinks: menuItem[] = [
  { label: "Permisos", href: "/permisos", element: <PermissionsPage /> },
  {
    label: "Roles",
    href: "/roles",

    element: <RolesPage />,
  },
];
