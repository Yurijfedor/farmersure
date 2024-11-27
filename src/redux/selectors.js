import { createSelector } from "@reduxjs/toolkit";

export const selectHives = (state) => state.hives.hives;
export const selectIsLoading = (state) => state.hives.isLoading;
export const selectError = (state) => state.hives.error;

export const selectAllTasks = createSelector(
  [selectHives], // Отримуємо всі вулики з state
  (hives) => {
    return hives.flatMap((hive) => hive.tasks); // Об'єднуємо всі tasks з усіх вуликів
  }
);

export const selectTasksUnderReview = createSelector(
  [selectHives], // Отримуємо всі вулики з state
  (hives) => {
    return hives
      .flatMap((hive) => hive.tasks) // Об'єднуємо всі tasks з усіх вуликів
      .filter((task) => task.status === "Under Review"); // Фільтруємо по статусу
  }
);

export const selectTasksByStatus = createSelector(
  [selectHives, (_, hiveId, status) => ({ hiveId, status })],
  (hives, { hiveId, status }) => {
    const hive = hives.find((hive) => hive.id === hiveId);
    return hive ? hive.tasks.filter((task) => task.status === status) : [];
  }
);

export const selectHiveById = createSelector(
  [selectHives, (_, hiveId) => hiveId], // Передаємо hiveId
  (hives, hiveId) => {
    return hives.find((hive) => hive.id === hiveId) || null; // Повертаємо вулик або null, якщо не знайдено
  }
);
