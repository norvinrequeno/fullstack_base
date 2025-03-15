import { useEffect, useState } from "react";
import { AlertType, Users } from "../../Types";
import Container from "../../layouts/Container";
import Alert from "../../components/Alert";
import { Pencil, Plus, ShieldUser } from "lucide-react";
import CardOptions from "../../components/CardOptions";
import Dropdown from "../../components/Dropdown";
import ButtonDropdown from "../../components/ButtonDropdown";
import Modal from "../../components/Modal";
import CreateUser from "./CreateUser";
import axiosInstance from "../../config/axios.config";

export default function UsersPage() {
  const [users, setUsers] = useState<Array<Users>>([]);
  const [search, setSearch] = useState("");
  const [message, setMessage] = useState("");
  const [typeMessage, setTypeMessage] = useState<AlertType>("info");
  const [createModal, setCreateModal] = useState(false);

  useEffect(() => {
    getUsers();
  }, []);
  const getUsers = async () => {
    try {
      const { data, status } = await axiosInstance.get("users");
      if (status && status == 200 && data.users) {
        setUsers(data.users ?? []);
      }
    } catch (e) {
      console.error(e);
      setMessage("Error al cargar los registros");
      setTypeMessage("error");
    }
  };
  const searchList = users.filter((user) =>
    user.name.toLowerCase().includes(search.toLowerCase())
  );

  const changeUsers = (user: Users) => {
    setUsers((prevUser) => {
      //Buscara si existe el hash de cid
      const index = prevUser.findIndex((usr) => usr.cid === user.cid);
      if (index !== -1) {
        //En el caso que exista creo una copia
        const updatePrev = [...prevUser];
        //actualizo la copia, esto funcionara por las propiedades de useState
        updatePrev[index] = user;
        return updatePrev;
      }
      //Cuando no exista solamente lo agregara al final de la lista
      return [...prevUser, user];
    });
  };

  const editHandle = (user: Users) => {
    console.log(user);
  };
  const resetPassword = async (user: Users) => {
    try {
      const { data, status } = await axiosInstance.post(
        "users/reset/password",
        {
          id: user.cid,
        }
      );

      if (status && status == 200 && data) {
        setMessage(data.message);
        setTypeMessage("success");
      } else throw new Error("Error");
    } catch (e) {
      console.error(e);
      setMessage("Error al intentar cambiar la contraseña");
      setTypeMessage("error");
    }
  };

  return (
    <Container>
      <div className="text-3xl mb-4">Listado de usuarios</div>
      {message && <Alert message={message} type={typeMessage} />}
      <div className="flex gap-3 mb-6">
        <button
          onClick={() => setCreateModal(true)}
          className="flex w-[130] items-center gap-2 content-center border-0 bg-zinc-100 p-3 rounded hover:bg-zinc-200"
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
        {searchList.length > 0
          ? searchList.map((user) => (
              <CardOptions key={user.cid}>
                <div className="w-1/24">
                  <Dropdown>
                    <ButtonDropdown
                      rol={["superAdmin"]}
                      onClickAction={() => editHandle(user)}
                    >
                      <Pencil size={16} />
                      Editar
                    </ButtonDropdown>
                    <ButtonDropdown
                      rol={["superAdmin"]}
                      onClickAction={() => resetPassword(user)}
                    >
                      <ShieldUser size={16} />
                      Cambiar contraseña
                    </ButtonDropdown>
                  </Dropdown>
                </div>
                <div className="w-23/24">
                  <div className="text-xl">{user.name}</div>
                  <i className="text-sm me-2">{user.email}</i>
                </div>
              </CardOptions>
            ))
          : "No se encontraron registros"}
      </div>

      <Modal
        title="Crear un nuevo usuario"
        isOpen={createModal}
        onClose={() => setCreateModal(false)}
      >
        <>
          <CreateUser setUsers={changeUsers} />
        </>
      </Modal>
    </Container>
  );
}
