import { useQuery } from "@tanstack/react-query";

import { generateTasksForMonth } from "../helpers/generateTasksForMonth";

const fetchTasksForHive = async (hiveId) => {
  const response = await fetch(`/api/tasks/${hiveId}`);
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};

export const useHiveTasks = (hiveId, currentMonth) => {
  return useQuery(["tasks", hiveId], () => fetchTasksForHive(hiveId), {
    onSuccess: (fetchedTasks) => {
      // Якщо завдань немає в базі даних, використовуємо список з constants
      if (!fetchedTasks || fetchedTasks.length === 0) {
        const defaultTasks = generateTasksForMonth(currentMonth);
        localStorage.setItem(`tasks-${hiveId}`, JSON.stringify(defaultTasks));
        return defaultTasks;
      }

      // Зберігаємо завдання у localStorage
      localStorage.setItem(`tasks-${hiveId}`, JSON.stringify(fetchedTasks));
      return fetchedTasks;
    },
    onError: () => {
      // Якщо виникла помилка, також використовуємо список з constants
      const defaultTasks = generateTasksForMonth(currentMonth);
      return defaultTasks;
    },
  });
};
