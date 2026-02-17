import { getAllProducts, getAllCategories } from "@/services/product";
import { Suspense } from "react";
import ShopClient from "./ShopClient";

// Veri çekilirken gösterilecek basit bir yükleniyor yazısı (veya Skeleton)
function LoadingFallback() {
  return <div className="p-20 text-center text-primary">Loading market...</div>;
}

export default async function ShopPage() {
  // Veritabanından verileri çek (Server-Side)
  // Promise.all ile ikisini aynı anda çekiyoruz (Daha hızlı)
  const [products, categories] = await Promise.all([
    getAllProducts(),    // Tüm ürünler
    getAllCategories()   // Tüm kategoriler
  ]);

  return (
    <div className="bg-secondary min-h-screen">
       <Suspense fallback={<LoadingFallback />}>
          {/* Verileri Client Bileşenine yolluyoruz */}
          <ShopClient 
            dbProducts={products} 
            categories={categories} 
          />
       </Suspense>
    </div>
  );
}