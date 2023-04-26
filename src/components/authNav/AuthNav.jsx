import { AuthNavWrapp, AuthButton } from "./AuthNav.styled";

export const AuthNav = () => {
  return (
    <AuthNavWrapp>
      <AuthButton to={"login"}>Log in</AuthButton>
      <AuthButton to={"register"}>Register</AuthButton>
    </AuthNavWrapp>
  );
};
