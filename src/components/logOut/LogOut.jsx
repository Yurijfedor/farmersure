import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import { logOut } from "../../services/auth";
import { clearUserProfile } from "../../redux/userSlice";

import { LogOutButton, Wrapper, EmailText } from "./LogOut.styled";

export const LogOut = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const handleClick = () => {
    logOut();
    dispatch(clearUserProfile());
    navigate("/home");
  };

  return (
    <Wrapper>
      <EmailText>{user && user.email}</EmailText>
      <LogOutButton onClick={handleClick}>Log out</LogOutButton>
    </Wrapper>
  );
};
