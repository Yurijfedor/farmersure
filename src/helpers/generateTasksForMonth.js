import { v4 as uuidv4 } from "uuid";

import { beekeepingTasks } from "../constants/beekeepingTasks";

export const generateTasksForMonth = (
  currentMonth,
  hiveId,
  selectedServices
) => {
  const now = new Date();
  const twoDaysBefore = new Date(now.getTime() + 49 * 60 * 60 * 1000); // 48 годин до поточної дати
  const plannedDate = twoDaysBefore.toISOString().slice(0, 16); // Призначення значення за замовчуванням

  const tasks = beekeepingTasks
    .filter((task) => {
      // Завдання має бути доступне для поточного місяця
      const isCurrentMonth = task.month.includes(currentMonth);

      // Завдання обов'язкове
      const isRequiredTask = task.priority === "обов'язкова";

      // Отримати список обраних сервісів
      // const selectedServices = Object.entries(additionalServices)
      //   .filter(([_, isSelected]) => isSelected) // Враховуються лише обрані сервіси
      //   .map(([service]) => service);

      // Додатковий сервіс відповідає завданню
      const matchesSelectedServices =
        Array.isArray(task.purpose) &&
        task.purpose.length > 0 &&
        task.purpose.some((purpose) => selectedServices.includes(purpose));

      // Завдання додається, якщо:
      // 1. Воно обов'язкове
      // 2. Відповідає обраному сервісу
      // 3. І все це доступне у поточному місяці
      return isCurrentMonth || isRequiredTask || matchesSelectedServices;
    })
    .map((task) => ({
      id: uuidv4(),
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
      priority: task.priority || null,
      frequency: task.frequency || null,
    }));
  console.log(tasks);

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
    cost: task.cost || task.duration * (task.costPerHour / 60),
    plannedDate,
    duration: task.duration,
    status: "Pending",
    executor: null,
    date: null,
    notes: task.notes || "",
    priority: task.priority || null,
  };
};

export const generateMissingTasks = (
  currentTasks,
  requiredTasks,
  currentMonth,
  hiveId
) => {
  const missingTasks = [];

  requiredTasks.forEach((task) => {
    const currentTaskCount = currentTasks.filter(
      (t) => t.name === task.name
    ).length;

    const requiredCount = task.frequency ? task.frequency[currentMonth] : 1; // Частота завдання для поточного місяця
    if (currentTaskCount < requiredCount) {
      const tasksToGenerate = requiredCount - currentTaskCount;

      for (let i = 0; i < tasksToGenerate; i++) {
        const newTask = unifyTask(task, hiveId); // Використовуємо unifyTask для створення нового завдання
        missingTasks.push(newTask);
      }
    }
  });

  return missingTasks;
};
