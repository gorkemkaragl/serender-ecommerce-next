import Features from "@/components/Features";
import Hero from "@/components/Hero";
import ProductList from "@/components/ProductList";
import { PRODUCTS } from "@/lib/data";
import { Product } from "@/types/product";
import { Leaf } from "lucide-react";
// Sadece ilk 4 ürünü alıyoruz
const featuredProducts = PRODUCTS.slice(0, 4);

export default function Home() {
  return (
    <div className="pb-20">
      
      <Hero />
      
      <Features />
      <ProductList title="Top of our Products" products={featuredProducts} />
    </div>
  );
}
