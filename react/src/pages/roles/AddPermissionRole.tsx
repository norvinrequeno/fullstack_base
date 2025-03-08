import { useState } from "react";
import { permiso, permisosRole } from "../../Types";
import axiosInstance from "../../config/axios.config";

export default function AddPermissionRole({
  role_id,
  perm,
  isAdd,
  setUpdate,
  value,
}: {
  role_id: string;
  perm: permiso;
  isAdd: boolean;
  value: Array<permisosRole>;
  setUpdate: React.Dispatch<React.SetStateAction<Array<permisosRole>>>;
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
          setUpdate([...value, data.permission_role]);
          setInRole(true);
        } else {
          //se elimina del state
          setUpdate((prev) => prev.filter((e) => e.permission_id !== perm.id));
          setInRole(false);
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <label
      className="flex gap-2 shadow-sm p-4 m-2 cursor-pointer bg-white hover:bg-blue-700 hover:text-white"
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
