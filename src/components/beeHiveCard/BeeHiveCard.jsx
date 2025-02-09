import { useState, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Thumbs } from "swiper/modules"; // Підключаємо модулі Navigation і Thumbs

import "swiper/swiper-bundle.css";
import { Modal } from "../modal/Modal";
import { PerformanceScale } from "../performanceScale/PerformanceScale";
import { RentInfo } from "../rentInfo/RentInfo";
import { TaskTable } from "../taskTable/TaskTable";
import { useLockBodyScroll } from "../../hooks/useLockBodyScroll";
import { Button } from "../button/Button";
import { ContractModal } from "../сontractModal/ContractModal";
import { useUpdateHiveTasks, useDeleteHiveTask } from "../../hooks/useHives";
import {
  updateAgreeWithBasicTech,
  updateAdditionalService,
  updateHiveProperty,
} from "../../redux/operations";
import {
  updateTasksStatus,
  removeTaskFromHive,
  updateHiveTasks,
  updateHive,
} from "../../redux/hivesSlice";
import {
  selectHiveById,
  selectIsLoading,
  selectError,
  selectUserProfile,
  selectPlannedTasksCost,
} from "../../redux/selectors";
import { ageOfQueen } from "../../helpers/ageOfQueen";
import { calculatePerformance } from "../../helpers/calculatePerformance";
import { calculateTotalRent } from "../../helpers/calculateRent";
import {
  generateTasksForMonth,
  generateMissingTasks,
} from "../../helpers/generateTasksForMonth";
import { calculateMandatoryTasksCost } from "../../helpers/calculateMandatoryTasksCost";

import {
  SwiperWrapper,
  MainSwiperWrapper,
  ThumbSwiperWrapper,
  SwiperImage,
  ThumbImage,
  ModalImage,
  ImageContainer,
  Description,
  Wrapper,
} from "./BeeHiveCard.styled";

