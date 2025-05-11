import { type BreedDetailItem, type NavigationItem } from '../types';

export const API_CONFIG = {
  BASE_URL: 'https://api.thecatapi.com/v1',
  API_KEY: import.meta.env.VITE_CAT_API_KEY,
  DEFAULT_LIMIT: 12,
  DEFAULT_PAGE: 0,
  IMAGE_SIZES: {
    PREVIEW: 'small',
    FULL: 'full',
  },
} as const;

export const QUERY_CONFIG = {
  STALE_TIME: 1000 * 60 * 5, // 5 minutes
  RETRY_COUNT: 1,
  REFETCH_ON_WINDOW_FOCUS: false,
} as const;

export const QUERY_KEYS = {
  RANDOM_CATS: 'randomCats',
  CAT: 'cat',
  FAVORITES: 'favorites',
  BREEDS: 'breeds',
  BREED_CATS: 'breedCats',
} as const;

export const ROUTES = {
  HOME: '/',
  CAT: '/cat/:id',
  BREEDS: '/breeds',
  BREED_DETAILS: '/breeds/:breedId',
  BREED_CATS: '/breeds/:breedId/cats/:catId',
  FAVORITES: '/favorites',
  FAVORITE_CAT: '/favorites/:id',
} as const;

export const BREED_DETAILS: BreedDetailItem[] = [
  {
    label: 'Origin',
    getValue: (breed) => breed.origin,
  },
  {
    label: 'Life Span',
    getValue: (breed) => `${breed.life_span} years`,
  },
  {
    label: 'Weight',
    getValue: (breed) => `${breed.weight.metric} kg`,
  },
  {
    label: 'Temperament',
    getValue: (breed) => breed.temperament,
  },
] as const;

export const NAVIGATION: NavigationItem[] = [
  {
    to: ROUTES.HOME,
    label: 'Cats',
    end: true,
  },
  {
    to: ROUTES.BREEDS,
    label: 'Breeds',
  },
  {
    to: ROUTES.FAVORITES,
    label: 'Favorites',
  },
];

export const STORAGE_KEYS = {
  USER_ID: 'user_id',
} as const;
