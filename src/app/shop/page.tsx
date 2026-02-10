"use client";

import { useState } from "react";
import { PRODUCTS } from "@/lib/data";
import ProductCard from "@/components/ProductCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, X } from "lucide-react";

export default function ShopPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Kategorileri dinamik olarak veriden çekiyoruz (Tekrar edenleri silerek)
  const categories = ["All", ...new Set(PRODUCTS.map((p) => p.category))];

  // FİLTRELEME MANTIĞI
  const filteredProducts = PRODUCTS.filter((product) => {
    // 1. Kategori Uyumu
    const categoryMatch = selectedCategory === "All" || product.category === selectedCategory;
    
    // 2. Arama Uyumu (Büyük/küçük harf duyarsız)
    const searchMatch = product.name.toLowerCase().includes(searchQuery.toLowerCase());

    return categoryMatch && searchMatch;
  });

  return (
    <div className="w-full px-6 py-12 md:py-20 max-w-7xl mx-auto">
      <div className="max-w-7xl mx-auto">
        
        {/* BAŞLIK ALANI */}
        <div className="mb-10 text-center md:text-left">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-primary mb-4">
            Shop All Products
          </h1>
          <p className="text-custom-black/60 text-lg">
            Browse our wide selection of organic and fresh products.
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-10">
          
          {/* 1. SOL SIDEBAR (FİLTRELER) */}
          <aside className="w-full md:w-64 space-y-8 shrink-0">
            
            {/* Arama Kutusu */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <Input 
                placeholder="Search products..." 
                className="pl-10 bg-white border-primary/20 focus-visible:ring-primary"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            {/* Kategori Listesi */}
            <div>
              <h3 className="font-serif text-xl font-bold text-primary mb-4">Categories</h3>
              <div className="flex flex-row md:flex-col gap-2 overflow-x-auto md:overflow-visible pb-2 md:pb-0">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`text-left px-4 py-2 rounded-lg transition-all whitespace-nowrap ${
                      selectedCategory === category
                        ? "bg-primary text-white font-medium shadow-md"
                        : "hover:bg-primary/10 text-custom-black/70"
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            {/* Filtreleri Temizle (Sadece filtre aktifse göster) */}
            {(selectedCategory !== "All" || searchQuery) && (
              <Button 
                variant="outline" 
                className="w-full border-red-200 text-red-500 hover:bg-red-50 hover:text-red-600 gap-2"
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("All");
                }}
              >
                <X size={16} /> Clear Filters
              </Button>
            )}
          </aside>

          {/* 2. SAĞ TARAF (ÜRÜN LİSTESİ) */}
          <main className="flex-1">
            
            {/* Sonuç Sayısı */}
            <p className="text-sm text-custom-black/50 mb-6">
              Showing {filteredProducts.length} results
            </p>

            {/* Ürün Yoksa Mesaj Göster */}
            {filteredProducts.length === 0 ? (
              <div className="text-center py-20 bg-white/50 rounded-2xl border border-dashed border-primary/20">
                <h3 className="text-xl font-serif text-custom-black mb-2">No products found</h3>
                <p className="text-custom-black/60">Try adjusting your search or filter to find what you're looking for.</p>
              </div>
            ) : (
              /* Ürün Grid */
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-8">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </main>

        </div>
      </div>
    </div>
  );
}