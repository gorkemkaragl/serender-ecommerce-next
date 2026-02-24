import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { LogOut, Package, User, MapPin, Settings, Mail, Phone } from "lucide-react";
import { signout } from "@/app/(auth)/login/actions";
import { db } from "@/db";
import { profiles, orders } from "@/db/schema";
import { eq, desc } from "drizzle-orm";
import Link from "next/link";
import OrderCard from "@/components/account/OrderCard";

// Next.js 15 kuralı: searchParams bir Promise'dir
export default async function AccountPage({
  searchParams,
}: {
  searchParams: Promise<{ tab?: string }>;
}) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  // searchParams'ı çözümle ve aktif sekmeyi bul (Varsayılan: profile)
  const resolvedParams = await searchParams;
  const currentTab = resolvedParams.tab || "profile";

  // Profil bilgisini çek
  const userProfile = await db.query.profiles.findFirst({
    where: eq(profiles.id, user.id)
  });

  const displayName = userProfile 
    ? `${userProfile.firstName} ${userProfile.lastName}`
    : user.email?.split('@')[0];

  // KULLANICININ SİPARİŞLERİNİ ÇEK (İçindeki ürünlerle beraber ve en yeniden eskiye doğru sırala)
  const userOrders = await db.query.orders.findMany({
    where: eq(orders.userId, user.id),
    orderBy: [desc(orders.createdAt)],
    with: {
      items: {
        with: {
          product: true, // Siparişin içindeki ürünlerin resmini/adını alabilmek için
        }
      }
    }
  });

  // Durum renkleri için yardımcı fonksiyon
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'processing': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'shipped': return 'bg-indigo-100 text-indigo-800 border-indigo-200';
      case 'delivered': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="min-h-screen bg-secondary/20 py-12 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-serif font-bold text-primary mb-8">My Account</h1>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* --- SOL MENÜ (NAVİGASYON) --- */}
          <div className="md:col-span-1 space-y-4">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-primary/5">
              <div className="flex items-center gap-4 mb-8">
                <div className="bg-primary/10 w-14 h-14 rounded-full flex items-center justify-center text-primary font-bold text-xl">
                  {userProfile?.firstName?.charAt(0) || <User />}
                </div>
                <div className="overflow-hidden">
                  <p className="text-xs text-gray-500 font-medium uppercase tracking-wider mb-1">Welcome back,</p>
                  <p className="font-bold text-gray-900 truncate">{displayName}</p>
                </div>
              </div>
              
              <nav className="flex flex-col gap-2">
                <Link 
                  href="/account?tab=profile"
                  className={`flex items-center gap-3 text-sm font-semibold px-4 py-3 rounded-xl transition-colors ${currentTab === 'profile' ? 'bg-primary/5 text-primary' : 'text-gray-600 hover:bg-gray-50'}`}
                >
                   <User size={18} /> Profile Details
                </Link>
                <Link 
                  href="/account?tab=orders"
                  className={`flex items-center gap-3 text-sm font-semibold px-4 py-3 rounded-xl transition-colors ${currentTab === 'orders' ? 'bg-primary/5 text-primary' : 'text-gray-600 hover:bg-gray-50'}`}
                >
                   <Package size={18} /> Order History
                </Link>
                <button className="flex items-center gap-3 text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900 px-4 py-3 rounded-xl transition-colors">
                   <MapPin size={18} /> Saved Addresses
                </button>
                <button className="flex items-center gap-3 text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900 px-4 py-3 rounded-xl transition-colors">
                   <Settings size={18} /> Settings
                </button>
                
                <div className="h-px bg-gray-100 my-4" />
                
                <form action={signout}>
                    <button className="w-full flex items-center gap-3 text-sm font-bold text-red-500 hover:bg-red-50 px-4 py-3 rounded-xl transition-colors text-left">
                        <LogOut size={18} /> Log Out
                    </button>
                </form>
              </nav>
            </div>
          </div>

          {/* --- SAĞ İÇERİK --- */}
          <div className="md:col-span-3 space-y-6">
            
            {/* EĞER TAB PROFILE İSE KİŞİSEL BİLGİLERİ GÖSTER */}
            {currentTab === "profile" && (
              <>
                <div className="bg-white p-8 rounded-2xl shadow-sm border border-primary/5 animate-in fade-in slide-in-from-bottom-2">
                  <div className="flex justify-between items-center mb-6">
                     <h2 className="text-xl font-serif font-bold text-gray-900">Personal Information</h2>
                     <button className="text-sm font-medium text-primary hover:underline">Edit</button>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">First Name</label>
                      <p className="font-medium text-gray-900">{userProfile?.firstName || "-"}</p>
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Last Name</label>
                      <p className="font-medium text-gray-900">{userProfile?.lastName || "-"}</p>
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Email Address</label>
                      <div className="flex items-center gap-2 font-medium text-gray-900">
                         <Mail size={16} className="text-gray-400" /> {user.email}
                      </div>
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Phone Number</label>
                      <div className="flex items-center gap-2 font-medium text-gray-900">
                         <Phone size={16} className="text-gray-400" /> {userProfile?.phone || "Not added yet"}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-primary/5 p-8 rounded-2xl border border-primary/10 flex items-center justify-between">
                   <div>
                      <h3 className="font-serif font-bold text-primary text-lg">Secure your account</h3>
                      <p className="text-sm text-gray-600 mt-1">Update your password to keep your account safe.</p>
                   </div>
                   <button className="bg-white text-primary font-bold px-6 py-2 rounded-xl border border-primary/20 hover:bg-primary/5 transition-colors">
                     Change Password
                   </button>
                </div>
              </>
            )}

            {/* EĞER TAB ORDERS İSE SİPARİŞ GEÇMİŞİNİ GÖSTER */}
            {/* EĞER TAB ORDERS İSE SİPARİŞ GEÇMİŞİNİ GÖSTER */}
            {currentTab === "orders" && (
              <div className="bg-white p-8 rounded-2xl shadow-sm border border-primary/5 animate-in fade-in slide-in-from-bottom-2">
                <h2 className="text-xl font-serif font-bold text-gray-900 mb-6">Order History</h2>

                {userOrders.length === 0 ? (
                  <div className="text-center py-12">
                    <Package size={48} className="mx-auto text-gray-300 mb-4" />
                    <p className="text-gray-500 font-medium">You haven't placed any orders yet.</p>
                    <Link href="/shop" className="inline-block mt-4 text-primary font-bold hover:underline">Start Shopping</Link>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {/* YENİ EKLENEN KISIM: Sadece OrderCard'ı çağırıyoruz */}
                    {userOrders.map((order) => (
                      <OrderCard key={order.id} order={order} />
                    ))}
                  </div>
                )}
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
}