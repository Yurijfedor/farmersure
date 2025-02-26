import styled from "styled-components";

import cover from "../../images/cover.png";

export const Container = styled.div`
  width: 360px;
  padding: 24px;
  margin: 0 auto;
  @media (min-width: 1280px) {
    width: 1280px;
    padding: 0 21px;
  }
`;

export const HeaderContainer = styled.div`
  width: 360px;
  padding: 24px;
  margin: 0 auto;
  background-image: url(${cover});
  @media (min-width: 1280px) {
    display: flex;
    justify-content: space-around;
    align-items: center;
    width: 100%;
    padding: 32px 100px;
  }
`;
