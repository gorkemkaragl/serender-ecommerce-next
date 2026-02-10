import { Category, Product } from "@/types/product";

export const CATEGORIES: Category[] = [
  { id: "c1", name: "Vegetables", slug: "vegetables" },
  { id: "c2", name: "Fruits", slug: "fruits" },
  { id: "c3", name: "Breakfast", slug: "breakfast" },
  { id: "c4", name: "Dairy", slug: "dairy" },
  { id: "c5", name: "Bakery", slug: "bakery" },
  { id: "c6", name: "Snacks", slug: "snacks" },
  { id: "c7", name: "Beverages", slug: "beverages" },
  { id: "c8", name: "Pantry", slug: "pantry" },
];

export const PRODUCTS: Product[] = [
  // SEBZE & MEYVE
  {
    id: "1",
    categoryId: "c1",
    slug: "fresh-veggie-box",
    name: "Fresh Veggie Box",
    price: 24.90,
    weight: "1200g",
    image: "https://images.unsplash.com/photo-1604835070732-aec3563c26c3?q=80&w=1631&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    isNew: true,
    description: "Seasonal vegetables sourced directly from local farmers.",
  },
  {
    id: "5",
    categoryId: "c2",
    slug: "tropical-fruit-mix",
    name: "Tropical Fruit Mix",
    price: 32.50,
    weight: "1500g",
    image: "https://images.unsplash.com/photo-1610832958506-aa56368176cf?q=80&w=2070&auto=format&fit=crop",
    isNew: true,
  },
  
  // SÜT ÜRÜNLERİ
  {
    id: "2",
    categoryId: "c4", 
    slug: "premium-cheese-pack",
    name: "Premium Cheese Pack",
    price: 45.50,
    weight: "500g",
    image: "https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?q=80&w=2073&auto=format&fit=crop",
  },
  {
    id: "6",
    categoryId: "c4",
    slug: "greek-yogurt-set",
    name: "Greek Yogurt Set",
    price: 14.20,
    weight: "4x150g",
    image: "https://images.unsplash.com/photo-1670843839025-d50924a51f31?q=80&w=1469&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  
  // KAHVALTILIK
  {
    id: "9",
    categoryId: "c3", 
    slug: "avocado-toast-kit",
    name: "Avocado Toast Kit",
    price: 19.99,
    weight: "800g",
    image: "https://images.unsplash.com/photo-1676976197611-5373cad357f5?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: "3",
    categoryId: "c3",
    slug: "organic-honey-jar",
    name: "Organic Honey Jar",
    price: 18.00,
    weight: "350g",
    image: "https://images.unsplash.com/photo-1556316840-d59e76c8366c?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },

  // FIRIN
  {
    id: "4",
    categoryId: "c5", 
    slug: "artisan-bread-basket",
    name: "Artisan Bread Basket",
    price: 12.99,
    weight: "800g",
    image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=2072&auto=format&fit=crop",
  },

  // ATIŞTIRMALIK
  {
    id: "10",
    categoryId: "c6", 
    slug: "dark-chocolate-bar",
    name: "70% Dark Chocolate",
    price: 6.50,
    weight: "100g",
    image: "https://images.unsplash.com/photo-1643094264639-955fdb53cfc7?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    isNew: true,
  },
];