import React, { memo } from 'react';
import { IconHeart } from '@tabler/icons-react';
import { useAddFavorite, useRemoveFavorite, useGetFavorites } from '../hooks/useCatApi';

interface FavoriteButtonProps {
  imageId: string;
}

const FavoriteButton: React.FC<FavoriteButtonProps> = memo(({ imageId }) => {
  const { data: favorites = [] } = useGetFavorites();
  const addFavoriteMutation = useAddFavorite();
  const removeFavoriteMutation = useRemoveFavorite();

  const isFavorite = favorites.some((favorite) => favorite.image_id === imageId);
  const favoriteId = favorites.find((favorite) => favorite.image_id === imageId)?.id;
  const isLoading = addFavoriteMutation.isPending || removeFavoriteMutation.isPending;

  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    if (isLoading) return;

    if (isFavorite && favoriteId) {
      removeFavoriteMutation.mutate(favoriteId);
    } else {
      addFavoriteMutation.mutate(imageId);
    }
  };

  return (
    <button
      onClick={handleToggleFavorite}
      className="p-2 bg-white/80 hover:bg-white rounded-full shadow transition-colors 
      relative cursor-pointer"
      aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
      disabled={isLoading}
    >
      <IconHeart
        size={32}
        fill={isFavorite ? 'currentColor' : 'none'}
        className={`
          ${isFavorite ? 'text-pink-500' : 'text-gray-500'}
          ${isLoading ? 'animate-heartbeat' : ''}
          transition-transform origin-center
        `}
      />
      {isLoading && <div className="absolute inset-0 bg-white/20 rounded-full" />}
    </button>
  );
});

export default FavoriteButton;
