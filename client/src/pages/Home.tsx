import { useState } from 'react';
import { Navigation } from '@/components/Navigation';
import { Hero } from '@/components/Hero';
import { ProductGrid } from '@/components/ProductGrid';
import { CartPanel } from '@/components/CartPanel';
import { CheckoutModal, type CheckoutFormData } from '@/components/CheckoutModal';
import { SuccessScreen } from '@/components/SuccessScreen';
import { PRODUCTS } from '@/data/products';
import type { Product, CartItem } from '@/types/storefront';

export default function Home() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isSuccessOpen, setIsSuccessOpen] = useState(false);
  const [purchasedItems, setPurchasedItems] = useState<CartItem[]>([]);

  const handleAddToCart = (product: Product) => {
    if (!cartItems.find((item) => item.id === product.id)) {
      setCartItems((prev) => [...prev, product]);
    }
  };

  const handleRemoveFromCart = (id: number) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleOpenCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  const handleCloseCheckout = () => {
    setIsCheckoutOpen(false);
  };

  const handleCompleteCheckout = (formData: CheckoutFormData) => {
    // Store purchased items for success screen
    setPurchasedItems([...cartItems]);

    // Reset cart and close checkout
    setCartItems([]);
    setIsCheckoutOpen(false);
    setIsSuccessOpen(true);
  };

  const handleContinueShopping = () => {
    setIsSuccessOpen(false);
    setPurchasedItems([]);
  };

  return (
    <div className="shop-root">
      <Navigation
        cartCount={cartItems.length}
        onCartClick={() => setIsCartOpen(true)}
      />

      <Hero />

      <ProductGrid
        products={PRODUCTS}
        cartItems={cartItems}
        onAddToCart={handleAddToCart}
      />

      <CartPanel
        isOpen={isCartOpen}
        items={cartItems}
        onClose={() => setIsCartOpen(false)}
        onRemoveItem={handleRemoveFromCart}
        onCheckout={handleOpenCheckout}
      />

      <CheckoutModal
        isOpen={isCheckoutOpen}
        items={cartItems}
        onClose={handleCloseCheckout}
        onSubmit={handleCompleteCheckout}
      />

      <SuccessScreen
        isOpen={isSuccessOpen}
        items={purchasedItems}
        onContinue={handleContinueShopping}
      />
    </div>
  );
}
