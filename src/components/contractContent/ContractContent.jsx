import React from "react";

import { Button } from "../button/Button";

export const ContractContent = ({ contractText, onSignContract }) => {
  return (
    <div>
      <h2>Договір оренди</h2>
      <p>{contractText}</p>
      <Button variant="formBtn" onClick={onSignContract}>
        Підписати договір
      </Button>
    </div>
  );
};
