import { v4 as uuidv4 } from "uuid";

import { beekeepingTasks } from "../constants/beekeepingTasks";

export const generateTasksForMonth = (currentMonth) => {
  console.log(currentMonth);

  return beekeepingTasks
    .filter((task) => task.month.includes(currentMonth))
    .map((task) => ({
      id: uuidv4(), // Unique ID for each task
      name: task.name,
      purpose: task.purpose,
      description: task.description,
      cost: ((100 * task.duration) / 60) * task.costPerHour,
      status: "Pending",
      executor: null,
      date: null,
    }));
};
