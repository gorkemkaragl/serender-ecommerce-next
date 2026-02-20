import { Product, ProductWithCategory } from "@/types";
import ProductCard from "@/components/products/ProductCard";

interface RelatedProductsProps {
  currentProduct: Product;
  dbProducts: ProductWithCategory[]; 
}

// Benzer ürünleri gösteren bileşen: ürün detay sayfası altında kullanacağız
export default function RelatedProducts({ currentProduct, dbProducts }: RelatedProductsProps) {
  
  // FİLTRELEME MANTIĞI
  const relatedProducts = dbProducts.filter((product) => {
    //  Aynı kategoride olsun
    const isSameCategory = product.categoryId === currentProduct.categoryId;
    //  Kendisi olmasın (ID kontrolü)
    const isNotSelf = product.id !== currentProduct.id;

    return isSameCategory && isNotSelf;
  })
  .slice(0, 4); // Sadece ilk 4 tanesini al

  // Eğer benzer ürün yoksa (kategoride tek ürün varsa) bu bölümü hiç gösterme
  if (relatedProducts.length === 0) return null;

  return (
    <section className="mt-24 border-t border-primary/10 pt-16">
      
      {/* Başlık */}
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl md:text-3xl font-serif font-bold text-primary">
          Bu Ürünleri de Sevebilirsiniz
        </h2>
        {/* İstersek buraya "View Category" linki de koyabiliriz */}
      </div>

      {/* Grid (Ana sayfadaki ile aynı yapı) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {relatedProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      
    </section>
  );
}