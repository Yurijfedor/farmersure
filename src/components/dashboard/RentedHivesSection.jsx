import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import {
  selectHivesByLessee,
  selectPlannedTasksCost,
  selectUserProfile,
} from "../../redux/selectors";
import { updateHiveProperty, updateProfile } from "../../redux/operations";
import { updateHive } from "../../redux/hivesSlice";

import { PerformanceScale } from "../performanceScale/PerformanceScale";
import { Button } from "../button/Button";
import { Modal } from "../modal/Modal";
import { ContractModal } from "../сontractModal/ContractModal";
import { calculateTotalRent } from "../../helpers/calculateRent";
import { calculateMandatoryTasksCostForNextPeriod } from "../../helpers/calculateMandatoryTasksCost";
import { useCancelBeehiveRental } from "../../hooks/useHives";

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
  const plannedTaskTotalCost = useSelector(selectPlannedTasksCost);
  const { mutate: cancelRental } = useCancelBeehiveRental();

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

  const handleExtendContract = () => {
    try {
      const currentEndDate = new Date(selectedHive.lessee.endDate);
      const today = new Date();
      const monthsLeft = 8 - today.getMonth(); // Кількість місяців до кінця серпня
      // Отримуємо останній день наступного місяця
      const nextMonth = new Date(currentEndDate);
      nextMonth.setMonth(nextMonth.getMonth() + 1);
      const lastDayOfNextMonth = new Date(
        Date.UTC(nextMonth.getFullYear(), nextMonth.getMonth() + 1, 0)
      );
      const newEndDate =
        modalType === "extendMonthly"
          ? lastDayOfNextMonth.toISOString().split("T")[0]
          : new Date(Date.UTC(today.getFullYear(), 7, 31))
              .toISOString()
              .split("T")[0];
      const totalRent = calculateTotalRent(
        selectedHive.hiveComponents,
        selectedHive.power
      );
      const monthsToExtend = monthsLeft - currentEndDate.getMonth();

      const extensionCost =
        modalType === "extendMonthly"
          ? totalRent
          : totalRent * monthsToExtend +
            calculateMandatoryTasksCostForNextPeriod(modalType) +
            plannedTaskTotalCost;

      // Перевірка балансу
      if (userProfile.balance < extensionCost) {
        const deficit = extensionCost - userProfile.balance;
        alert(
          `Недостатньо коштів! Поповніть баланс на ${deficit.toFixed(2)} грн.`
        );
        return;
      }

      const newBalance = parseFloat(
        (
          userProfile.balance -
          (modalType === "extendMonthly"
            ? totalRent
            : totalRent * monthsToExtend)
        ).toFixed(2)
      );

      // Оновлення Firestore
      dispatch(
        updateHiveProperty({
          hiveId: selectedHive.id,
          property: "lessee",
          value: {
            ...selectedHive.lessee,
            endDate: newEndDate,
          },
        })
      );

      // Оновлення локального стейту
      dispatch(
        updateHive({
          id: selectedHive.id,
          updates: {
            lessee: {
              ...selectedHive.lessee,
              endDate: newEndDate,
            },
          },
        })
      );

      // Оновлення балансу через Redux-операцію
      dispatch(
        updateProfile({
          uid: userProfile.id,
          data: { balance: newBalance }, // Передаємо дані в потрібному форматі
        })
      );

      alert(`Оренду продовжено до ${newEndDate}`);
      closeModal();
    } catch (error) {
      console.error("Помилка продовження оренди:", error);
    }
  };

  const handleCancelContract = () => {
    try {
      const today = new Date();
      const endDate = new Date(selectedHive.lessee.endDate);

      // Розрахунок компенсації за невикористаний період
      const remainingMonths =
        (endDate.getFullYear() - today.getFullYear()) * 12 +
        (endDate.getMonth() - today.getMonth());
      console.log(remainingMonths);
      const rentalStartDate = new Date(selectedHive.lessee.startDate); // Дата початку оренди
      const timeSinceStart = today - rentalStartDate; // Різниця в мілісекундах
      const isImmediateCancellation = timeSinceStart < 24 * 60 * 60 * 1000; // Менше доби

      const monthsToRefund =
        isImmediateCancellation && remainingMonths >= 0
          ? remainingMonths + 1 // Якщо скасування одразу, повертаємо ще один місяць
          : remainingMonths > 0
          ? remainingMonths
          : 0;
      console.log(monthsToRefund);

      const refundAmount =
        monthsToRefund > 0
          ? calculateTotalRent(
              selectedHive.hiveComponents,
              selectedHive.power
            ) * monthsToRefund
          : 0;

      // Оновлення балансу користувача
      const newBalance = parseFloat(
        (Number(userProfile.balance) + refundAmount).toFixed(2)
      );

      cancelRental(selectedHive.id);

      // Оновлення балансу користувача
      dispatch(
        updateProfile({
          uid: userProfile.id,
          data: { balance: newBalance },
        })
      );

      alert(`Оренду скасовано. Вам повернуто ${refundAmount.toFixed(2)} грн.`);
      closeModal();
    } catch (error) {
      console.error("Помилка скасування оренди:", error);
    }
  };

  const today = new Date();
  const nextMonthLastDay = new Date(
    today.getFullYear(),
    today.getMonth() + 2,
    0
  ) // Останній день наступного місяця
    .toISOString()
    .split("T")[0]; // Приводимо до формату YYYY-MM-DD

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
            <TableHeader>Дата закінчення оренди</TableHeader>
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
              <TableCell>{hive.lessee.endDate}</TableCell>
              <TableCell>
                {hive.lessee.endDate < nextMonthLastDay && (
                  <Button
                    variant="formBtn"
                    size="medium"
                    onClick={() => openModal(hive, "extendMonthly")}
                  >
                    Продовжити на місяць
                  </Button>
                )}
                {hive.lessee.endDate !== "2025-08-31" && (
                  <Button
                    variant="formBtn"
                    size="medium"
                    onClick={() => openModal(hive, "extendSeason")}
                  >
                    Продовжити до кінця сезону
                  </Button>
                )}
                <Button
                  variant="formBtn"
                  size="medium"
                  onClick={() => openModal(hive, "videoReview")}
                >
                  Замовити онлайн-відеоогляд
                </Button>
                <Button
                  variant="formBtn"
                  size="medium"
                  onClick={() => openModal(hive, "cancelContract")}
                >
                  скасувати договір оренди
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </tbody>
      </Table>

      {modalType && (
        <ContractModal
          isOpen={isModalOpen}
          onClose={closeModal}
          onSignContract={
            modalType === "cancelContract"
              ? handleCancelContract
              : handleExtendContract
          }
          contractType={modalType}
          hive={selectedHive}
        />
      )}
    </div>
  );
};
