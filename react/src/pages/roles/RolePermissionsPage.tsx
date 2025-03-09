import { useCallback, useEffect, useMemo, useState } from "react";
import Container from "../../layouts/Container";
import { AlertType, permiso, permisosRole, role } from "../../Types";
import axiosInstance from "../../config/axios.config";
import { useParams } from "react-router-dom";
import Spinner from "../../components/Spinner";
import Alert from "../../components/Alert";
import InputText from "../../components/InputText";
import AddPermissionRole from "./AddPermission";
import DeletePermission from "./DeletePermission";

export default function RolePermissionsPage() {
  const { id } = useParams<{ id: string }>();
  const [role, setRole] = useState<role>();
  const [permissionsRole, setPermissionsRole] = useState<Array<permisosRole>>(
    []
  );
  const [permissions, setPermissions] = useState<Array<permiso>>([]);
  const [loading, setLoading] = useState(true);
  const [permiso, setPermiso] = useState("");
  const [message, setMessage] = useState("");
  const [typeAlert, setTypeAlert] = useState<AlertType>("info");

  const searchPermission = useMemo(
    () =>
      permissions?.filter((perm) =>
        perm.name.toLowerCase().includes(permiso.toLowerCase())
      ),
    [permissions, permiso]
  );

  const canAdd = () =>
    searchPermission?.length === 0 && permiso.trim().length > 3;
  const inRole = useCallback(
    (id: number) => permissionsRole.some((perm) => perm.permission_id === id),
    [permissionsRole]
  );

  const createPermission = async () => {
    setMessage("");
    setTypeAlert("info");
    try {
      const { data, status } = await axiosInstance.post("permissions/store", {
        name: permiso,
      });
      if (status && data && status == 200 && data.permission != null) {
        setPermissions([...permissions, data.permission]);
        console.log(data.permission);

        setMessage("Se creo el permiso");
      } else {
        setMessage("Ocurrió un error al crear el permiso");
        setTypeAlert("error");
      }
    } catch (error) {
      console.error(error);
      setMessage("Ocurrió un error al crear el permiso [internal error]");
      setTypeAlert("error");
    }
  };

  const addPermission = useCallback(
    (element: permisosRole) =>
      setPermissionsRole([...permissionsRole, element]),
    [permissionsRole]
  );

  const deletePermission = useCallback(
    (id: number) =>
      setPermissionsRole(
        permissionsRole.filter((perm) => perm.permission_id !== id)
      ),
    [permissionsRole]
  );

  useEffect(() => {
    const getRole = async () => {
      try {
        setLoading(true);
        const { data, status } = await axiosInstance.post("roles/get", { id });

        if (status && status == 200) {
          setRole(data.role);
          setPermissionsRole(data.permissions_role ?? []);
          setPermissions(data.permissions ?? []);
        }
      } catch (error) {
        console.error(error);
        setMessage("Ocurrió un error al cargar el rol");
      } finally {
        setLoading(false);
      }
    };

    getRole();
  }, [id]);
  if (loading) return <Spinner />;
  return role ? (
    <Container>
      <div className="text-3xl mb-4">Configurar permisos del rol</div>
      <div className="text-lg text-gray-700">{role.name}</div>
      {message && (
        <Alert message={message} type={typeAlert} setValue={setMessage} />
      )}
      <div className="flex gap-3 mt-3">
        <div className="w-8/12 p-4 border border-gray-400 rounded-lg min-h-100">
          <div className="mb-4">Buscar permiso</div>
          <div className="flex gap-2 items-center">
            <div className="w-10/12">
              <InputText
                value={permiso}
                setValue={setPermiso}
                placeholder="Agregue el nombre del permiso para buscar o agregar"
              />
            </div>
            <div className="w-2/12">
              <button
                className={`px-4 py-2 rounded ${
                  canAdd()
                    ? "bg-blue-600 text-white hover:bg-blue-700"
                    : "bg-gray-200"
                }`}
                disabled={!canAdd()}
                title="Agregar el permiso cuando este no exista"
                onClick={createPermission}
              >
                Agregar
              </button>
            </div>
          </div>

          <div className="block mt-4">
            {searchPermission &&
              searchPermission.length > 0 &&
              searchPermission.map((perm) => (
                <AddPermissionRole
                  role_id={id ?? ""}
                  perm={perm}
                  key={`${perm.id}-${inRole(perm.id)}`}
                  isAdd={inRole(perm.id)}
                  setUpdate={addPermission}
                  setDelete={deletePermission}
                />
              ))}
          </div>
        </div>
        <div className="w-4/12 p-4 border border-gray-400 rounded-lg">
          <div className="text-lg mb-4">Listado de permisos agregados</div>
          {permissionsRole && permissionsRole.length > 0 ? (
            permissionsRole.map((permission) => (
              <DeletePermission
                role_id={id ?? ""}
                element={permission}
                setDelete={deletePermission}
                key={`r_${permission.role_id}_p_${permission.permission_id}`}
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
