import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
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
import {
  useUpdateHiveTasks,
  useAddTaskToConfirmation,
  useDeleteHiveTask,
  useHive,
} from "../../hooks/useHives";
import { updateTaskState, removeTaskFromHive } from "../../redux/hivesSlice";
import { ageOfQueen } from "../../helpers/ageOfQueen";
import { calculatePerformance } from "../../helpers/calculatePerformance";
import { calculateTotalRent } from "../../helpers/calculateRent";
import { productPrices } from "../../constants/prices";
import { generateTasksForMonth } from "../../helpers/generateTasksForMonth";
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

const currentMonth = new Date().toLocaleString("uk-UA", { month: "long" });

export const BeeHiveCard = () => {
  const hiveId = useParams();
  const user = JSON.parse(localStorage.getItem("user"));
  const dispatch = useDispatch();
  const { data: hive, isLoading, error } = useHive(hiveId); // завантажуємо дані про вулик  console.log(hive);
  const { mutate: updateTasks } = useUpdateHiveTasks();
  const { mutate: deleteTask } = useDeleteHiveTask();
  const { mutate: addTaskToConfirmation } = useAddTaskToConfirmation();
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isContractModalOpen, setIsContractModalOpen] = useState(false);
  const [activeImage, setActiveImage] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startPosition, setStartPosition] = useState({ x: 0, y: 0 });
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [agreeWithBasicTech, setAgreeWithBasicTech] = useState(false);
  const [additionalServices, setAdditionalServices] = useState({
    pollen: false,
    propolis: false,
    wax: false,
    royalJelly: false,
    droneHomogenate: false,
    beeVenom: false,
  });
  const [plannedTasksTotalCost, setPlannedTasksTotalCost] = useState(0);
  const [rentTotalCost, setRentTotalCost] = useState(0);

  const [tasks, setTasks] = useState(
    hive && hive.tasks && hive.tasks.length !== 0
      ? hive.tasks
      : !JSON.parse(localStorage.getItem(`tasks-${hiveId.hiveId}-${user.uid}`))
      ? generateTasksForMonth(currentMonth, hiveId.hiveId)
      : JSON.parse(localStorage.getItem(`tasks-${hiveId.hiveId}-${user.uid}`))
  );

  useEffect(() => {
    if (hive && hive.tasks) {
      // Якщо є завдання у Firebase
      setTasks(hive.tasks.length !== 0 ? hive.tasks : []);
    } else {
      // Якщо завдань у Firebase немає, завантажити з LocalStorage
      const localTasks = localStorage.getItem(
        `tasks-${hiveId.hiveId}-${user.uid}`
      );
      if (localTasks) {
        setTasks(JSON.parse(localTasks));
      }
    }
  }, [hive, hiveId, user.uid]); // Залежності без tasks

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

  const handleCheckboxChange = (e) => {
    setAgreeWithBasicTech(e.target.checked); // Оновлюємо стан при зміні чекбоксу
  };

  const handleAdditionalServiceChange = (e) => {
    const { name, checked } = e.target;
    setAdditionalServices((prevServices) => ({
      ...prevServices,
      [name]: checked, // Оновлюємо стан відповідної додаткової послуги
    }));
  };

  const performance = calculatePerformance(
    hive,
    additionalServices,
    agreeWithBasicTech
  );

  const handleConfirmTask = (taskId) => {
    console.log(taskId);

    const taskToUpdate = tasks.map((task) => {
      return task.id === taskId ? { ...task, status: "Under Review" } : task;
    });

    const taskToConfirmation = tasks.filter((task) => task.id === taskId);

    setTasks(taskToUpdate); // Оновлюємо стан завдань
    updateTasks({ hiveId: hiveId.hiveId, tasks: taskToUpdate }); // Оновлюємо Firestore
    addTaskToConfirmation(taskToConfirmation[0]);
    dispatch(
      updateTaskState({
        hiveId: hiveId.hiveId,
        updatedTask: taskToUpdate,
      })
    );
  };

  // Функція для видалення завдання
  const handleDeleteTask = (taskId) => {
    // Фільтруємо завдання, видаляючи вибране
    const updatedTasks = tasks.filter((task) => task.id !== taskId);
    // Оновлюємо Firestore, передаючи оновлений масив tasks
    deleteTask({ hiveId: hiveId.hiveId, tasks: updatedTasks });
    // Оновлюємо локальний стан
    setTasks(updatedTasks);
    dispatch(removeTaskFromHive({ hiveId: hiveId.hiveId, taskId }));
  };

  const handleOpenContractModal = () => {
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

  const handleSignContract = () => {
    // Логіка для списання суми з балансу користувача
    handleCloseContractModal();
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
            checked={agreeWithBasicTech}
            onChange={handleCheckboxChange}
          />
          Погоджуюсь застосовувати Базову технологію бджільництва
        </label>
      </div>

      {/* Виводимо поточний стан чекбоксу */}
      <p style={{ textAlign: "center", margin: "10px 0 20px 0" }}>
        {agreeWithBasicTech
          ? "Ви погодились застосовувати Базову технологію бджільництва"
          : "Ви ще не погодились застосовувати Базову технологію бджільництва"}
      </p>
      <PerformanceScale
        prices={productPrices}
        performance={performance}
        power={hive.power}
      />
      {/* Група чекбоксів для додаткових послуг */}
      <Wrapper>
        <h3 style={{ marginBottom: "20px" }}>Додаткові послуги:</h3>
        <div style={{ marginBottom: "10px" }}>
          <label>
            <input
              type="checkbox"
              name="pollen"
              checked={additionalServices.pollen}
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
              checked={additionalServices.propolis}
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
              checked={additionalServices.wax}
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
              checked={additionalServices.royalJelly}
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
              checked={additionalServices.droneHomogenate}
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
              checked={additionalServices.beeVenom}
              onChange={handleAdditionalServiceChange}
            />
            Бджолина отрута (сирець)
          </label>
        </div>
      </Wrapper>

      {/* Виведення стану додаткових послуг */}
      <Wrapper>
        <h4>Обрані послуги:</h4>
        <p>{additionalServices.pollen && "Пилок"}</p>
        <p>{additionalServices.propolis && "Прополіс"}</p>
        <p>{additionalServices.wax && "Віск"}</p>
        <p>{additionalServices.royalJelly && "Маточне молочко"}</p>
        <p>{additionalServices.droneHomogenate && "Трутневий гомогенат"}</p>
        <p>{additionalServices.beeVenom && "Бджолина отрута (сирець)"}</p>
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
        tasks={tasks}
        onConfirmTask={handleConfirmTask}
        onDeleteTask={handleDeleteTask}
        setTasks={setTasks}
        currentMonth={currentMonth}
        hiveId={hiveId.hiveId}
        onPlannedTasksTotalCostChange={handlePlannedTasksTotalCostChange}
      />
      <Button
        variant="formBtn" // Вибираємо один з варіантів стилів, наприклад "formBtn"
        size="large" // Розмір кнопки, наприклад "large"
        onClick={handleOpenContractModal} // Функція для відкриття модалки
      >
        Оформити договір оренди на наступний місяць ( $
        {(totalRent + plannedTasksTotalCost).toFixed(2)} )
        <br />
        управління бджолосім'єю онлайн, збір доступних продуктів бджільництва
      </Button>
      <Button
        variant="formBtn" // Вибираємо один з варіантів стилів, наприклад "formBtn"
        size="large" // Розмір кнопки, наприклад "large"
        onClick={handleOpenContractModal} // Функція для відкриття модалки
      >
        Оформити договір оренди на 6 місяців - повний сезон ($
        {(totalRent * 6 + calculateMandatoryTasksCost()).toFixed(2)})
        <br />
        управління бджолосім'єю онлайн, гарантоване отримання базового набору
        продуктів бджільництва
      </Button>
      {/* Модалка для договору */}
      <ContractModal
        isOpen={isContractModalOpen}
        onClose={handleCloseContractModal}
        contractText={contractText}
        onSignContract={handleSignContract}
      />
    </>
  );
};
