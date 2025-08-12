
export interface FuelStation {
  id: number;
  name: string;
  stationType: string;
  municipality: string;
  price: number;
  brand: string;
  fuelType: string;
  lastUpdated: string; // ISO date string
  district: string;
  address: string;
  locality: string;
  postalCode: string;
  latitude: number;
  longitude: number;
}

export interface NewsArticle {
  category: string;
  title: string;
  summary: string;
  imageUrl: string;
}

export interface BrandPrice {
    brand: string;
    gasoline: number | null;
    diesel: number | null;
    lpg: number | null;
}
