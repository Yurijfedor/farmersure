import { Navigate, Outlet } from "react-router-dom";

import { useAuth } from "../hooks/useAuth";

const PrivateRoutes = () => {
  const { isAuth, loading } = useAuth();
  if (loading) {
    return <div>Loading...</div>; // Відображаємо індикатор завантаження поки не з'ясований стан
  }
  console.log(isAuth);

  return isAuth ? <Outlet /> : <Navigate to={"/login"} />;
};
export default PrivateRoutes;
