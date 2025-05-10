import React from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useGetFavorites } from '../hooks/useCatApi';
import Loading from '../components/common/Loading';
import CatModal from '../components/CatModal';
import CatImage from '../components/CatImage';

const Favorites: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id?: string }>();
  const { data: favorites = [], isLoading } = useGetFavorites();

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
        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 
            xl:[&>div:nth-last-child(2):nth-child(4n+1)]:col-start-2 gap-6"
        >
          {favorites.map((favorite) => (
            <div
              key={favorite.id}
              className="relative overflow-hidden rounded-lg shadow-lg transition-all 
              hover:shadow-xl bg-white"
            >
              <Link
                to={`/favorites/${favorite.image.id}`}
                className="block h-64 hover:scale-105 transition-all duration-300"
              >
                <CatImage cat={favorite.image} className="h-full" />
              </Link>
            </div>
          ))}
        </div>
      )}

      {id && <CatModal catId={id} onClose={handleCloseModal} canBookmark={false} />}
    </div>
  );
};

export default Favorites;
