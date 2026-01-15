import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface WishlistItem {
  id: number;
  name: string;
  price: string;
  image: string;
  size?: string;
}

interface WishlistStore {
  wishlist: WishlistItem[];
  wishlistCount: number;
  addToWishlist: (product: WishlistItem) => void;
  removeFromWishlist: (id: number) => void;
  clearWishlist: () => void;
}

export const useWishlistStore = create<WishlistStore>()(
  persist(
    (set) => ({
      wishlist: [],
      wishlistCount: 0,

      addToWishlist: (product) => {
        set((state) => {
          if (state.wishlist.some((i) => i.id === product.id)) return state;
          const updated = [...state.wishlist, product];
          return {
            wishlist: updated,
            wishlistCount: updated.length,
          };
        });
      },

      removeFromWishlist: (id) => {
        set((state) => {
          const updated = state.wishlist.filter((i) => i.id !== id);
          return {
            wishlist: updated,
            wishlistCount: updated.length,
          };
        });
      },

      clearWishlist: () => set({ wishlist: [], wishlistCount: 0 }),
    }),
    {
      name: 'albyeb-wishlist',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ wishlist: state.wishlist }),
    }
  )
);