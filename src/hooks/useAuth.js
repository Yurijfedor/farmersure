import { useSelector } from "react-redux";
import { selectUser } from "../redux/selectors";

export const UseAuth = () => {
  const { email, token, id } = useSelector(selectUser);
  return {
    isAuth: !!email,
    email,
    token,
    id,
  };
};
