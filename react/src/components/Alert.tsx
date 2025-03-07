import { AlertType } from "../Types";
import { X } from "lucide-react";

export default function Alert({
  type = "info",
  message,
  setValue,
}: {
  type?: AlertType;
  message: string;
  setValue?: React.Dispatch<React.SetStateAction<string>>;
}) {
  const alertStyles = {
    success: "bg-green-100 border-green-500 text-green-700",
    error: "bg-red-100 border-red-500 text-red-700",
    warning: "bg-yellow-100 border-yellow-500 text-yellow-700",
    info: "bg-blue-100 border-blue-500 text-blue-700",
  };

  return (
    <div
      className={`border-l-4 p-4 rounded-md ${alertStyles[type]} shadow-md`}
      role="alert"
    >
      {setValue && (
        <X size={18} className="float-end" onClick={() => setValue("")} />
      )}
      <p className="text-sm font-medium">{message}</p>
    </div>
  );
}
