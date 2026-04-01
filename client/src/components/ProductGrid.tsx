import type { Product, CartItem } from '@/types/storefront';
import { ProductCard } from './ProductCard';

interface ProductGridProps {
  products: Product[];
  cartItems: CartItem[];
  onAddToCart: (product: Product) => void;
}

export function ProductGrid({
  products,
  cartItems,
  onAddToCart,
}: ProductGridProps) {
  const cartItemIds = new Set(cartItems.map((item) => item.id));

  return (
    <section>
      <div className="section-header">
        <span className="section-label">RELEASES</span>
        <span className="section-count">{products.length} ITEMS</span>
      </div>

      <div className="product-grid">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            isInCart={cartItemIds.has(product.id)}
            onAddToCart={onAddToCart}
          />
        ))}
      </div>
    </section>
  );
}
