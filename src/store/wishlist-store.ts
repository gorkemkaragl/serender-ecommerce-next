import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Product } from "@/types";

interface WishlistState {
  items: Product[];
  addItem: (product: Product) => void;
  removeItem: (productId: string) => void;
  hasItem: (productId: string) => boolean; // Ürün favoride mi kontrolü
  clearWishlist: () => void;
  setItems: (items: Product[]) => void;
}

export const useWishlistStore = create<WishlistState>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (product) => {
        const currentItems = get().items;
        // Eğer zaten varsa ekleme 
        if (!currentItems.find((item) => item.id === product.id)) {
          set({ items: [...currentItems, product] });
        }
      },

      removeItem: (id) => {
        set({ items: get().items.filter((item) => item.id !== id) });
      },

      // Bu fonksiyon UI'da kalbin dolu mu boş mu olacağını belirler
      hasItem: (id) => {
        return get().items.some((item) => item.id === id);
      },
      setItems: (items) => set({ items }),
      clearWishlist: () => set({ items: [] }),
    }),
    {
      name: "serender-wishlist",
    }
  )
);