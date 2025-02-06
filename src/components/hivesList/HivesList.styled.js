import styled from "styled-components";
import { Link } from "react-router-dom";

export const HivesListStyled = styled.ul`
  display: grid;
  margin-top: 32px;
  max-width: 100vw;
  grid-template-columns: repeat(auto-fill, minmax(min(280px), 1fr));
  grid-gap: 20px;
  margin-bottom: 223px;
  padding: 0;
  @media (min-width: 1440px) {
    margin-bottom: 188px;
  }
`;

export const ImageWrapp = styled.div`
  position: relative;
  ${({ type }) =>
    type !== "" &&
    `
    &::before {
      content: "Rented";
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background-color: rgba(255, 255, 255, 0.7);
      color: #999;
      padding: 0.5rem;
      border-radius: 0.25rem;
      z-index: 1;
    }
  `}
`;

export const ImageText = styled.p`
  width: 50px;
  position: absolute;
  top: 20px;
  padding: 6px 0 7px 20px;
  border-radius: 0 40px 40px 0;
  font-weight: 700;
  font-size: 16px;
  line-height: 1.25;
  letter-spacing: 0.04em;
  background-color: rgba(255, 255, 255, 0.6);
  color: #111111;
`;

export const HeartButton = styled.button`
  position: absolute;
  top: 12px;
  right: 12px;
  width: 44px;
  height: 44px;
  border-radius: 50%;
  border-color: transparent;
  outline: none;
  background-color: rgba(255, 255, 255, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 11px 10px;
  &:hover {
    cursor: pointer;
  }
`;

export const ItemStyled = styled.li`
  position: relative;

  background: #ffffff;
  box-shadow: 0px 1px 5px rgba(0, 0, 0, 0.2), 0px 3px 4px rgba(0, 0, 0, 0.12),
    0px 2px 4px rgba(0, 0, 0, 0.14);
  border-radius: 4px;

  @media (min-width: 1440px) {
    width: 280px;
  }
`;

export const ImgStyled = styled.img`
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
  height: 370px;
  object-fit: cover;
  &::before {
    content: "Not selected";
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: rgba(255, 255, 255, 0.7);
    color: #999;
    padding: 0.5rem;
    border-radius: 0.25rem;
    z-index: 1;
  }
  @media (min-width: 1440px) {
    height: 168px;
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

export const CardText = styled.p`
  position: relative;
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
  &:hover::before {
    content: attr(title);
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    /* padding: 8px; */
    background-color: rgba(0, 0, 0, 0.7);
    color: #fff;
    z-index: 1;
  }
`;

export const CardTextWrapper = styled.div`
  position: relative;
  display: inline-block;
`;

export const CardTextPopup = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  padding: 8px;
  background-color: rgba(0, 0, 0, 0.7);
  color: #fff;
  z-index: 2;
  visibility: hidden;
  opacity: 0;
  transition: visibility 0s, opacity 0.3s ease;

  ${CardTextWrapper}:hover & {
    visibility: visible;
    opacity: 1;
  }
`;

export const Race = styled.p`
  font-size: 14px;
  line-height: 1.5;
  letter-spacing: 0.25px;
  color: rgba(0, 0, 0, 0.6);
`;
