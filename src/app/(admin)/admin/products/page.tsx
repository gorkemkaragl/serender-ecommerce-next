import { db } from "@/db";
import { products, categories } from "@/db/schema";
import { eq, desc, ilike } from "drizzle-orm"; // ilike eklendi
import { Plus, Edit2 } from "lucide-react"; // Search'ü sildik çünkü kendi bileşenimizi kullanacağız
import Image from "next/image";
import Link from "next/link";
import { DeleteProductButton } from "@/components/admin/DeleteProductButton";
import AdminSearch from "@/components/admin/AdminSearch";

// Next.js 15: searchParams bir Promise'dir
export default async function ProductsAdminPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const resolvedParams = await searchParams;
  const query = resolvedParams.q || ""; // URL'den gelen arama kelimesi

  // EĞER ARAMA KELİMESİ VARSA FİLTRELE, YOKSA UNDEFINED (HEPSİNİ GETİR)
  const whereClause = query
    ? ilike(products.name, `%${query}%`) // Ürün adında arama yapıyoruz
    : undefined;

  // Fetch products with their category names (Filtreli haliyle)
  const allProducts = await db
    .select({
      id: products.id,
      name: products.name,
      price: products.price,
      image: products.image,
      isNew: products.isNew,
      categoryName: categories.name,
    })
    .from(products)
    .leftJoin(categories, eq(products.categoryId, categories.id))
    .where(whereClause) // Şartı buraya ekledik
    .orderBy(desc(products.createdAt));

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Ürünler</h1>
          <p className="text-slate-500 mt-1">Sistemdeki tüm ürünleri buradan yönetebilirsiniz.</p>
        </div>
        <Link 
          href="/admin/products/new"
          className="bg-amber-500 hover:bg-amber-600 text-white px-4 py-2 rounded-xl flex items-center gap-2 font-medium transition-colors shadow-sm"
        >
          <Plus size={18} />
          Yeni Ürün Ekle
        </Link>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          
          <AdminSearch /> 

        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 text-sm">
                <th className="px-6 py-4 font-medium">Ürün</th>
                <th className="px-6 py-4 font-medium">Kategori</th>
                <th className="px-6 py-4 font-medium">Fiyat</th>
                <th className="px-6 py-4 font-medium">Durum</th>
                <th className="px-6 py-4 font-medium text-right">İşlemler</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {allProducts.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-slate-500">
                    {query ? `"${query}" aramasına uygun ürün bulunamadı.` : "Henüz hiç ürün eklenmemiş."}
                  </td>
                </tr>
              ) : (
                allProducts.map((product) => (
                  <tr key={product.id} className="hover:bg-slate-50/50 transition-colors group">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-4">
                        <div className="h-12 w-12 rounded-lg bg-slate-100 overflow-hidden relative shrink-0 border border-slate-200">
                          <Image 
                            src={product.image || "/placeholder.png"} 
                            alt={product.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <p className="font-medium text-slate-900">{product.name}</p>
                          <p className="text-xs text-slate-500 truncate max-w-50">{product.id}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-600">
                      {product.categoryName || "Kategorisiz"}
                    </td>
                    <td className="px-6 py-4 font-medium text-slate-900">
                      {new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY' }).format(Number(product.price))}
                    </td>
                    <td className="px-6 py-4">
                      {product.isNew ? (
                        <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 border border-green-200">
                          Yeni
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-800 border border-slate-200">
                          Standart
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Link href={`/admin/products/${product.id}/edit`} className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" title="Düzenle">
                          <Edit2 size={16} />
                        </Link>
                        <DeleteProductButton id={product.id} name={product.name} />
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        
        {/* Pagination placeholder */}
        <div className="p-4 border-t border-slate-200 flex items-center justify-between text-sm text-slate-500 bg-slate-50">
          <div>
            Toplam <span className="font-medium text-slate-900">{allProducts.length}</span> ürün
          </div>
          <div className="flex gap-1">
            <button className="px-3 py-1 rounded-md border border-slate-200 bg-white hover:bg-slate-50 disabled:opacity-50" disabled>Önceki</button>
            <button className="px-3 py-1 rounded-md border border-slate-200 bg-white hover:bg-slate-50 disabled:opacity-50" disabled>Sonraki</button>
          </div>
        </div>
      </div>
    </div>
  );
}