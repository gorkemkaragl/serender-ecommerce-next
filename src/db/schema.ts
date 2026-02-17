import { pgTable, text, uuid, numeric, boolean, timestamp } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

// --- 1. KATEGORİ TABLOSU ---
export const categories = pgTable('categories', {
  id: text('id').primaryKey(), // 'c1', 'c2' gibi manuel ID vereceğiz
  name: text('name').notNull(),
  icon: text('name_icon').notNull(), // İkon adı (örn: "Carrot")
});

// --- 2. ÜRÜN TABLOSU ---
export const products = pgTable('products', {
  id: uuid('id').defaultRandom().primaryKey(), // Otomatik UUID
  name: text('name').notNull(),
  slug: text('slug').notNull().unique(),
  description: text('description'),
  // Numeric veritabanında hassas sayı tutar, JS'e string olarak gelir.
  price: numeric('price').notNull(), 
  image: text('image').notNull(),
  weight: text('weight'),
  isNew: boolean('is_new').default(false),
  ingredients: text('ingredients'),
  // İlişki Alanı (Foreign Key)
  categoryId: text('category_id').references(() => categories.id),

  createdAt: timestamp('created_at').defaultNow(),
});

// --- 3. İLİŞKİLER (RELATIONS) ---
// Bu kısım Drizzle'ın "query" yaparken tabloları birbirine bağlamasını sağlar.

// Kategori -> Çoklu Ürün
export const categoriesRelations = relations(categories, ({ many }) => ({
  products: many(products),
}));

// Ürün -> Tek Kategori
export const productsRelations = relations(products, ({ one }) => ({
  category: one(categories, {
    fields: [products.categoryId],
    references: [categories.id],
  }),
}));