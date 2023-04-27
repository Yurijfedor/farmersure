import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { logIn } from "../../services/auth";
import { FormStyled, InputStyled, ButtonSubmit } from "./LoginForm.styled";

export const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const { mutate: loginMutation } = useMutation(logIn, {
    onSuccess: () => {
      navigate("/home");
    },
    onError: (error) => {
      alert(error.message);
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      loginMutation({ email, password });
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
    </FormStyled>
  );
};