export const BeeHiveCard = () => {
  // const currentMonth = new Date().toLocaleString("uk-UA", { month: "long" });
  const currentMonth = "червень";
  const user = JSON.parse(localStorage.getItem("user"));
  const hiveId = useParams();
  const dispatch = useDispatch();
  const hive = useSelector((state) => selectHiveById(state, hiveId.hiveId));
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectError);
  const { mutate: updateTasks } = useUpdateHiveTasks();
  const { mutate: deleteTask } = useDeleteHiveTask();
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isContractModalOpen, setIsContractModalOpen] = useState(false);
  const [activeImage, setActiveImage] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startPosition, setStartPosition] = useState({ x: 0, y: 0 });
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [plannedTasksTotalCost, setPlannedTasksTotalCost] = useState(0);
  const [useRequiredTasks, setUseRequiredTasks] = useState(true);
  const [contractType, setContractType] = useState(null);
  const userProfile = useSelector(selectUserProfile);
  const plannedTasksCost = useSelector(selectPlannedTasksCost);

  const selectedServices = useMemo(() => {
    const services = Object.entries(hive.additionalServices)
      .filter(([_, isSelected]) => isSelected) // Враховуються лише обрані сервіси
      .map(([service]) => service);

    if (hive.agreeWithBasicTech) {
      services.push("honey"); // Додається сервіс honey
    }

    return services;
  }, [hive.additionalServices, hive.agreeWithBasicTech]); // Додано залежність `agreeWithBasicTech`

  useEffect(
    () => {
      const requiredTasks = generateTasksForMonth(
        currentMonth,
        hiveId.hiveId,
        selectedServices
      ); // Завдання для поточного місяця

      const missingTasks = generateMissingTasks(
        hive.tasks,
        requiredTasks,
        currentMonth,
        hiveId.hiveId
      );

      if (useRequiredTasks) {
        const ttasks = [...hive.tasks, ...missingTasks];
        const newTasks = ttasks.filter((task) => {
          const matchesSelectedServices =
            Array.isArray(task.purpose) &&
            task.purpose.length > 0 &&
            task.purpose.some((purpose) => selectedServices.includes(purpose));

          return (
            task.status !== "Pending" ||
            task.priority === "обов'язкова" ||
            matchesSelectedServices
          );
        });
        dispatch(updateHiveTasks({ hiveId: hiveId.hiveId, newTasks }));
      } else {
        console.log("All tasks for the current month are already present.");
        const newTasks = [...hive.tasks, ...missingTasks];
        dispatch(updateHiveTasks({ hiveId: hiveId.hiveId, newTasks }));
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [
      currentMonth,
      dispatch,
      hiveId.hiveId,
      useRequiredTasks,
      hive.additionalServices, // Залежність доданого/знятного сервісу
      hive.agreeWithBasicTech,
    ]
  );

  const handleRequiredTasks = () => {
    setUseRequiredTasks((prevState) => {
      return !prevState;
    });
  };

  useLockBodyScroll(isModalOpen);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const openModal = (image) => {
    setActiveImage(image);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setActiveImage(null);
  };

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartPosition({ x: e.clientX, y: e.clientY });
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;

    const dx = e.clientX - startPosition.x;
    const dy = e.clientY - startPosition.y;
    setOffset((prevOffset) => ({
      x: prevOffset.x + dx,
      y: prevOffset.y + dy,
    }));
    setStartPosition({ x: e.clientX, y: e.clientY }); // Оновлюємо стартову позицію
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleBasicTechChange = (e) => {
    dispatch(
      updateAgreeWithBasicTech({
        hiveId: hiveId.hiveId,
        value: e.target.checked,
      })
    );
  };

  const handleAdditionalServiceChange = (e) => {
    const { name, checked } = e.target;
    dispatch(
      updateAdditionalService({
        hiveId: hiveId.hiveId,
        service: name,
        value: checked,
      })
    );
  };

  const performance = calculatePerformance(hive);

  const handleConfirmTask = (taskId) => {
    console.log(hive.lessee.uid === userProfile.id);

    if (hive.lessee.uid !== userProfile.id) {
      alert("Вам потрібно оформити договір оренди на цей вулик");
      return;
    }
    const currentTask = hive.tasks.find((task) => task.id === taskId);
    if (!currentTask) {
      console.error("Завдання не знайдено");
      return;
    }

    const remainingBalance = userProfile.balance - plannedTasksCost;

    if (
      currentTask.status !== "Approved" &&
      remainingBalance < currentTask.cost
    ) {
      alert(
        "Недостатньо коштів на балансі для виконання цього завдання. Будь ласка, поповніть баланс."
      );
      return;
    }
    const tasksToUpdate = hive.tasks
      .filter((task) => task.status !== "Pending" || task.id === taskId)
      .map((task) =>
        task.id === taskId ? { ...task, status: "Under Review" } : task
      );

    const taskToConfirmation = tasksToUpdate.filter(
      (task) => task.id === taskId
    );

    // setTasks(taskToUpdate); // Оновлюємо стан завдань
    updateTasks({ hiveId: hiveId.hiveId, tasks: tasksToUpdate }); // Оновлюємо Firestore
    dispatch(
      updateTasksStatus({
        hiveId: hiveId.hiveId,
        updatedTask: taskToConfirmation[0],
      })
    );
  };

  // Функція для видалення завдання
  const handleDeleteTask = (taskId) => {
    // Фільтруємо завдання, видаляючи вибране
    const updatedTasks = hive.tasks.filter(
      (task) => task.id !== taskId && task.status !== "Pending"
    );
    // Оновлюємо Firestore, передаючи оновлений масив tasks
    deleteTask({ hiveId: hiveId.hiveId, tasks: updatedTasks });
    // Оновлюємо локальний стан
    dispatch(removeTaskFromHive({ hiveId: hiveId.hiveId, taskId }));
  };

  const handleOpenContractModal = (contractType) => {
    setContractType(contractType);
    setIsContractModalOpen(true);
  };

  const handleCloseContractModal = () => {
    setIsContractModalOpen(false);
  };

  const contractText = `
    Договір оренди вулика та бджолосім'ї...
    Орендодавець: __________
    Орендар: __________
    Вартість оренди: __________
    Заплановані роботи: __________
    Умови договору: __________
  `;

  const handleSignContract = (contractType) => {
    try {
      const today = new Date();
      const startDate = today.toISOString().split("T")[0]; // Поточна дата у форматі YYYY-MM-DD
      let endDate;

      if (contractType === "monthly") {
        // Отримуємо останній день поточного місяця
        const lastDayOfMonth = new Date(
          Date.UTC(today.getFullYear(), today.getMonth() + 1, 0)
        );
        endDate = lastDayOfMonth.toISOString().split("T")[0];
      } else {
        // 31 серпня поточного року
        endDate = new Date(Date.UTC(today.getFullYear(), 7, 31))
          .toISOString()
          .split("T")[0];
      }

      // Оновлюємо Firestore
      dispatch(
        updateHiveProperty({
          hiveId: hiveId.hiveId,
          property: "lessee",
          value: {
            uid: user.uid,
            startDate,
            endDate,
            type: contractType,
          },
        })
      );

      // Оновлюємо локальний стейт
      dispatch(
        updateHive({
          id: hiveId.hiveId,
          updates: {
            lessee: {
              uid: user.uid,
              startDate,
              endDate,
              type: contractType,
            },
          },
        })
      );
      handleCloseContractModal();
    } catch (error) {
      console.error("Помилка підписання договору:", error);
    }
  };

  const handlePlannedTasksTotalCostChange = (newTotalCost) => {
    setPlannedTasksTotalCost(newTotalCost);
  };

  const totalRent = calculateTotalRent(hive.hiveComponents, hive.power);

  return (
    <>
      <h2 style={{ textAlign: "center", marginBottom: "10px" }}>
        "I'm a BeehiveCard"
      </h2>
      {/* Головний Swiper для великого зображення */}
      <SwiperWrapper>
        <MainSwiperWrapper>
          <Swiper
            modules={[Navigation, Thumbs]}
            spaceBetween={10}
            navigation
            thumbs={{
              swiper:
                thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
            }}
          >
            {hive.images.map((image, index) => (
              <SwiperSlide key={index}>
                <SwiperImage
                  src={image}
                  alt={`Hive Image ${index + 1}`}
                  onClick={() => openModal(image)} // Відкриваємо модальне вікно при кліку
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </MainSwiperWrapper>

        {/* Swiper для мініатюр */}
        <ThumbSwiperWrapper>
          <Swiper
            modules={[Thumbs]}
            onSwiper={setThumbsSwiper}
            spaceBetween={10}
            slidesPerView={5}
            watchSlidesProgress
          >
            {hive.images.map((image, index) => (
              <SwiperSlide key={index}>
                <ThumbImage src={image} alt={`Thumbnail ${index + 1}`} />
              </SwiperSlide>
            ))}
          </Swiper>
        </ThumbSwiperWrapper>
      </SwiperWrapper>

      {/* Модальне вікно для великого зображення */}
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <ImageContainer
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp} // Зупиняємо перетягування при виході курсора з області
        >
          <ModalImage
            src={activeImage}
            alt="Original Size"
            style={{
              transform: `scale(2.2) translate(${offset.x}px, ${offset.y}px)`, // Застосовуємо масштаб і зміщення
            }}
          />
        </ImageContainer>
      </Modal>
      <Description>
        <h4>hive system: {hive.system}</h4>
        <h4>the power of the colony: {hive.power} рамок</h4>
        <h4>breed: {hive.breed}</h4>
        <h4>
          the age of the queen bee: {ageOfQueen(hive.queensBirthday)} місяців
        </h4>
      </Description>
      <div style={{ textAlign: "center", marginTop: "20px" }}>
        <label>
          <input
            type="checkbox"
            checked={hive.agreeWithBasicTech}
            onChange={handleBasicTechChange}
          />
          Погоджуюсь застосовувати Базову технологію бджільництва
        </label>
      </div>

      {/* Виводимо поточний стан чекбоксу */}
      <p style={{ textAlign: "center", margin: "10px 0 20px 0" }}>
        {hive.agreeWithBasicTech
          ? "Ви погодились застосовувати Базову технологію бджільництва"
          : "Ви ще не погодились застосовувати Базову технологію бджільництва"}
      </p>
      <PerformanceScale hive={hive} />
      {/* Група чекбоксів для додаткових послуг */}
      <Wrapper>
        <h3 style={{ marginBottom: "20px" }}>Додаткові послуги:</h3>
        <div style={{ marginBottom: "10px" }}>
          <label>
            <input
              type="checkbox"
              name="pollen"
              checked={hive.additionalServices.pollen}
              onChange={handleAdditionalServiceChange}
            />
            Пилок
          </label>
        </div>
        <div style={{ marginBottom: "10px" }}>
          <label>
            <input
              type="checkbox"
              name="propolis"
              checked={hive.additionalServices.propolis}
              onChange={handleAdditionalServiceChange}
            />
            Прополіс
          </label>
        </div>
        <div style={{ marginBottom: "10px" }}>
          <label>
            <input
              type="checkbox"
              name="wax"
              checked={hive.additionalServices.wax}
              onChange={handleAdditionalServiceChange}
            />
            Віск
          </label>
        </div>
        <div style={{ marginBottom: "10px" }}>
          <label>
            <input
              type="checkbox"
              name="royalJelly"
              checked={hive.additionalServices.royalJelly}
              onChange={handleAdditionalServiceChange}
            />
            Маточне молочко
          </label>
        </div>
        <div style={{ marginBottom: "10px" }}>
          <label>
            <input
              type="checkbox"
              name="droneHomogenate"
              checked={hive.additionalServices.droneHomogenate}
              onChange={handleAdditionalServiceChange}
            />
            Трутневий гомогенат
          </label>
        </div>
        <div style={{ marginBottom: "10px" }}>
          <label>
            <input
              type="checkbox"
              name="beeVenom"
              checked={hive.additionalServices.beeVenom}
              onChange={handleAdditionalServiceChange}
            />
            Бджолина отрута (сирець)
          </label>
        </div>
      </Wrapper>

      {/* Виведення стану додаткових послуг */}
      <Wrapper>
        <h4>Обрані послуги:</h4>
        <p>{hive.additionalServices.pollen && "Пилок"}</p>
        <p>{hive.additionalServices.propolis && "Прополіс"}</p>
        <p>{hive.additionalServices.wax && "Віск"}</p>
        <p>{hive.additionalServices.royalJelly && "Маточне молочко"}</p>
        <p>
          {hive.additionalServices.droneHomogenate && "Трутневий гомогенат"}
        </p>
        <p>{hive.additionalServices.beeVenom && "Бджолина отрута (сирець)"}</p>
      </Wrapper>
      <Wrapper>
        <h3
          title="Ви отримаєте всю вироблену цією бджолосім'єю продукцію, якої може бути набагато більше, але не менше вказаної продуктивності, яку ми гарантуємо при застосуванні базової технології."
          style={{ display: "inline-block", cursor: "pointer" }}
        >
          Гарантована продуктивність бджолиної сім'ї
          <span style={{ cursor: "pointer", color: "red", marginLeft: "5px" }}>
            *
          </span>
        </h3>
        <p>Мед: {performance.honey} кг</p>
        {<p>Пилок: {performance.pollenAmount} кг</p>}
        {<p>Прополіс: {performance.propolisAmount} кг</p>}
        {<p>Віск: {performance.waxAmount} кг</p>}
        {<p>Маточне молочко: {performance.royalJellyAmount} кг</p>}
        {<p>Трутневий гомогенат: {performance.droneHomogenateAmount} кг</p>}
        {<p>Бджолина отрута (сирець): {performance.beeVenomAmount} кг</p>}
      </Wrapper>
      <RentInfo
        hiveComponents={hive.hiveComponents}
        power={hive.power}
        totalRent={totalRent.toFixed(2)}
      />

      <TaskTable
        tasks={hive.tasks}
        onConfirmTask={handleConfirmTask}
        onDeleteTask={handleDeleteTask}
        currentMonth={currentMonth}
        hiveId={hiveId.hiveId}
        onPlannedTasksTotalCostChange={handlePlannedTasksTotalCostChange}
        handleRequiredTasks={handleRequiredTasks}
        useRequiredTasks={useRequiredTasks}
      />
      {hive.lessee.uid === "" && (
        <>
          <Button
            variant="formBtn" // Вибираємо один з варіантів стилів, наприклад "formBtn"
            size="large" // Розмір кнопки, наприклад "large"
            onClick={() => handleOpenContractModal("monthly")} // Функція для відкриття модалки
          >
            Оформити договір оренди на наступний місяць ($
            {(totalRent + plannedTasksTotalCost).toFixed(2)})
            <br />
            управління бджолосім'єю онлайн, збір доступних продуктів
            бджільництва
          </Button>
          <Button
            variant="formBtn" // Вибираємо один з варіантів стилів, наприклад "formBtn"
            size="large" // Розмір кнопки, наприклад "large"
            onClick={() => handleOpenContractModal("seasonal")} // Функція для відкриття модалки
          >
            Оформити договір оренди на повний сезон ($
            {(totalRent * 6 + calculateMandatoryTasksCost()).toFixed(2)})
            <br />
            управління бджолосім'єю онлайн, гарантоване отримання базового
            набору продуктів бджільництва
          </Button>
        </>
      )}
      {/* Модалка для договору */}
      <ContractModal
        isOpen={isContractModalOpen}
        onClose={handleCloseContractModal}
        contractText={contractText}
        onSignContract={handleSignContract}
        contractType={contractType}
      />
    </>
  );
};
