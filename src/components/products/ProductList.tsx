import ProductCard from "@/components/products/ProductCard";
import { Product } from "@/types/product";
import Link from "next/link";


interface ProductListProps {
  title: string;
  products: Product[];
}

// anasayfada altta 4 ürün göstermek için kullanacağız.
export default function ProductList({ title, products }: ProductListProps) {
  return (
    <section className="max-w-7xl mx-auto px-6 py-12">
      {/* BAŞLIK VE AKSİYON ALANI */}
      <div className="flex justify-between items-end mb-8">
        <div>
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary mb-2">
            {title}
          </h2>
          <p className="text-custom-black/60">
            Fresh and healthy choices for you.
          </p>
        </div>

        {/* Desktop'ta görünen buton */}
        <Link
          href="/shop"
          className="hidden md:block text-primary font-medium hover:underline transition"
        >
          View All Products →
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
          View All Products →
        </Link>
      </div>
    </section>
  );
}
