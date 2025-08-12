
import { FuelStation } from './types';

export const FUEL_STATIONS: FuelStation[] = [
  {
    "id": 1,
    "name": "TF GEST TADIM",
    "stationType": "Outro",
    "municipality": "Braga",
    "price": 1.724,
    "brand": "FREITAS",
    "fuelType": "Gasolina especial 98",
    "lastUpdated": "2024-07-18T07:00:00Z",
    "district": "Braga",
    "address": "Rua General Humberto Delgado",
    "locality": "Tadim - Lugar da Estação",
    "postalCode": "4700-000",
    "latitude": 41.51089,
    "longitude": -8.48371
  },
  {
    "id": 2,
    "name": "JORCOP, SA",
    "stationType": "Outro",
    "municipality": "Leiria",
    "price": 1.564,
    "brand": "CEPSA",
    "fuelType": "Gasóleo simples",
    "lastUpdated": "2024-07-20T09:00:00Z",
    "district": "Leiria",
    "address": "EN 356-1 Km 8,2",
    "locality": "Maceira - Tanchoal",
    "postalCode": "2405-013",
    "latitude": 39.69386,
    "longitude": -8.88146
  },
  {
    "id": 3,
    "name": "Cidade N' Aldeia",
    "stationType": "Outro",
    "municipality": "Póvoa de Lanhoso",
    "price": 1.880,
    "brand": "CIDADE N'ALDEIA",
    "fuelType": "Gasolina especial 98",
    "lastUpdated": "2024-07-21T11:00:00Z",
    "district": "Braga",
    "address": "Rua de Porto d'Ave",
    "locality": "Taíde - Cidade N'Aldeia",
    "postalCode": "4830-755",
    "latitude": 41.56111,
    "longitude": -8.22226
  },
  {
    "id": 4,
    "name": "Intermarché Valongo",
    "stationType": "Hipermercado",
    "municipality": "Valongo",
    "price": 1.639,
    "brand": "Intermarché",
    "fuelType": "Gasolina simples 95",
    "lastUpdated": "2024-07-26T10:00:00Z",
    "district": "Porto",
    "address": "Rua da Passagem 234",
    "locality": "Valongo",
    "postalCode": "4440-530",
    "latitude": 41.1895,
    "longitude": -8.4982
  },
  {
    "id": 5,
    "name": "BP Belavista",
    "stationType": "Rede",
    "municipality": "Lisboa",
    "price": 1.559,
    "brand": "BP",
    "fuelType": "Gasóleo simples",
    "lastUpdated": "2024-07-26T11:30:00Z",
    "district": "Lisboa",
    "address": "Av. Marechal Gomes da Costa",
    "locality": "Chelas",
    "postalCode": "1800-255",
    "latitude": 38.7523,
    "longitude": -9.1044
  },
  {
    "id": 6,
    "name": "Prio Almada",
    "stationType": "Rede",
    "municipality": "Almada",
    "price": 0.85,
    "brand": "Prio",
    "fuelType": "GPL Auto",
    "lastUpdated": "2024-07-25T18:00:00Z",
    "district": "Setúbal",
    "address": "Centro Comercial Almada Forum",
    "locality": "Almada",
    "postalCode": "2810-001",
    "latitude": 38.6534,
    "longitude": -9.1764
  },
  {
    "id": 7,
    "name": "Repsol Faro",
    "stationType": "Rede",
    "municipality": "Faro",
    "price": 1.789,
    "brand": "Repsol",
    "fuelType": "Gasolina simples 95",
    "lastUpdated": "2024-07-26T08:15:00Z",
    "district": "Faro",
    "address": "Av. 5 de Outubro",
    "locality": "Faro",
    "postalCode": "8000-079",
    "latitude": 37.021,
    "longitude": -7.935
  },
  {
    "id": 8,
    "name": "Galp Coimbra",
    "stationType": "Rede",
    "municipality": "Coimbra",
    "price": 1.589,
    "brand": "Galp",
    "fuelType": "Gasóleo simples",
    "lastUpdated": "2024-07-26T09:45:00Z",
    "district": "Coimbra",
    "address": "Avenida Fernão de Magalhães",
    "locality": "Coimbra",
    "postalCode": "3000-176",
    "latitude": 40.2111,
    "longitude": -8.4326
  }
];

export const FUEL_TYPES = {
    GASOLINE: "Gasolina",
    DIESEL: "Gasóleo",
    LPG: "GPL"
};

export const POPULAR_LOCATIONS = [
    { name: "Lisbon", imageUrl: "https://picsum.photos/seed/lisbon/400/400" },
    { name: "Porto", imageUrl: "https://picsum.photos/seed/porto/400/400" },
    { name: "Faro", imageUrl: "https://picsum.photos/seed/faro/400/400" },
    { name: "Algarve", imageUrl: "https://picsum.photos/seed/algarve/400/400" },
];

export const FUEL_TYPE_IMAGES = [
    { name: "Gasoline", imageUrl: "https://picsum.photos/seed/gasoline/400/400" },
    { name: "Diesel", imageUrl: "https://picsum.photos/seed/diesel/400/400" },
    { name: "LPG", imageUrl: "https://picsum.photos/seed/lpg/400/400" },
    { name: "Electric", imageUrl: "https://picsum.photos/seed/electric/400/400" },
]
