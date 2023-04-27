import { useNavigate } from "react-router-dom";
import { logOut } from "../../services/auth";
import { LogOutButton } from "./LogOut.styled";

export const LogOut = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    logOut();
    navigate("/");
  };

  return <LogOutButton onClick={handleClick}>Log out</LogOutButton>;
};
