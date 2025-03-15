import { useState } from "react";
import InputText from "../../components/InputText";
import axiosInstance from "../../config/axios.config";
import axios from "axios";
import Alert from "../../components/Alert";
import { Edit, Save } from "lucide-react";
import { AlertType, Users } from "../../Types";
import InputEmail from "../../components/InputEmail";

export default function CreateUser({
  user,
  setUsers,
}: {
  cid?: string;
  user?: Users;
  setUsers: (user: Users) => void;
}) {
  const [inputName, setInputName] = useState(user?.name ?? "");
  const [inputMail, setInputMail] = useState(user?.email ?? "");
  const [type, setType] = useState<AlertType>("info");
  const [message, setMessage] = useState("");
  const updateRole = async () => {
    try {
      const { data, status } = await axiosInstance.post("users/update", {
        name: inputName,
        email: inputMail,
        id: user?.cid,
      });
      if (status === 200) {
        const { user } = data;
        if (user) {
          setUsers(user);
          setInfo("Se edito el registro");
        } else {
          setError("No se realizaron cambios");
        }
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
      const { data, status } = await axiosInstance.post("users/store", {
        name: inputName,
        email: inputMail,
      });

      if (status === 200) {
        setInputName("");
        setInputMail("");
        const { user } = data;
        if (user) {
          setUsers(user);
          setInfo("Se agrego el registro");
        } else setError("Ocurrió un error al agregar");
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
    if (
      !inputName ||
      inputName.length < 3 ||
      !inputMail ||
      inputMail.length < 3
    )
      return setError(
        "Todos los campos son requerido, llene los campos de forma adecuada e intente de nuevo"
      );

    console.log();

    if (user && user.cid.trim() != "") updateRole();
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
        <InputText
          value={inputName}
          setValue={setInputName}
          label="Nombre del usuario"
        />
      </div>
      <div className="mb-3">
        <InputEmail
          value={inputMail}
          setValue={setInputMail}
          label="Correo electrónico"
        />
      </div>
      <button
        type="submit"
        className="flex items-center gap-2 px-2 py-2 bg-blue-700 text-white rounded-lg hover:bg-blue-900 transition"
      >
        {user ? <Edit size={16} /> : <Save size={16}></Save>}

        {user ? "Editar" : "Guardar"}
      </button>
    </form>
  );
}
