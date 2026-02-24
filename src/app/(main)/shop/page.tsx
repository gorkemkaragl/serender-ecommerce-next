import { getAllProducts, getAllCategories } from "@/services/product";
import { Suspense } from "react";
import ShopClient from "./ShopClient";


export default async function ShopPage() {
  // Veritabanından verileri çek (Server-Side)
  // Promise.all ile ikisini aynı anda çekiyoruz (Daha hızlı)
  const [products, categories] = await Promise.all([
    getAllProducts(),    // Tüm ürünler
    getAllCategories()   // Tüm kategoriler
  ]);

  return (
    <div className="bg-secondary min-h-screen">
       <Suspense>
          {/* Verileri Client Bileşenine yolluyoruz */}
          <ShopClient 
            dbProducts={products} 
            categories={categories} 
          />
       </Suspense>
    </div>
  );
}