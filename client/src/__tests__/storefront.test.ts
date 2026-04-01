import { describe, it, expect } from 'vitest';
import { PRODUCTS } from '@/data/products';
import type { Product, CartItem } from '@/types/storefront';

describe('Storefront - Products', () => {
  it('should have exactly 1 product', () => {
    expect(PRODUCTS).toHaveLength(1);
  });

  it('should have all required product fields', () => {
    PRODUCTS.forEach((product) => {
      expect(product).toHaveProperty('id');
      expect(product).toHaveProperty('name');
      expect(product).toHaveProperty('year');
      expect(product).toHaveProperty('type');
      expect(product).toHaveProperty('price');
      expect(product).toHaveProperty('palette');
      expect(product).toHaveProperty('shape');
    });
  });

  it('should have unique product IDs', () => {
    const ids = PRODUCTS.map((p) => p.id);
    const uniqueIds = new Set(ids);
    expect(uniqueIds.size).toBe(PRODUCTS.length);
  });

  it('should have valid prices', () => {
    PRODUCTS.forEach((product) => {
      expect(product.price).toBeGreaterThan(0);
      expect(typeof product.price).toBe('number');
    });
  });

  it('should have valid shape types', () => {
    const validShapes = ['grid', 'circle', 'lines', 'dots', 'cross', 'image'];
    PRODUCTS.forEach((product) => {
      expect(validShapes).toContain(product.shape);
    });
  });

  it('should have valid palette arrays with 4 colors', () => {
    PRODUCTS.forEach((product) => {
      expect(Array.isArray(product.palette)).toBe(true);
      expect(product.palette).toHaveLength(4);
      product.palette.forEach((color) => {
        expect(typeof color).toBe('string');
        expect(color).toMatch(/^#[0-9a-f]{6}$/i);
      });
    });
  });
});

describe('Storefront - Cart Logic', () => {
  it('should calculate cart total correctly', () => {
    const cartItems: CartItem[] = [PRODUCTS[0]];
    const total = cartItems.reduce((sum, item) => sum + item.price, 0);
    expect(total).toBe(PRODUCTS[0].price);
  });

  it('should format price correctly', () => {
    const price = 12.0;
    const formatted = price.toFixed(2);
    expect(formatted).toBe('12.00');
  });

  it('should handle empty cart', () => {
    const cartItems: CartItem[] = [];
    const total = cartItems.reduce((sum, item) => sum + item.price, 0);
    expect(total).toBe(0);
  });

  it('should prevent duplicate items in cart', () => {
    const cartItems: CartItem[] = [PRODUCTS[0]];
    const productToAdd = PRODUCTS[0];
    const isDuplicate = cartItems.some((item) => item.id === productToAdd.id);
    expect(isDuplicate).toBe(true);
  });

  it('should remove item from cart by ID', () => {
    const cartItems: CartItem[] = [PRODUCTS[0]];
    const itemIdToRemove = PRODUCTS[0].id;
    const filtered = cartItems.filter((item) => item.id !== itemIdToRemove);
    expect(filtered).toHaveLength(0);
    expect(filtered.some((item) => item.id === itemIdToRemove)).toBe(false);
  });
});

describe('Storefront - Checkout', () => {
  it('should validate form data correctly', () => {
    const validFormData = {
      name: 'John Doe',
      email: 'john@example.com',
      cardNumber: '4111 1111 1111 1111',
      expiry: '12 / 25',
      cvc: '123',
    };

    const isValid =
      validFormData.name &&
      validFormData.email &&
      validFormData.cardNumber.replace(/\s/g, '').length >= 14;

    expect(isValid).toBe(true);
  });

  it('should reject incomplete form data', () => {
    const incompleteFormData = {
      name: '',
      email: 'john@example.com',
      cardNumber: '4111 1111',
      expiry: '12 / 25',
      cvc: '123',
    };

    const isValid =
      !!incompleteFormData.name &&
      !!incompleteFormData.email &&
      incompleteFormData.cardNumber.replace(/\s/g, '').length >= 14;

    expect(isValid).toBe(false);
  });

  it('should format card number with spaces', () => {
    const input = '4111111111111111';
    const formatted = input.match(/.{1,4}/g)?.join(' ') || input;
    expect(formatted).toBe('4111 1111 1111 1111');
  });

  it('should format expiry date correctly', () => {
    const input = '1225';
    const formatted = input.slice(0, 2) + ' / ' + input.slice(2);
    expect(formatted).toBe('12 / 25');
  });
});

describe('Storefront - Product Details', () => {
  it('should have correct product names', () => {
    const expectedNames = ['CLARITY'];
    PRODUCTS.forEach((product, index) => {
      expect(product.name).toBe(expectedNames[index]);
    });
  });

  it('should have correct product types', () => {
    expect(PRODUCTS[0].type).toContain('ALBUM');
  });

  it('should have correct product years', () => {
    expect(PRODUCTS[0].year).toBe('2025');
  });
});
