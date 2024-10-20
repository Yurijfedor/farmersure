import { createSelector } from "@reduxjs/toolkit";

export const selectHives = (state) => state.hives.hives;

export const selectTasksUnderReview = createSelector(
  [selectHives], // Отримуємо всі вулики з state
  (hives) => {
    return hives
      .flatMap((hive) => hive.tasks) // Об'єднуємо всі tasks з усіх вуликів
      .filter((task) => task.status === "Under Review"); // Фільтруємо по статусу
  }
);
