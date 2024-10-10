import { v4 as uuidv4 } from "uuid";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Thumbs } from "swiper/modules"; // Підключаємо модулі Navigation і Thumbs

import { useHive } from "../../hooks/useHives";

import "swiper/swiper-bundle.css";
import { Modal } from "../modal/Modal";
import { PerformanceScale } from "../performanceScale/PerformanceScale";
import { RentInfo } from "../rentInfo/RentInfo";
import { TaskTable } from "../taskTable/TaskTable";
import { useLockBodyScroll } from "../../hooks/useLockBodyScroll";
import { ageOfQueen } from "../../helpers/ageOfQueen";
import { calculatePerformance } from "../../helpers/calculatePerformance";
import { productPrices } from "../../constants/prices";
import { beekeepingTasks } from "../../constants/beekeepingTasks";
import { generateTasksForMonth } from "../../helpers/generateTasksForMonth";

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
  const hiveId = useParams();
  const { data: hive, isLoading, error } = useHive(hiveId); // завантажуємо дані про вулик  console.log(hive);
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
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

  const currentMonth = new Date().toLocaleString("uk-UA", { month: "long" });

  const defaultTasks = beekeepingTasks.filter((task) =>
    task.month.includes(currentMonth)
  );

  // const generateTasksForMonth = () => {
  //   return beekeepingTasks
  //     .filter((task) => task.month.includes(currentMonth))
  //     .map((task) => ({
  //       id: uuidv4(), // Unique ID for each task
  //       name: task.name,
  //       purpose: task.purpose,
  //       description: task.description,
  //       cost: ((100 * task.duration) / 60) * task.costPerHour,
  //       status: "Pending",
  //       executor: null,
  //       date: null,
  //     }));
  // };

  const handleConfirmTask = (taskId) => {
    console.log(`confirmed ${taskId}`);
  };

  const handleDeleteTask = (taskId) => {
    console.log(`deleted ${taskId}`);
  };

  console.log(hive.number);

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
      <RentInfo hiveComponents={hive.hiveComponents} power={hive.power} />
      <h3>Планові роботи на {currentMonth} місяць</h3>
      <TaskTable
        tasks={
          hive.tasks && hive.tasks.length !== 0
            ? hive.tasks
            : generateTasksForMonth(currentMonth)
        }
        onConfirmTask={handleConfirmTask}
        onDeleteTask={handleDeleteTask}
      />
    </>
  );
};
