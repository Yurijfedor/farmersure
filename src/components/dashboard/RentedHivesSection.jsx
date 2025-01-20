import React, { useState } from "react";
import { useSelector } from "react-redux";

import { selectHives } from "../../redux/selectors";

import { PerformanceScale } from "../performanceScale/PerformanceScale";
import { Button } from "../button/Button";
import { Modal } from "../modal/Modal";

export const RentedHivesSection = () => {
  const [selectedHive, setSelectedHive] = useState(null);
  const [modalType, setModalType] = useState(null);
  const hives = useSelector(selectHives);

  const openModal = (hive, type) => {
    setSelectedHive(hive);
    setModalType(type);
  };

  const closeModal = () => {
    setSelectedHive(null);
    setModalType(null);
  };

  return (
    <div className="rented-hives-section">
      <h2>Орендовані вулики</h2>
      <table>
        <thead>
          <tr>
            <th>№</th>
            <th>Фото</th>
            <th>Порода</th>
            <th>Система</th>
            <th>Потужність</th>
            <th>Продуктивність</th>
            <th>Тип оренди</th>
            <th>Дії</th>
          </tr>
        </thead>
        <tbody>
          {hives.map((hive, index) => (
            <tr key={hive.id}>
              <td>{index + 1}</td>
              <td>
                <img
                  src={hive.photoURL}
                  alt={`Вулик ${hive.number}`}
                  style={{
                    width: "50px",
                    height: "50px",
                    objectFit: "cover",
                  }}
                />
              </td>
              <td>{hive.breed}</td>
              <td>{hive.system}</td>
              <td>{hive.power}</td>
              <td>
                <div>
                  <strong>Мед:</strong>{" "}
                  <PerformanceScale hive={hive} product={"honey"} />
                  <strong>Прополіс:</strong>
                  <PerformanceScale hive={hive} product={"propolis"} />
                  <strong>Віск:</strong>
                  <PerformanceScale hive={hive} product={"wax"} />
                </div>
              </td>
              <td>{hive.rentalType || "Не встановлено"}</td>
              <td>
                <Button
                  variant="formBtn"
                  size="medium"
                  onClick={() => openModal(hive, "extendMonthly")}
                >
                  Продовжити на місяць
                </Button>
                <Button
                  variant="formBtn"
                  size="medium"
                  onClick={() => openModal(hive, "extendSeason")}
                >
                  Продовжити до кінця сезону
                </Button>
                <Button
                  variant="formBtn"
                  size="medium"
                  onClick={() => openModal(hive, "videoReview")}
                >
                  Замовити онлайн-відеоогляд
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {modalType && (
        <Modal onClose={closeModal}>
          <h3>
            {modalType === "extendMonthly"
              ? "Продовження оренди"
              : modalType === "extendSeason"
              ? "Сезонна оренда"
              : "Відеоогляд"}
          </h3>
          <p>Вулик: {selectedHive.number}</p>
          <Button onClick={closeModal}>Закрити</Button>
        </Modal>
      )}
    </div>
  );
};
