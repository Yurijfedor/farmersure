import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { register } from "../../services/auth";

import {
  FormStyled,
  InputStyled,
  ButtonSubmit,
} from "../loginForm/LoginForm.styled";

export const RegisterForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const { mutate: registerMutation } = useMutation(register, {
    onSuccess: () => {
      navigate("/home");
    },
    onError: (error) => {
      alert(error.message);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      registerMutation({ email, password });
      navigate("/home");
      setEmail("");
      setPassword("");
    } catch (error) {
      alert("Invalid user!");
    }
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
