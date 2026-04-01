/**
 * Product data structure for the music storefront
 */
export interface Product {
  id: number;
  name: string;
  year: string;
  type: string;
  price: number;
  palette: [string, string, string, string];
  shape: 'grid' | 'circle' | 'lines' | 'dots' | 'cross' | 'image';
  imageUrl?: string;
}

/**
 * Cart item (extends Product with cart-specific data)
 */
export interface CartItem extends Product {}

/**
 * Canvas cover art generation configuration
 */
export interface CoverConfig {
  product: Product;
  canvas: HTMLCanvasElement;
}
