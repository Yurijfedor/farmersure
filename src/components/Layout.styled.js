import styled from "styled-components";
import cover from "../images/cover.png";

export const Container = styled.div`
  width: 360px;
  padding: 24px;
  margin: 0 auto;
  @media (min-width: 1440px) {
    width: 1440px;
    padding: 0 210px;
  }
`;

export const HeaderContainer = styled.div`
  width: 360px;
  padding: 24px;
  margin: 0 auto;
  background-image: url(${cover});
  @media (min-width: 1440px) {
    display: flex;
    justify-content: space-around;
    align-items: center;
    width: 1440px;
    padding: 32px 100px;
  }
`;
