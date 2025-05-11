import React, { memo } from 'react';
import { IconHeart } from '@tabler/icons-react';
import { useFavorites } from '../hooks/useFavorites';

interface FavoriteButtonProps {
  imageId: string;
}
const FavoriteButton: React.FC<FavoriteButtonProps> = memo(({ imageId }) => {
  const { isFavorite, getFavoriteId, addFavorite, removeFavorite, isLoading, mutationPending } =
    useFavorites();

  const isFavorited = isFavorite(imageId);
  const favoriteId = getFavoriteId(imageId);

  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    if (isLoading) return;

    if (isFavorited && favoriteId) {
      removeFavorite(favoriteId);
    } else {
      addFavorite(imageId);
    }
  };

  return (
    <button
      onClick={handleToggleFavorite}
      className="p-2 bg-white/80 hover:bg-white rounded-full shadow transition-colors 
      relative cursor-pointer"
      aria-label={isFavorited ? 'Remove from favorites' : 'Add to favorites'}
      disabled={isLoading || mutationPending}
    >
      <IconHeart
        size={32}
        fill={isFavorited ? 'currentColor' : 'none'}
        className={`
          ${isFavorited ? 'text-pink-500' : 'text-gray-500'}
          ${mutationPending ? 'animate-heartbeat' : ''}
          transition-transform origin-center
        `}
      />
      {isLoading && <div className="absolute inset-0 bg-white/20 rounded-full" />}
    </button>
  );
});

export default FavoriteButton;
