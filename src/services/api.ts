import axios, { AxiosError } from 'axios';
import { type Breed, type Cat, type FavoriteCat } from '../types';
import { API_CONFIG, STORAGE_KEYS } from '../constants';
import { createId } from '@paralleldrive/cuid2';

export class CatApiError extends Error {
  public status?: number;
  public code?: string;

  constructor(message: string, status?: number, code?: string) {
    super(message);
    this.name = 'CatApiError';
    this.status = status;
    this.code = code;
  }
}

const getUserId = (): string => {
  let userId = localStorage.getItem(STORAGE_KEYS.USER_ID);
  if (!userId) {
    userId = createId();
    localStorage.setItem(STORAGE_KEYS.USER_ID, userId);
  }
  return userId;
};

const catApi = axios.create({
  baseURL: API_CONFIG.BASE_URL,
  headers: {
    'x-api-key': API_CONFIG.API_KEY,
  },
});

// Add response interceptor for error handling
catApi.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (error.response) {
      const data = error.response.data as { message?: string; code?: string };
      throw new CatApiError(data.message || 'An error occurred', error.response.status, data.code);
    }
    throw new CatApiError('Network error');
  }
);

export const fetchCats = async (
  options: {
    limit?: number;
    page?: number;
    breedId?: string;
  } = {}
): Promise<Cat[]> => {
  const { limit = API_CONFIG.DEFAULT_LIMIT, page = API_CONFIG.DEFAULT_PAGE, breedId } = options;

  const response = await catApi.get('/images/search', {
    params: {
      limit,
      page,
      ...(breedId && { breed_ids: breedId }),
      size: API_CONFIG.IMAGE_SIZES.PREVIEW,
    },
  });
  return response.data;
};

export const fetchCatById = async (id: string): Promise<Cat> => {
  const response = await catApi.get(`/images/${id}`, {
    params: {
      size: API_CONFIG.IMAGE_SIZES.FULL,
    },
  });
  return response.data;
};

export const addFavorite = async (imageId: string): Promise<FavoriteCat> => {
  const response = await catApi.post('/favourites', {
    image_id: imageId,
    sub_id: getUserId(),
  });
  return response.data;
};

export const getFavorites = async (): Promise<FavoriteCat[]> => {
  const response = await catApi.get('/favourites', {
    params: {
      sub_id: getUserId(),
    },
  });
  return response.data;
};

export const removeFavorite = async (favoriteId: number): Promise<{ message: string }> => {
  const response = await catApi.delete(`/favourites/${favoriteId}`);
  return response.data;
};

export const fetchBreeds = async (): Promise<Breed[]> => {
  const response = await catApi.get('/breeds');
  return response.data;
};
