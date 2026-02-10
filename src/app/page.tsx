import Hero from "@/components/Hero";

export default function Home() {
  return (
    <div className="pb-20"> 
      <Hero />
      
      {/* İleride buraya Ürün Listesi gelecek */}
      <div className="text-center py-10 opacity-50">
        (Buraya Ürün Vitrini Gelecek...)
      </div>
    </div>
  );
}