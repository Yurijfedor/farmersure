import styled, { css } from "styled-components";

export const ButtonStyled = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
  border: 1px solid gray;
  border-radius: 5px;
  cursor: pointer;
  color: white;
  background-color: #29d1c3;
  &::first-letter {
    text-transform: uppercase;
  }
  &:hover {
    background-color: #0000ff;
  }
  ${({ variant }) =>
    variant === "filterBtn" &&
    css`
      background-color: aqua;
    `}

  ${({ variant }) =>
    variant === "formBtn" &&
    css`
      width: 100%;
    `}

    ${({ size }) =>
    size === "medium" &&
    css`
      padding: 10px;
    `}

    ${({ size }) =>
    size === "large" &&
    css`
      padding: 25px;
      border-radius: 10px;
    `}
`;
