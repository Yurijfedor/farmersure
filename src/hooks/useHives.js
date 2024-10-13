import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import {
  fetchAllHives,
  fetchHiveById,
  updateHiveTasks,
  deleteHiveTask,
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
