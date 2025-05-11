import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useBreeds } from '../hooks/useCatApi';
import BreedCard from '../components/BreedCard';
import BreedModal from '../components/BreedModal';
import Loading from '../components/common/Loading';
import ErrorMessage from '../components/common/ErrorMessage';
import CatModal from '../components/CatModal';

const Breeds: React.FC = () => {
  const navigate = useNavigate();
  const { breedId, catId } = useParams<{ breedId?: string; catId?: string }>();

  const { data: breeds = [], isLoading: isLoadingBreeds, isError } = useBreeds();
  const selectedBreed = breeds.find((breed) => breed.id === breedId);

  const handleCloseBreedModal = () => {
    navigate('/breeds');
  };

  const handleCloseCatModal = () => {
    navigate(`/breeds/${breedId}`);
  };

  if (isError) {
    return <ErrorMessage />;
  }

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

      {breedId && !catId && <BreedModal breed={selectedBreed} onClose={handleCloseBreedModal} />}
      {catId && <CatModal catId={catId} onClose={handleCloseCatModal} />}
    </div>
  );
};

export default Breeds;
