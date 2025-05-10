import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Cats from './layouts/Cats';
import { QUERY_CONFIG, ROUTES } from './constants';
import Header from './components/common/Header';
import Favorites from './layouts/Favorites';
import Breeds from './layouts/Breeds';
import { FavoritesProvider } from './providers/FavoritesProvider';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: QUERY_CONFIG.STALE_TIME,
      retry: QUERY_CONFIG.RETRY_COUNT,
      refetchOnWindowFocus: QUERY_CONFIG.REFETCH_ON_WINDOW_FOCUS,
    },
  },
});

const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <FavoritesProvider>
        <BrowserRouter>
          <div className="flex flex-col min-h-screen">
            <main className="flex-grow flex flex-col">
              <Header />
              <div className="flex-grow">
                <Routes>
                  <Route path={ROUTES.HOME} element={<Cats />} />
                  <Route path={ROUTES.CAT} element={<Cats />} />

                  <Route path={ROUTES.BREEDS} element={<Breeds />} />
                  <Route path={ROUTES.BREED_DETAILS} element={<Breeds />} />

                  <Route path={ROUTES.FAVORITES} element={<Favorites />} />
                  <Route path={ROUTES.FAVORITE_CAT} element={<Favorites />} />
                  <Route path="*" element={<Navigate to={ROUTES.HOME} replace />} />
                </Routes>
              </div>
              <footer className="bg-gray-800 text-white py-6">
                <div className="container mx-auto px-4 text-center">
                  <p>🐱 CatLover 2025</p>
                  <p className="text-sm text-gray-400 mt-2">
                    Paws SVGs credits to{' '}
                    <a
                      href="https://thenounproject.com/creator/maxim221/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline hover:text-white"
                    >
                      Maxim Kulikov
                    </a>
                  </p>
                </div>
              </footer>
            </main>
          </div>
        </BrowserRouter>
      </FavoritesProvider>
    </QueryClientProvider>
  );
};

export default App;
