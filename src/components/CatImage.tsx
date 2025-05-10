import React, { memo } from 'react';
import { type Cat } from '../types';
import FavoriteButton from './FavoriteButton';

interface CatImageProps {
  cat: Cat;
  className?: string;
  showFavoriteButton?: boolean;
}

const CatImage: React.FC<CatImageProps> = memo(
  ({ cat, className = '', showFavoriteButton = true }) => {
    return (
      <div className={`relative overflow-hidden rounded-lg ${className}`}>
        <img
          src={cat.url}
          alt={'A cute cat'}
          className={`w-full h-full object-cover bg-action/10`}
          loading="lazy"
          decoding="async"
        />
        {showFavoriteButton && (
          <div className={`absolute top-2 right-2`}>
            <FavoriteButton imageId={cat.id} />
          </div>
        )}
      </div>
    );
  }
);

export default CatImage;
