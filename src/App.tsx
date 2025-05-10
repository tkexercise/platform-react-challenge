import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Cats from './layouts/Cats';
import { QUERY_CONFIG, ROUTES } from './constants';
import Header from './components/common/Header';
import Favorites from './layouts/Favorites';

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
      <BrowserRouter>
        <div className="flex flex-col min-h-screen bg-gray-50">
          <main className="flex-grow">
            <Header />
            <Routes>
              <Route path={ROUTES.HOME} element={<Cats />} />
              <Route path={ROUTES.CAT} element={<Cats />} />

              <Route path={ROUTES.FAVORITES} element={<Favorites />} />
              <Route path={ROUTES.FAVORITE_CAT} element={<Favorites />} />
              <Route path="*" element={<Navigate to={ROUTES.HOME} replace />} />
            </Routes>
          </main>
        </div>
      </BrowserRouter>
    </QueryClientProvider>
  );
};

export default App;
