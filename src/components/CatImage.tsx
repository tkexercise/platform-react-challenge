import React, { memo } from 'react';
import { Link } from 'react-router-dom';
import { type Cat } from '../types';

interface CatImageProps {
  cat: Cat;
  showBreedName?: boolean;
  className?: string;
}

const CatImage: React.FC<CatImageProps> = memo(({ cat, showBreedName = true, className = '' }) => {
  return (
    <div className={`relative overflow-hidden rounded-lg ${className}`}>
      <img
        src={cat.url}
        alt={cat.breeds && cat.breeds.length > 0 ? `${cat.breeds[0].name} cat` : 'A cute cat'}
        className={`w-full h-full object-cover bg-action/10`}
        loading="lazy"
        decoding="async"
      />
      {showBreedName && cat.breeds && cat.breeds.length > 0 && (
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
          <Link
            to={`/breeds/${cat.breeds[0].id}`}
            className="text-white font-medium hover:underline"
            onClick={(e) => e.stopPropagation()}
          >
            {cat.breeds[0].name}
          </Link>
        </div>
      )}
    </div>
  );
});

export default CatImage;
