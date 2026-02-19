"use client";

import { useEffect } from "react";
import { useWishlistStore } from "@/store/wishlist-store";
import { Product } from "@/types";

interface Props {
  dbWishlist: Product[];
}

export default function WishlistSync({ dbWishlist }: Props) {
  const setItems = useWishlistStore((state) => state.setItems);

  useEffect(() => {
    // Veritabanından gelen favorileri Zustand store'a eşitle
    setItems(dbWishlist);
  }, [dbWishlist, setItems]);

  // Ekranda yer kaplamaması için null dönüyoruz
  return null; 
}