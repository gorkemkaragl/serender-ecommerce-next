import ProductCard from "@/components/products/ProductCard";
import { Product } from "@/types";
import Link from "next/link";


interface ProductListProps {
  products: Product[];
}

// anasayfada altta 4 ürün göstermek için kullanacağız.
export default function ProductList({  products }: ProductListProps) {
  return (
    <section className="max-w-7xl mx-auto px-6 py-12">
      {/* BAŞLIK VE AKSİYON ALANI */}
      <div className="flex justify-between items-end mb-8">
        <div>
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary mb-2">
            Öne Çıkan Ürünlerimiz
          </h2>
          <p className="text-custom-black/60">
            Sizin için taze ve sağlıklı seçimler.
          </p>
        </div>

        {/* Desktop'ta görünen buton */}
        <Link
          href="/shop"
          className="hidden md:block text-primary font-medium hover:underline transition"
        >
          Tüm Ürünleri Gör →
        </Link>
      </div>

      {/* GRID YAPISI */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {/* Mobil Buton */}
      <div className="mt-8 text-center md:hidden">
        <Link href="/shop" className="text-primary font-medium hover:underline transition">
          Tüm Ürünleri Gör →
        </Link>
      </div>
    </section>
  );
}
