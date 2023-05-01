import styled from 'styled-components';

export const ImgStyled = styled.img`
  width: 150px;
  height: 148px;
  margin: 77px auto 0 auto;
  border: 5px solid #f2f2f7;
  border-radius: 150px;
  @media (min-width: 1440px) {
    width: 300px;
    height: 300px;
  }
`;

export const NameStyled = styled.h2`
  margin-top: 34px;
  text-align: center;
  font-size: 32px;
  font-weight: 400;
  line-height: 1.2;
  color: #081f32;
  @media (min-width: 1440px) {
    font-size: 48px;
    margin-top: 16px;
  }
`;
