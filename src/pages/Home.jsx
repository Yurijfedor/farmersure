import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Logo } from "../components/logo";
import { Filter } from "../components/Filter";
import { CharactersList } from "../components/ChractersList";
import { fetchAllCharacters } from "../redux/operations";
import { UseAuth } from "../hooks/useAuth";

const Characters = () => {
  const { isAuth } = UseAuth();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchAllCharacters());
  }, [dispatch]);

  return (
    <>
      {/* <Logo /> */}
      {/* <Filter /> */}
      <CharactersList />
    </>
  );
};

export default Characters;
