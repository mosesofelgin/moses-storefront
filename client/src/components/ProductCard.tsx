import { useEffect, useRef } from 'react';
import type { Product } from '@/types/storefront';
import { drawCover } from '@/utils/canvas';

interface ProductCardProps {
  product: Product;
  isInCart: boolean;
  onAddToCart: (product: Product) => void;
}

export function ProductCard({ product, isInCart, onAddToCart }: ProductCardProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (canvasRef.current) {
      drawCover(canvasRef.current, product);
    }
  }, [product]);

  const handleAddClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!isInCart) {
      onAddToCart(product);
    }
  };

  return (
    <div className="product-card">
      <div className="cover-wrap">
        <canvas
          ref={canvasRef}
          className="cover-canvas"
          width={400}
          height={400}
        />
      </div>

      <div className="product-info">
        <span className="product-year">{product.year}</span>
        <span className="product-name">{product.name}</span>
        <span className="product-type">{product.type}</span>

        <div className="product-bottom">
          <span className="product-price">${product.price.toFixed(2)}</span>
          <button
            className={`add-btn ${isInCart ? 'added' : ''}`}
            onClick={handleAddClick}
            disabled={isInCart}
          >
            {isInCart ? 'IN BAG' : 'ADD TO BAG'}
          </button>
        </div>
      </div>
    </div>
  );
}
