import { beekeepingTasks } from "../constants/beekeepingTasks";

export const calculateMandatoryTasksCost = () => {
  const data = beekeepingTasks
    .filter((task) => task.priority === "обов'язкова")
    .reduce((totalCost, task) => {
      const taskCost = Object.entries(task.frequency).reduce(
        (monthlyCost, [_, frequency]) => {
          const singleTaskCost = task.duration * (task.costPerHour / 60);
          return monthlyCost + singleTaskCost * frequency; // Враховуємо частоту виконання
        },
        0
      );
      return totalCost + taskCost;
    }, 0);
  return data;
};
