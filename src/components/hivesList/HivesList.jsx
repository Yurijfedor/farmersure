import { parse, differenceInMonths, getYear } from "date-fns";
import { useHivesQuery } from "../../hooks/useHives";
import {
  HivesListStyled,
  ImgStyled,
  LinkStyled,
  CardText,
  CardContentWrapp,
  ItemStyled,
  ImageWrapp,
  ImageText,
  HeartButton,
  CardTextWrapper,
  CardTextPopup,
} from "./HivesList.styled";
import { heartFull as HeartFull } from "../../images";

export const HivesList = () => {
  const handleClick = (id) => {
    console.log(`hello! I am this: ${id}`);
  };

  const { data, isSuccess } = useHivesQuery();

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
      {isSuccess &&
        Array.isArray(data) &&
        data.length !== 0 &&
        data.map((hive) => {
          return (
            <ItemStyled key={hive.id} type={hive.lessee}>
              <LinkStyled
                to={`/ourservices/hive_card/${hive.id}`}
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
                <CardTextWrapper>
                  <CardText>{`Тип вулика: ${hive.system}`}</CardText>
                  <CardTextPopup>{hive.system}</CardTextPopup>
                </CardTextWrapper>

                <CardText>{`Сила сім'ї: ${hive.power} рамок`}</CardText>
                <CardText>{`Порода: ${hive.breed}`}</CardText>
                <CardText>{`Матка (вік): ${getQueensAge(
                  hive.queensBirthday
                )} місяців`}</CardText>
                <CardTextWrapper>
                  <CardText>{`Мінімальний термін оренди: до вересня місяця ${getYear(
                    new Date()
                  )} `}</CardText>
                  <CardTextPopup>{`до вересня місяця ${getYear(
                    new Date()
                  )}`}</CardTextPopup>
                </CardTextWrapper>

                <CardText>{`Базова вартість оренди: $92`}</CardText>
              </CardContentWrapp>
            </ItemStyled>
          );
        })}
    </HivesListStyled>
  );
};
