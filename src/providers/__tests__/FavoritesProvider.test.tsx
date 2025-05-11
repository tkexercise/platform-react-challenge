import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { vi, describe, it, expect, beforeEach } from 'vitest';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { FavoritesProvider } from '../FavoritesProvider';
import { FavoritesContext } from '../../contexts/FavoritesContext';
import type { FavoriteCat } from '../../types';
import * as api from '../../services/api';

vi.mock('../../services/api', () => ({
  getFavorites: vi.fn(),
  addFavorite: vi.fn(),
  removeFavorite: vi.fn(),
}));

const TestComponent = () => {
  const context = React.useContext(FavoritesContext);
  if (!context) throw new Error('Context must be used within FavoritesProvider');

  return (
    <div>
      <button onClick={() => context.addFavorite('test-image-id')}>Add Favorite</button>
      <button onClick={() => context.removeFavorite(123)}>Remove Favorite</button>
      <div data-testid="is-favorite">{context.isFavorite('test-image-id') ? 'true' : 'false'}</div>
      <div data-testid="favorite-id">{context.getFavoriteId('test-image-id')}</div>
      <div data-testid="loading">{context.isLoading ? 'true' : 'false'}</div>
    </div>
  );
};

const TestWrapper = ({
  children,
  queryClient,
}: {
  children: React.ReactNode;
  queryClient: QueryClient;
}) => {
  return (
    <QueryClientProvider client={queryClient}>
      <FavoritesProvider>{children}</FavoritesProvider>
    </QueryClientProvider>
  );
};

describe('FavoritesProvider', () => {
  const mockFavorites: FavoriteCat[] = [
    {
      id: 123,
      image_id: 'test-image-id',
      sub_id: 'test-sub-id',
      created_at: '2024-03-20T12:00:00Z',
      image: { id: 'test-image-id', url: 'test-url' },
    },
  ];

  let queryClient: QueryClient;

  beforeEach(() => {
    queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          retry: false,
          gcTime: 0,
          staleTime: 0,
        },
        mutations: {
          retry: false,
        },
      },
    });

    vi.clearAllMocks();
  });

  it('should provide favorites context to children', async () => {
    vi.mocked(api.getFavorites).mockResolvedValue(mockFavorites);

    render(
      <TestWrapper queryClient={queryClient}>
        <TestComponent />
      </TestWrapper>
    );

    await waitFor(() => {
      expect(screen.getByTestId('is-favorite')).toHaveTextContent('true');
      expect(screen.getByTestId('favorite-id')).toHaveTextContent('123');
    });
  });

  it('should handle adding a favorite', async () => {
    vi.mocked(api.getFavorites).mockResolvedValue(mockFavorites);
    vi.mocked(api.addFavorite).mockResolvedValue({
      id: 124,
      image_id: 'new-image-id',
      sub_id: 'test-sub-id',
      created_at: '2024-03-20T12:00:00Z',
      image: { id: 'new-image-id', url: 'test-url' },
    });

    render(
      <TestWrapper queryClient={queryClient}>
        <TestComponent />
      </TestWrapper>
    );

    await waitFor(() => {
      expect(screen.getByTestId('is-favorite')).toHaveTextContent('true');
    });

    screen.getByText('Add Favorite').click();

    await waitFor(() => {
      expect(api.addFavorite).toHaveBeenCalledWith('test-image-id');
    });
  });

  it('should handle removing a favorite', async () => {
    vi.mocked(api.getFavorites).mockResolvedValue(mockFavorites);
    vi.mocked(api.removeFavorite).mockResolvedValue({ message: 'success' });

    render(
      <TestWrapper queryClient={queryClient}>
        <TestComponent />
      </TestWrapper>
    );

    await waitFor(() => {
      expect(screen.getByTestId('is-favorite')).toHaveTextContent('true');
    });

    screen.getByText('Remove Favorite').click();

    await waitFor(() => {
      expect(api.removeFavorite).toHaveBeenCalledWith(123);
    });
  });

  it('should show loading state', async () => {
    let resolvePromise: (value: FavoriteCat[]) => void;
    const promise = new Promise<FavoriteCat[]>((resolve) => {
      resolvePromise = resolve;
    });
    vi.mocked(api.getFavorites).mockReturnValue(promise);

    render(
      <TestWrapper queryClient={queryClient}>
        <TestComponent />
      </TestWrapper>
    );

    expect(screen.getByTestId('loading')).toBeInTheDocument();

    resolvePromise!(mockFavorites);

    await waitFor(() => {
      expect(screen.getByTestId('is-favorite')).toBeInTheDocument();
    });
  });

  it('should handle error state', async () => {
    vi.mocked(api.getFavorites).mockRejectedValue(new Error('Test error'));

    render(
      <TestWrapper queryClient={queryClient}>
        <TestComponent />
      </TestWrapper>
    );

    await waitFor(() => {
      expect(screen.getByTestId('is-favorite')).toHaveTextContent('false');
    });
  });
});
