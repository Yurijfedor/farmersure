import React from "react";

import { Modal } from "../modal/Modal";
import { ContractContent } from "../contractContent/ContractContent";

export const ContractModal = ({
  isOpen,
  onClose,
  contractText,
  onSignContract,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ContractContent
        contractText={contractText}
        onSignContract={onSignContract}
      />
    </Modal>
  );
};
