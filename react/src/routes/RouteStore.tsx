import React from "react";
import { PermissionsPage } from "../pages/PermissionsPage";
import { RolesPage } from "../pages/roles/RolesPage";
import RolePermissionsPage from "../pages/roles/RolePermissionsPage";

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

const RoutesInit: menuItem[] = [
  {
    label: "Routes permisos",
    href: "/role/permisos/:id",
    element: <RolePermissionsPage />,
  },
];

export const RoutesConfig: menuItem[] = [...MenuLinks, ...RoutesInit];
