import React from 'react';
import { type Breed } from '../types';
import { useCatsByBreed } from '../hooks/useCatApi';
import Modal from './common/Modal';
import Loading from './common/Loading';
import Badge from './common/Badge';
import ErrorMessage from './common/ErrorMessage';
import CatList from './CatList';

interface BreedModalProps {
  breed: Breed | undefined;
  onClose: () => void;
}

const BreedModal: React.FC<BreedModalProps> = ({ breed, onClose }) => {
  const { data: cats = [], isLoading, isError } = useCatsByBreed(breed?.id || null);

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

      <div className="p-6 overflow-y-auto">
        <h3 className="text-xl font-semibold mb-4">{breed ? `${breed.name} Cats` : 'Cats'}</h3>
        {isError && <ErrorMessage />}
        {!isError && isLoading ? (
          <Loading />
        ) : cats.length === 0 ? (
          <div className="text-center py-10">
            <p className="text-gray-500">No cats found for this breed.</p>
          </div>
        ) : (
          <CatList
            cats={cats}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
            linkPath={`/breeds/${breed?.id}/cats/`}
          />
        )}
      </div>
    </Modal>
  );
};

export default BreedModal;
