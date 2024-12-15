import React, { useEffect, useState } from "react";

export const BalanceSection = () => {
    const [balance, setBalance] = useState(500); // Баланс користувача (отримати з Firestore)
  
    return (
      <div>
        <h2>Баланс</h2>
        <p>Ваш баланс: {balance} грн</p>
      </div>
    );
  };
  
