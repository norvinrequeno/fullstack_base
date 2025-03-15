import React from "react";
import { RolesPage } from "../pages/roles/RolesPage";
import RolePermissionsPage from "../pages/roles/RolePermissionsPage";
import RoleUsersPage from "../pages/roles/RoleUsersPage";
import UsersPage from "../pages/users/UsersPage";

export interface menuItem {
  label: string;
  href: string;
  roles?: string[];
  permiso?: string[];
  element: React.ReactElement;
}
export const MenuLinks: menuItem[] = [
  {
    label: "Usuario",
    href: "/usuarios",
    roles: ["superAdmin"],
    element: <UsersPage />,
  },
  {
    label: "Roles",
    href: "/roles",
    roles: ["superAdmin"],
    element: <RolesPage />,
  },
];

const RoutesInit: menuItem[] = [
  {
    label: "Routes permisos",
    href: "/role/permisos/:id",
    element: <RolePermissionsPage />,
    roles: ["superAdmin"],
  },
  {
    label: "Routes usuarios",
    href: "/role/usuarios/:id",
    element: <RoleUsersPage />,
    roles: ["superAdmin"],
  },
];

export const RoutesConfig: menuItem[] = [...MenuLinks, ...RoutesInit];
