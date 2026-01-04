import { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import type { Product } from '@/data/products';
import { toast } from 'sonner';

export interface CartItem {
  product: Product;
  variantIndex: number;
  quantity: number;
}

interface CartContextType {
  items: CartItem[];
  addToCart: (product: Product, variantIndex: number, quantity?: number) => void;
  removeFromCart: (productId: string, variantIndex: number) => void;
  updateQuantity: (productId: string, variantIndex: number, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  const addToCart = useCallback((product: Product, variantIndex: number, quantity = 1) => {
    // Validate inputs
    if (!product || variantIndex < 0 || !product.variants?.[variantIndex]) {
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
    toast.success(`${product.name} added to cart`, {
      description: `${variant.weight} × ${quantity}`,
    });
    
    // Auto-open cart drawer
    setIsOpen(true);
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
