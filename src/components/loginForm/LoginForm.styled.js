import styled from "styled-components";

export const FormStyled = styled.form`
  display: grid;
  gap: 10px;
  margin-top: 50px;
  @media (min-width: 768px) {
    width: 300px;
    margin-left: auto;
    margin-right: auto;
  }
`;

export const InputStyled = styled.input`
  padding-left: 15px;
`;

export const ButtonSubmit = styled.button`
  display: flex;
  justify-content: center;
  padding: 10px;
  border: 1px solid gray;
  border-radius: 5px;
  cursor: pointer;
  text-decoration: none;
  color: white;
  background-color: #29d1c3;
  &:hover {
    background-color: #0000ff;
  }
`;

export const Divider = styled.div`
  margin: 20px 0;
  text-align: center;
  position: relative;

  &:before,
  &:after {
    content: "";
    width: 45%;
    height: 1px;
    background: #ccc;
    position: absolute;
    top: 50%;
  }
  &:before {
    left: 0;
  }
  &:after {
    right: 0;
  }
`;

export const GoogleButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  padding: 10px;
  border: 1px solid gray;
  border-radius: 5px;
  cursor: pointer;
  text-decoration: none;
  color: white;
  background-color: #29d1c3;
  &:hover {
    background-color: #0000ff;
  }
  img {
    width: 20px;
    height: 20px;
  }
`;
