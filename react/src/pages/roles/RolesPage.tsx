import axiosInstance from "../../config/axios.config";
import Container from "../../layouts/Container";
import CreateRole from "./CreateRole";
import CardOptions from "../../components/CardOptions";
import Dropdown from "../../components/Dropdown";
import LinkDropdown from "../../components/LinkDropdown";
import { Pencil, Trash, ShieldCheck, Plus, User } from "lucide-react";
import ButtonDropdown from "../../components/ButtonDropdown";
import Alert from "../../components/Alert";
import { useEffect, useState } from "react";
import { AlertType, role } from "../../Types";
import Modal from "../../components/Modal";

export function RolesPage() {
  const [roles, setRoles] = useState(Array<role>);
  const [message, setMessage] = useState("");
  const [search, setSearch] = useState("");
  const [createModal, setCreateModal] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [cid, setCid] = useState("");
  const [role, setRole] = useState("");

  const [typeMessage, setTypeMessage] = useState<AlertType>("info");
  const rolesList = async () => {
    const { data } = await axiosInstance.get("roles");
    setRoles(data.roles ?? []);
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
    setShowModal(true);
    setCid(id);
    setRole(rol);
  };

  const searchRole = roles.filter((role) =>
    role.name.toLowerCase().includes(search.toLowerCase())
  );
  useEffect(() => {
    rolesList();
  }, []);
  return (
    <Container>
      <div className="text-3xl mb-4">Listado de Roles</div>
      {message && <Alert message={message} type={typeMessage} />}
      <div className="flex gap-3 mb-6">
        <button
          onClick={() => setCreateModal(true)}
          className="flex w-1/6 items-center gap-2 content-center border-0 bg-zinc-100 px-2 py-2 rounded hover:bg-zinc-200"
        >
          <Plus size={18} />
          Agregar
        </button>
        <input
          className="mt-1 block w-full rounded-md border-gray-700 shadow-sm focus:ring-blue-500 focus:border-blue-500 p-3"
          type="text"
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Escriba aquí para buscar"
        />
      </div>
      <div className="mb-4">
        {searchRole.length > 0
          ? searchRole.map(({ name, cid }) => (
              <CardOptions key={cid}>
                <div className="w-1/24">
                  <Dropdown>
                    <LinkDropdown
                      rol={["superAdmin"]}
                      to={"/role/permisos/" + cid}
                      className="flex gap-2 items-center"
                    >
                      <ShieldCheck size={16} />
                      Permisos
                    </LinkDropdown>
                    <LinkDropdown
                      rol={["superAdmin"]}
                      to={"/role/usuarios/" + cid}
                      className="flex gap-2 items-center"
                    >
                      <User size={16} />
                      Usuarios
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
            ))
          : "No se encontraron registros"}
      </div>
      <Modal
        title={`Editar ${role}`}
        isOpen={showModal}
        onClose={() => setShowModal(false)}
      >
        <>
          <CreateRole roles={roles} setRoles={setRoles} cid={cid} rol={role} />
        </>
      </Modal>
      <Modal
        title="Crear un nuevo rol"
        isOpen={createModal}
        onClose={() => setCreateModal(false)}
      >
        <>
          <CreateRole roles={roles} setRoles={setRoles} />
        </>
      </Modal>
    </Container>
  );
}
