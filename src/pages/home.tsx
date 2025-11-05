import { Navigate } from "react-router";

import { Button } from "@/components/ui/button";
import { useAuthContext } from "@/contexts/auth";

function HomePage() {
  const { user, isInitializing, signOut } = useAuthContext();
  if (isInitializing) return null;
  if (!user) {
    return <Navigate to={`/login`} />;
  }

  return (
    <>
      <h1>Olá {user.first_name}</h1>
      <p>Welcome to the Home page</p>
      <Button onClick={signOut}>Sair</Button>
    </>
  );
}

export default HomePage;
