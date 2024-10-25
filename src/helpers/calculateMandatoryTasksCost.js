import { beekeepingTasks } from "../constants/beekeepingTasks";

export const calculateMandatoryTasksCost = () => {
  const data = beekeepingTasks
    .filter((task) => task.priority === "обов'язкова")
    .reduce((totalCost, task) => {
      const taskCost = task.duration * (task.costPerHour / 60);
      return totalCost + taskCost;
    }, 0);
  return data;
};
