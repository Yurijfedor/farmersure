import styled from "styled-components";

// export const FiltersContainer = styled.div`
//   display: flex;
//   gap: 10px;
// `;

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
`;
