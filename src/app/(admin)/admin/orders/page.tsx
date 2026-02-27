import { db } from "@/db";
import { orders, profiles } from "@/db/schema";
import { eq, desc } from "drizzle-orm";
import { Search, Eye, Filter } from "lucide-react";
import dayjs from "dayjs";

export default async function OrdersAdminPage() {
  const allOrders = await db
    .select({
      id: orders.id,
      status: orders.status,
      totalAmount: orders.totalAmount,
      address: orders.address,
      createdAt: orders.createdAt,
      userFirstName: profiles.firstName,
      userLastName: profiles.lastName,
      userEmail: profiles.email,
    })
    .from(orders)
    .leftJoin(profiles, eq(orders.userId, profiles.id))
    .orderBy(desc(orders.createdAt));

  const statusColors: Record<string, string> = {
    pending: "bg-amber-100 text-amber-800",
    processing: "bg-blue-100 text-blue-800",
    shipped: "bg-purple-100 text-purple-800",
    delivered: "bg-green-100 text-green-800",
    cancelled: "bg-red-100 text-red-800",
  };

  const statusLabels: Record<string, string> = {
    pending: "Bekliyor",
    processing: "Hazırlanıyor",
    shipped: "Kargoya Verildi",
    delivered: "Teslim Edildi",
    cancelled: "İptal Edildi",
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Siparişler</h1>
          <p className="text-slate-500 mt-1">Müşteri siparişlerini buradan yönetin ve takip edin.</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-200 flex flex-col sm:flex-row gap-4 items-center justify-between bg-slate-50">
          <div className="relative w-full sm:max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder="Sipariş no veya müşteri ara..." 
              className="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent text-sm"
            />
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-xl text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors">
            <Filter size={16} />
            Filtrele
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 text-sm">
                <th className="px-6 py-4 font-medium">Sipariş No & Tarih</th>
                <th className="px-6 py-4 font-medium">Müşteri</th>
                <th className="px-6 py-4 font-medium">Tutar</th>
                <th className="px-6 py-4 font-medium">Durum</th>
                <th className="px-6 py-4 font-medium text-right">İşlem</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {allOrders.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-slate-500">
                    Henüz hiç sipariş bulunmuyor.
                  </td>
                </tr>
              ) : (
                allOrders.map((order) => {
                  const sColor = statusColors[order.status] || "bg-slate-100 text-slate-800";
                  const sLabel = statusLabels[order.status] || order.status;
                  
                  return (
                    <tr key={order.id} className="hover:bg-slate-50/50 transition-colors group">
                      <td className="px-6 py-4">
                        <p className="font-medium text-slate-900 truncate max-w-50" title={order.id}>
                          #{order.id.split('-')[0]}
                        </p>
                        <p className="text-xs text-slate-500">
                          {dayjs(order.createdAt).format("DD/MM/YYYY HH:mm")}
                        </p>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-sm font-medium text-slate-900">
                          {order.userFirstName} {order.userLastName}
                        </p>
                        <p className="text-xs text-slate-500">{order.userEmail}</p>
                      </td>
                      <td className="px-6 py-4 font-medium text-slate-900">
                        {new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY' }).format(Number(order.totalAmount))}
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${sColor}`}>
                          {sLabel}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button className="p-2 text-slate-400 hover:text-amber-600 hover:bg-amber-50 rounded-lg transition-colors opacity-0 group-hover:opacity-100" title="Detayları Gör">
                          <Eye size={18} />
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
