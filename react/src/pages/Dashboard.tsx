import useAuth from "../AuthProvider/useAuth";
import Container from "../layouts/Container";

export default function Dashboard() {
  const { user } = useAuth();
  return (
    <Container>
      <div className="text-xl">Dashboard</div>
      <div className="text-gray-600">Hola, {user?.name}</div>
    </Container>
  );
}
