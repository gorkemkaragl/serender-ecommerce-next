"use client";

import { toggleWishlistDb } from "@/app/actions/wishlist";
import Image from "next/image";
import { Heart, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Product } from "@/types";
import Link from "next/link";
import { useCartStore } from "@/store/cart-store";
import { toast } from "sonner";
import { useWishlistStore } from "@/store/wishlist-store";
import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../ui/alert-dialog";

interface ProductCardProps {
  product: Product;
}

//Ürün Kartı Bileşeni: Ürün listelerinde ve benzer ürünlerde kullanacağız
export default function ProductCard({ product }: ProductCardProps) {
  const router = useRouter();
  const [showLoginAlert, setShowLoginAlert] = useState(false);
  // MOUNT KONTROLÜ İÇİN STATE
  const [isMounted, setIsMounted] = useState(false);
  const addItem = useCartStore((state) => state.addItem);
  const {
    addItem: addToWishlist,
    removeItem: removeFromWishlist,
    hasItem,
  } = useWishlistStore();

  // COMPONENT YÜKLENDİĞİNDE MOUNTED'I TRUE YAP
  useEffect(() => {
    setIsMounted(true);
  }, []);
  // Sunucuda ve ilk render'da 'false', sonrasında store'daki gerçek değer
  const isFavorite = isMounted ? hasItem(product.id) : false; //bu ürün favorilerde mi?

  // Favori Butonu Tıklama Fonksiyonu
  const toggleFavorite = async (e: React.MouseEvent) => {
    e.preventDefault(); 
    e.stopPropagation();

    const supabase = createClient();
    const { data: { session } } = await supabase.auth.getSession();

    if (!session) {
      setShowLoginAlert(true);
      return; 
    }

    // --- 1. AŞAMA: OPTIMISTIC UI (ANINDA EKRANI GÜNCELLE) ---
    // Veritabanını beklemeden Zustand ile kalbi doldur/boşalt.
    // Bu sayede site çok hızlı hissettirir.
    if (isFavorite) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
      toast("Added to Wishlist ❤️", {
        description: `${product.name} saved for later.`,
        style: {
          background: "var(--primary)",
          color: "var(--primary-foreground)",
        },
      });
    }

    // --- 2. AŞAMA: VERİTABANINA BİLDİR (ARKA PLANDA) ---
    const result = await toggleWishlistDb(product.id);
    
    // Eğer veritabanında bir sorun çıkarsa (örn: internet kesildi),
    // Kullanıcının ekranındaki durumu geri al (Rollback).
    if (!result.success) {
       toast.error("İşlem başarısız oldu, lütfen tekrar deneyin.");
       if (isFavorite) {
         addToWishlist(product); // Yanlışlıkla silinmiş gibi olduysa geri ekle
       } else {
         removeFromWishlist(product.id); // Yanlışlıkla eklenmiş gibi olduysa geri çıkar
       }
    }
  };

  // Sepete Ekleme Fonksiyonu
  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault(); // Sayfa yönlendirmesini engelle
    e.stopPropagation(); // Tıklamanın karta yayılmasını engelle

    addItem(product);

    toast.success("Item added to cart!", {
      style: {
        background: "var(--primary)",
        color: "var(--primary-foreground)",
      },
      description: `${product.name} has been added to your cart.`,
      duration: 3000,
    });
  };

  return (
    <>
      <Card className=" bg-white/50 p-4 shadow-2xl group relative overflow-hidden">
        {/* GÖRSEL ALANI */}
        <CardContent className="p-0 relative aspect-square rounded-xl overflow-hidden bg-neutral-light mb-4">
          {/* Link eklendi: slug'a göre dinamik adres */}
          {/* Favori Butonu (Sağ Üst) */}
          <Button
            variant="secondary"
            onClick={toggleFavorite}
            size="icon-sm"
            className={`absolute top-3 right-3 z-10  rounded-full transition 
              ${
                isFavorite
                  ? " text-red-500" // Favoriyse Kırmızı
                  : "bg-white/80 hover:bg-white hover:text-red-500 text-custom-black" // Değilse Normal
              }
            `}
          >
            {/* fill={isFavorite ? "currentColor" : "none"} -> İçi dolu kalp yapar */}
            <Heart fill={isFavorite ? "currentColor" : "none"} />
          </Button>
          <Link href={`/product/${product.slug}`}>
            {/* Ürün Resmi */}
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />

            {/* Etiket (Eğer ürün yeniyse) */}
            {product.isNew && (
              <span className="absolute top-3 left-3 bg-primary text-white text-[10px] font-bold px-2 py-1 rounded-md uppercase tracking-wide">
                New
              </span>
            )}
          </Link>
        </CardContent>

        {/*  BİLGİ ALANI */}
        <div className="space-y-1">
          <div className="flex justify-between items-start">
            <h3 className="font-serif text-lg font-bold text-custom-black line-clamp-1">
              {product.name}
            </h3>
            <span className="font-sans font-semibold text-primary">
              ${product.price}
            </span>
          </div>

          <p className="text-sm text-custom-black/60 font-sans">
            {product.weight}
          </p>
        </div>

        {/* AKSİYON BUTONU */}
        <CardFooter className="p-0 mt-4">
          <Button variant="default" onClick={handleAddToCart}>
            Add to Cart <ShoppingBag size={20} />
          </Button>
        </CardFooter>
      </Card>
      {/*  (Sadece showLoginAlert true olunca görünür) */}
      <AlertDialog open={showLoginAlert} onOpenChange={setShowLoginAlert}>
        {/* e.stopPropagation() ekliyoruz ki tıklandığında alttaki <Link> tetiklenmesin */}
        <AlertDialogContent onClick={(e) => e.stopPropagation()}>
          <AlertDialogHeader>
            <AlertDialogTitle>Giriş Yapmanız Gerekiyor</AlertDialogTitle>
            <AlertDialogDescription>
              Bu ürünü favorilerinize eklemek için üye girişi yapmalısınız.
              Şimdi giriş yapmak ister misiniz?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={(e) => e.stopPropagation()}>
              İptal
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={(e) => {
                e.stopPropagation();
                router.push("/login");
              }}
            >
              Giriş Yap
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
