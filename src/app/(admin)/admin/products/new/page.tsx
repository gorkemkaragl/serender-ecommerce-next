import { db } from "@/db";
import { categories } from "@/db/schema";
import { ProductFormClient } from "./ProductFormClient";
import { Package } from "lucide-react";

export default async function NewProductPage() {
  const allCategories = await db.select().from(categories);

  return (
    <div className="space-y-6 animate-in fade-in duration-500 max-w-4xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold text-slate-900 flex items-center gap-3">
          <div className="bg-amber-100 text-amber-700 p-2 rounded-xl">
            <Package size={24} />
          </div>
          Yeni Ürün Ekle
        </h1>
        <p className="text-slate-500 mt-2">Kataloga yeni bir ürün eklemek için formu doldurun.</p>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden p-6 sm:p-8">
        <ProductFormClient categories={allCategories} />
      </div>
    </div>
  );
}
