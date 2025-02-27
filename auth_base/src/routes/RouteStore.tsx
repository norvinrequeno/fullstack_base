import React from "react";
import { PermissionsPage } from "../pages/PermissionsPage";
import { RolesPage } from "../pages/RolesPage";

export interface menuItem{
  label:string,
  href:string,
  roles?: string[],
  permiso?: string[],
  element: React.ReactElement,
}
export const MenuLinks:menuItem[] = [
    { label: "Permisos", href: "/permisos", permiso:['permissionsAdmin'] , element: <PermissionsPage/> },
    { label: "Roles", href: "/roles", roles:['admin', 'superAdmin'], element: <RolesPage/>}
];
