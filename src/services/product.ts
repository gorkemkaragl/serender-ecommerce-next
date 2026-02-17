import { db } from "@/db"; // Drizzle bağlantımız
import { products, categories } from "@/db/schema";
import { desc, eq } from "drizzle-orm";

// (Ana Sayfa İçin) En Yeni 4 Ürünü Getir
export async function getFeaturedProducts() {
  return await db.query.products.findMany({
    limit: 4, // Sadece 4 tane getir
    orderBy: [desc(products.createdAt)], // En yeniler en başta
    with: {
      category: true, // Kategori detayını da (adı, ikonu) getir
    },
  });
}

// Tüm Kategorileri Getir (Header ve Filtreler İçin)
export async function getAllCategories() {
  return await db.select().from(categories);
}

// Tüm Ürünleri Getir (Shop Sayfası İçin)
export async function getAllProducts(categoryId?: string) {
  return await db.query.products.findMany({
    where: categoryId ? eq(products.categoryId, categoryId) : undefined,
    orderBy: [desc(products.createdAt)],
    with: {
      category: true,
    },
  });
}