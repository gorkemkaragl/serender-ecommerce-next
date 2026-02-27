"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createProduct } from "@/app/actions/admin";
import { toast } from "sonner";
import { Loader2, ArrowLeft } from "lucide-react";
import Link from "next/link";

interface Category {
  id: string;
  name: string;
  icon: string;
}

export function ProductFormClient({ categories }: { categories: Category[] }) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const productData = {
      name: formData.get("name") as string,
      slug: (formData.get("name") as string).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, ''),
      description: formData.get("description") as string,
      price: formData.get("price") as string,
      image: formData.get("image") as string,
      weight: formData.get("weight") as string,
      isNew: formData.get("isNew") === "true",
      ingredients: formData.get("ingredients") as string,
      categoryId: formData.get("categoryId") as string,
    };

    const result = await createProduct(productData);

    if (result.success) {
      toast.success("Ürün başarıyla oluşturuldu.");
      router.push("/admin/products");
    } else {
      toast.error(result.error);
    }
    setLoading(false);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label htmlFor="name" className="text-sm font-semibold text-slate-700">Ürün Adı</label>
          <input 
            type="text" 
            id="name" 
            name="name" 
            required
            className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 transition-shadow"
            placeholder="Kavrulmuş Fındık"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="price" className="text-sm font-semibold text-slate-700">Fiyat (TL)</label>
          <input 
            type="number" 
            step="0.01"
            id="price" 
            name="price" 
            required
            className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 transition-shadow"
            placeholder="120.50"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="category" className="text-sm font-semibold text-slate-700">Kategori</label>
          <select 
            id="categoryId" 
            name="categoryId" 
            required
            className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 bg-white"
          >
            <option value="">Kategori Seçin...</option>
            {categories.map(c => (
              <option key={c.id} value={c.id}>{c.icon} {c.name}</option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <label htmlFor="weight" className="text-sm font-semibold text-slate-700">Gramaj / Ağırlık</label>
          <input 
            type="text" 
            id="weight" 
            name="weight" 
            className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 transition-shadow"
            placeholder="500g, 1kg vb."
          />
        </div>
      </div>

      <div className="space-y-2">
        <label htmlFor="image" className="text-sm font-semibold text-slate-700">Resim URL</label>
        <input 
          type="url" 
          id="image" 
          name="image" 
          required
          className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 transition-shadow"
          placeholder="https://example.com/image.jpg"
        />
        <p className="text-xs text-slate-500">Ürünün kaliteli bir fotoğrafının bağlantısını yapıştırın.</p>
      </div>

      <div className="space-y-2">
        <label htmlFor="description" className="text-sm font-semibold text-slate-700">Ürün Açıklaması</label>
        <textarea 
          id="description" 
          name="description" 
          rows={3}
          className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 transition-shadow resize-none"
          placeholder="Ürün hakkında detaylı bilgi..."
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="ingredients" className="text-sm font-semibold text-slate-700">İçindekiler</label>
        <input 
          type="text" 
          id="ingredients" 
          name="ingredients" 
          className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 transition-shadow"
          placeholder="Fındık, Tuz..."
        />
      </div>

      <div className="flex items-center gap-3 p-4 bg-slate-50 rounded-xl border border-slate-100">
        <input 
          type="checkbox" 
          id="isNew" 
          name="isNew" 
          value="true"
          className="w-5 h-5 rounded text-amber-500 focus:ring-amber-500 border-slate-300"
        />
        <label htmlFor="isNew" className="text-sm font-medium text-slate-700 cursor-pointer">
          Bu işaretlendiğinde ürün üzerinde "Yeni" etiketi görünür.
        </label>
      </div>

      <div className="pt-6 flex justify-between items-center border-t border-slate-200">
        <Link 
          href="/admin/products"
          className="text-slate-500 hover:text-slate-800 font-medium flex items-center gap-2 transition-colors"
        >
          <ArrowLeft size={18} />
          İptal Et ve Geri Dön
        </Link>
        <button 
          type="submit"
          disabled={loading}
          className="px-8 py-3 bg-amber-500 text-white rounded-xl font-bold hover:bg-amber-600 transition-colors disabled:opacity-50 flex items-center gap-2 shadow-sm"
        >
          {loading ? <Loader2 className="animate-spin" size={20} /> : "Ürünü Kaydet"}
        </button>
      </div>
    </form>
  );
}
