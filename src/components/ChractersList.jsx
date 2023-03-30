import { useSelector, useDispatch } from "react-redux";
import { fetchSingleCharacter } from "../redux/operations";
import { selectVisibleCharacters, selectFilterValue } from "../redux/selectors";
import {
  CharactersListStyled,
  ImgStyled,
  LinkStyled,
  CardTitle,
  Race,
  CardContentWrapp,
  ItemStyled,
} from "./CharactersList.styled";

export const CharactersList = () => {
  const characters = useSelector(selectVisibleCharacters);
  const filterValue = useSelector(selectFilterValue);
  const dispatch = useDispatch();
  const handleClick = (id) => {
    dispatch(fetchSingleCharacter(id));
  };

  return (
    <CharactersListStyled>
      {characters.length !== 0 ? (
        characters.map((character) => {
          return (
            <ItemStyled key={character.id}>
              <LinkStyled
                to={`/${character.id}`}
                onClick={() => handleClick(character.id)}
              >
                <ImgStyled src={character.image} alt={character.name} />
                <CardContentWrapp>
                  <CardTitle>{character.name}</CardTitle>
                  <Race>{character.species}</Race>
                </CardContentWrapp>
              </LinkStyled>
            </ItemStyled>
          );
        })
      ) : (
        <h2>{`Sorry, we didn't find any characters with the name ${filterValue}`}</h2>
      )}
    </CharactersListStyled>
  );
};
