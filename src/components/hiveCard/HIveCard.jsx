import { useSelector } from "react-redux";
import { selectSingleCharacter } from "../../redux/selectors";
import { ImgStyled, NameStyled } from "./HiveCard.styled";
import { Information } from "../Information";

export const HiveCard = () => {
  const character = useSelector(selectSingleCharacter);
  return (
    character && (
      <>
        <ImgStyled src={character.image} alt={character.name} />
        <NameStyled>{character.name}</NameStyled>
        <Information character={character} />
      </>
    )
  );
};
