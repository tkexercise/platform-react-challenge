import axios, { AxiosError } from 'axios';
import { type Cat } from '../types';
import { API_CONFIG } from '../constants';

class CatApiError extends Error {
  public status?: number;
  public code?: string;

  constructor(message: string, status?: number, code?: string) {
    super(message);
    this.name = 'CatApiError';
    this.status = status;
    this.code = code;
  }
}

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
  limit: number = API_CONFIG.DEFAULT_LIMIT,
  page: number = API_CONFIG.DEFAULT_PAGE
): Promise<Cat[]> => {
  const response = await catApi.get('/images/search', {
    params: {
      limit,
      page,
      size: API_CONFIG.IMAGE_SIZES.PREVIEW,
      has_breeds: 1,
    },
  });
  return response.data;
};

export const fetchCatById = async (id: string): Promise<Cat> => {
  const response = await catApi.get(`/images/${id}`, {
    params: {
      size: API_CONFIG.IMAGE_SIZES.FULL,
      has_breeds: 1,
    },
  });
  return response.data;
};
