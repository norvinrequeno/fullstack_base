export type User = {
  name: string;
  roles: string[];
  permissions: string[];
};

export interface role {
  cid: string;
  name: string;
}
export type AlertType = "success" | "error" | "warning" | "info";
