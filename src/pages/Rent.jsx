import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllHives } from "../redux/operations";
import { Button } from "../components/button/Button";
import { Title } from "../components/title/Title";
import { HivesList } from "../components/hivesList/HivesList";
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
        <Button
          children={"All hives"}
          variant="filterBtn"
          onClick={() => console.log("all hives")}
        />
        <Button
          children={"Available for rent"}
          variant="filterBtn"
          onClick={() => console.log("Available for rent")}
        />
        <Button
          children={"In my lease"}
          variant="filterBtn"
          onClick={() => console.log("In my lease")}
        />
        <Button
          children={"Liked"}
          variant="filterBtn"
          onClick={() => console.log("Liked")}
        />
      </ButtonContainer>
      <HivesList />
    </>
  );
};

export default Rent;
