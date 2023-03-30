import styled from "styled-components";

export const TitleStyled = styled.h3`
  margin-top: 34.47px;
  font-weight: 500;
  font-size: 20px;
  line-height: 1.2;
  letter-spacing: 0.15px;
  color: #8e8e93;
  @media (min-width: 1440px) {
    text-align: center;
    margin-top: 48px;
  }
`;

export const InformationList = styled.ul`
  padding-left: 16px;
  margin-top: 16px;
  margin-bottom: 61px;
  @media (min-width: 1440px) {
    width: 413px;
    margin: 48px auto 142px auto;
  }
`;

export const InformationItem = styled.li`
  padding: 9px 0 12px 0;
  border-bottom: 1px solid rgba(33, 33, 33, 0.08);
`;

export const PropertyTitle = styled.h4`
  font-family: "Roboto";
  font-weight: 700;
  font-size: 16px;
  line-height: 1.5;
  letter-spacing: 0.15px;
  color: #081f32;
`;

export const PropertyValue = styled.p`
  font-family: Roboto;
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  letter-spacing: 0.25px;
  color: #6e798c;
`;
