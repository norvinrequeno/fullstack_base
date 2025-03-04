import axiosInstance from "../../config/axios.config";
import Container from "../../layouts/Container";
import CreateRole from "./CreateRole";
import CardOptions from "../../components/CardOptions";
import Dropdown from "../../components/Dropdown";
import LinkDropdown from "../../components/LinkDropdown";
import { Pencil, Trash, ShieldCheck } from "lucide-react";
import ButtonDropdown from "../../components/ButtonDropdown";
import Alert from "../../components/Alert";
import { useEffect, useState } from "react";
interface role {
  cid: string;
  name: string;
}
export function RolesPage() {
  const [roles, setRoles] = useState(Array<role>);
  const [message, setMessage] = useState("");
  const [typeMessage, setTypeMessage] = useState("info");
  const rolesList = async () => {
    const { data } = await axiosInstance.get("roles");
    console.log(data.roles);

    setRoles(data.roles ?? []);
  };

  const addRole = (role: role) => {
    setRoles([...roles, role]);
  };
  const deleteRole = async (id: string) => {
    if (confirm("¿Estas seguro de borrar este registro?")) {
      try {
        const { data, status } = await axiosInstance.post("roles/delete", {
          id,
        });
        if (status == 200) {
          setMessage(data?.message ?? "");
          setRoles(roles.filter((role) => role.cid !== id));
        }
      } catch (error) {
        console.error(error);
        setTypeMessage("error");
        setMessage("Ocurrió un error al intentar realizar esta acción.");
      }
    } else return;
  };

  const editRole = async (id: string, rol: string) => {
    console.log(`Editando rol ${id} ${rol}`);
  };
  useEffect(() => {
    rolesList();
  }, []);
  return (
    <Container>
      <p className="text-3xl">Listado de Roles</p>
      {message && <Alert message={message} type={typeMessage} />}
      <div className="mb-4">
        <CreateRole addRoles={addRole} />
      </div>
      <div className="mb-4">
        {roles.map(({ name, cid }) => (
          <CardOptions key={cid}>
            <div className="w-1/24">
              <Dropdown>
                <LinkDropdown rol={["superAdmin"]} to={"/role/" + cid}>
                  <ShieldCheck size={16} />
                  Permisos
                </LinkDropdown>
                <ButtonDropdown
                  rol={["superAdmin"]}
                  onClickAction={() => editRole(cid, name)}
                >
                  <Pencil size={16} />
                  Editar
                </ButtonDropdown>
                <ButtonDropdown
                  onClickAction={() => deleteRole(cid)}
                  rol={["superAdmin"]}
                  className="text-red-800 focus:text-red-900"
                >
                  <Trash size={16} />
                  Eliminar
                </ButtonDropdown>
              </Dropdown>
            </div>
            <div className="w-23/24">
              <div className="text-xl">{name}</div>
            </div>
          </CardOptions>
        ))}
      </div>
    </Container>
  );
}
