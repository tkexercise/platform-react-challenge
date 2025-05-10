import React from 'react';
import { Link } from 'react-router-dom';
import { type Breed } from '../types';
import Badge from './common/Badge';

interface BreedCardProps {
  breed: Breed;
}

const BreedCard: React.FC<BreedCardProps> = ({ breed }) => {
  return (
    <Link
      to={`/breeds/${breed.id}`}
      className="block p-6 bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow"
    >
      <h3 className="text-xl font-semibold text-gray-800 mb-2">{breed.name}</h3>
      <p className="text-gray-600 mb-3 line-clamp-2">{breed.description}</p>
      <div className="flex flex-wrap gap-2">
        <Badge variant="pink">Origin: {breed.origin}</Badge>
        <Badge variant="blue">Life span: {breed.life_span} years</Badge>
      </div>
    </Link>
  );
};

export default BreedCard;
