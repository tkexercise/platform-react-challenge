import React, { memo } from 'react';
import { type Cat } from '../types';
import FavoriteButton from './FavoriteButton';

interface CatImageProps {
  cat: Cat;
  className?: string;
}

const CatImage: React.FC<CatImageProps> = memo(({ cat, className = '' }) => {
  return (
    <div
      className={`relative overflow-hidden rounded-lg bg-center bg-no-repeat ${className}`}
      style={{ backgroundImage: 'url(/img-backdrop.svg)' }}
    >
      <img
        src={cat.url}
        alt="A cute cat"
        className="w-full h-full object-cover bg-action/10"
        loading="lazy"
      />
      <div className="absolute group-[.has-close]:!bottom-2 group-[.has-close]:!top-auto md:group-[.has-close]:!top-2  top-2 right-2">
        <FavoriteButton imageId={cat.id} />
      </div>
    </div>
  );
});

export default CatImage;
