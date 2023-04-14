import styled from "styled-components";
import { Link } from "react-router-dom";

export const HivesListStyled = styled.ul`
  display: grid;
  margin-top: 32px;
  max-width: 100vw;
  grid-template-columns: repeat(auto-fill, minmax(min(240px), 1fr));
  grid-gap: 20px;
  margin-bottom: 223px;
  padding: 0;
  @media (min-width: 1440px) {
    margin-bottom: 188px;
  }
`;

export const ItemStyled = styled.li`
  background: #ffffff;
  box-shadow: 0px 1px 5px rgba(0, 0, 0, 0.2), 0px 3px 4px rgba(0, 0, 0, 0.12),
    0px 2px 4px rgba(0, 0, 0, 0.14);
  border-radius: 4px;
  @media (min-width: 1440px) {
    width: 240px;
  }
`;

export const ImgStyled = styled.img`
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
  @media (min-width: 1440px) {
    height: 168px;
    object-fit: cover;
  }
`;

export const LinkStyled = styled(Link)`
  text-decoration: none;
  color: inherit;
`;

export const CardContentWrapp = styled.div`
  display: grid;
  gap: 1px;
  padding: 12px 16px;
`;

export const CardTitle = styled.h3`
  -ms-text-overflow: ellipsis;
  text-overflow: ellipsis;
  -ms-line-clamp: 1;
  -webkit-line-clamp: 1;
  line-clamp: 1;
  display: -webkit-box;
  display: box;
  word-wrap: break-word;
  box-orient: vertical;
  -webkit-box-orient: vertical;
  overflow: hidden;

  font-weight: 500;
  font-size: 20px;
  line-height: 1.5;
  letter-spacing: 0.15px;
  color: rgba(0, 0, 0, 0.87);
`;

export const Race = styled.p`
  font-size: 14px;
  line-height: 1.5;
  letter-spacing: 0.25px;
  color: rgba(0, 0, 0, 0.6);
`;
