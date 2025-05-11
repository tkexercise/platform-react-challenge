import { createContext } from 'react';
import { type FavoriteCat } from '../types';

interface FavoritesContextType {
  favorites: FavoriteCat[];
  isLoading: boolean;
  mutationLoading: boolean;
  mutationPending: boolean;
  isError: boolean;
  addFavorite: (imageId: string) => Promise<void>;
  removeFavorite: (favoriteId: number) => Promise<void>;
  isFavorite: (imageId: string) => boolean;
  getFavoriteId: (imageId: string) => number | undefined;
}

export const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);
