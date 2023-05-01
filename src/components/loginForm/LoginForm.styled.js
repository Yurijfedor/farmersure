import styled from 'styled-components';

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

export const ButtonSubmit = styled.button``;
