'use server'

import { createClient } from "@/lib/supabase/server";
import { db } from "@/db";
import { orders, orderItems } from "@/db/schema";

// Formdan gelecek veriler ve Zustand'dan gelecek sepet verisi için
export async function createOrder(cartItems: any[], formData: FormData, total: number) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return { success: false, error: "Güvenlik sebebiyle oturumunuz sonlanmış olabilir. Lütfen tekrar giriş yapın." };
  }

  // Formdan adres bilgilerini al ve birleştir
  const address = formData.get('address') as string;
  const city = formData.get('city') as string;
  const zip = formData.get('zip') as string;
  const fullAddress = `${address}, ${city}, ${zip}`;

  try {
    // 1. Siparişin Ana Kaydını Oluştur (Orders Tablosu)
    const [newOrder] = await db.insert(orders).values({
      userId: user.id,
      totalAmount: total.toString(),
      address: fullAddress,
      status: "pending" // Ödeme entegrasyonu gelene kadar 'bekliyor' diyelim
    }).returning({ id: orders.id });

    // 2. Sepetteki Ürünleri Siparişe Bağla (Order Items Tablosu)
    const itemsToInsert = cartItems.map(item => ({
      orderId: newOrder.id,
      productId: item.id,
      quantity: item.quantity,
      price: item.price.toString()
    }));

    await db.insert(orderItems).values(itemsToInsert);

    // Başarılı olursa ID'yi dön (Teşekkürler sayfasında göstereceğiz)
    return { success: true, orderId: newOrder.id };

  } catch (error) {
    console.error("Sipariş oluşturma hatası:", error);
    return { success: false, error: "Sipariş oluşturulurken beklenmeyen bir hata oluştu." };
  }
}