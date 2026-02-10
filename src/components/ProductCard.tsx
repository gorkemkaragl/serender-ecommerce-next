"use client"; 

import Image from "next/image";
import { Heart, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Product } from "@/types/product"; 
import Link from "next/link";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <Card className="border-none shadow-none bg-transparent group relative overflow-hidden">
      
      {/* GÖRSEL ALANI */}
      <CardContent className="p-0 relative aspect-square rounded-2xl overflow-hidden bg-neutral-light mb-4">
        {/* Link eklendi: slug'a göre dinamik adres */}
  <Link href={`/product/${product.slug}`}>
  
        {/* Favori Butonu (Sağ Üst) */}
        <Button 
          variant="ghost" 
          className="absolute top-3 right-3 z-10 bg-white/80 p-2 rounded-full hover:bg-white hover:text-red-500 transition shadow-sm"
          onClick={() => alert(`${product.name} favorilere eklendi!`)} // Şimdilik alert verelim
        >
          <Heart  size={18} />
        </Button>

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
        <Button 
          className="w-full bg-primary hover:bg-primary/90 text-white rounded-xl py-6 font-medium tracking-wide shadow-md hover:shadow-lg transition-all"
          onClick={() => alert(`${product.name} sepete eklendi!`)} // Şimdilik alert verelim
        >
          Add to Cart
        </Button>
      </CardFooter>
      
    </Card>
  );
}