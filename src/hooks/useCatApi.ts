import { useQuery, useInfiniteQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  addFavorite,
  fetchBreeds,
  fetchCatById,
  fetchCats,
  getFavorites,
  removeFavorite,
} from '../services/api';
import { QUERY_KEYS, API_CONFIG } from '../constants';

export const useGetCats = (limit: number = API_CONFIG.DEFAULT_LIMIT) => {
  return useInfiniteQuery({
    queryKey: [QUERY_KEYS.RANDOM_CATS, limit],
    queryFn: ({ pageParam }: { pageParam: number }) => fetchCats({ limit, page: pageParam }),
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.length === limit ? allPages.length : undefined;
    },
    initialPageParam: API_CONFIG.DEFAULT_PAGE,
  });
};

export const useCatById = (id: string | null) => {
  return useQuery({
    queryKey: [QUERY_KEYS.CAT, id],
    queryFn: () => fetchCatById(id!),
    enabled: !!id,
  });
};

export const useGetFavorites = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.FAVORITES],
    queryFn: getFavorites,
  });
};

export const useAddFavorite = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: addFavorite,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.FAVORITES] });
    },
  });
};

export const useRemoveFavorite = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: removeFavorite,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.FAVORITES] });
    },
  });
};

export const useBreeds = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.BREEDS],
    queryFn: fetchBreeds,
  });
};

export const useCatsByBreed = (
  breedId: string | null,
  limit: number = API_CONFIG.DEFAULT_LIMIT
) => {
  return useQuery({
    queryKey: [QUERY_KEYS.BREED_CATS, breedId, limit],
    queryFn: () => {
      if (!breedId) throw new Error('Breed ID is required');
      return fetchCats({ breedId, limit });
    },
    enabled: !!breedId,
  });
};
