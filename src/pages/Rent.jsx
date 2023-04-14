import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllHives } from "../redux/operations";
import { Button } from "../components/Button";
import { Title } from "../components/Title";
import { HivesList } from "../components/HivesList";
import { ButtonContainer } from "./Rent.styled";
import { selectHives } from "../redux/selectors";
const Rent = () => {
  const hives = useSelector(selectHives);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllHives());
  }, [dispatch]);

  return (
    <>
      <Title text={"rent of beehives"} />
      <ButtonContainer>
        <Button text={"All hives"} />
        <Button text={"Available for rent"} />
        <Button text={"In my lease"} />
        <Button text={"Liked"} />
      </ButtonContainer>
      <HivesList />
    </>
  );
};

export default Rent;
