import styled from "styled-components";

export const LogOutButton = styled.button`
  display: flex;
  justify-content: center;
  margin-left: auto;
  padding: 10px;
  border: 1px solid gray;
  border-radius: 5px;
  cursor: pointer;
  text-decoration: none;
  color: gray;
  &:hover {
    background-color: #29d1c3;
    color: white;
  }
`;

export const Wrapper = styled.div`
  display: flex;
  gap: 10px;
  justify-content: center;
  align-items: center;
  margin-left: auto;
  padding: 10px;
`;

export const EmailText = styled.p`
  font-weight: bold;
  color: white;
  background-color: green;
`;
