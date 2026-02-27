import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { db } from "@/db";
import { profiles } from "@/db/schema";
import { eq } from "drizzle-orm";
import { Sidebar } from "@/components/admin/Sidebar";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  // Giriş yapmış bir kullanıcı var mı? Yoksa login'e at.
  if (!user) {
    redirect("/login");
  }

  //  Bu kullanıcının rolü "admin" mi?
  const userProfile = await db.query.profiles.findFirst({
    where: eq(profiles.id, user.id),
    columns: { role: true } // Sadece rolü çekiyoruz, performans için!
  });

  // Eğer profil yoksa veya rolü 'admin' değilse ana sayfaya (veya yetkisiz sayfasına) şutla!
  if (!userProfile || userProfile.role !== "admin") {
    redirect("/"); 
  }

  // Eğer buraya kadar geldiyse patron gelmiş demektir! Paneli göster.
  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar />

      {/* Ana İçerik Alanı */}
      <main className="flex-1 p-8">
        {children}
      </main>
    </div>
  );
}