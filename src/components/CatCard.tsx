import React from 'react';
import { Link } from 'react-router-dom';
import { type Cat } from '../types';
import CatImage from './CatImage';

interface CatCardProps {
  cat: Cat;
  linkPath?: string;
}

const CatCard: React.FC<CatCardProps> = ({ cat, linkPath = '/cat/' }) => {
  return (
    <div
      className="relative overflow-hidden rounded-lg shadow-lg transition-all 
      hover:shadow-xl bg-white"
    >
      <Link
        to={`${linkPath}${cat.id}`}
        className="block h-64 hover:scale-105 transition-all duration-300"
      >
        <CatImage cat={cat} className="h-full" />
      </Link>
    </div>
  );
};

export default CatCard;
