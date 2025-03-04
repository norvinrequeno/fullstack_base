import { useState } from "react";
import InputText from "../../components/InputText";
import axiosInstance from "../../config/axios.config";
import axios from "axios";
import Alert from "../../components/Alert";
import { Save } from "lucide-react";

export default function CreateRole({
  addRoles,
}: {
  addRoles: (role: { cid: string; name: string }) => void;
}) {
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
        const { role } = data;
        if (role) addRoles(role);
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
    <form
      method="post"
      onSubmit={handleSubmit}
      className="my-4 p-6 border-2 border-gray-300 rounded-md flex gap-4"
    >
      {error && (
        <div className="my-3 w-6/6">
          <Alert type="error" message={error} />
        </div>
      )}

      <div className="w-5/6">
        <InputText value={role} setValue={setRole} label="Role" />
      </div>
      <div className="w-1/6 content-end">
        <button
          type="submit"
          className="flex gap-3 px-6 py-2 bg-blue-700 text-white rounded-lg hover:bg-blue-900 transition"
        >
          <Save size={22}></Save>
          <span>Guardar</span>
        </button>
      </div>
    </form>
  );
}
