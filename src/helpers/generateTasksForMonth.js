import { v4 as uuidv4 } from "uuid";

import { beekeepingTasks } from "../constants/beekeepingTasks";

export const generateTasksForMonth = (currentMonth) => {
  const now = new Date();
  const twoDaysBefore = new Date(now.getTime() + 49 * 60 * 60 * 1000); // 48 годин до поточної дати
  const plannedDate = twoDaysBefore.toISOString().slice(0, 16); // Призначення значення за замовчуванням

  return beekeepingTasks
    .filter((task) => task.month.includes(currentMonth))
    .map((task) => ({
      id: uuidv4(), // Unique ID for each task
      name: task.name,
      purpose: task.purpose,
      description: task.description,
      cost: task.duration * (task.costPerHour / 60),
      plannedDate,
      duration: task.duration,
      status: "Pending",
      executor: null,
      date: null,
    }));
};
