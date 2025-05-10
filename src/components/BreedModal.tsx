import React from 'react';
import { Link } from 'react-router-dom';
import Modal from './common/Modal';
import Loading from './common/Loading';
import CatImage from './CatImage';
import { type Breed, type Cat } from '../types';
import Badge from './common/Badge';

interface BreedModalProps {
  breed: Breed | undefined;
  cats: Cat[];
  isLoading: boolean;
  onClose: () => void;
}

const BreedModal: React.FC<BreedModalProps> = ({ breed, cats, isLoading, onClose }) => {
  return (
    <Modal isOpen={!!breed} onClose={onClose}>
      <div className="p-6 border-b">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">{breed?.name || 'Loading breed...'}</h2>
        </div>

        {breed && (
          <div className="mt-3">
            <p className="text-gray-700 mb-4">{breed.description}</p>
            <div className="flex flex-wrap gap-2 mb-4">
              <Badge variant="pink">Origin: {breed.origin}</Badge>
              <Badge variant="blue">Life span: {breed.life_span} years</Badge>
              <Badge variant="green">Weight: {breed.weight.metric} kg</Badge>
            </div>
            <p className="text-sm text-gray-600">
              <strong>Temperament:</strong> {breed.temperament}
            </p>
          </div>
        )}
      </div>

      <div className="p-6">
        <h3 className="text-xl font-semibold mb-4">{breed ? `${breed.name} Cats` : 'Cats'}</h3>

        {isLoading ? (
          <Loading />
        ) : cats.length === 0 ? (
          <div className="text-center py-10">
            <p className="text-gray-500">No cats found for this breed.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {cats.map((cat: Cat, index: number) => (
              <div
                className="relative overflow-hidden rounded-lg shadow-lg transition-all 
                hover:shadow-xl bg-white"
                key={`${cat.id}-${index}`}
              >
                <Link
                  to={`/cat/${cat.id}`}
                  className="block h-64 hover:scale-105 transition-all duration-300"
                >
                  <CatImage cat={cat} className="h-full" showFavoriteButton={false} />
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </Modal>
  );
};

export default BreedModal;
