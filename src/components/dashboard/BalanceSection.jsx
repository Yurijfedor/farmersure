import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { selectUserProfile } from "../../redux/selectors";
import { updateProfile } from "../../redux/operations"; // Операція для оновлення профілю
import { Modal } from "../modal/Modal";

export const BalanceSection = () => {
  const dispatch = useDispatch();
  const userProfile = useSelector(selectUserProfile);

  const [isModalOpen, setModalOpen] = useState(false);
  const [amount, setAmount] = useState("");

  const handleAddBalance = () => {
    const newBalance = userProfile.balance + parseFloat(amount);

    // Оновлення балансу через Redux-операцію
    dispatch(
      updateProfile({
        uid: userProfile.id,
        data: { balance: newBalance }, // Передаємо дані в потрібному форматі
      })
    );
    // Закриття модального вікна та очищення введеного значення
    setModalOpen(false);
    setAmount("");
  };

  return (
    <div>
      <h2>Баланс</h2>
      <p>Ваш баланс: {userProfile?.balance || 0} грн</p>
      <button onClick={() => setModalOpen(true)}>Поповнити баланс</button>

      {/* Використання Modal для модального вікна */}
      <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)}>
        <h3>Поповнити баланс</h3>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Введіть суму"
        />
        <button onClick={handleAddBalance} disabled={!amount || amount <= 0}>
          Поповнити
        </button>
        <button onClick={() => setModalOpen(false)}>Скасувати</button>
      </Modal>
    </div>
  );
};
