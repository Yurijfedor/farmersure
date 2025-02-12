import React from "react";

import { Button } from "../button/Button";

export const CancelContractContent = ({ onSignContract, onClose }) => {
  return (
    <div>
      <h2>Скасування оренди</h2>
      <p>Ви дійсно бажаєте скасувати оренду?</p>
      <Button variant="formBtn" onClick={onClose}>
        Відмінити
      </Button>

      <Button variant="formBtn" onClick={onSignContract}>
        Скасувати оренду
      </Button>
    </div>
  );
};
