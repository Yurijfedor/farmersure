import { NavContainer, NavItem, NavLinkStyled } from "./Nav.styled";

export { NavContainer, NavItem, NavLinkStyled } from "./Nav.styled";

export const NavBar = () => {
  const pages = [
    "homepage",
    "services",
    "about",
    "apiculture",
    "news",
    "contacts",
  ];
  return (
    <NavContainer>
      {pages.map((page) => {
        return (
          <NavItem key={page}>
            <NavLinkStyled to={page}>{page}</NavLinkStyled>
          </NavItem>
        );
      })}
    </NavContainer>
  );
};
