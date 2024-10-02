import React from "react";
import ReactDOM from "react-dom";
import { Backdrop } from "./Modal.styled";
import { ModalContent } from "./Modal.styled";

export const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <Backdrop onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        {children}
      </ModalContent>
    </Backdrop>,
    document.getElementById("modal-root") // Вузол DOM, де рендериться модальне вікно
  );
};
