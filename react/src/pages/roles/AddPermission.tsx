import { useState } from "react";
import { permiso, permisosRole } from "../../Types";
import axiosInstance from "../../config/axios.config";

export default function AddPermission({
  role_id,
  perm,
  isAdd,
  setUpdate,
  setDelete,
}: {
  role_id: string;
  perm: permiso;
  isAdd: boolean;
  setUpdate: (element: permisosRole) => void;
  setDelete: (id: number) => void;
}) {
  const [inRole, setInRole] = useState(isAdd);

  //Se ejecutara cada que el usuario haga cambios en el checkbox
  const handleChange = async () => {
    try {
      const { data, status } = await axiosInstance.post(
        "roles/permissions/change",
        { role: role_id, permission: perm.id }
      );
      if (status && status == 200) {
        if (data.permission_role && data.action == "give") {
          //se agrega al state
          setUpdate(data.permission_role);
          setInRole(true);
        } else {
          //se elimina del state
          setDelete(perm.id);
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
      htmlFor={perm.name + perm.id}
    >
      <input
        type="checkbox"
        id={perm.name + perm.id}
        checked={inRole}
        onChange={handleChange}
      />
      {perm.name}
    </label>
  );
}
