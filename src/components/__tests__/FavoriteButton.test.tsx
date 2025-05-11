import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import FavoriteButton from '../FavoriteButton';
import { useFavorites } from '../../hooks/useFavorites';

vi.mock('../../hooks/useFavorites');

describe('FavoriteButton', () => {
  const mockImageId = 'test-image-id';
  const mockFavoriteId = 123;

  beforeEach(() => {
    vi.clearAllMocks();
  });

  const createMockFavoritesContext = (overrides = {}) => ({
    favorites: [],
    isLoading: false,
    isError: false,
    mutationLoading: false,
    mutationPending: false,
    addFavorite: vi.fn(),
    removeFavorite: vi.fn(),
    isFavorite: vi.fn(),
    getFavoriteId: vi.fn(),
    ...overrides,
  });

  it('renders correctly when not favorited', () => {
    vi.mocked(useFavorites).mockReturnValue(
      createMockFavoritesContext({
        isFavorite: () => false,
        getFavoriteId: () => undefined,
      })
    );

    render(<FavoriteButton imageId={mockImageId} />);

    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute('aria-label', 'Add to favorites');
  });

  it('renders correctly when favorited', () => {
    vi.mocked(useFavorites).mockReturnValue(
      createMockFavoritesContext({
        isFavorite: () => true,
        getFavoriteId: () => mockFavoriteId,
      })
    );

    render(<FavoriteButton imageId={mockImageId} />);

    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute('aria-label', 'Remove from favorites');
  });

  it('calls addFavorite when clicking on non-favorited button', () => {
    const mockAddFavorite = vi.fn();
    vi.mocked(useFavorites).mockReturnValue(
      createMockFavoritesContext({
        isFavorite: () => false,
        getFavoriteId: () => undefined,
        addFavorite: mockAddFavorite,
      })
    );

    render(<FavoriteButton imageId={mockImageId} />);

    const button = screen.getByRole('button');
    fireEvent.click(button);

    expect(mockAddFavorite).toHaveBeenCalledWith(mockImageId);
  });

  it('calls removeFavorite when clicking on favorited button', () => {
    const mockRemoveFavorite = vi.fn();
    vi.mocked(useFavorites).mockReturnValue(
      createMockFavoritesContext({
        isFavorite: () => true,
        getFavoriteId: () => mockFavoriteId,
        removeFavorite: mockRemoveFavorite,
      })
    );

    render(<FavoriteButton imageId={mockImageId} />);

    const button = screen.getByRole('button');
    fireEvent.click(button);

    expect(mockRemoveFavorite).toHaveBeenCalledWith(mockFavoriteId);
  });

  it('disables button and shows loading state when isLoading is true', () => {
    vi.mocked(useFavorites).mockReturnValue(
      createMockFavoritesContext({
        isFavorite: () => false,
        getFavoriteId: () => undefined,
        isLoading: true,
      })
    );

    render(<FavoriteButton imageId={mockImageId} />);

    const button = screen.getByRole('button');
    expect(button).toBeDisabled();

    fireEvent.click(button);
    expect(useFavorites().addFavorite).not.toHaveBeenCalled();
  });
});
