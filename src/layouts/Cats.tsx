import React from 'react';

import { useParams, useNavigate, Link } from 'react-router-dom';
import { useGetCats } from '../hooks/useCatApi';
import CatModal from '../components/CatModal';
import Loading from '../components/common/Loading';
import { type Cat } from '../types';
import Button from '../components/common/Button';
import ErrorMessage from '../components/common/ErrorMessage';
import CatImage from '../components/CatImage';

const Cats: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id?: string }>();

  const { data, isError, isLoading, isRefetching, hasNextPage, fetchNextPage, isFetchingNextPage } =
    useGetCats();

  const cats = data?.pages.flatMap((page) => page) ?? [];

  const handleLoadMore = () => {
    if (hasNextPage) {
      fetchNextPage();
    }
  };

  const handleOpenModal = (catId: string) => {
    navigate(`/cat/${catId}`);
  };

  const handleCloseModal = () => {
    navigate('/');
  };

  if (isError) {
    return <ErrorMessage />;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Discover Cats</h1>

      {isLoading || isRefetching ? (
        <Loading />
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {cats.map((cat: Cat, index: number) => (
              <div
                className="relative overflow-hidden rounded-lg shadow-lg transition-all 
                hover:shadow-xl bg-white"
                onClick={() => handleOpenModal(cat.id)}
                key={`${cat.id}-${index}`}
              >
                <Link
                  to={`/cat/${cat.id}`}
                  className="block h-64 hover:scale-105 transition-all duration-300"
                >
                  <CatImage cat={cat} className="h-full" />
                </Link>
              </div>
            ))}
          </div>

          {hasNextPage && (
            <div className="mt-10 flex justify-center">
              <Button
                onClick={handleLoadMore}
                disabled={isFetchingNextPage}
                variant="action"
                className="bg-action text-white hover:bg-action/80"
              >
                {isFetchingNextPage ? 'Loading more...' : 'Load More Cats'}
              </Button>
            </div>
          )}
        </>
      )}

      {id && <CatModal catId={id} onClose={handleCloseModal} />}
    </div>
  );
};

export default Cats;
