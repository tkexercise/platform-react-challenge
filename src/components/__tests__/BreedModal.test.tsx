import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter } from 'react-router-dom';
import BreedModal from '../BreedModal';
import { server } from '../../testing/mocks/server';
import { http, HttpResponse } from 'msw';
import { FavoritesProvider } from '../../providers/FavoritesProvider';

const createTestQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

const wrapper = ({ children }: { children: React.ReactNode }) => {
  const testQueryClient = createTestQueryClient();
  testQueryClient.setQueryData(['favorites'], []);
  return (
    <BrowserRouter>
      <QueryClientProvider client={testQueryClient}>
        <FavoritesProvider>{children}</FavoritesProvider>
      </QueryClientProvider>
    </BrowserRouter>
  );
};

describe('BreedModal', () => {
  const mockBreed = {
    id: 'test-breed',
    name: 'Test Breed',
    description: 'A test breed description',
    origin: 'Test Origin',
    life_span: '10-15',
    weight: {
      imperial: '8-12',
      metric: '4-6',
    },
    temperament: 'Friendly, Playful',
  };

  it('renders nothing when breed is undefined', () => {
    const onClose = vi.fn();
    const { container } = render(<BreedModal breed={undefined} onClose={onClose} />, { wrapper });
    expect(container).toBeEmptyDOMElement();
  });

  it('renders breed information when breed is provided', () => {
    const onClose = vi.fn();
    render(<BreedModal breed={mockBreed} onClose={onClose} />, { wrapper });

    expect(screen.getByText(mockBreed.name)).toBeInTheDocument();
    expect(screen.getByText(mockBreed.description)).toBeInTheDocument();
    expect(screen.getByText(`Origin: ${mockBreed.origin}`)).toBeInTheDocument();
    expect(screen.getByText(`Life span: ${mockBreed.life_span} years`)).toBeInTheDocument();
    expect(screen.getByText(`Weight: ${mockBreed.weight.metric} kg`)).toBeInTheDocument();
    expect(screen.getByText(`${mockBreed.temperament}`)).toBeInTheDocument();
  });

  it('renders the cats grid with breed cats', async () => {
    server.use(
      http.get('*/images/search', () => {
        return HttpResponse.json([
          { id: 'cat1', url: 'https://example.com/cat1.jpg' },
          { id: 'cat2', url: 'https://example.com/cat2.jpg' },
        ]);
      })
    );

    const onClose = vi.fn();
    render(<BreedModal breed={mockBreed} onClose={onClose} />, { wrapper });

    expect(screen.getByText(`${mockBreed.name} Cats`)).toBeInTheDocument();

    const catImages = await screen.findAllByRole('img');
    expect(catImages).toHaveLength(2);
  });

  it('renders error state when fetching cats fails', async () => {
    server.use(
      http.get('*/images/search', () => {
        return new HttpResponse(null, { status: 500 });
      })
    );

    const onClose = vi.fn();
    render(<BreedModal breed={mockBreed} onClose={onClose} />, { wrapper });

    const errorMessage = await screen.findByText('Failed to load data. Please refresh the page.');
    expect(errorMessage).toBeInTheDocument();
  });
});
