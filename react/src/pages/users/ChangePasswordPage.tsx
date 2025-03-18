import { useState } from "react";
import { AlertType } from "../../Types";
import Container from "../../layouts/Container";
import Alert from "../../components/Alert";
import axiosInstance from "../../config/axios.config";
import InputText from "../../components/InputText";
import { Eye, EyeClosed, UserPen } from "lucide-react";
import axios from "axios";
import useAuth from "../../AuthProvider/useAuth";

export default function ChangePasswordPage() {
  const { logout } = useAuth();
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [typeMessage, setTypeMessage] = useState<AlertType>("info");
  const [showPass, setShowPass] = useState(false);

  async function handleChangePassword(e: React.FormEvent) {
    e.preventDefault();
    try {
      if (!password || password.trim().length < 8)
        throw new Error(
          "Debe llenar el campo Contraseña actual, debe contener al menos 8 caracteres."
        );

      if (!newPassword || newPassword.trim().length < 8)
        throw new Error(
          "Debe llenar el campo Nueva contraseña, debe contener al menos 8 caracteres."
        );

      if (password === newPassword)
        throw new Error("La contraseña actual no debe ser igual a la nueva.");

      if (!confirmPassword || confirmPassword.trim().length < 8)
        throw new Error(
          "Debe llenar el campo Confirmar contraseña nueva, debe contener al menos 8 caracteres."
        );

      if (confirmPassword !== newPassword)
        throw new Error("No coincide la confirmación de la contraseña");

      const { status, data } = await axiosInstance.post("users/password", {
        password: password,
        new: newPassword,
        confirm: confirmPassword,
      });
      if (status === 200) {
        setTypeMessage("info");
        setMessage(data.message);
        setTimeout(() => logout(), 2000);
      } else {
        setTypeMessage("error");
        setMessage(data.message);
      }
    } catch (error) {
      console.error(error);
      let errorMessage = "Ocurrió un error";

      // Manejo de errores de Axios
      if (axios.isAxiosError(error)) {
        errorMessage =
          error.response?.data?.message ||
          "Error en la conexión con el servidor";
      }
      // Manejo de errores personalizados
      else if (error instanceof Error) {
        errorMessage = error.message;
      }
      setTypeMessage("error");
      setMessage(errorMessage);
    }
  }
  function getTypeInput(): string {
    return showPass ? "text" : "password";
  }
  return (
    <Container w="w-full max-w-md" h="min-h-auto" bg="bg-cyan-100">
      <div className="text-3xl mb-4">Cambiar contraseña</div>
      {message && <Alert message={message} type={typeMessage} />}
      <form onSubmit={handleChangePassword} method="post">
        <div className="mb-4">
          <InputText
            type={getTypeInput()}
            value={password}
            setValue={setPassword}
            label="Contraseña actual"
          />
        </div>
        <div className="mb-4">
          <InputText
            type={getTypeInput()}
            value={newPassword}
            setValue={setNewPassword}
            label="Nueva contraseña"
          />
        </div>
        <div className="mb-4">
          <InputText
            type={getTypeInput()}
            value={confirmPassword}
            setValue={setConfirmPassword}
            label="Confirmar contraseña"
          />
        </div>
        <div className="mb-4 flex gap-3">
          <button
            type="submit"
            className="flex items-center gap-2 px-2 py-2 bg-blue-700 text-white rounded-lg hover:bg-blue-900 transition"
          >
            <UserPen size={16} />
            Cambiar contraseña
          </button>
          <button
            type="button"
            onClick={() => setShowPass(!showPass)}
            className="flex items-center gap-2 px-2 py-2 bg-stone-100 text-gray-800 rounded-lg hover:bg-stone-200 transition"
          >
            {showPass ? <EyeClosed size={16} /> : <Eye size={16} />}
            {showPass ? "Ocultar" : "Mostrar"}
          </button>
        </div>
      </form>
    </Container>
  );
}
