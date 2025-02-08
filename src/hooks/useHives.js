import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import {
  fetchAllHives,
  fetchHiveById,
  updateHiveTasks,
  deleteHiveTask,
  addTaskToConfirmationCollection,
  addSingleTask,
  updateTaskStatus,
  checkBeehiveRentals,
} from "../services/hives";

export const useHivesQuery = () => {
  return useQuery({
    queryFn: () => fetchAllHives(),
    queryKey: ["hives", "all"],
    onError: (err) => console.log(err),
  });
};

export const useHive = (hiveId) => {
  return useQuery(["hive", hiveId], () => fetchHiveById(hiveId), {
    enabled: !!hiveId, // Запит не виконується, якщо hiveId не існує
  });
};

export const useUpdateHiveTasks = () => {
  const queryClient = useQueryClient();

  return useMutation(updateHiveTasks, {
    onSuccess: (data, variables) => {
      // Оновлення кешу для цього вулика після успішного оновлення
      queryClient.invalidateQueries(["hive", variables.hiveId]);
    },
    onError: (error) => {
      console.error("Error updating hive tasks:", error);
    },
  });
};

export const useUpdateTaskStatus = () => {
  const queryClient = useQueryClient();

  return useMutation(updateTaskStatus, {
    onSuccess: (data, variables) => {
      // Оновлення кешу для цього вулика після успішного оновлення
      queryClient.invalidateQueries(["hive", variables.hiveId]);
    },
    onError: (error) => {
      console.error("Error updating hive tasks:", error);
    },
  });
};

export const useAddSingleTasks = () => {
  const queryClient = useQueryClient();

  return useMutation(addSingleTask, {
    onSuccess: (data, variables) => {
      console.log(data);

      // Оновлення кешу для цього вулика після успішного оновлення
      queryClient.invalidateQueries(["hive", variables.hiveId]);
    },
    onError: (error) => {
      console.error("Error updating hive tasks:", error);
    },
  });
};

export const useDeleteHiveTask = () => {
  const queryClient = useQueryClient();

  return useMutation(deleteHiveTask, {
    onSuccess: (data, variables) => {
      // Оновлення кешу для цього вулика після успішного видалення
      queryClient.invalidateQueries(["hive", variables.hiveId]);
    },
    onError: (error) => {
      console.error("Error deleting hive task:", error);
    },
  });
};

// Мутація для додавання завдань до колекції завдань для підтвердження
export const useAddTaskToConfirmation = () => {
  const queryClient = useQueryClient();

  return useMutation(addTaskToConfirmationCollection, {
    onSuccess: (data, variables) => {
      console.log("Task added to confirmation collection");

      // Інвалідація кешу конкретного вулика
      queryClient.invalidateQueries(["hive", variables.hiveId]);
    },
    onError: (error) => {
      console.error("Error adding task to confirmation collection:", error);
    },
  });
};

export const useCheckBeehiveRentals = () => {
  const queryClient = useQueryClient();

  return useMutation(checkBeehiveRentals, {
    onSuccess: () => {
      queryClient.invalidateQueries(["hives"]);
    },
    onError: (error) => {
      console.error("Error checking beehive rentals:", error);
    },
  });
};
