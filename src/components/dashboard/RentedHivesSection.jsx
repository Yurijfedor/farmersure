import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { selectHivesByLessee } from "../../redux/selectors";
import { updateHiveProperty } from "../../redux/operations";

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
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("user"));
  const [selectedHive, setSelectedHive] = useState(null);
  const [modalType, setModalType] = useState(null);
  const hives = useSelector((state) => selectHivesByLessee(state, user.uid));
  console.log(hives);

  const openModal = (hive, type) => {
    setSelectedHive(hive);
    setModalType(type);
  };

  const closeModal = () => {
    setSelectedHive(null);
    setModalType(null);
  };

  const handleSignContract = (hiveId) => {
    try {
      // Викликаємо асинхронну дію для оновлення властивості "lessee"
      dispatch(
        updateHiveProperty({
          hiveId: hiveId.hiveId,
          property: "lessee",
          value: user.uid,
        })
      );

      // Закриваємо модалку після підписання контракту
      closeModal();
    } catch (error) {
      console.error("Error signing contract:", error);
      // Тут можна додати обробку помилок
    }
  };

  return (
    <div className="rented-hives-section">
      <h2>Орендовані вулики</h2>
      <Table>
        <thead>
          <tr>
            <TableHeader>№</TableHeader>
            <TableHeader>Фото</TableHeader>
            <TableHeader>Сила</TableHeader>
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
              <TableCell>{`${hive.power} рамок`}</TableCell>
              <TableCell>
                <div
                  style={{
                    display: "flex",
                    gap: "10px",
                    flexWrap: "wrap",
                  }}
                >
                  <PerformanceScale hive={hive} product={"honey"} />
                  <PerformanceScale hive={hive} product={"pollen"} />
                  <PerformanceScale hive={hive} product={"propolis"} />
                  <PerformanceScale hive={hive} product={"royalJelly"} />
                  <PerformanceScale hive={hive} product={"droneHomogenate"} />
                  <PerformanceScale hive={hive} product={"wax"} />
                  <PerformanceScale hive={hive} product={"beeVenom"} />
                </div>
              </TableCell>
              <TableCell>
                {hive.lessee.type === "monthly"
                  ? "помісячна"
                  : hive.lessee.type === "seasonal"
                  ? "до кінця сезону"
                  : "не встановлено"}
              </TableCell>
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
        <Modal isOpen={openModal} onClose={closeModal}>
          <h3>
            {modalType === "extendMonthly"
              ? "Продовження оренди"
              : modalType === "extendSeason"
              ? "Сезонна оренда"
              : "Відеоогляд"}
          </h3>
          <p>Вулик: {selectedHive.number}</p>
        </Modal>
      )}
    </div>
  );
};
