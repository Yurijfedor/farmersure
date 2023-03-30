import { Outlet } from "react-router-dom";
import { Suspense } from "react";
import { Container } from "./Layout.styled";
import { AuthNav } from "./AuthNav";
import { LogOut } from "./LogOut";
import { UseAuth } from "../hooks/useAuth";

const Layout = () => {
  const { isAuth } = UseAuth();

  return (
    <Suspense>
      <Container>
        {isAuth ? <LogOut /> : <AuthNav />}
        <Outlet fallback={<div>...Loading</div>} />
      </Container>
    </Suspense>
  );
};

export default Layout;
