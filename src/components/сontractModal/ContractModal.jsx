import React from "react";

import { Modal } from "../modal/Modal";
import { ContractContent } from "../contractContent/ContractContent";
import { ExtendContractContent } from "../contractContent/ExtendContractContent";
import { CancelContractContent } from "../contractContent/CancelContractContent";

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
      {contractType === "extendMonthly" || contractType === "extendSeason" ? (
        <ExtendContractContent
          onSignContract={onSignContract}
          contractType={contractType}
        />
      ) : contractType === "monthly" || contractType === "seasonal" ? (
        <ContractContent
          contractText={contractText}
          onSignContract={() => onSignContract(contractType)}
        />
      ) : contractType === "cancelContract" ? (
        <CancelContractContent
          onSignContract={() => onSignContract(contractType)}
          onClose={onClose}
        />
      ) : null}
    </Modal>
  );
};
