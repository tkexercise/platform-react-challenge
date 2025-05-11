import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useFavorites } from '../hooks/useFavorites';
import Loading from '../components/common/Loading';
import CatModal from '../components/CatModal';
import CatList from '../components/CatList';

const Favorites: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id?: string }>();
  const { favorites, isLoading } = useFavorites();

  const handleCloseModal = () => {
    navigate('/favorites');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Favorite Cats</h1>

      {isLoading ? (
        <Loading />
      ) : favorites.length === 0 ? (
        <div className="text-center py-10">
          <p className="text-gray-500">No favorite cats yet.</p>
        </div>
      ) : (
        <CatList cats={favorites.map((f) => f.image)} linkPath="/favorites/" />
      )}

      {id && <CatModal catId={id} onClose={handleCloseModal} />}
    </div>
  );
};

export default Favorites;
