import { useQuery, useInfiniteQuery } from '@tanstack/react-query';
import { fetchCatById, fetchCats } from '../services/api';
import { QUERY_KEYS, API_CONFIG } from '../constants';

export const useGetCats = (limit: number = API_CONFIG.DEFAULT_LIMIT) => {
  return useInfiniteQuery({
    queryKey: [QUERY_KEYS.RANDOM_CATS, limit],
    queryFn: ({ pageParam = 0 }) => fetchCats(limit, pageParam),
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.length === limit ? allPages.length : undefined;
    },
    initialPageParam: 0,
  });
};

export const useCatById = (id: string | null) => {
  return useQuery({
    queryKey: [QUERY_KEYS.CAT, id],
    queryFn: () => fetchCatById(id!),
    enabled: !!id,
  });
};
