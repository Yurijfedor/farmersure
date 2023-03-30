import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFilterValue } from "../redux/filterSlice";
import { selectFilterValue } from "../redux/selectors";
import { AiOutlineCloseCircle } from "react-icons/ai";
import sprite from "../images/sprite.svg";
import { InputStyled, FilterInputWrapp, ButtonStyled } from "./Filter.styled";

export const Filter = () => {
  const dispatch = useDispatch();
  const filterValue = useSelector(selectFilterValue);
  const [isSearchFilled, setIsSearchFilled] = useState(false);

  const handleChange = (evt) => {
    dispatch(setFilterValue(evt.currentTarget.value));
    setIsSearchFilled(true);
  };

  const handleClick = () => {
    dispatch(setFilterValue(""));
    setIsSearchFilled(false);
  };

  return (
    <>
      <FilterInputWrapp>
        <ButtonStyled type="submit" onClick={handleClick}>
          {!isSearchFilled || filterValue === "" ? (
            <svg width="24" height="24">
              <use href={`${sprite}#icon-Icon-min`} fill="rgba(0, 0, 0, 0.5)" />
            </svg>
          ) : (
            <AiOutlineCloseCircle size={24} />
          )}
        </ButtonStyled>
        <InputStyled
          placeholder="Filter by name..."
          name="number"
          value={filterValue}
          onChange={(evt) => handleChange(evt)}
        />
      </FilterInputWrapp>
    </>
  );
};
