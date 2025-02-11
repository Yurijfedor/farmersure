import React from "react";

import { Modal } from "../modal/Modal";
import { ContractContent } from "../contractContent/ContractContent";
import { ExtendContractContent } from "../contractContent/ExtendContractContent";

export const ContractModal = ({
  isOpen,
  onClose,
  contractText = "",
  onSignContract,
  contractType,
  hive = null,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      {contractType !== "monthly" && contractType !== "seasonal" ? (
        <ExtendContractContent
          onSignContract={onSignContract}
          contractType={contractType}
        />
      ) : (
        <ContractContent
          contractText={contractText}
          onSignContract={() => onSignContract(contractType)}
        />
      )}
    </Modal>
  );
};
