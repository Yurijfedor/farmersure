import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { selectHivesByLessee, selectUserProfile } from "../../redux/selectors";
import { updateHiveProperty } from "../../redux/operations";
import { updateHive } from "../../redux/hivesSlice";

import { PerformanceScale } from "../performanceScale/PerformanceScale";
import { Button } from "../button/Button";
import { Modal } from "../modal/Modal";
import { ContractModal } from "../сontractModal/ContractModal";

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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const hives = useSelector((state) => selectHivesByLessee(state, user.uid));
  const userProfile = useSelector(selectUserProfile);

  const openModal = (hive, type) => {
    setSelectedHive(hive);
    setModalType(type);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedHive(null);
    setModalType(null);
    setIsModalOpen(false);
  };

  const handleExtendContract = (hive) => {
    try {
      const currentEndDate = new Date(hive.lessee.endDate);
      const today = new Date();

      // Переконуємось, що продовження можливе тільки, якщо поточний договір активний
      if (currentEndDate < today) {
        alert("Ваш договір вже завершився. Оформіть новий.");
        return;
      }

      // Отримуємо останній день наступного місяця
      const nextMonth = new Date(currentEndDate);
      nextMonth.setMonth(nextMonth.getMonth() + 1);
      const lastDayOfNextMonth = new Date(
        Date.UTC(nextMonth.getFullYear(), nextMonth.getMonth() + 1, 0)
      );
      const newEndDate = lastDayOfNextMonth.toISOString().split("T")[0];

      const extensionCost = totalRent + plannedTaskTotalCost;

      // Перевірка балансу
      if (userProfile.balance < extensionCost) {
        const deficit = extensionCost - userProfile.balance;
        alert(
          `Недостатньо коштів! Поповніть баланс на ${deficit.toFixed(2)} грн.`
        );
        return;
      }

      // Оновлення Firestore
      dispatch(
        updateHiveProperty({
          hiveId: hive.id,
          property: "lessee",
          value: {
            ...hive.lessee,
            endDate: newEndDate,
          },
        })
      );

      // Оновлення локального стейту
      dispatch(
        updateHive({
          id: hive.id,
          updates: {
            lessee: {
              ...hive.lessee,
              endDate: newEndDate,
            },
          },
        })
      );

      alert(`Оренду продовжено до ${newEndDate}`);
    } catch (error) {
      console.error("Помилка продовження оренди:", error);
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
        // <Modal isOpen={openModal} onClose={closeModal}>
        //   <h3>
        //     {modalType === "extendMonthly"
        //       ? "Продовження оренди"
        //       : modalType === "extendSeason"
        //       ? "Сезонна оренда"
        //       : "Відеоогляд"}
        //   </h3>
        //   <p>Вулик: {selectedHive.number}</p>
        // </Modal>
        <ContractModal
          isOpen={isModalOpen}
          onClose={closeModal}
          onSignContract={handleExtendContract}
          contractType={modalType}
          hive={selectedHive}
        />
      )}
    </div>
  );
};
