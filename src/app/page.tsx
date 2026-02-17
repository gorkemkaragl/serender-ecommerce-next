import Features from "@/components/home/Features";
import Hero from "@/components/home/Hero";
import ProductList from "@/components/products/ProductList";
import { getFeaturedProducts } from "@/services/product";
// Sadece ilk 4 ürünü alıyoruz

export default async function Home() {
  const featuredProducts = await getFeaturedProducts();
  return (
    <div className="pb-20">
      
      <Hero />
      
      <Features />
      <ProductList title="Top of our Products" products={featuredProducts} />
    </div>
  );
}
