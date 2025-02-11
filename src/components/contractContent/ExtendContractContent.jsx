import React from "react";

import { Button } from "../button/Button";

export const ExtendContractContent = ({ onSignContract, contractType }) => {
  const today = new Date();
  const endOfSeasone = new Date(Date.UTC(today.getFullYear(), 7, 31))
    .toISOString()
    .split("T")[0];

  const getNextMonthName = () => {
    const nextMonth = new Date(today.getFullYear(), today.getMonth() + 1);
    return nextMonth.toLocaleString("uk-UA", { month: "long" });
  };

  return (
    <div>
      <h2>Продовження оренди</h2>
      <p>
        {`Продовжити оренду ${
          contractType === "extendMonthly"
            ? `на ${getNextMonthName()}`
            : contractType === "extendSeason"
            ? `до ${endOfSeasone}`
            : ""
        }`}
      </p>
      <Button variant="formBtn" onClick={onSignContract}>
        Продовжити оренду
      </Button>
    </div>
  );
};
