import { useState } from "react";
import InputText from "../../components/InputText";
import axiosInstance from "../../config/axios.config";
import axios from "axios";
import Alert from "../../components/Alert";
import { Edit, Save } from "lucide-react";
import { AlertType, role } from "../../Types";

export default function CreateRole({
  cid,
  rol = "",
  roles,
  setRoles,
}: {
  cid?: string;
  rol?: string;
  roles: Array<role>;
  setRoles: React.Dispatch<React.SetStateAction<Array<role>>>;
}) {
  const [inputRole, setInputRole] = useState(rol);
  const [type, setType] = useState<AlertType>("info");
  const [message, setMessage] = useState("");
  const updateRole = async () => {
    console.info("Iniciando edición del rol");
    try {
      const { data, status } = await axiosInstance.post("roles/update", {
        role: inputRole,
        id: cid,
      });
      if (status === 200) {
        const { role } = data;
        if (role) {
          setRoles((prevRole) =>
            prevRole.map((old) => (old.cid === cid ? role : old))
          );
        }
        setInfo("Se edito el registro");
      } else {
        setError(data.message);
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setError(error?.response?.data?.message || "Error al guardar");
      }
    }
  };

  const createRole = async () => {
    console.info("Iniciando creación del rol");
    try {
      const { data, status } = await axiosInstance.post("roles/store", {
        role: inputRole,
      });

      if (status === 200) {
        setInputRole("");
        const { role } = data;
        if (role) {
          setRoles([...roles, role]);
        }
        setInfo("Se agrego el registro");
      } else {
        setError(data.message);
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setError(error?.response?.data?.message || "Error al guardar");
      }
    }
  };
  const setError = (err: string) => {
    setMessage(err);
    setType("error");
  };
  const setInfo = (msg: string) => {
    setMessage(msg);
    setType("info");
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!inputRole || inputRole.length < 3)
      return setError("El campo rol debe tener al menos 3 caracteres");

    console.log();

    if (cid && cid.trim() != "") updateRole();
    else createRole();
  };
  return (
    <form method="post" onSubmit={handleSubmit}>
      {message && (
        <div className="my-3 flex-row">
          <Alert type={type} message={message} />
        </div>
      )}

      <div className="mb-3">
        <InputText value={inputRole} setValue={setInputRole} label="Role" />
      </div>
      <button
        type="submit"
        className="flex items-center gap-2 px-2 py-2 bg-blue-700 text-white rounded-lg hover:bg-blue-900 transition"
      >
        {cid ? <Edit size={16} /> : <Save size={16}></Save>}

        {cid ? "Editar" : "Guardar"}
      </button>
    </form>
  );
}
