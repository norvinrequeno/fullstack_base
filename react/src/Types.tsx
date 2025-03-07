export type User = {
  name: string;
  roles: string[];
  permissions: string[];
};

export interface role {
  cid: string;
  name: string;
}

export interface permiso {
  id: number;
  name: string;
}
export interface permisosRole {
  role_id: number;
  permission_id: number;
  permissions: permiso;
}
export type AlertType = "success" | "error" | "warning" | "info";
