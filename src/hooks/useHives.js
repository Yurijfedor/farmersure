import { useQuery } from '@tanstack/react-query';

import { fetchAllHives } from '../services/hives';

export const useHivesQuery = () => {
  return useQuery({
    queryFn: () => fetchAllHives(),
    queryKey: ['hives', 'all'],
    onError: (err) => console.log(err),
  });
};
