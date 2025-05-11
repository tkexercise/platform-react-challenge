import React from 'react';
import { type Cat } from '../types';
import CatCard from './CatCard';

interface CatListProps {
  cats: Cat[];
  className?: string;
  linkPath?: string;
}

const CatList: React.FC<CatListProps> = ({
  cats,
  className = 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6',
  linkPath,
}) => {
  return (
    <div className={className}>
      {cats.map((cat, index) => (
        <CatCard key={`${cat.id}-${index}`} cat={cat} linkPath={linkPath} />
      ))}
    </div>
  );
};

export default CatList;
