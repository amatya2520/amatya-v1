import { createContext, useContext, useState, useCallback, ReactNode, useEffect } from 'react';
import type { CartProduct } from '@/context/CartContext';
import { toast } from 'sonner';

type WishlistItem = {
  id: string; // composite id: `${product.id}::${variantIndex}`
  product: CartProduct;
  variantIndex: number;
};

interface WishlistContextType {
  items: WishlistItem[];
  addToWishlist: (product: CartProduct, variantIndex?: number) => void;
  removeFromWishlist: (itemId: string) => void;
  isInWishlist: (productId: string, variantIndex?: number) => boolean;
  toggleWishlist: (product: CartProduct, variantIndex?: number) => void;
  clearWishlist: () => void;
}

const STORAGE_KEY = 'wishlist_v1';

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export const WishlistProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<WishlistItem[]>(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return [];
      return JSON.parse(raw) as WishlistItem[];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      // ignore
    }
  }, [items]);

  const makeId = (productId: string, variantIndex = 0) => `${productId}::${variantIndex}`;

  const addToWishlist = useCallback((product: CartProduct, variantIndex = 0) => {
    const id = makeId(product.id, variantIndex);
    setItems((prev) => {
      if (prev.find((p) => p.id === id)) return prev;
      return [...prev, { id, product, variantIndex }];
    });
    toast.success(`${product.name} added to wishlist`);
  }, []);

  const removeFromWishlist = useCallback((itemId: string) => {
    setItems((prev) => prev.filter((p) => p.id !== itemId));
    toast.info('Removed from wishlist');
  }, []);

  const isInWishlist = useCallback(
    (productId: string, variantIndex?: number) => {
      if (typeof variantIndex === 'number') {
        return items.some((p) => p.id === makeId(productId, variantIndex));
      }
      return items.some((p) => p.product.id === productId);
    },
    [items]
  );

  const toggleWishlist = useCallback((product: CartProduct, variantIndex = 0) => {
    const id = makeId(product.id, variantIndex);
    const exists = items.find((p) => p.id === id);
    if (exists) {
      removeFromWishlist(id);
    } else {
      addToWishlist(product, variantIndex);
    }
  }, [items, addToWishlist, removeFromWishlist]);

  const clearWishlist = useCallback(() => {
    setItems([]);
    toast.info('Wishlist cleared');
  }, []);

  return (
    <WishlistContext.Provider
      value={{ items, addToWishlist, removeFromWishlist, isInWishlist, toggleWishlist, clearWishlist }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) throw new Error('useWishlist must be used within WishlistProvider');
  return context;
};
