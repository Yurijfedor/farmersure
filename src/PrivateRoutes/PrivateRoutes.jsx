import { Navigate, Outlet } from "react-router-dom";

import { useAuth } from "../hooks/useAuth";

const PrivateRoutes = () => {
  const { isAuth, loading, isAuthenticating } = useAuth();

  if (loading || isAuthenticating) {
    return <div>Loading...</div>; // Відображаємо індикатор завантаження
  }

  return isAuth ? <Outlet /> : <Navigate to={"/login"} />;
};

export default PrivateRoutes;
