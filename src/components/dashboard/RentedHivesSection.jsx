import React, { useState } from "react";
import { useSelector } from "react-redux";

import { selectHives } from "../../redux/selectors";

import { PerformanceScale } from "../performanceScale/PerformanceScale";
import { Button } from "../button/Button";
import { Modal } from "../modal/Modal";

import {
  Table,
  TableCell,
  TableHeader,
  TableRow,
} from "./RentedHivesSection.styled";

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
      <Table>
        <thead>
          <tr>
            <TableHeader>№</TableHeader>
            <TableHeader>Фото</TableHeader>
            <TableHeader>Потужність</TableHeader>
            <TableHeader>Продуктивність</TableHeader>
            <TableHeader>Тип оренди</TableHeader>
            <TableHeader>Дії</TableHeader>
          </tr>
        </thead>
        <tbody>
          {hives.map((hive, index) => (
            <TableRow key={hive.id}>
              <TableCell>{index + 1}</TableCell>
              <TableCell>
                <img src={hive.photoURL} alt={`Вулик ${hive.number}`} />
              </TableCell>
              <TableCell>{hive.power}</TableCell>
              <TableCell>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <div style={{ display: "flex", gap: "10px" }}>
                    <PerformanceScale hive={hive} product={"honey"} />
                    <PerformanceScale hive={hive} product={"propolis"} />
                    <PerformanceScale hive={hive} product={"wax"} />
                    <PerformanceScale hive={hive} product={"royalJelly"} />
                  </div>
                  <div style={{ display: "flex", gap: "10px" }}>
                    <PerformanceScale hive={hive} product={"droneHomogenate"} />
                    <PerformanceScale hive={hive} product={"pollen"} />
                    <PerformanceScale hive={hive} product={"beeVenom"} />
                  </div>
                </div>
              </TableCell>
              <TableCell>{hive.rentalType || "Не встановлено"}</TableCell>
              <TableCell>
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
              </TableCell>
            </TableRow>
          ))}
        </tbody>
      </Table>

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
