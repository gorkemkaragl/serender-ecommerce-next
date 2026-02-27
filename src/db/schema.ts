import { pgTable, text, uuid, numeric, boolean, timestamp, integer,index } from 'drizzle-orm/pg-core';
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
  gallery: text('gallery').array(),
  // İlişki Alanı (Foreign Key)
  categoryId: text('category_id').references(() => categories.id),

  createdAt: timestamp('created_at').defaultNow(),
},(table) => {
  return {
    categoryIdx: index('product_category_idx').on(table.categoryId),
    createdIdx: index('product_created_idx').on(table.createdAt),
  };
});

// Bu tablo Supabase Auth ile senkronize çalışacak
export const profiles = pgTable('profiles', {
  id: uuid('id').primaryKey(), // Auth tablosundaki ID ile aynı olacak (Foreign Key)
  firstName: text('first_name').notNull(),
  lastName: text('last_name').notNull(),
  phone: text('phone').notNull(),
  email: text('email').notNull(), // Kolaylık olsun diye buraya da koyuyoruz
  createdAt: timestamp('created_at').defaultNow(),
  role: text('role').default('user').notNull(),
  
  
},(table)=>{
  return {
    phoneIdx: index('profile_phone_idx').on(table.phone)
    
  };
});

// Favori ürünler tablosu (Wishlist)
export const wishlists = pgTable('wishlists', {
  id: uuid('id').defaultRandom().primaryKey(),
  userId: uuid('user_id').notNull(), // Hangi kullanıcı?
  productId: uuid('product_id').references(() => products.id).notNull(), // Hangi ürün?
  createdAt: timestamp('created_at').defaultNow(),
});

export const orders = pgTable('orders', {
  id: uuid('id').defaultRandom().primaryKey(),
  userId: uuid('user_id').notNull(), // Siparişi kim verdi? (Supabase Auth ID)
  status: text('status').default('pending').notNull(), // pending, processing, shipped, delivered
  totalAmount: numeric('total_amount').notNull(), // Toplam ödenen tutar
  address: text('address').notNull(), // Teslimat adresi
  createdAt: timestamp('created_at').defaultNow(),
},(table)=>{
  return {
    userIdx: index('order_user_idx').on(table.userId),
    
  };
});

// --- 9. SİPARİŞ İÇERİĞİ TABLOSU (ORDER ITEMS) ---
// Bir siparişin içinde birden fazla ürün olabileceği için ayrı tabloda tutulur.
export const orderItems = pgTable('order_items', {
  id: uuid('id').defaultRandom().primaryKey(),
  orderId: uuid('order_id').references(() => orders.id).notNull(), // Hangi siparişe ait?
  productId: uuid('product_id').references(() => products.id).notNull(), // Hangi ürün alındı?
  quantity: integer('quantity').notNull(), // Kaç adet alındı?
  price: numeric('price').notNull(), // O anki fiyatı (Ürün yarın zamlanırsa eski siparişin fiyatı değişmesin diye buraya da yazıyoruz)
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

// Profil -> Çoklu Favori (Wishlist)
export const wishlistsRelations = relations(wishlists, ({ one }) => ({
  product: one(products, {
    fields: [wishlists.productId],
    references: [products.id],
  }),
}));

export const ordersRelations = relations(orders, ({ many }) => ({
  items: many(orderItems),
}));

export const orderItemsRelations = relations(orderItems, ({ one }) => ({
  order: one(orders, {
    fields: [orderItems.orderId],
    references: [orders.id],
  }),
  product: one(products, {
    fields: [orderItems.productId],
    references: [products.id],
  }),
}));