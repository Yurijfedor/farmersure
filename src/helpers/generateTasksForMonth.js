import { v4 as uuidv4 } from "uuid";

import { beekeepingTasks } from "../constants/beekeepingTasks";

export const generateTasksForMonth = (currentMonth, hiveId) => {
  const now = new Date();
  const twoDaysBefore = new Date(now.getTime() + 49 * 60 * 60 * 1000); // 48 годин до поточної дати
  const plannedDate = twoDaysBefore.toISOString().slice(0, 16); // Призначення значення за замовчуванням

  const tasks = beekeepingTasks
    .filter((task) => task.month.includes(currentMonth))
    .map((task) => ({
      id: uuidv4(), // Unique ID for each task
      // id: 1, // Unique ID for each task
      hiveId,
      name: task.name,
      purpose: task.purpose,
      description: task.description,
      cost: task.duration * (task.costPerHour / 60),
      plannedDate,
      duration: task.duration,
      status: "Pending",
      executor: null,
      date: null,
      notes: "",
    }));
  const user = JSON.parse(localStorage.getItem("user"));
  localStorage.setItem(`tasks-${hiveId}-${user.uid}`, JSON.stringify(tasks));
  return tasks;
};

export const unifyTask = (task, hiveId) => {
  const now = new Date();
  const twoDaysBefore = new Date(now.getTime() + 49 * 60 * 60 * 1000); // 48 годин до поточної дати
  const plannedDate = twoDaysBefore.toISOString().slice(0, 16); // Призначення значення за замовчуванням

  return {
    id: uuidv4(), // Генеруємо унікальний ID для кожного завдання
    hiveId,
    name: task.name,
    purpose: task.purpose,
    description: task.description,
    cost: task.duration * (task.costPerHour / 60),
    plannedDate,
    duration: task.duration,
    status: "Pending",
    executor: null,
    date: null,
    notes: task.notes,
  };
};
