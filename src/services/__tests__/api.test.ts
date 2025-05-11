import { describe, it, expect, beforeEach } from 'vitest';
import { server } from '../../testing/mocks/server';
import { http, HttpResponse } from 'msw';
import {
  fetchCats,
  fetchCatById,
  addFavorite,
  getFavorites,
  removeFavorite,
  fetchBreeds,
  CatApiError,
} from '../api';
import { STORAGE_KEYS } from '../../constants';

describe('Cat API', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  describe('fetchCats', () => {
    it('fetches cats with default parameters', async () => {
      server.use(
        http.get('*/images/search', () => {
          return HttpResponse.json([
            { id: 'cat1', url: 'https://example.com/cat1.jpg' },
            { id: 'cat2', url: 'https://example.com/cat2.jpg' },
          ]);
        })
      );

      const cats = await fetchCats();
      expect(cats).toHaveLength(2);
      expect(cats[0]).toHaveProperty('id');
      expect(cats[0]).toHaveProperty('url');
    });

    it('fetches cats with custom parameters', async () => {
      server.use(
        http.get('*/images/search', () => {
          return HttpResponse.json([
            { id: 'cat1', url: 'https://example.com/cat1.jpg' },
            { id: 'cat2', url: 'https://example.com/cat2.jpg' },
          ]);
        })
      );

      const cats = await fetchCats({ limit: 5, page: 1, breedId: 'test-breed' });
      expect(cats).toHaveLength(2);
    });

    it('handles API errors', async () => {
      server.use(
        http.get('*/images/search', () => {
          return new HttpResponse(null, { status: 500 });
        })
      );

      await expect(fetchCats()).rejects.toThrow(CatApiError);
    });
  });

  describe('fetchCatById', () => {
    it('fetches a cat by id', async () => {
      const cat = await fetchCatById('test-cat-id');
      expect(cat).toHaveProperty('id', 'test-cat-id');
      expect(cat).toHaveProperty('url');
      expect(cat.breeds).toHaveLength(1);
    });

    it('handles API errors', async () => {
      server.use(
        http.get('*/images/:id', () => {
          return new HttpResponse(null, { status: 404 });
        })
      );

      await expect(fetchCatById('non-existent')).rejects.toThrow(CatApiError);
    });
  });

  describe('addFavorite', () => {
    it('adds a cat to favorites', async () => {
      const favorite = await addFavorite('test-cat-id');
      expect(favorite).toHaveProperty('id', 123);
      expect(favorite).toHaveProperty('image_id', 'test-cat-id');
    });

    it('handles API errors', async () => {
      server.use(
        http.post('*/favourites', () => {
          return new HttpResponse(null, { status: 400 });
        })
      );

      await expect(addFavorite('test-cat-id')).rejects.toThrow(CatApiError);
    });
  });

  describe('getFavorites', () => {
    it('gets user favorites', async () => {
      const favorites = await getFavorites();
      expect(Array.isArray(favorites)).toBe(true);
    });

    it('handles API errors', async () => {
      server.use(
        http.get('*/favourites', () => {
          return new HttpResponse(null, { status: 401 });
        })
      );

      await expect(getFavorites()).rejects.toThrow(CatApiError);
    });
  });

  describe('removeFavorite', () => {
    it('removes a cat from favorites', async () => {
      const result = await removeFavorite(123);
      expect(result).toHaveProperty('message', 'Success');
    });

    it('handles API errors', async () => {
      server.use(
        http.delete('*/favourites/:id', () => {
          return new HttpResponse(null, { status: 404 });
        })
      );

      await expect(removeFavorite(123)).rejects.toThrow(CatApiError);
    });
  });

  describe('fetchBreeds', () => {
    it('fetches all breeds', async () => {
      const breeds = await fetchBreeds();
      expect(Array.isArray(breeds)).toBe(true);
      expect(breeds[0]).toHaveProperty('id', 'test-breed');
    });

    it('handles API errors', async () => {
      server.use(
        http.get('*/breeds', () => {
          return new HttpResponse(null, { status: 500 });
        })
      );

      await expect(fetchBreeds()).rejects.toThrow(CatApiError);
    });
  });

  describe('getUserId', () => {
    it('generates a new user ID if none exists', async () => {
      const userId = localStorage.getItem(STORAGE_KEYS.USER_ID);
      expect(userId).toBeNull();

      // Call getFavorites to trigger getUserId
      await getFavorites();
      const newUserId = localStorage.getItem(STORAGE_KEYS.USER_ID);
      expect(newUserId).not.toBeNull();
    });

    it('reuses existing user ID', async () => {
      const testId = 'test-user-id';
      localStorage.setItem(STORAGE_KEYS.USER_ID, testId);

      // Call getFavorites to trigger getUserId
      await getFavorites();
      const userId = localStorage.getItem(STORAGE_KEYS.USER_ID);
      expect(userId).toBe(testId);
    });
  });
});
