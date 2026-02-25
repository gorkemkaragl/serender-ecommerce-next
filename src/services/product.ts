import { db } from "@/db"; // Drizzle bağlantımız
import { products, categories } from "@/db/schema";
import { desc, eq } from "drizzle-orm";
import { unstable_cache } from "next/cache";

// Öne Çıkan Ürünleri Getir (Ana Sayfa İçin)
export const getFeaturedProducts = unstable_cache(
  async () => {
    return await db.query.products.findMany({
      limit: 4, 
      orderBy: [desc(products.createdAt)], 
      with: {
        category: true, 
      },
    });
  },
  ['featured-products'], 
  { 
    revalidate: 3600, // 1 Saat hafızada tut
    tags: ['products'] 
  }
);

// Tüm Kategorileri Getir (Header İçin)
export const getAllCategories = unstable_cache(
  async () => {
    return await db.select().from(categories);
  },
  ['all-categories'], 
  { 
    revalidate: 86400, // Kategoriler çok nadir değiştiği için 1 gün hafızada tutuyoruz
    tags: ['categories'] 
  }
);

// Tüm Ürünleri Getir (Shop Sayfası İçin)
export const getAllProducts = unstable_cache(
  async (categoryId?: string) => {
    return await db.query.products.findMany({
      where: categoryId ? eq(products.categoryId, categoryId) : undefined,
      orderBy: [desc(products.createdAt)],
      with: {
        category: true,
      },
    });
  },
  ['all-products'], // Bu cache'in anahtar ismi (Benzersiz bir isim)
  { 
    revalidate: 3600, //  Bu veriyi 3600 saniye (1 Saat) boyunca hafızada tut!
    tags: ['products'] // İleride ürün eklediğimizde bu cache'i anında silmek için bir etiket
  }
);