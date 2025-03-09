import { Trash } from "lucide-react";
import { permisosRole } from "../../Types";
import axiosInstance from "../../config/axios.config";

export default function DeletePermission({
  role_id,
  element,
  setDelete,
}: {
  role_id: string;
  element: permisosRole;
  setDelete: (id: number) => void;
}) {
  const handleDelete = async () => {
    try {
      const { status } = await axiosInstance.post("roles/permissions/change", {
        role: role_id,
        permission: element.permission_id,
      });
      if (status && status == 200) {
        setDelete(element.permission_id);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="w-6/6 element-center p-4 border border-gray-300 rounded-lg mb-2">
      <Trash
        className="float-end hover:text-red-900 cursor-pointer"
        size={16}
        onClick={handleDelete}
      />
      {element.permissions.name}
    </div>
  );
}
