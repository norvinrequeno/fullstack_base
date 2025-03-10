import { useState } from "react";
import { Users, UsersRole } from "../../Types";
import axiosInstance from "../../config/axios.config";

export default function AddUser({
  role_id,
  usr,
  isAdd,
  setUpdate,
  setDelete,
}: {
  role_id: string;
  usr: Users;
  isAdd: boolean;
  setUpdate: (element: UsersRole) => void;
  setDelete: (id: number) => void;
}) {
  const [inRole, setInRole] = useState(isAdd);

  //Se ejecutara cada que el usuario haga cambios en el checkbox
  const handleChange = async () => {
    try {
      const { data, status } = await axiosInstance.post("roles/users/change", {
        role: role_id,
        user: usr.id,
      });
      if (status && status == 200) {
        if (data.user_role && data.action == "give") {
          //se agrega al state
          console.log("give");
          setUpdate(data.user_role);
          setInRole(true);
        } else {
          //se elimina del state
          console.log("remove");
          setDelete(usr.id);
          setInRole(false);
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <label
      className="flex gap-2 border border-gray-200 p-4 mb-2 rounded-md cursor-pointer bg-white hover:bg-blue-700 hover:text-white hover:border-blue-900"
      htmlFor={usr.name + usr.id}
    >
      <input
        type="checkbox"
        id={usr.name + usr.id}
        checked={inRole}
        onChange={handleChange}
      />
      {usr.name} <i>({usr.email})</i>
    </label>
  );
}
