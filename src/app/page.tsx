import Hero from "@/components/Hero";
import ProductList from "@/components/ProductList";
import { Product } from "@/types/product";

// SAHTE VERİ (Burası ileride veritabanından gelecek)
const FEATURED_PRODUCTS: Product[] = [
  {
    id: "1",
    name: "Fresh Veggie Box",
    price: 24.90,
    weight: "1200g",
    image: "https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?q=80&w=2073&auto=format&fit=crop",
    isNew: true
  },
  {
    id: "2",
    name: "Premium Cheese Pack",
    price: 45.50,
    weight: "500g",
    image: "https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?q=80&w=2073&auto=format&fit=crop"
  },
  {
    id: "3",
    name: "Organic Honey Jar",
    price: 18.00,
    weight: "350g",
    image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=2072&auto=format&fit=crop"
  },
  {
    id: "4",
    name: "Artisan Bread Basket",
    price: 12.99,
    weight: "800g",
    image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=2072&auto=format&fit=crop",
    isNew: true
  },
];

export default function Home() {
  return (
    <div className="pb-20"> 
      <Hero />
      
        <ProductList 
        title="Top of our Products" 
        products={FEATURED_PRODUCTS} 
      />
    </div>
  );
}