import ButtonHome from "../../components/ButtonHome";

export default function Unathorized() {
  return (
    <div className="flex h-screen items-center justify-center bg-gray-200">
      <div className="text-center p-6 bg-white rounded-lg shadow-lg">
        <h1 className="text-4xl font-bold text-gray-600">401</h1>
        <h2 className="text-xl font-semibold text-gray-700 mt-2">
          Acceso Denegado
        </h2>
        <p className="text-gray-600 mt-2">
          No tienes permisos para acceder a esta página.
        </p>
        <ButtonHome />
      </div>
    </div>
  );
}
