import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter } from 'react-router-dom';
import CatDetails from '../CatDetails';
import { FavoritesProvider } from '../../providers/FavoritesProvider';
import { server } from '../../testing/mocks/server';
import { http } from 'msw';
import { ROUTES } from '../../constants';

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
  return (
    <BrowserRouter>
      <QueryClientProvider client={testQueryClient}>
        <FavoritesProvider>{children}</FavoritesProvider>
      </QueryClientProvider>
    </BrowserRouter>
  );
};

describe('CatDetails', () => {
  beforeEach(() => {
    Object.assign(navigator, {
      clipboard: {
        writeText: vi.fn(),
      },
    });
  });

  it('renders loading state when data is loading', () => {
    render(<CatDetails catId="test-cat-id" />, { wrapper });
    expect(screen.getByTestId('loading')).toBeInTheDocument();
  });

  it('renders cat details with breed information', async () => {
    render(<CatDetails catId="test-cat-id" />, { wrapper });

    const breedName = await screen.findByText('Test Breed');
    expect(breedName).toBeInTheDocument();
    expect(screen.getByText('A test breed description')).toBeInTheDocument();
    expect(screen.getByText('Test Origin')).toBeInTheDocument();
    expect(screen.getByText('10-15 years')).toBeInTheDocument();
    expect(screen.getByText('4-6 kg')).toBeInTheDocument();
    expect(screen.getByText('Friendly, Playful')).toBeInTheDocument();
  });

  it('renders cat details without breed information', async () => {
    server.use(
      http.get('*/images/:id', () => {
        return new Response(
          JSON.stringify({
            id: 'test-cat-id',
            url: 'https://example.com/cat.jpg',
            breeds: [],
          })
        );
      })
    );

    render(<CatDetails catId="test-cat-id" />, { wrapper });

    const message = await screen.findByText(
      'It looks like this is one of the rarest cats in the world! We do not have any information about it. 🐈'
    );
    expect(message).toBeInTheDocument();
  });

  it('copies link to clipboard when share button is clicked', async () => {
    render(<CatDetails catId="test-cat-id" />, { wrapper });

    const shareButton = await screen.findByText('Copy link to share');
    fireEvent.click(shareButton);

    expect(navigator.clipboard.writeText).toHaveBeenCalledWith(
      `${window.location.origin}${ROUTES.CAT.replace(':id', 'test-cat-id')}`
    );
    expect(screen.getByText('Copied!')).toBeInTheDocument();
  });

  it('does not show share button when canBookmark is false', async () => {
    render(<CatDetails catId="test-cat-id" canBookmark={false} />, { wrapper });

    await screen.findByText('Test Breed');
    expect(screen.queryByText('Copy link to share')).not.toBeInTheDocument();
  });

  it('renders Wikipedia link when breed has wikipedia_url', async () => {
    render(<CatDetails catId="test-cat-id" />, { wrapper });

    const wikipediaLink = await screen.findByText('Read more on Wikipedia');
    expect(wikipediaLink).toBeInTheDocument();
    expect(wikipediaLink).toHaveAttribute('href', 'https://wikipedia.org/test-breed');
    expect(wikipediaLink).toHaveAttribute('target', '_blank');
    expect(wikipediaLink).toHaveAttribute('rel', 'noopener noreferrer');
  });
});
