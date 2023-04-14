import { useSelector, useDispatch } from "react-redux";
import { fetchSingleHive } from "../redux/operations";
import { selectVisibleHives, selectFilterValue } from "../redux/selectors";
import {
  HivesListStyled,
  ImgStyled,
  LinkStyled,
  CardTitle,
  Race,
  CardContentWrapp,
  ItemStyled,
} from "./HivesList.styled";

export const HivesList = () => {
  const hives = useSelector(selectVisibleHives);
  const filterValue = useSelector(selectFilterValue);
  const dispatch = useDispatch();
  const handleClick = (id) => {
    dispatch(fetchSingleHive(id));
  };

  return (
    <HivesListStyled>
      {hives.length !== 0 ? (
        hives.map((hive) => {
          return (
            <ItemStyled key={hive.id}>
              <LinkStyled
                to={`/${hive.id}`}
                onClick={() => handleClick(hive.id)}
              >
                <ImgStyled src={hive.image} alt={hive.name} />
                <CardContentWrapp>
                  <CardTitle>{hive.name}</CardTitle>
                  <Race>{hive.species}</Race>
                </CardContentWrapp>
              </LinkStyled>
            </ItemStyled>
          );
        })
      ) : (
        <h2>{`Sorry, we didn't find any hives with the name ${filterValue}`}</h2>
      )}
    </HivesListStyled>
  );
};
