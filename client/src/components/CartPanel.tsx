import type { CartItem } from '@/types/storefront';
import { CartItemDisplay } from './CartItemDisplay';

interface CartPanelProps {
  isOpen: boolean;
  items: CartItem[];
  onClose: () => void;
  onRemoveItem: (id: number) => void;
  onCheckout: () => void;
}

export function CartPanel({
  isOpen,
  items,
  onClose,
  onRemoveItem,
  onCheckout,
}: CartPanelProps) {
  const total = items.reduce((sum, item) => sum + item.price, 0);

  return (
    <>
      {/* Backdrop */}
      <div
        className={`cart-backdrop ${isOpen ? 'open' : ''}`}
        onClick={onClose}
      />

      {/* Cart Panel */}
      <div className={`cart-panel ${isOpen ? 'open' : ''}`}>
        <div className="cart-header">
          <h2 className="cart-title">CART</h2>
          <button className="close-btn" onClick={onClose}>
            CLOSE
          </button>
        </div>

        <div className="cart-items">
          {items.length === 0 ? (
            <div className="cart-empty">
              <div className="cart-empty-icon">◻</div>
              <span className="cart-empty-text">Empty</span>
            </div>
          ) : (
            items.map((item) => (
              <CartItemDisplay
                key={item.id}
                item={item}
                onRemove={onRemoveItem}
              />
            ))
          )}
        </div>

        <div className="cart-footer">
          <div className="cart-subtotal">
            <span className="subtotal-label">SUBTOTAL</span>
            <span className="subtotal-amount">${total.toFixed(2)}</span>
          </div>
          <button
            className="checkout-btn"
            disabled={items.length === 0}
            onClick={onCheckout}
          >
            CHECKOUT
          </button>
        </div>
      </div>
    </>
  );
}
