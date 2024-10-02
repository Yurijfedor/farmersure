import styled from "styled-components";

export const SwiperWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const MainSwiperWrapper = styled.div`
  width: 400px;
  height: auto;
`;

export const ThumbSwiperWrapper = styled.div`
  width: 600px;
  margin-top: 10px;
`;

export const SwiperImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export const ThumbImage = styled.img`
  width: 100%;
  height: auto;
`;

export const ModalImage = styled.img`
  max-width: 90vw; /* Зображення займає 90% ширини екрану */
  max-height: 90vh; /* Зображення займає 90% висоти екрану */
  object-fit: contain;
  display: block;
  margin: 0 auto;
  transition: transform 0.3s ease; /* Додаємо анімацію при масштабуванні */
  cursor: grab; /* Змінюємо курсор на "grab" для вказівки, що зображення можна перетягувати */

  &:hover {
    cursor: grabbing; /* Змінюємо курсор на "grabbing" при наведенні */
  }
`;

export const ImageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative; /* Для абсолютного позиціонування зображення */
  height: 100%; /* Встановлюємо висоту контейнера */
  overflow: hidden; /* Сховати частини зображення, які виходять за межі контейнера */
`;
