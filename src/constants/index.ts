import { type BreedDetailItem, type NavigationItem } from '../types';

// API Configuration
export const API_CONFIG = {
  BASE_URL: 'https://api.thecatapi.com/v1',
  API_KEY: import.meta.env.VITE_CAT_API_KEY,
  DEFAULT_LIMIT: 10,
  DEFAULT_PAGE: 0,
  IMAGE_SIZES: {
    PREVIEW: 'small', // 250x250 (for grid)
    FULL: 'full', // Original size (for modal/details)
  },
} as const;

export const QUERY_CONFIG = {
  STALE_TIME: 5 * 60 * 1000, // 5 minutes
  RETRY_COUNT: 1,
  REFETCH_ON_WINDOW_FOCUS: false,
} as const;

export const QUERY_KEYS = {
  RANDOM_CATS: 'randomCats',
  CAT: 'cat',
} as const;

export const ANIMATION_DELAYS = {
  DELAY_100: '100ms',
  DELAY_200: '200ms',
} as const;

export const ROUTES = {
  HOME: '/',
  CAT: '/cat/:id',
  BREEDS: '/breeds',
  FAVORITES: '/favorites',
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
export const UI = {
  LOADING_DOT_SIZE: 'w-4 h-4',
  LOADING_DOT_COLORS: {
    PRIMARY: 'bg-action',
    SECONDARY: 'bg-action/60',
    TERTIARY: 'bg-action/30',
  },
} as const;
