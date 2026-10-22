'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import { fallbackProducts, normalizeProduct } from '@/lib/products';

const StoreContext = createContext(null);

const getStored = (key, fallback) => {
  if (typeof window === 'undefined') return fallback;
  try {
    return JSON.parse(localStorage.getItem(key)) || fallback;
  } catch {
    return fallback;
  }
};

export function StoreProvider({ children }) {
  const [products, setProducts] = useState(fallbackProducts);
  const [catalogError, setCatalogError] = useState(false);
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [hydrated, setHydrated] = useState(false);

  // Hydrate cart/wishlist from localStorage after mount
  useEffect(() => {
    setCart(getStored('threadline-cart', []));
    setWishlist(getStored('threadline-wishlist', []));
    setHydrated(true);
  }, []);

  // Fetch live product catalog
  useEffect(() => {
    let active = true;
    fetch('/api/products')
      .then((response) => {
        if (!response.ok) throw new Error(`Catalog request failed with ${response.status}`);
        return response.json();
      })
      .then((data) => {
        if (active && Array.isArray(data) && data.length) {
          setProducts(data.map(normalizeProduct));
        }
      })
      .catch(() => {
        if (active) setCatalogError(true);
      });
    return () => { active = false; };
  }, []);

  // Persist cart to localStorage
  useEffect(() => {
    if (hydrated) {
      localStorage.setItem('threadline-cart', JSON.stringify(cart));
    }
  }, [cart, hydrated]);

  // Persist wishlist to localStorage
  useEffect(() => {
    if (hydrated) {
      localStorage.setItem('threadline-wishlist', JSON.stringify(wishlist));
    }
  }, [wishlist, hydrated]);

  const toggleWishlist = (id) =>
    setWishlist((current) =>
      current.includes(id) ? current.filter((item) => item !== id) : [...current, id]
    );

  const addToCart = (product, size, color, quantity) =>
    setCart((current) => {
      const index = current.findIndex(
        (item) => item.product.id === product.id && item.size === size && item.color === color
      );
      if (index >= 0) {
        return current.map((item, i) =>
          i === index ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      return [...current, { product, size, color, quantity }];
    });

  const removeFromCart = (item) =>
    setCart((current) =>
      current.filter(
        (entry) =>
          !(entry.product.id === item.product.id && entry.size === item.size && entry.color === item.color)
      )
    );

  const changeQuantity = (item, quantity) => {
    if (quantity < 1) {
      removeFromCart(item);
      return;
    }
    setCart((current) =>
      current.map((entry) =>
        entry.product.id === item.product.id && entry.size === item.size && entry.color === item.color
          ? { ...entry, quantity }
          : entry
      )
    );
  };

  const clearCart = () => setCart([]);

  const value = {
    products,
    catalogError,
    cart,
    wishlist,
    toggleWishlist,
    addToCart,
    removeFromCart,
    changeQuantity,
    clearCart,
  };

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore() {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used inside StoreProvider');
  }
  return context;
}
