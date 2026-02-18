import { db } from './index';
import { categories, products } from './schema';

async function main() {
  console.log('🌱 Seeding process started...');

  // 1. Önce eski verileri temizle (Sıra önemli: Önce ürünler, sonra kategoriler)
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

  // 3. Ürünleri Ekle (Toplu Veri)
  await db.insert(products).values([
    // --- VEGETABLES (c1) ---
    {
      name: "Organic Tomatoes",
      slug: "organic-tomatoes",
      description: "Vine-ripened organic tomatoes, perfect for salads and sauces.",
      price: "12.50",
      image: "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?q=80&w=1000&auto=format&fit=crop",
      weight: "1 kg",
      isNew: false,
      categoryId: 'c1',
      ingredients: "Tomato"
    },
    {
      name: "Fresh Spinach Bundle",
      slug: "fresh-spinach",
      description: "Crunchy and fresh spinach leaves, washed and ready to eat.",
      price: "8.90",
      image: "https://images.unsplash.com/photo-1576045057995-568f588f82fb?q=80&w=1000&auto=format&fit=crop",
      weight: "500g",
      isNew: true,
      categoryId: 'c1',
      ingredients: "Spinach"
    },
    {
      name: "Red Bell Peppers",
      slug: "red-bell-peppers",
      description: "Sweet and crunchy red peppers, rich in Vitamin C.",
      price: "15.00",
      image: "https://images.unsplash.com/photo-1563565375-f3fdf5ec397e?q=80&w=1000&auto=format&fit=crop",
      weight: "3 pcs",
      isNew: false,
      categoryId: 'c1',
      ingredients: "Red Pepper"
    },

    // --- FRUITS (c2) ---
    {
      name: "Sweet Strawberries",
      slug: "sweet-strawberries",
      description: "Juicy local strawberries, hand-picked for maximum sweetness.",
      price: "35.00",
      image: "https://images.unsplash.com/photo-1464965911861-746a04b4b0a6?q=80&w=1000&auto=format&fit=crop",
      weight: "500g",
      isNew: true,
      categoryId: 'c2',
      ingredients: "Strawberry"
    },
    {
      name: "Bananas",
      slug: "bananas",
      description: "High energy snack, rich in potassium.",
      price: "18.50",
      image: "https://images.unsplash.com/photo-1603833665858-e61d17a8622e?q=80&w=1000&auto=format&fit=crop",
      weight: "1 kg",
      isNew: false,
      categoryId: 'c2',
      ingredients: "Banana"
    },
    {
      name: "Green Apples",
      slug: "green-apples",
      description: "Crisp and tart Granny Smith apples.",
      price: "14.90",
      image: "https://images.unsplash.com/photo-1610832958506-aa56368176cf?q=80&w=1000&auto=format&fit=crop",
      weight: "1 kg",
      isNew: false,
      categoryId: 'c2',
      ingredients: "Apple"
    },

    // --- DAIRY & EGGS (c3) ---
    {
      name: "Free Range Eggs",
      slug: "free-range-eggs",
      description: "Eggs from happy chickens roaming freely in nature.",
      price: "22.00",
      image: "https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?q=80&w=1000&auto=format&fit=crop",
      weight: "10 pcs",
      isNew: false,
      categoryId: 'c3',
      ingredients: "Egg"
    },
    {
      name: "Fresh Whole Milk",
      slug: "fresh-whole-milk",
      description: "Daily fresh milk from local dairy farms, pasteurized.",
      price: "12.00",
      image: "https://images.unsplash.com/photo-1563636619-e9143da7973b?q=80&w=1000&auto=format&fit=crop",
      weight: "1 Lt",
      isNew: false,
      categoryId: 'c3',
      ingredients: "Cow Milk"
    },
    {
      name: "Cheddar Cheese",
      slug: "cheddar-cheese",
      description: "Aged cheddar cheese with a sharp and nutty flavor.",
      price: "45.00",
      image: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?q=80&w=1000&auto=format&fit=crop",
      weight: "400g",
      isNew: true,
      categoryId: 'c3',
      ingredients: "Milk, Salt, Rennet, Culture"
    },

    // --- BAKERY (c4) ---
    {
      name: "Sourdough Bread",
      slug: "sourdough-bread-artisan",
      description: "Traditional sourdough bread with a crispy crust.",
      price: "15.00",
      image: "https://images.unsplash.com/photo-1585476644313-08003d858172?q=80&w=1000&auto=format&fit=crop",
      weight: "750g",
      isNew: false,
      categoryId: 'c4',
      ingredients: "Flour, Water, Salt, Yeast"
    },
    {
      name: "Chocolate Croissant",
      slug: "chocolate-croissant",
      description: "Buttery pastry filled with rich dark chocolate.",
      price: "8.50",
      image: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?q=80&w=1000&auto=format&fit=crop",
      weight: "1 pc",
      isNew: true,
      categoryId: 'c4',
      ingredients: "Flour, Butter, Chocolate, Sugar"
    },

    // --- PANTRY (c7) ---
    {
      name: "Organic Honey",
      slug: "organic-honey",
      description: "Pure, raw honey gathered from wild flowers.",
      price: "85.00",
      image: "https://images.unsplash.com/photo-1587049352846-4a222e784d38?q=80&w=1000&auto=format&fit=crop",
      weight: "500g",
      isNew: false,
      categoryId: 'c7',
      ingredients: "Raw Honey"
    },
    {
      name: "Extra Virgin Olive Oil",
      slug: "olive-oil",
      description: "Cold pressed extra virgin olive oil from Aegean coast.",
      price: "120.00",
      image: "https://images.unsplash.com/photo-1474979266404-7caddbed77a3?q=80&w=1000&auto=format&fit=crop",
      weight: "1 Lt",
      isNew: false,
      categoryId: 'c7',
      ingredients: "Olive Oil"
    },
     {
      name: "Almonds",
      slug: "raw-almonds",
      description: "Crunchy raw almonds, perfect for snacking.",
      price: "55.00",
      image: "https://images.unsplash.com/photo-1623227866882-c005c207758f?q=80&w=1000&auto=format&fit=crop",
      weight: "250g",
      isNew: false,
      categoryId: 'c7',
      ingredients: "Almond"
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