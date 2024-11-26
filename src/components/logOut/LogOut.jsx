import { useNavigate } from "react-router-dom";
import { logOut } from "../../services/auth";
import { LogOutButton, Wrapper, EmailText } from "./LogOut.styled";

export const LogOut = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const handleClick = () => {
    logOut();
    navigate("/home");
  };

  return (
    <Wrapper>
      <EmailText>{user && user.email}</EmailText>
      <LogOutButton onClick={handleClick}>Log out</LogOutButton>
    </Wrapper>
  );
};
