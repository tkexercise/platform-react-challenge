import React, { useMemo } from 'react';
import type { ReactNode } from 'react';
import { useGetFavorites, useAddFavorite, useRemoveFavorite } from '../hooks/useCatApi';
import { FavoritesContext } from '../contexts/FavoritesContext';
import Loading from '../components/common/Loading';
interface FavoritesProviderProps {
  children: ReactNode;
}

export const FavoritesProvider: React.FC<FavoritesProviderProps> = ({ children }) => {
  const { data: favorites = [], isLoading, isError } = useGetFavorites();
  const addFavoriteMutation = useAddFavorite();
  const removeFavoriteMutation = useRemoveFavorite();

  const value = useMemo(() => {
    const isFavorite = (imageId: string) => {
      return favorites.some((favorite) => favorite.image_id === imageId);
    };

    const getFavoriteId = (imageId: string) => {
      return favorites.find((favorite) => favorite.image_id === imageId)?.id;
    };

    return {
      favorites,
      isLoading,
      mutationLoading: addFavoriteMutation.isPending || removeFavoriteMutation.isPending,
      isError,
      addFavorite: async (imageId: string) => {
        await addFavoriteMutation.mutateAsync(imageId);
      },
      removeFavorite: async (favoriteId: number) => {
        await removeFavoriteMutation.mutateAsync(favoriteId);
      },
      isFavorite,
      getFavoriteId,
    };
  }, [favorites, isLoading, isError, addFavoriteMutation, removeFavoriteMutation]);

  if (isLoading) return <Loading />;

  return <FavoritesContext.Provider value={value}>{children}</FavoritesContext.Provider>;
};
