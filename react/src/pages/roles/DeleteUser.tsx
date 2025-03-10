import { Trash } from "lucide-react";
import { UsersRole } from "../../Types";
import axiosInstance from "../../config/axios.config";

export default function DeleteUser({
  role_id,
  element,
  setDelete,
}: {
  role_id: string;
  element: UsersRole;
  setDelete: (id: number) => void;
}) {
  console.log(element);

  const handleDelete = async () => {
    try {
      const { status } = await axiosInstance.post("roles/users/change", {
        role: role_id,
        user: element.model_id,
      });
      if (status && status == 200) {
        setDelete(element.model_id);
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
      {element.users.name}
      <i className="ms-2">
        <small>({element.users.email})</small>
      </i>
    </div>
  );
}
