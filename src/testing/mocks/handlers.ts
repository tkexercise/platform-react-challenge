import { http, HttpResponse } from 'msw';

const mockCat = {
  id: 'test-cat-id',
  url: 'https://example.com/cat.jpg',
  breeds: [
    {
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
      wikipedia_url: 'https://wikipedia.org/test-breed',
    },
  ],
};

const mockCatsByBreed = [
  {
    id: 'cat1',
    url: 'https://example.com/cat1.jpg',
  },
  {
    id: 'cat2',
    url: 'https://example.com/cat2.jpg',
  },
];

const mockFavorite = {
  id: 123,
  image_id: 'test-cat-id',
  sub_id: 'test-user-id',
  created_at: '2024-03-20T12:00:00Z',
  image: {
    id: 'test-cat-id',
    url: 'https://example.com/cat.jpg',
  },
};

export const handlers = [
  http.get('*/images/:id', () => {
    return HttpResponse.json(mockCat);
  }),
  http.get('*/favourites', () => {
    return HttpResponse.json([]);
  }),
  http.post('*/favourites', () => {
    return HttpResponse.json(mockFavorite);
  }),
  http.delete('*/favourites/:id', () => {
    return HttpResponse.json({ message: 'Success' });
  }),

  http.get('*/images/search', () => {
    return HttpResponse.json(mockCatsByBreed);
  }),
  http.get('*/breeds', () => {
    return HttpResponse.json([
      {
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
        wikipedia_url: 'https://wikipedia.org/test-breed',
      },
    ]);
  }),
];
