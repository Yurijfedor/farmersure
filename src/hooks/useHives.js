import { useQuery } from "@tanstack/react-query";

import { fetchAllHives, fetchHiveById } from "../services/hives";

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
