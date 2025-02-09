import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Outlet } from "react-router-dom";
import { Suspense } from "react";

import { Container, HeaderContainer } from "../layout/Layout.styled";
import { AuthNav } from "../authNav/AuthNav";
import { LogOut } from "../logOut/LogOut";
import { useAuth } from "../../hooks/useAuth";
import { categories } from "../../siteStructure";
import { Logo } from "../logo/logo";
import { NavBar } from "../nav/Nav";

const Layout = () => {
  const { isAuth } = useAuth();

  return (
    <Suspense>
      <HeaderContainer>
        <Logo />
        <NavBar categories={categories} />
        {isAuth ? <LogOut /> : <AuthNav />}
      </HeaderContainer>
      <Container>
        <Outlet fallback={<div>...Loading</div>} />
      </Container>
    </Suspense>
  );
};

export default Layout;
