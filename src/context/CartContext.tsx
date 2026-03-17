import { createContext, useContext, useState, useCallback, ReactNode, useEffect } from 'react';
import type { Product } from '@/data/products';
import type { NormalizedProduct } from '@/lib/shopify';
import { toast } from 'sonner';

export interface CartItem {
  product: CartProduct;
  variantIndex: number;
  quantity: number;
}

interface CartContextType {
  items: CartItem[];
  addToCart: (product: CartProduct, variantIndex: number, quantity?: number) => void;
  removeFromCart: (productId: string, variantIndex: number) => void;
  updateQuantity: (productId: string, variantIndex: number, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

export type CartProduct = Product | NormalizedProduct;

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const STORAGE_KEY = 'cart_v1';

  const [items, setItems] = useState<CartItem[]>(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return [];
      const parsed = JSON.parse(raw) as CartItem[];
      if (!Array.isArray(parsed)) return [];

      // Filter out invalid entries (prevents runtime errors if schema changes)
      return parsed.filter((item) => {
        if (!item || typeof item !== 'object') return false;
        if (!item.product || typeof item.product !== 'object') return false;
        if (typeof (item as CartItem).variantIndex !== 'number') return false;
        if (typeof (item as CartItem).quantity !== 'number') return false;
        const product = (item as CartItem).product as CartProduct;
        if (typeof product.id !== 'string') return false;
        if (!Array.isArray((product as any).variants)) return false;
        const variantIndex = (item as CartItem).variantIndex;
        if (variantIndex < 0 || !(product as any).variants?.[variantIndex]) return false;
        if ((item as CartItem).quantity < 1) return false;
        return true;
      });
    } catch {
      return [];
    }
  });
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    try {
      if (items.length === 0) {
        localStorage.removeItem(STORAGE_KEY);
        return;
      }
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      // ignore storage failures (private mode / quota / blocked)
    }
  }, [items]);

  const addToCart = useCallback((product: CartProduct, variantIndex: number, quantity = 1) => {
    try {
      // Validate inputs
      if (!product || variantIndex < 0 || !product.variants || !product.variants[variantIndex]) {
        toast.error('Invalid product or variant');
        return;
      }

      setItems((prev) => {
        const existingIndex = prev.findIndex(
          (item) => item.product.id === product.id && item.variantIndex === variantIndex
        );

        if (existingIndex > -1) {
          const updated = [...prev];
          updated[existingIndex].quantity += quantity;
          return updated;
        }

        return [...prev, { product, variantIndex, quantity }];
      });

      const variant = product.variants[variantIndex];
      const variantWeight = variant?.weight || 'Standard';
      toast.success(`${product.name} added to cart`, {
        description: `${variantWeight} × ${quantity}`,
      });
      
      // Auto-open cart drawer
      setIsOpen(true);
    } catch (error) {
      console.error('Error adding to cart:', error);
      toast.error('Failed to add product to cart');
    }
  }, []);

  const removeFromCart = useCallback((productId: string, variantIndex: number) => {
    setItems((prev) =>
      prev.filter(
        (item) => !(item.product.id === productId && item.variantIndex === variantIndex)
      )
    );
    toast.info('Item removed from cart');
  }, []);

  const updateQuantity = useCallback((productId: string, variantIndex: number, quantity: number) => {
    if (quantity < 1) return;
    setItems((prev) =>
      prev.map((item) =>
        item.product.id === productId && item.variantIndex === variantIndex
          ? { ...item, quantity }
          : item
      )
    );
  }, []);

  const clearCart = useCallback(() => {
    setItems([]);
  }, []);

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce(
    (sum, item) => {
      const price = item.product.variants[item.variantIndex]?.price || 0;
      return sum + price * item.quantity;
    },
    0
  );

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalItems,
        totalPrice,
        isOpen,
        setIsOpen,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within CartProvider');
  return context;
};
