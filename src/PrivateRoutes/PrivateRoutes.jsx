import { Navigate, Outlet } from "react-router-dom";

import { useAuth } from "../hooks/useAuth";

const PrivateRoutes = () => {
  const { isAuth } = useAuth();
  return isAuth ? <Outlet /> : <Navigate to={"/login"} />;
};
export default PrivateRoutes;
