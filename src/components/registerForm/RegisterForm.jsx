import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { setUser } from "../../redux/userSlice";

import {
  FormStyled,
  InputStyled,
  ButtonSubmit,
} from "../loginForm/LoginForm.styled";

export const RegisterForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const auth = getAuth();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    createUserWithEmailAndPassword(auth, email, password)
      .then(({ user }) => {
        dispatch(
          setUser({
            email: user.email,
            id: user.uid,
            token: user.accessToken,
          })
        );
        navigate("/home");
      })
      .catch(() => alert("email exists!"));
    setEmail("");
    setPassword("");
  };

  return (
    <FormStyled onSubmit={handleSubmit}>
      <InputStyled
        placeholder="e-mail"
        name="email"
        value={email}
        type="email"
        onChange={(e) => setEmail(e.target.value)}
      />
      <InputStyled
        placeholder="password"
        name="password"
        value={password}
        type="password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <ButtonSubmit type="submit">Register</ButtonSubmit>
    </FormStyled>
  );
};
