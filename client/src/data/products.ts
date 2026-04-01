import type { Product } from '@/types/storefront';

export const PRODUCTS: Product[] = [
  {
    id: 1,
    name: 'VOID SIGNAL',
    year: '2024',
    type: 'ALBUM — 14 TRACKS',
    price: 12.0,
    palette: ['#0a0a0a', '#1c1c1c', '#2e2a28', '#4a3f38'],
    shape: 'grid',
  },
  {
    id: 2,
    name: 'COLLAPSE EP',
    year: '2023',
    type: 'EP — 6 TRACKS',
    price: 7.0,
    palette: ['#0f0f0f', '#1a1a1a', '#888880', '#c8c4be'],
    shape: 'circle',
  },
  {
    id: 3,
    name: 'MONOLITH',
    year: '2023',
    type: 'ALBUM — 11 TRACKS',
    price: 10.0,
    palette: ['#111111', '#222222', '#3a3a3a', '#595959'],
    shape: 'lines',
  },
  {
    id: 4,
    name: 'STATIC MASS',
    year: '2022',
    type: 'MIXTAPE — 18 TRACKS',
    price: 8.0,
    palette: ['#0d0d0d', '#1f1e1e', '#2a2a2a', '#e8e0d4'],
    shape: 'dots',
  },
  {
    id: 5,
    name: 'PRESSURE',
    year: '2022',
    type: 'SINGLE / B-SIDE',
    price: 3.0,
    palette: ['#0a0a0a', '#181818', '#505050', '#a0a098'],
    shape: 'cross',
  },
];
