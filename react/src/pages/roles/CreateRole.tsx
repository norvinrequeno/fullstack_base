import { useState } from "react";
import InputText from "../../components/InputText";
import axiosInstance from "../../config/axios.config";
import axios from "axios";
import Alert from "../../components/Alert";

export default function CreateRole() {
  const [role, setRole] = useState("");
  const [error, setError] = useState("");
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { data, status } = await axiosInstance.post("roles/store", {
        role,
      });

      if (status === 200) {
        setRole("");
        console.info(data);
      } else {
        setError(data.message);
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setError(error?.response?.data?.message || "Error al guardar");
      }
    }
  };
  return (
    <form method="post" onSubmit={handleSubmit}>
      {error && (
        <div className="my-3">
          <Alert type="error" message={error} />
        </div>
      )}
      <InputText value={role} setValue={setRole} label="Role" />
      <div className="mb-4">
        <button
          type="submit"
          className="mt-4 inline-block px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          Guardar
        </button>
      </div>
    </form>
  );
}
