import { create } from "zustand";
import { persist } from "zustand/middleware"; // Veriyi localStorage'a kaydeder
import { Product } from "@/types";

// Sepetteki ürünün tipi (Normal üründen farkı: 'quantity' ekliyoruz)
export interface CartItem extends Product {
  quantity: number;
}

interface CartState {
  items: CartItem[];
  addItem: (product: Product, count?: number) => void;
  removeItem: (productId: string) => void;
  increaseQuantity: (productId: string) => void;
  decreaseQuantity: (productId: string) => void;
  clearCart: () => void;
  totalPrice: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],

      // Ürün Ekleme Mantığı
      // count varsayılan olarak 1
      addItem: (product, count = 1) => {
        const currentItems = get().items;
        const existingItem = currentItems.find(
          (item) => item.id === product.id,
        );

        if (existingItem) {
          // Varsa üzerine 'count' kadar ekle
          set({
            items: currentItems.map((item) =>
              item.id === product.id
                ? { ...item, quantity: item.quantity + count }
                : item,
            ),
          });
        } else {
          // Yoksa yeni ekle (miktar 'count' kadar)
          set({ items: [...currentItems, { ...product, quantity: count }] });
        }
      },

      // Ürün Silme
      removeItem: (id) => {
        set({ items: get().items.filter((item) => item.id !== id) });
      },

      // Miktar Artır (+)
      increaseQuantity: (id) => {
        set({
          items: get().items.map((item) =>
            item.id === id ? { ...item, quantity: item.quantity + 1 } : item,
          ),
        });
      },

      // Miktar Azalt (-)
      decreaseQuantity: (id) => {
        const currentItems = get().items;
        const targetItem = currentItems.find((item) => item.id === id);

        if (targetItem?.quantity === 1) {
          // Miktar 1 ise ürünü tamamen sil
          set({ items: currentItems.filter((item) => item.id !== id) });
        } else {
          // Değilse azalt
          set({
            items: currentItems.map((item) =>
              item.id === id ? { ...item, quantity: item.quantity - 1 } : item,
            ),
          });
        }
      },

      clearCart: () => set({ items: [] }),

      // Toplam Fiyat Hesaplama
      totalPrice: () => {
        return get().items.reduce(
          (total, item) => total + Number(item.price) * item.quantity,
          0,
        );
      },
    }),
    {
      name: "food-cart", // localStorage'da bu isimle saklanacak
    },
  ),
);
