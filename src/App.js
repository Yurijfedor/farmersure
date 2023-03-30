import { lazy } from "react";
import { Routes, Route } from "react-router-dom";

const Home = lazy(() => import("./pages/Home"));
const CharactersCard = lazy(() => import("./pages/CharactersCard"));
const Layout = lazy(() => import("./components/layout"));
const Login = lazy(() => import("./pages/LogIn"));
const Register = lazy(() => import("./pages/Register"));

export const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="/home" element={<Home />} />
        <Route path="/:characterId" element={<CharactersCard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Route>
    </Routes>
  );
};
