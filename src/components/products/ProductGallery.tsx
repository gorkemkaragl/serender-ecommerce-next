"use client";

import { useState } from "react";
import Image from "next/image";

interface ProductGalleryProps {
  image: string; // Ana resim
  gallery?: string[] | null; // Varsa galeri resimleri
  name: string; // Alt etiketleri için ürün adı
}

export default function ProductGallery({ image, gallery, name }: ProductGalleryProps) {
  // Ekranda büyük görünecek resmi tutan State (Varsayılan: Ana resim)
  const [mainImage, setMainImage] = useState(image);

  // Ana resmi ve galeri resimlerini tek bir dizide birleştir
  const allImages = [image, ...(gallery || [])];

  return (
    <div className="flex flex-col gap-4">
      
      {/* BÜYÜK ANA RESİM */}
      <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-secondary/10 border border-primary/10">
        <Image
          src={mainImage}
          alt={name}
          fill
          priority // Ana resim olduğu için LCP (Yükleme hızı) için öncelik ver
          className="object-cover transition-opacity duration-300"
        />
      </div>

      {/* KÜÇÜK RESİMLER (THUMBNAILS) - Sadece 1'den fazla resim varsa göster */}
      {allImages.length > 1 && (
        <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
          {allImages.map((img, index) => (
            <button
              key={index}
              onClick={() => setMainImage(img)} // Üstüne gelince değiştir (Tıklama da yapabilirsin onClick ile)
              className={`relative w-20 h-20 shrink-0 rounded-xl overflow-hidden border-2 transition-all duration-200 cursor-pointer ${
                mainImage === img 
                  ? "border-primary shadow-md" // Seçiliyse çerçeveyi belirgin yap
                  : "border-transparent hover:border-primary/50 opacity-70 hover:opacity-100" // Seçili değilse biraz soluk durur
              }`}
            >
              <Image
                src={img}
                alt={`${name} thumbnail ${index + 1}`}
                fill
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}
      
    </div>
  );
}