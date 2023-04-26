import styled from "styled-components";
import { Link } from "react-router-dom";

export const LinkStyled = styled(Link)`
  display: flex;
  align-items: center;
  gap: 8px;
  font-family: "Karla";
  font-size: 18px;
  line-height: 1.17;
  text-transform: uppercase;
  text-decoration: none;
  color: #000000;
  @media (min-width: 1440px) {
    margin-top: 21px;
    margin-left: 50px;
  }
`;
