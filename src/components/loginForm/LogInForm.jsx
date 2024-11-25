import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";

import { logInWithEmail, logInWithGoogle } from "../../services/auth";
import googlePng from "../../images/icons8-google-48.png";

import {
  FormStyled,
  InputStyled,
  ButtonSubmit,
  GoogleButton,
  Divider,
} from "./LoginForm.styled";

export const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const toPath = JSON.parse(localStorage.getItem("toRedirect"));

  const { mutate: loginWithEmail } = useMutation(logInWithEmail, {
    onSuccess: () => {
      navigate(toPath);
      localStorage.removeItem("toRedirect");
    },
    onError: (error) => {
      alert(error.message);
    },
  });

  const { mutate: loginWithGoogle } = useMutation(logInWithGoogle, {
    onSuccess: () => {
      navigate(toPath);
      localStorage.removeItem("toRedirect");
    },
    onError: (error) => {
      alert(error.message);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    loginWithEmail({ email, password });
    setEmail("");
    setPassword("");
  };

  const handleGoogleLogin = () => {
    loginWithGoogle();
  };

  return (
    <FormStyled onSubmit={handleSubmit}>
      <InputStyled
        placeholder="e-mail"
        name="email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <InputStyled
        placeholder="password"
        name="password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <ButtonSubmit type="submit">Log In</ButtonSubmit>

      <Divider>or</Divider>

      <GoogleButton onClick={handleGoogleLogin}>
        <img src={googlePng} alt="Google Icon" /> Sign in with Google
      </GoogleButton>
    </FormStyled>
  );
};
