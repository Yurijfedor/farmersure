import styled from "styled-components";

export const Backdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.8); /* Темний фон */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000; /* Високий пріоритет */
`;

export const ModalContent = styled.div`
  position: relative;
  max-width: 90vw;
  background-color: white;
  padding: 20px;
  border-radius: 10px;
`;
