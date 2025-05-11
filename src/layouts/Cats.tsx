import React, { useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useGetCats } from '../hooks/useCatApi';
import CatModal from '../components/CatModal';
import Loading from '../components/common/Loading';
import Button from '../components/common/Button';
import ErrorMessage from '../components/common/ErrorMessage';
import CatList from '../components/CatList';

const Cats: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id?: string }>();

  const { data, isError, isLoading, isRefetching, hasNextPage, fetchNextPage, isFetchingNextPage } =
    useGetCats();

  const cats = useMemo(() => data?.pages.flatMap((page) => page) ?? [], [data]);

  const handleLoadMore = () => {
    if (hasNextPage) {
      fetchNextPage();
    }
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
          <CatList cats={cats} />

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
