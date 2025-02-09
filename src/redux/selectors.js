import { createSelector } from "@reduxjs/toolkit";

export const selectHives = (state) => state.hives.hives;
export const selectIsLoading = (state) => state.hives.isLoading;
export const selectError = (state) => state.hives.error;
export const selectUserProfile = (state) => state.user.profile;
export const selectIsProfileLoading = (state) => state.user.isLoading;
export const selectProfileError = (state) => state.user.error;

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
    return hive && hive.tasks
      ? hive.tasks.filter((task) => task.status === status)
      : [];
  }
);

export const selectHiveById = createSelector(
  [selectHives, (_, hiveId) => hiveId], // Передаємо hiveId
  (hives, hiveId) => {
    return hives.find((hive) => hive.id === hiveId) || null; // Повертаємо вулик або null, якщо не знайдено
  }
);

// Новий селектор для підсумовування вартості завдань
export const selectPlannedTasksCost = createSelector(
  [selectHives, selectUserProfile], // Отримуємо вулики та профіль користувача
  (hives, userProfile) => {
    if (!userProfile) return 0;

    const userId = userProfile.id;

    // Фільтруємо вулики, які орендує поточний користувач
    const userHives = hives.filter((hive) => hive.lessee.uid === userId);

    // Збираємо всі завдання зі статусами "Under Review" і "Approved"
    const plannedTasks = userHives.flatMap((hive) =>
      hive.tasks.filter(
        (task) => task.status === "Under Review" || task.status === "Approved"
      )
    );

    // Підсумовуємо їхню вартість
    const result = plannedTasks.reduce((total, task) => total + task.cost, 0);

    return result;
  }
);

export const selectHivesByLessee = createSelector(
  [selectHives, (_, uid) => uid], // Отримуємо всі вулики та uid як аргумент
  (hives, uid) => {
    return hives.filter((hive) => hive.lessee?.uid === uid); // Фільтруємо вулики за uid орендаря
  }
);
