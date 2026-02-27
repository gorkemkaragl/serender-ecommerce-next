import { db } from "@/db";
import { categories } from "@/db/schema";
import { LayoutGrid } from "lucide-react";
import { CategoryDialog } from "@/components/admin/CategoryDialog";
import { DeleteCategoryButton } from "@/components/admin/DeleteCategoryButton";

export default async function CategoriesAdminPage() {
  const allCategories = await db
    .select()
    .from(categories);

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Kategoriler</h1>
          <p className="text-slate-500 mt-1">Ürünlerinizi sınıflandırmak için kategorileri düzenleyin.</p>
        </div>
        <CategoryDialog />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {allCategories.length === 0 ? (
          <div className="col-span-full border-2 border-dashed border-slate-200 rounded-2xl p-12 text-center text-slate-500">
            <LayoutGrid className="mx-auto mb-4 text-slate-400" size={48} />
            <p className="text-lg font-medium text-slate-900 mb-1">Kategori Bulunamadı</p>
            <p>Sistemde tanımlı herhangi bir kategori yok.</p>
          </div>
        ) : (
          allCategories.map((category) => (
            <div 
              key={category.id} 
              className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:shadow-md hover:border-amber-200 transition-all group relative"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="h-14 w-14 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center border border-amber-100/50">
                  <span className="text-2xl" title={category.icon}>
                    {category.icon || "📦"}
                  </span>
                </div>
                <div>
                  <h3 className="font-bold text-lg text-slate-900">{category.name}</h3>
                  <p className="text-sm text-slate-500 font-mono">{category.id}</p>
                </div>
              </div>
              
              <div className="flex justify-end gap-2 border-t border-slate-100 pt-4 opacity-0 group-hover:opacity-100 transition-opacity">
                <DeleteCategoryButton id={category.id} name={category.name} />
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
