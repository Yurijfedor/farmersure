import { parse, differenceInMonths } from "date-fns";
import { useSelector, useDispatch } from "react-redux";
import { fetchSingleHive } from "../../redux/operations";
import {
  selectVisibleHives,
  selectFilterValue,
  selectHives,
} from "../../redux/selectors";
import {
  HivesListStyled,
  ImgStyled,
  LinkStyled,
  CardText,
  Race,
  CardContentWrapp,
  ItemStyled,
  ImageWrapp,
  ImageText,
  HeartButton,
} from "./HivesList.styled";
import { heartFull as HeartFull, heart as Heart } from "../../images";

export const HivesList = () => {
  const hives = useSelector(selectHives);
  const filterValue = useSelector(selectFilterValue);
  const dispatch = useDispatch();
  const handleClick = (id) => {
    dispatch(fetchSingleHive(id));
  };

  const getQueensAge = (dateString) => {
    const date = parse(dateString, "dd.MM.yyyy", new Date());
    const today = new Date();
    const diffInMonths = differenceInMonths(today, date);
    return diffInMonths;
  };

  const getDiffInMonths = (dateString) => {
    const date = parse(dateString, "dd.MM.yyyy", new Date());
    const today = new Date();
    const diffInMonths = differenceInMonths(date, today);
    return diffInMonths;
  };

  return (
    <HivesListStyled>
      {hives.length !== 0 ? (
        hives.map((hive) => {
          console.log(hive.queensBirthday);
          return (
            <ItemStyled key={hive.id} type={hive.lessee}>
              <LinkStyled
                to={`/${hive.id}`}
                onClick={() => handleClick(hive.id)}
              >
                <ImageWrapp>
                  <ImgStyled
                    src={`${hive.photoURL}`}
                    alt={`hive number ${hive.number}`}
                  />
                  <ImageText>{hive.number}</ImageText>
                  <HeartButton
                    onClick={(event) => {
                      event.stopPropagation();
                      event.preventDefault();
                      console.log("hello!");
                    }}
                  >
                    <img src={HeartFull} alt="heartFull" />
                  </HeartButton>
                </ImageWrapp>
              </LinkStyled>

              <CardContentWrapp>
                <CardText>{`Тип вулика: ${hive.system}`}</CardText>
                <CardText>{`Сила сім'ї: ${hive.power} рамок`}</CardText>
                <CardText>{`Порода: ${hive.breed}`}</CardText>
                <CardText>{`Матка (вік): ${getQueensAge(
                  hive.queensBirthday
                )} місяців`}</CardText>
                <CardText>{`Мінімальний термін оренди: ${
                  getDiffInMonths("31.08.2023") + 1
                } місяців`}</CardText>
                <CardText>{`Вартість оренди: ${
                  getDiffInMonths("31.08.2023") + 1
                } місяців`}</CardText>
              </CardContentWrapp>
            </ItemStyled>
          );
        })
      ) : (
        <h2>{`Sorry, we didn't find any hives with the name ${filterValue}`}</h2>
      )}
    </HivesListStyled>
  );
};
