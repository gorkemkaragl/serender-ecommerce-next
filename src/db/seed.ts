import { db } from './index';
import { categories, products } from './schema';

async function main() {
  console.log('🌱 Seeding process started...');

  // 1. Temizlik (Önce eskileri sil)
  // Not: İlişkisel veritabanında önce çocukları (products), sonra ebeveynleri (categories) silmelisin.
  await db.delete(products);
  await db.delete(categories);

  console.log('🧹 Old data cleared.');

  // 2. Kategorileri Ekle
  await db.insert(categories).values([
    { id: 'c1', name: 'Vegetables', icon: 'Carrot' },
    { id: 'c2', name: 'Fruits', icon: 'Apple' },
    { id: 'c3', name: 'Dairy & Eggs', icon: 'Milk' },
    { id: 'c4', name: 'Bakery', icon: 'Croissant' },
    { id: 'c5', name: 'Beverages', icon: 'Coffee' },
    { id: 'c6', name: 'Meat & Fish', icon: 'Beef' },
    { id: 'c7', name: 'Pantry', icon: 'Wheat' },
  ]);

  console.log('✅ Categories inserted.');

  // 3. Ürünleri Ekle
  // Not: price alanını string olarak gönderiyoruz ("24.90"), numeric tip olduğu için.
  await db.insert(products).values([
    {
      name: "Fresh Veggie Box",
      slug: "fresh-veggie-box",
      description: "A weekly selection of seasonal vegetables directly from local farmers.",
      price: "24.90",
      image: "https://images.unsplash.com/photo-1595855709930-bc5e0e37b420?q=80&w=2070&auto=format&fit=crop",
      weight: "4-5 kg",
      isNew: true,
      categoryId: 'c1' // Vegetables
    },
    {
      name: "Organic Avocados",
      slug: "organic-avocados",
      description: "Creamy, rich and perfectly ripe avocados.",
      price: "8.50",
      image: "https://images.unsplash.com/photo-1523049673856-6ca21b6a3725?q=80&w=2070&auto=format&fit=crop",
      weight: "3 pcs",
      isNew: false,
      categoryId: 'c1'
    },
    {
      name: "Seasonal Fruit Basket",
      slug: "seasonal-fruit-basket",
      description: "Sweet and juicy seasonal fruits packed with vitamins.",
      price: "18.90",
      image: "https://images.unsplash.com/photo-1610832958506-aa56368176cf?q=80&w=2070&auto=format&fit=crop",
      weight: "3 kg",
      isNew: true,
      categoryId: 'c2' // Fruits
    },
    {
      name: "Sourdough Bread",
      slug: "sourdough-bread",
      description: "Artisan sourdough bread baked fresh every morning.",
      price: "5.50",
      image: "https://images.unsplash.com/photo-1585476644313-08003d858172?q=80&w=2070&auto=format&fit=crop",
      weight: "750g",
      isNew: false,
      categoryId: 'c4' // Bakery
    }
  ]);

  console.log('✅ Products inserted.');
  console.log('🚀 Seeding finished successfully!');
  process.exit(0);
}

main().catch((err) => {
  console.error('❌ Seeding failed:', err);
  process.exit(1);
});