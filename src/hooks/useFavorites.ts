import { useContext } from 'react';
import { FavoritesContext } from '../contexts/favoritesContext';

export function useFavorites() {
  const ctx = useContext(FavoritesContext);
  if (!ctx) throw new Error('useFavorites must be inside FavoritesProvider');
  return ctx;
}
