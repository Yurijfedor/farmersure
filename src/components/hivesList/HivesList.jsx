import { parse, differenceInMonths, getYear } from "date-fns";
import { useNavigate } from "react-router-dom"; // Import useNavigate

import { useHivesQuery } from "../../hooks/useHives";
import { heartFull as HeartFull } from "../../images";

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

export const HivesList = () => {
  const navigate = useNavigate(); // Initialize navigate
  const { data, isSuccess } = useHivesQuery();

  const handleHiveClick = (hive) => {
    const user = JSON.parse(localStorage.getItem("user"));
    const userEmail = user ? user.email : null;

    if (hive.lessee === "") {
      // If lessee is an empty string, allow access
      console.log(`Navigating to hive card: ${hive.id}`);
      navigate(`/ourservices/hive_card/${hive.id}`); // Navigate to hive card
    } else if (hive.lessee === userEmail) {
      // If lessee matches the logged-in user, allow access
      console.log(`Navigating to hive card: ${hive.id}`);
      navigate(`/ourservices/hive_card/${hive.id}`); // Navigate to hive card
    } else {
      // If lessee does not match, show alert
      alert("Цей вулик уже в оренді. Будь ласка, виберіть інший.");
    }
  };

  const getQueensAge = (dateString) => {
    const date = parse(dateString, "dd.MM.yyyy", new Date());
    const today = new Date();
    return differenceInMonths(today, date);
  };

  return (
    <HivesListStyled>
      {isSuccess &&
        Array.isArray(data) &&
        data.length !== 0 &&
        data.map((hive) => {
          return (
            <ItemStyled key={hive.id} type={hive.lessee}>
              <div
                onClick={() => handleHiveClick(hive)} // Call the new handler
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
              </div>

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
