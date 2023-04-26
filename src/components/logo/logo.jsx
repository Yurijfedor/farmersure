import { Link } from "react-router-dom";
import { LogoStyled, LinkStyled } from "./logo.styled";
import logo from "../../images/logo_mini.png";

export const Logo = () => {
  return (
    <LinkStyled to={"/"} style={{}}>
      <LogoStyled src={logo} alt="logo" />;
    </LinkStyled>
  );
};
