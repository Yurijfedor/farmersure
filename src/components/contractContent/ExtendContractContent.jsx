import React from "react";

import { Button } from "../button/Button";

export const ExtendContractContent = ({ onSignContract }) => {
  const getNextMonthName = () => {
    const today = new Date();
    const nextMonth = new Date(today.getFullYear(), today.getMonth() + 1);
    return nextMonth.toLocaleString("uk-UA", { month: "long" });
  };

  return (
    <div>
      <h2>Продовження оренди</h2>
      <p>Продовжити оренду на {getNextMonthName()}</p>
      <Button variant="formBtn" onClick={onSignContract}>
        Продовжити оренду
      </Button>
    </div>
  );
};
