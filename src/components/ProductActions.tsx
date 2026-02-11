"use client";

import { useState } from "react";
import { Product } from "@/types/product";
import { useCartStore } from "@/store/cart-store";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { ShoppingBag, Minus, Plus, Heart } from "lucide-react";

interface ProductActionsProps {
  product: Product;
}

export default function ProductActions({ product }: ProductActionsProps) {
  //  Yerel State: Kullanıcı kaç tane seçti? (Varsayılan 1)
  const [count, setCount] = useState(1);

  const addItem = useCartStore((state) => state.addItem);

  // Miktar Artır
  const increment = () => setCount((prev) => prev + 1);

  // Miktar Azalt (1'in altına düşmesin)
  const decrement = () => setCount((prev) => (prev > 1 ? prev - 1 : 1));

  // Sepete Ekle
  const handleAddToCart = () => {
    addItem(product, count);

    toast.success("Item added to cart!", {
      style: {
        background: "var(--primary)",
        color: "var(--primary-foreground)",
      },
      description: `${product.name} has been added to your cart.`,
      duration: 3000,
    });

    //ekledikten sonra miktarı 1 yapalım
    setCount(1);
  };

  return (
    <div className="flex items-center gap-4 pt-4">
      {/* ADET SEÇİCİ */}
      <div className="flex items-center border border-primary/20 rounded-lg bg-white space-x-4 shadow-sm">
        <Button
          variant="ghost"
          size="icon-lg"
          onClick={decrement}
          disabled={count <= 1}
        >
          <Minus />
        </Button>

        <span className="font-bold w-6 text-center text-lg">{count}</span>

        <Button variant="ghost" size="icon-lg" onClick={increment}>
          <Plus size={18} />
        </Button>
      </div>

      {/* SEPETE EKLE BUTONU */}
      <Button
        variant="default"
        size="lg"
        onClick={handleAddToCart}
        className="flex-1  gap-2 shadow-md hover:shadow-lg "
      >
        Add to Cart <ShoppingBag />
      </Button>

      {/* FAVORİ BUTONU (Şimdilik işlevsiz) */}
      <Button variant="outline" size="icon-lg" className="rounded-full">
        <Heart />
      </Button>
    </div>
  );
}
