'use server'

import { createClient } from "@/lib/supabase/server";
import { db } from "@/db";
import { wishlists } from "@/db/schema";
import { and, eq } from "drizzle-orm";

export async function toggleWishlistDb(productId: string) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return { success: false, error: "Kullanıcı girişi yapılmamış." };
  }

  try {
    // 1. Bu ürün zaten bu kullanıcının favorilerinde var mı?
    const existingItem = await db.query.wishlists.findFirst({
      where: and(
        eq(wishlists.userId, user.id),
        eq(wishlists.productId, productId)
      )
    });

    // 2. Varsa sil, yoksa ekle (Toggle Mantığı)
    if (existingItem) {
      await db.delete(wishlists).where(eq(wishlists.id, existingItem.id));
      return { success: true, action: "removed" };
    } else {
      await db.insert(wishlists).values({
        userId: user.id,
        productId: productId
      });
      return { success: true, action: "added" };
    }
  } catch (error) {
    console.error("Favori işlemi hatası:", error);
    return { success: false, error: "Bir hata oluştu." };
  }
}


export async function getUserWishlistProducts() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  // Kullanıcı yoksa boş dizi dön (Böylece çıkış yapınca liste sıfırlanır)
  if (!user) return [];

  try {
    // Kullanıcının favorilerini 'products' tablosuyla birleştirerek (join) çekiyoruz
    const userWishlists = await db.query.wishlists.findMany({
      where: eq(wishlists.userId, user.id),
      with: {
        product: true, // Ürün detaylarını da getir (İlişkilerde tanımlamıştık)
      }
    });

    // Sadece ürün objelerini bir dizi olarak döndür
    return userWishlists.map(w => w.product);
  } catch (error) {
    console.error("Favoriler çekilirken hata:", error);
    return [];
  }
}

export async function clearUserWishlistDb() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) return { success: false, error: "Kullanıcı girişi yapılmamış." };

  try {
    // Bu kullanıcıya ait tüm favori kayıtlarını sil
    await db.delete(wishlists).where(eq(wishlists.userId, user.id));
    return { success: true };
  } catch (error) {
    console.error("Favoriler temizlenirken hata:", error);
    return { success: false, error: "Bir hata oluştu." };
  }
}