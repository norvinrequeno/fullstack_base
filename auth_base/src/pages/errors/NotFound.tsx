import ButtonHome from "../../components/ButtonHome";

export default function NotFound() {
  return (
    <div className="flex h-screen items-center justify-center bg-gray-100">
      <div className="text-center p-6 bg-white rounded-lg shadow-lg">
        <h1 className="text-4xl font-bold text-gray-800">404</h1>
        <h2 className="text-xl font-semibold text-gray-700 mt-2">
          Página no encontrada
        </h2>
        <p className="text-gray-600 mt-2">
          La página que buscas no existe o fue movida.
        </p>
        <ButtonHome />
      </div>
    </div>
  );
}
