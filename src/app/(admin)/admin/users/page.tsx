import { db } from "@/db";
import { profiles } from "@/db/schema";
import { desc, or, ilike } from "drizzle-orm"; // Arama operatörlerini ekledik
import { ShieldAlert, User } from "lucide-react";
import dayjs from "dayjs";
import AdminSearch from "@/components/admin/AdminSearch";

// Next.js 15: searchParams bir Promise'dir
export default async function UsersAdminPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const resolvedParams = await searchParams;
  const query = resolvedParams.q || ""; // URL'den gelen arama kelimesi

  // EĞER ARAMA KELİMESİ VARSA FİLTRELE, YOKSA HERKESİ GETİR
  const whereClause = query
    ? or(
        ilike(profiles.firstName, `%${query}%`),
        ilike(profiles.lastName, `%${query}%`),
        ilike(profiles.phone, `%${query}%`),
        ilike(profiles.email, `%${query}%`) // Eğer email sütunun profiles tablosundaysa
      )
    : undefined;

  const allUsers = await db
    .select()
    .from(profiles)
    .where(whereClause)
    .orderBy(desc(profiles.createdAt));

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Kullanıcılar</h1>
          <p className="text-slate-500 mt-1">Sisteme kayıtlı tüm kullanıcıları ve yöneticileri görüntüleyin.</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-200 flex items-center bg-slate-50">
          
          
          <AdminSearch />

        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 text-sm">
                <th className="px-6 py-4 font-medium">Kullanıcı</th>
                <th className="px-6 py-4 font-medium">Telefon</th>
                <th className="px-6 py-4 font-medium">Kayıt Tarihi</th>
                <th className="px-6 py-4 font-medium">Rol</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {allUsers.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-6 py-8 text-center text-slate-500">
                    {query ? `"${query}" aramasına uygun kullanıcı bulunamadı.` : "Sistemde hiç kullanıcı bulunmuyor."}
                  </td>
                </tr>
              ) : (
                allUsers.map((user) => {
                  // İsim yoksa çökmesini engellemek için güvenli harf alımı
                  const initials = `${user.firstName?.[0] || ""}${user.lastName?.[0] || ""}`.toUpperCase();

                  return (
                    <tr key={user.id} className="hover:bg-slate-50/50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-sm">
                            {initials || <User size={16} />}
                          </div>
                          <div>
                            <p className="text-sm font-medium text-slate-900">
                              {user.firstName || "İsimsiz"} {user.lastName || "Kullanıcı"}
                            </p>
                            <p className="text-xs text-slate-500">{user.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-600">
                        {user.phone || "-"}
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-600">
                        {dayjs(user.createdAt).format("DD/MM/YYYY")}
                      </td>
                      <td className="px-6 py-4">
                        {user.role === 'admin' ? (
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800 border border-indigo-200">
                            <ShieldAlert size={12} />
                            Yönetici
                          </span>
                        ) : (
                          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-800 border border-slate-200">
                            Kullanıcı
                          </span>
                        )}
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