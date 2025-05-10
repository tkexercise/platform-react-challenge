export interface Cat {
  id: string;
  url: string;
  width?: number;
  height?: number;
  breeds?: Breed[];
}

export interface Breed {
  id: string;
  name: string;
  temperament: string;
  description: string;
  origin: string;
  life_span: string;
  weight: {
    imperial: string;
    metric: string;
  };
  wikipedia_url?: string;
}

export interface BreedDetailItem {
  label: string;
  getValue: (breed: Breed) => string;
}

export interface NavigationItem {
  to: string;
  label: string;
  end?: boolean;
}

export interface FavoriteCat {
  id: number;
  image_id: string;
  sub_id: string;
  created_at: string;
  image: {
    id: string;
    url: string;
  };
}
