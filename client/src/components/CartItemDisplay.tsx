import { useEffect, useRef } from 'react';
import type { CartItem } from '@/types/storefront';
import { drawCover } from '@/utils/canvas';

interface CartItemDisplayProps {
  item: CartItem;
  onRemove: (id: number) => void;
}

export function CartItemDisplay({ item, onRemove }: CartItemDisplayProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (canvasRef.current) {
      drawCover(canvasRef.current, item);
    }
  }, [item]);

  return (
    <div className="cart-item">
      <canvas
        ref={canvasRef}
        className="cart-item-thumb"
        width={104}
        height={104}
      />
      <div className="cart-item-info">
        <span className="cart-item-name">{item.name}</span>
        <span className="cart-item-type">{item.type}</span>
        <button
          className="remove-item"
          onClick={() => onRemove(item.id)}
        >
          Remove
        </button>
      </div>
      <span className="cart-item-price">${item.price.toFixed(2)}</span>
    </div>
  );
}
