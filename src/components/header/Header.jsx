import { LinkStyled } from "./Header.styled";
import sprite from "../images/sprite.svg";

export const Header = () => {
  return (
    <>
      <LinkStyled to={"/"}>
        <svg width="24" height="24">
          <use href={`${sprite}#icon-arrow_back_24px-min`} />
        </svg>
        <p>go back</p>
      </LinkStyled>
    </>
  );
};
