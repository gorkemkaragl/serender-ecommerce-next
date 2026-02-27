// src/app/(admin)/admin/page.tsx
import { Package, Users, DollarSign, TrendingUp, ShoppingBag } from "lucide-react";
import { db } from "@/db";
import { products, profiles, orders } from "@/db/schema";
import { sql, eq } from "drizzle-orm";

export default async function AdminDashboard() {
  // Veritabanı sorguları (Paralel olarak çalıştırıyoruz ki sayfa hızlı yüklensin)
  const [
    productsCountResult,
    customersCountResult,
    pendingOrdersResult,
    revenueResult
  ] = await Promise.all([
    db.select({ count: sql<number>`count(*)` }).from(products),
    db.select({ count: sql<number>`count(*)` }).from(profiles).where(eq(profiles.role, 'user')),
    db.select({ count: sql<number>`count(*)` }).from(orders).where(eq(orders.status, 'pending')),
    db.select({ sum: sql<number>`sum(CAST(${orders.totalAmount} AS DECIMAL))` }).from(orders), // SQLite / Postgres uyumu için bazen string gelebilir, veya sadece orders.totalAmount
  ]);

  const totalProducts = productsCountResult[0]?.count || 0;
  const totalCustomers = customersCountResult[0]?.count || 0;
  const pendingOrders = pendingOrdersResult[0]?.count || 0;
  const totalRevenue = revenueResult[0]?.sum || 0;

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Dashboard</h1>
        <p className="text-slate-500 mt-1">Sistemin genel durumuna hoş geldin patron.</p>
      </div>

      {/* İstatistik Kartları */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4 transition-all hover:shadow-md hover:border-blue-200">
          <div className="bg-blue-50 p-4 rounded-xl text-blue-600">
            <DollarSign size={24} />
          </div>
          <div>
            <p className="text-sm font-medium text-slate-500 mb-1">Toplam Ciro</p>
            <h3 className="text-2xl font-bold text-slate-900">
              {new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY' }).format(Number(totalRevenue))}
            </h3>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4 transition-all hover:shadow-md hover:border-amber-200">
          <div className="bg-amber-50 p-4 rounded-xl text-amber-600">
            <ShoppingBag size={24} />
          </div>
          <div>
            <p className="text-sm font-medium text-slate-500 mb-1">Bekleyen Siparişler</p>
            <h3 className="text-2xl font-bold text-slate-900">{pendingOrders}</h3>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4 transition-all hover:shadow-md hover:border-purple-200">
          <div className="bg-purple-50 p-4 rounded-xl text-purple-600">
            <Users size={24} />
          </div>
          <div>
            <p className="text-sm font-medium text-slate-500 mb-1">Toplam Müşteri</p>
            <h3 className="text-2xl font-bold text-slate-900">{totalCustomers}</h3>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4 transition-all hover:shadow-md hover:border-green-200">
          <div className="bg-green-50 p-4 rounded-xl text-green-600">
            <Package size={24} />
          </div>
          <div>
            <p className="text-sm font-medium text-slate-500 mb-1">Toplam Ürün</p>
            <h3 className="text-2xl font-bold text-slate-900">{totalProducts}</h3>
          </div>
        </div>
      </div>
      
    </div>
  );
}