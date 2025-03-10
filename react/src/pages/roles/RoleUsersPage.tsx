import { useCallback, useEffect, useMemo, useState } from "react";
import Container from "../../layouts/Container";
import { AlertType, role, Users, UsersRole } from "../../Types";
import axiosInstance from "../../config/axios.config";
import { useParams } from "react-router-dom";
import Spinner from "../../components/Spinner";
import Alert from "../../components/Alert";
import InputText from "../../components/InputText";
import AddUser from "./AddUser";
import DeleteUser from "./DeleteUser";

export default function RoleUsersPage() {
  const { id } = useParams<{ id: string }>();
  const [role, setRole] = useState<role>();
  const [usersRole, setUsersRole] = useState<Array<UsersRole>>([]);
  const [users, setUsers] = useState<Array<Users>>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [message, setMessage] = useState("");
  const [typeAlert, setTypeAlert] = useState<AlertType>("info");

  const searchUser = useMemo(
    () =>
      users?.filter((perm) =>
        perm.name.toLowerCase().includes(search.toLowerCase())
      ),
    [users, search]
  );

  const inRole = useCallback(
    (user_id: number) => usersRole.some((user) => user.model_id === user_id),
    [usersRole]
  );

  const addUsersRole = useCallback(
    (element: UsersRole) => setUsersRole([...usersRole, element]),
    [usersRole]
  );

  const deleteUser = useCallback(
    (id: number) =>
      setUsersRole(usersRole.filter((usr) => usr.model_id !== id)),
    [usersRole]
  );

  useEffect(() => {
    const getRole = async () => {
      try {
        setLoading(true);
        const { data, status } = await axiosInstance.post("roles/users/get", {
          id,
        });
        if (status && status == 200) {
          console.log(data.users_role);

          setRole(data.role);
          setUsersRole(data.users_role ?? []);
          setUsers(data.users ?? []);
        }
      } catch (error) {
        console.error(error);
        setTypeAlert("error");
        setMessage("Ocurrió un error al cargar el rol");
      } finally {
        setLoading(false);
      }
    };

    getRole();
  }, [id]);
  if (loading) return <Spinner />;
  return role ? (
    <Container bg="bg-teal-900">
      <div className="text-3xl mb-4">Configurar usuarios del rol</div>
      <div className="text-lg text-gray-700">{role.name}</div>
      {message && (
        <Alert message={message} type={typeAlert} setValue={setMessage} />
      )}
      <div className="flex gap-3 mt-3">
        <div className="w-8/12 p-4 border border-gray-400 rounded-lg min-h-100">
          <div className="mb-4">Buscar permiso</div>
          <div className="flex gap-2 items-center">
            <InputText
              value={search}
              setValue={setSearch}
              placeholder="Agregue el nombre del permiso para buscar o agregar"
            />
          </div>

          <div className="block mt-4">
            {searchUser &&
              searchUser.length > 0 &&
              searchUser.map((usr) => (
                <AddUser
                  role_id={id ?? ""}
                  usr={usr}
                  key={`${usr.id}-${inRole(usr.id)}`}
                  isAdd={inRole(usr.id)}
                  setUpdate={addUsersRole}
                  setDelete={deleteUser}
                />
              ))}
          </div>
        </div>
        <div className="w-4/12 p-4 border border-gray-400 rounded-lg">
          <div className="text-lg mb-4">Listado de permisos agregados</div>
          {usersRole && usersRole.length > 0 ? (
            usersRole.map((usr) => (
              <DeleteUser
                role_id={id ?? ""}
                element={usr}
                setDelete={deleteUser}
                key={`r_${usr.role_id}_p_${usr.model_id}`}
              />
            ))
          ) : (
            <Alert message="Aun no se han agregado permisos" />
          )}
        </div>
      </div>
    </Container>
  ) : (
    <Container>
      <Alert type="error" message="No se encontró el rol" />
    </Container>
  );
}
