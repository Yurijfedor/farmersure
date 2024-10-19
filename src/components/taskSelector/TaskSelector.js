import React, { useState } from "react";

import { CustomTaskForm } from "../сustomTaskForm/CustomTaskForm";
import { beekeepingTasks } from "../../constants/beekeepingTasks";
import { unifyTask } from "../../helpers/generateTasksForMonth";
import { useUpdateHiveTasks, useAddSingleTasks } from "../../hooks/useHives";

export const TaskSelector = ({ addTaskToTable, hiveId, tasks }) => {
  // Стан для обраного завдання
  const [selectedTask, setSelectedTask] = useState("");
  const { mutate: updateTasks } = useUpdateHiveTasks();
  const { mutate: addSingleTask } = useAddSingleTasks();
  const [customTask, setCustomTask] = useState({
    name: "",
    purpose: "",
    description: "",
    duration: "",
    costPerHour: "",
  });
  const [errorMessage, setErrorMessage] = useState("");

  // Обробник зміни полів введення для власного завдання
  const handleCustomTaskChange = (e) => {
    setCustomTask({
      ...customTask,
      [e.target.name]: e.target.value,
    });
  };

  // Перевірка на заповнення всіх полів
  const validateCustomTaskFields = () => {
    const { name, purpose, description, duration, costPerHour } = customTask;
    if (!name || !purpose || !description || !duration || !costPerHour) {
      setErrorMessage("Будь ласка, заповніть усі обов'язкові поля.");
      return false;
    }
    return true;
  };

  // Функція для додавання обраного завдання
  const handleAddTask = () => {
    if (selectedTask === "custom") {
      if (!validateCustomTaskFields()) return;
      // Якщо обране власне завдання
      addTaskToTable((prevTasks) => [
        unifyTask(customTask, hiveId),
        ...prevTasks,
      ]);
      addSingleTask({
        hiveId: hiveId,
        task: unifyTask(customTask, hiveId),
      });
    } else {
      // Якщо обране завдання зі списку
      const task = beekeepingTasks.find((t) => t.name === selectedTask);
      if (task) {
        const unifiedTask = unifyTask(task, hiveId);
        addTaskToTable((prevTasks) => [unifiedTask, ...prevTasks]); // Викликаємо функцію, щоб додати завдання у таблицю
        addSingleTask({ hiveId: hiveId, task: unifiedTask });
      }
    }
    // Очистити стан після додавання
    setSelectedTask("");
    setCustomTask({
      name: "",
      purpose: "",
      description: "",
      duration: "",
      costPerHour: "",
    });
    setErrorMessage(""); // Очистити повідомлення про помилку після успішного додавання
  };

  return (
    <div>
      <label htmlFor="taskSelect">Виберіть завдання: </label>
      <select
        id="taskSelect"
        value={selectedTask}
        onChange={(e) => setSelectedTask(e.target.value)}
      >
        <option value="" disabled>
          Виберіть завдання
        </option>
        {beekeepingTasks.map((task) => (
          <option key={task.name} value={task.name}>
            {task.name}
          </option>
        ))}
        <option value="custom">Створити власне завдання</option>
      </select>
      {/* Рендеримо форму для створення власного завдання, якщо вибраний пункт "Створити власне завдання" */}
      {selectedTask === "custom" && (
        <CustomTaskForm
          customTask={customTask}
          handleCustomTaskChange={handleCustomTaskChange}
          handleAddTask={handleAddTask}
          errorMessage={errorMessage}
        />
      )}
      {selectedTask !== "custom" && (
        <button onClick={handleAddTask}>Додати завдання</button>
      )}
    </div>
  );
};
