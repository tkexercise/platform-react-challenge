import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useBreeds, useCatsByBreed } from '../hooks/useCatApi';
import BreedCard from '../components/BreedCard';
import BreedModal from '../components/BreedModal';
import Loading from '../components/common/Loading';

const Breeds: React.FC = () => {
  const navigate = useNavigate();
  const { breedId } = useParams<{ breedId?: string }>();

  const { data: breeds = [], isLoading: isLoadingBreeds } = useBreeds();
  const { data: breedCats = [], isLoading: isLoadingBreedCats } = useCatsByBreed(breedId || null);

  const selectedBreed = breeds.find((breed) => breed.id === breedId);

  const handleCloseBreedModal = () => {
    navigate('/breeds');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Cat Breeds</h1>

      {isLoadingBreeds ? (
        <Loading />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {breeds.map((breed) => (
            <BreedCard key={breed.id} breed={breed} />
          ))}
        </div>
      )}

      {breedId && (
        <BreedModal
          breed={selectedBreed}
          cats={breedCats}
          isLoading={isLoadingBreedCats}
          onClose={handleCloseBreedModal}
        />
      )}
    </div>
  );
};

export default Breeds;
