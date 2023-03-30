import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { removeUser } from "../redux/userSlice";
import { LogOutButton } from "./LogOut.styled";

export const LogOut = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleClick = () => {
    dispatch(removeUser());
    navigate("/");
  };

  return <LogOutButton onClick={handleClick}>Log out</LogOutButton>;
};
