import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

export const NavLinkStyled = styled(NavLink)``;

export const NavList = styled.ul`
  display: flex;
  gap: 10px;
  margin-left: 50px;
  list-style-type: none;
  padding-left: 0;
  margin-bottom: 0;
`;

export const SubcategoriesList = styled.ul`
  display: none;
  position: absolute;
  top: 100%;
  left: 0;
  width: 200px;
  height: auto;
  background-color: white;
  border: 1px solid black;
`;
export const SubcategoriesItem = styled.li`
  display: block;
  padding: 10px;
  background-color: #f5f5f5;
  border-bottom: 1px solid #ccc;
  cursor: pointer;
  &:hover {
    background-color: #e5e5e5;
  }
`;

export const NavItem = styled.li`
  position: relative;
  padding: 10px;
  background-color: #f5f5f5;
  border-bottom: 1px solid #ccc;
  cursor: pointer;
  &:hover {
    > ${SubcategoriesList} {
      display: block;
    }
    background-color: #e5e5e5;
  }
`;
