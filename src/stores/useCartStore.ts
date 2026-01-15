import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface CartItem {
  id: number;
  name: string;
  price: string;
  image: string;
  quantity: number;
  size?: string;
}

interface CartStore {
  cart: CartItem[];
  addToCart: (product: Omit<CartItem, 'quantity'>) => void;
  decreaseQuantity: (id: number) => void;
  removeFromCart: (id: number) => void;
  clearCart: () => void;
  cartCount: number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      cart: [],
      cartCount: 0,

      addToCart: (product) => {
        set((state) => {
          const existing = state.cart.find((i) => i.id === product.id);
          let updatedCart: CartItem[];

          if (existing) {
            updatedCart = state.cart.map((i) =>
              i.id === product.id ? { ...i, quantity: i.quantity + 1 } : i
            );
          } else {
            updatedCart = [...state.cart, { ...product, quantity: 1 }];
          }

          return {
            cart: updatedCart,
            cartCount: updatedCart.reduce((sum, i) => sum + i.quantity, 0),
          };
        });
      },

      decreaseQuantity: (id) => {
        set((state) => {
          const updatedCart = state.cart
            .map((i) => (i.id === id && i.quantity > 1 ? { ...i, quantity: i.quantity - 1 } : i))
            .filter((i) => i.quantity > 0);

          return {
            cart: updatedCart,
            cartCount: updatedCart.reduce((sum, i) => sum + i.quantity, 0),
          };
        });
      },

      removeFromCart: (id) => {
        set((state) => {
          const updatedCart = state.cart.filter((i) => i.id !== id);
          return {
            cart: updatedCart,
            cartCount: updatedCart.reduce((sum, i) => sum + i.quantity, 0),
          };
        });
      },

      clearCart: () => set({ cart: [], cartCount: 0 }),
    }),
    {
      name: 'albyeb-cart',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ cart: state.cart }), // only persist cart items
    }
  )
);