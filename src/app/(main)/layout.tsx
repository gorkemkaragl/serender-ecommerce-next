
import "../globals.css";
import Header from "@/components/layout/Header";
import { Toaster } from "@/components/ui/sonner";
import Footer from "@/components/layout/Footer";
import { Leaf } from "lucide-react";
import { getAllCategories, getAllProducts } from "@/services/product";
import { createClient } from "@/lib/supabase/server";




export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const categories = await getAllCategories(); // Kategorileri al (Header için)
  const products =await getAllProducts(); // Tüm ürünleri al (Header için) 

  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  return (
    <div>
 <Header  user={user} categories={categories} dbProducts={products} />
        
        <main className="min-h-screen">
          {/* Dekoratif Arka Plan (Hafif Yaprak Deseni) */}
        <div className="absolute z-1 top-40 left-0 w-full h-full opacity-5 pointer-events-none">
          <div className="absolute top-10 left-10 transform -rotate-12">
            <Leaf size={100} />
          </div>
          <div className="absolute bottom-10 right-10 transform rotate-45">
            <Leaf size={150} />
          </div>
          
        </div>
          {children}
          <Toaster />
        </main>
        <Footer />
    </div>
       
    
  );
}
