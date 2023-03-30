import { Outlet } from "react-router-dom";
import { Suspense } from "react";
import { Container, HeaderContainer } from "./Layout.styled";
import { AuthNav } from "./AuthNav";
import { LogOut } from "./LogOut";
import { UseAuth } from "../hooks/useAuth";
import { Logo } from "./logo";
import { NavBar } from "./Nav";

const Layout = () => {
  const { isAuth } = UseAuth();

  return (
    <Suspense>
      <HeaderContainer>
        <Logo />
        <NavBar />
        {isAuth ? <LogOut /> : <AuthNav />}
      </HeaderContainer>
      <Container>
        <Outlet fallback={<div>...Loading</div>} />
      </Container>
    </Suspense>
  );
};

export default Layout;
