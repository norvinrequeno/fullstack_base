import { useEffect, useState } from "react";
import axiosInstance from "../../config/axios.config";
import Container from "../../layouts/Container";
import CreateRole from "./CreateRole";

export function RolesPage() {
  const [roles, setRoles] = useState([]);
  const rolesList = async () => {
    const { data } = await axiosInstance.get("roles");
    console.log(data.roles);

    setRoles(data.roles ?? []);
  };
  useEffect(() => {
    rolesList();
  }, []);
  return (
    <Container>
      <p className="text-3xl">Listado de Roles</p>
      <div className="mb-4">
        <CreateRole />
      </div>
      <div className="mb-4">
        {roles.map(({ name, cid }) => (
          <li key={cid}>{name}</li>
        ))}
      </div>
    </Container>
  );
}
