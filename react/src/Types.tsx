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

export interface Users {
  id: number;
  name: string;
  email: string;
}
export interface UsersRole {
  role_id: number;
  model_id: number;
  users: Users;
}
export type AlertType = "success" | "error" | "warning" | "info";
