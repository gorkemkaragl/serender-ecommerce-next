"use client";

import { useEffect, useState } from "react";
import { PRODUCTS, CATEGORIES } from "@/lib/data";
import ProductCard from "@/components/products/ProductCard";
import { Search, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSearchParams } from "next/navigation";

export default function ShopPage() {
  const searchParams = useSearchParams();
  const [searchQuery, setSearchQuery] = useState("");
  const urlCategoryId = searchParams.get("category");
  
  // Tip: string (bir ID) olabilir veya null olabilir.
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);

  // URL DEĞİŞİNCE STATE'İ GÜNCELLE
  // Kullanıcı Header'dan başka kategoriye basarsa sayfa yenilenmeden burası çalışır
  useEffect(() => {
    if (urlCategoryId) {
      setSelectedCategoryId(urlCategoryId);
    } else {
      // Eğer URL'de kategori yoksa (sadece /shop ise) 'null' yapma, 
      // belki kullanıcı elle 'All' seçmiştir. O yüzden burayı boş bırakabiliriz 
      // veya varsayılan davranışa göre ayarlayabiliriz.
      // Şimdilik URL'den geleni önceliklendiriyoruz.
    }
  }, [urlCategoryId]);
  // TSX içinde "All" butonunu ayrı yazmamak için listeleri burada birleştiriyoruz.
  const filterOptions = [
    { id: null, name: "All" }, // En başa "All" seçeneğini ekledik
    ...CATEGORIES              // Devamına gerçek kategorileri koyduk
  ];

  const filteredProducts = PRODUCTS.filter((product) => {
    // Mantık: Eğer selectedCategoryId 'null' ise (yani hepsi) TRUE dön.
    // Değilse, ID eşleşiyor mu diye bak.
    const categoryMatch = !selectedCategoryId || product.categoryId === selectedCategoryId;
    
    const searchMatch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    return categoryMatch && searchMatch;
  });

  // Helper: Filtreleri temizleme fonksiyonu
  const clearFilters = () => {
    setSelectedCategoryId(null);
    setSearchQuery("");
  };

  return (
    <div className="w-full px-6 py-8 md:py-12 max-w-7xl mx-auto">
      <div className="max-w-7xl mx-auto">
        
        {/* BAŞLIK */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-primary mb-3">The Market</h1>
          <p className="text-custom-black/60 max-w-2xl mx-auto">
            Curated Selection of Organic Goods
          </p>
        </div>

        {/* NAVİGASYON VE ARAMA */}
        <div className="flex flex-col md:flex-row justify-between items-center  mb-12 border-b border-primary/10 pb-4">
          
          {/* 3. SADELEŞTİRİLMİŞ MENÜ YAPISI */}
          <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-hide">
            {filterOptions.map((option) => {
              const isActive = selectedCategoryId === option.id;
              
              return (
                <Button
                variant="outline"
                  key={option.id ?? "all"} // id null ise key olarak 'all' kullan
                  onClick={() => setSelectedCategoryId(option.id)}
                  className={`
                     transition-all duration-300 relative whitespace-nowrap 
                    ${isActive 
                      ? "text-primary " 
                      : "text-custom-black/40 hover:text-primary/70 "
                    }
                  `}
                >
                  {option.name}
                  {/* Aktiflik Çizgisi */}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 w-full h-[1.5px] bg-primary block rounded-full" />
                  )}
                </Button>
              );
            })}
          </div>

          {/* ARAMA  */}
          <div className="relative w-full md:w-64 group">
            <input 
              type="text"
              placeholder="Search..." 
              className="w-full bg-transparent border-b border-primary/20 py-2 pl-0 pr-8 text-custom-black focus:outline-none focus:border-primary transition-colors placeholder:text-custom-black/30 text-sm"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Search className="absolute right-0 top-1/2 -translate-y-1/2 text-custom-black/30 group-focus-within:text-primary transition-colors pointer-events-none" size={16} />
            {searchQuery && (
              <button onClick={() => setSearchQuery("")} className="absolute right-6 top-1/2 -translate-y-1/2 text-red-400 hover:text-red-600">
                <X size={14} />
              </button>
            )}
          </div>
        </div>

        {/* ÜRÜN LİSTESİ */}
        <main>
          {filteredProducts.length === 0 ? (
            <div className="text-center opacity-60">
              <p className="font-serif text-lg">No products found.</p>
              <button onClick={clearFilters} className="text-xs uppercase tracking-widest border-b border-custom-black mt-2">
                Clear Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </main>

      </div>
    </div>
  );
}