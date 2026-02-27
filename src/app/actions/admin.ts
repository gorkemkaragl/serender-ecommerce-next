"use server";

import { db } from "@/db";
import { categories, products } from "@/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

// --- KATEGORİ İŞLEMLERİ ---

export async function createCategory({ id, name, icon }: { id: string, name: string, icon: string }) {
  try {
    const newCategory = await db.insert(categories).values({
      id,
      name,
      icon,
    }).returning();
    
    // Panelde ve ana sayfada kategorileri yenile
    revalidatePath("/admin/categories");
    revalidatePath("/");
    
    return { success: true, data: newCategory[0] };
  } catch (error: any) {
    console.error("Kategori oluşturma hatası:", error);
    return { success: false, error: error.message || "Bilinmeyen bir hata oluştu." };
  }
}

export async function deleteCategory(id: string) {
  try {
    // 1. Kategori içindeki ürünleri bul (İsteğe bağlı: Ürünlerin categoryId'sini null yapabiliriz, ya da kategoriyi silmeyi engelleyebiliriz)
    const categoryProducts = await db.select().from(products).where(eq(products.categoryId, id));
    
    if (categoryProducts.length > 0) {
      return { success: false, error: "Bu kategoriye ait ürünler olduğu için silinemez. Önce ürünleri başka bir kategoriye taşıyın veya silin." };
    }

    const deleted = await db.delete(categories).where(eq(categories.id, id)).returning();
    
    revalidatePath("/admin/categories");
    revalidatePath("/");
    
    return { success: true, data: deleted[0] };
  } catch (error: any) {
    console.error("Kategori silme hatası:", error);
    return { success: false, error: error.message || "Bilinmeyen bir hata oluştu." };
  }
}

// --- ÜRÜN İŞLEMLERİ ---

export async function createProduct(productData: {
  name: string;
  slug: string;
  description: string;
  price: string;
  image: string;
  weight: string;
  isNew: boolean;
  ingredients: string;
  categoryId: string;
}) {
  try {
    const newProduct = await db.insert(products).values({
      name: productData.name,
      slug: productData.slug,
      description: productData.description,
      price: productData.price,
      image: productData.image,
      weight: productData.weight,
      isNew: productData.isNew,
      ingredients: productData.ingredients,
      categoryId: productData.categoryId,
    }).returning();
    
    revalidatePath("/admin/products");
    revalidatePath("/shop");
    revalidatePath("/");
    
    return { success: true, data: newProduct[0] };
  } catch (error: any) {
    console.error("Ürün oluşturma hatası:", error);
    return { success: false, error: error.message || "Bilinmeyen bir hata oluştu." };
  }
}

export async function deleteProduct(id: string) {
  try {
    const deleted = await db.delete(products).where(eq(products.id, id)).returning();
    
    revalidatePath("/admin/products");
    revalidatePath("/shop");
    revalidatePath("/");
    
    return { success: true, data: deleted[0] };
  } catch (error: any) {
    console.error("Ürün silme hatası:", error);
    return { success: false, error: error.message || "Bilinmeyen bir hata oluştu." };
  }
}
