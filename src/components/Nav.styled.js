import styled from "styled-components";
import { NavLink } from "react-router-dom";

export const NavContainer = styled.ul`
  @media (min-width: 1440px) {
    display: flex;
    gap: 10px;
  }
`;

export const NavItem = styled.li`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #29d1c3;
`;

export const NavLinkStyled = styled(NavLink)``;
