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

export const calculateMandatoryTasksCostForNextPeriod = (modalType) => {
  const currentMonthIndex = new Date().getMonth();
  const months = [
    "січень",
    "лютий",
    "березень",
    "квітень",
    "травень",
    "червень",
    "липень",
    "серпень",
    "вересень",
    "жовтень",
    "листопад",
    "грудень",
  ];
  const nextMonthIndex = (currentMonthIndex + 1) % 12;

  const startMonthIndex = nextMonthIndex;
  let endMonthIndex = nextMonthIndex;

  if (modalType === "extendSeason") {
    endMonthIndex = 7; // серпень
  }

  return beekeepingTasks.reduce((totalCost, task) => {
    if (task.priority !== "обов'язкова" || !task.frequency) return totalCost;

    const costPerMinute = task.costPerHour / 60;

    return months.reduce((sum, month, index) => {
      if (
        index >= startMonthIndex &&
        index <= endMonthIndex &&
        task.frequency[month]
      ) {
        return sum + task.duration * costPerMinute * task.frequency[month];
      }
      return sum;
    }, totalCost);
  }, 0);
};
