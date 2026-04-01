interface NavigationProps {
  cartCount: number;
  onCartClick: () => void;
}

export function Navigation({ cartCount, onCartClick }: NavigationProps) {
  return (
    <nav className="nav">
      <div className="nav-brand">MOSES</div>
      <div className="nav-right">
        <button className="cart-btn" onClick={onCartClick}>
          CART
          <span className="cart-count">{cartCount}</span>
        </button>
      </div>
    </nav>
  );
}
