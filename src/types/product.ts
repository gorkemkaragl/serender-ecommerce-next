import { InferSelectModel } from 'drizzle-orm';
import { categories, products } from '@/db/schema'; // Şema dosyanın yolu

// Otomatik Çıkarım
export type Category = InferSelectModel<typeof categories>;
export type Product = InferSelectModel<typeof products>;

// İlişkili Tip (Bunu yine elle ekliyoruz veya extend ediyoruz)
export type ProductWithCategory = Product & {
  category: Category | null;
};