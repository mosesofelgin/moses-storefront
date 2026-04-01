import { useState } from 'react';
import type { CartItem } from '@/types/storefront';

interface CheckoutModalProps {
  isOpen: boolean;
  items: CartItem[];
  onClose: () => void;
  onSubmit: (formData: CheckoutFormData) => void;
}

export interface CheckoutFormData {
  name: string;
  email: string;
  cardNumber: string;
  expiry: string;
  cvc: string;
}

export function CheckoutModal({
  isOpen,
  items,
  onClose,
  onSubmit,
}: CheckoutModalProps) {
  const [formData, setFormData] = useState<CheckoutFormData>({
    name: '',
    email: '',
    cardNumber: '',
    expiry: '',
    cvc: '',
  });

  const [cardError, setCardError] = useState(false);

  const total = items.reduce((sum, item) => sum + item.price, 0);

  const formatCardNumber = (value: string): string => {
    const digits = value.replace(/\D/g, '').slice(0, 16);
    return digits.match(/.{1,4}/g)?.join(' ') || digits;
  };

  const formatExpiry = (value: string): string => {
    let digits = value.replace(/\D/g, '').slice(0, 4);
    if (digits.length > 2) {
      digits = digits.slice(0, 2) + ' / ' + digits.slice(2);
    }
    return digits;
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: keyof CheckoutFormData
  ) => {
    let value = e.target.value;

    if (field === 'cardNumber') {
      value = formatCardNumber(value);
    } else if (field === 'expiry') {
      value = formatExpiry(value);
    }

    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const { name, email, cardNumber } = formData;
    const cleanCardNumber = cardNumber.replace(/\s/g, '');

    if (!name || !email || cleanCardNumber.length < 14) {
      setCardError(true);
      setTimeout(() => setCardError(false), 1200);
      return;
    }

    onSubmit(formData);
  };

  if (!isOpen) return null;

  return (
    <div className="checkout-modal open">
      <div className="checkout-box">
        <h2 className="checkout-title">CHECKOUT</h2>
        <p className="checkout-sub">Complete your purchase</p>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Full Name</label>
            <input
              className="form-input"
              type="text"
              placeholder="Your name"
              value={formData.name}
              onChange={(e) => handleInputChange(e, 'name')}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Email Address</label>
            <input
              className="form-input"
              type="email"
              placeholder="your@email.com"
              value={formData.email}
              onChange={(e) => handleInputChange(e, 'email')}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Card Number</label>
            <input
              className={`form-input ${cardError ? 'border-[#553333]' : ''}`}
              type="text"
              placeholder="•••• •••• •••• ••••"
              maxLength={19}
              value={formData.cardNumber}
              onChange={(e) => handleInputChange(e, 'cardNumber')}
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Expiry</label>
              <input
                className="form-input"
                type="text"
                placeholder="MM / YY"
                maxLength={7}
                value={formData.expiry}
                onChange={(e) => handleInputChange(e, 'expiry')}
              />
            </div>
            <div className="form-group">
              <label className="form-label">CVC</label>
              <input
                className="form-input"
                type="text"
                placeholder="•••"
                maxLength={3}
                value={formData.cvc}
                onChange={(e) => handleInputChange(e, 'cvc')}
              />
            </div>
          </div>

          {/* Order Summary */}
          <div className="order-summary">
            {items.map((item) => (
              <div key={item.id} className="order-line">
                <span>{item.name}</span>
                <span>${item.price.toFixed(2)}</span>
              </div>
            ))}
            <div className="order-total">
              <span className="order-total-label">Total</span>
              <span className="order-total-amount">${total.toFixed(2)}</span>
            </div>
          </div>

          {/* Actions */}
          <div className="checkout-actions">
            <button
              type="button"
              className="btn-cancel"
              onClick={onClose}
            >
              BACK
            </button>
            <button type="submit" className="btn-purchase">
              COMPLETE PURCHASE
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
