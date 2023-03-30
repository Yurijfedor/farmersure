import styled from "styled-components";

export const FilterInputWrapp = styled.div`
  display: flex;
  margin-top: 32px;
`;

export const InputStyled = styled.input`
  width: 100%;
  padding: 16px 16px 16px 8px;
  font-family: "Roboto";
  line-height: 1.5;
  color: rgba(0, 0, 0, 0.5);
  border: 1px solid rgba(0, 0, 0, 0.5);
  border-left-style: none;
  border-top-right-radius: 8px;
  border-bottom-right-radius: 8px;
  outline: none;
`;

export const ButtonStyled = styled.button`
  padding: 16px 0 16px 16px;
  background-color: #fff;
  color: rgba(0, 0, 0, 0.5);
  font-weight: 600;
  border: 1px solid rgba(0, 0, 0, 0.5);
  border-right-style: none;
  border-top-left-radius: 8px;
  border-bottom-left-radius: 8px;
  outline: none;
`;
