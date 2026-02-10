import { Product } from "@/types/product";

export const PRODUCTS: Product[] = [
  // SEBZE & MEYVE
  {
    id: "1",
    slug: "fresh-veggie-box",
    name: "Fresh Veggie Box",
    price: 24.90,
    weight: "1200g",
    image: "https://images.unsplash.com/photo-1596568856247-4952504b281f?q=80&w=2070&auto=format&fit=crop",
    isNew: true,
    category: "Vegetables", 
    description: "Seasonal vegetables sourced directly from local farmers.",
    ingredients: ["Carrots", "Tomatoes", "Cucumber", "Lettuce"]
  },
  {
    id: "5",
    slug: "tropical-fruit-mix",
    name: "Tropical Fruit Mix",
    price: 32.50,
    weight: "1500g",
    image: "https://images.unsplash.com/photo-1610832958506-aa56368176cf?q=80&w=2070&auto=format&fit=crop",
    isNew: true,
    category: "Fruits",
    description: "Exotic tropical fruit selection.",
    ingredients: ["Pineapple", "Mango", "Kiwi"]
  },
  {
    id: "9",
    slug: "avocado-toast-kit",
    name: "Avocado Toast Kit",
    price: 19.99,
    weight: "800g",
    image: "https://images.unsplash.com/photo-1588137372308-15f75323ca8d?q=80&w=1974&auto=format&fit=crop",
    category: "Breakfast",
    description: "Everything you need for the perfect brunch.",
    ingredients: ["Avocados", "Sourdough Bread", "Lemon"]
  },

  // SÜT ÜRÜNLERİ
  {
    id: "2",
    slug: "premium-cheese-pack",
    name: "Premium Cheese Pack",
    price: 45.50,
    weight: "500g",
    image: "https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?q=80&w=2073&auto=format&fit=crop",
    category: "Dairy",
    description: "Finest aged cheeses.",
    ingredients: ["Cheddar", "Brie", "Gouda"]
  },
  {
    id: "6",
    slug: "greek-yogurt-set",
    name: "Greek Yogurt Set",
    price: 14.20,
    weight: "4x150g",
    image: "https://images.unsplash.com/photo-1488477181946-6428a029177b?q=80&w=1974&auto=format&fit=crop",
    category: "Dairy",
    description: "Authentic Greek yogurt.",
    ingredients: ["Plain Yogurt", "Fruit Yogurt"]
  },
  {
    id: "8",
    slug: "almond-milk-bottle",
    name: "Organic Almond Milk",
    price: 8.90,
    weight: "1L",
    image: "https://images.unsplash.com/photo-1600788886242-5c96aabe3757?q=80&w=1974&auto=format&fit=crop",
    category: "Beverages",
    description: "Dairy-free almond milk.",
    ingredients: ["Water", "Almonds"]
  },

  // FIRIN
  {
    id: "4",
    slug: "artisan-bread-basket",
    name: "Artisan Bread Basket",
    price: 12.99,
    weight: "800g",
    image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=2072&auto=format&fit=crop",
    category: "Bakery",
    description: "Freshly baked artisan breads.",
    ingredients: ["Sourdough", "Baguette"]
  },
  {
    id: "10",
    slug: "dark-chocolate-bar",
    name: "70% Dark Chocolate",
    price: 6.50,
    weight: "100g",
    image: "https://images.unsplash.com/photo-1623227866882-c005c267c6bc?q=80&w=2070&auto=format&fit=crop",
    isNew: true,
    category: "Snacks",
    description: "Rich dark chocolate.",
    ingredients: ["Cocoa Mass", "Sugar"]
  },
  {
    id: "12",
    slug: "granola-pack",
    name: "Crunchy Granola",
    price: 11.00,
    weight: "400g",
    image: "https://images.unsplash.com/photo-1517093717544-7729f220d939?q=80&w=1999&auto=format&fit=crop",
    category: "Breakfast",
    description: "Oven-baked granola.",
    ingredients: ["Oats", "Honey", "Nuts"]
  },

  // DİĞER
  {
    id: "3",
    slug: "organic-honey-jar",
    name: "Organic Honey Jar",
    price: 18.00,
    weight: "350g",
    image: "https://images.unsplash.com/photo-1587049352851-8d4e8913d179?q=80&w=2000&auto=format&fit=crop",
    category: "Breakfast",
    description: "Pure raw honey.",
    ingredients: ["Honey"]
  },
  {
    id: "7",
    slug: "green-detox-juice",
    name: "Green Detox Juice",
    price: 9.50,
    weight: "330ml",
    image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=1974&auto=format&fit=crop",
    isNew: true,
    category: "Beverages",
    description: "Cold-pressed green juice.",
    ingredients: ["Spinach", "Apple", "Celery"]
  },
  {
    id: "11",
    slug: "extra-virgin-olive-oil",
    name: "Extra Virgin Olive Oil",
    price: 28.00,
    weight: "500ml",
    image: "https://images.unsplash.com/photo-1474979266404-7eaacbcdcc3a?q=80&w=2070&auto=format&fit=crop",
    category: "Pantry",
    description: "Premium olive oil.",
    ingredients: ["Olive Oil"]
  }
];