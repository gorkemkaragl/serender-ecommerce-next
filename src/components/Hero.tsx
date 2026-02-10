import Image from "next/image";
import { Button } from "@/components/ui/button"; // Shadcn butonu
import { ArrowRight } from "lucide-react"; // İkon

export default function Hero() {
  return (
    <section className="w-full px-6 py-12 md:py-20 max-w-7xl mx-auto">
      
      {/*ÜST METİN ALANI (GRID YAPISI) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-end mb-12">
        
        {/* Sol Taraf: Büyük Başlık */}
        <h1 className="text-4xl md:text-6xl font-serif font-bold text-primary sm:leading-13">
          Premium Food & <br />
          Beverages at Your Doorstep
        </h1>

        {/* Sağ Taraf: Açıklama Metni */}
        <div className="flex flex-col gap-4 md:pl-10">
          <p className="text-lg text-custom-black/80 font-sans leading-relaxed">
            Discover high-quality products, place your order online, 
            and enjoy fast, reliable delivery right to your home.
          </p>
          
          {/* Action Butonları */}
          <div className="flex gap-4">
            <Button size="lg" className="rounded-full px-8 text-white">
              Shop Now
            </Button>
            <Button variant="outline" size="lg" className="rounded-full gap-2 border-primary text-primary hover:bg-primary/10">
              Delivery Info <ArrowRight size={18} />
            </Button>
          </div>
        </div>
      </div>

      {/*BÜYÜK BANNER GÖRSELİ */}
      <div className="relative w-full h-75 md:h-125 rounded-3xl overflow-hidden bg-neutral-light shadow-xl">
        
        {/* Arkaplan Resmi */}
        <Image 
          src="https://images.unsplash.com/photo-1506484381205-f7945653044d?q=80&w=2070&auto=format&fit=crop"
          alt="Healthy Food Box"
          fill
          className="object-cover opacity-90"
          priority // Bu resim sayfanın en üstünde olduğu için hemen yüklensin (LCP Optimizasyonu)
        />

        {/* ORTADAKİ "SPECIAL OFFER" METNİ (OVERLAY) */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
          <div className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-sm max-w-lg">
            <h2 className="text-3xl md:text-5xl font-serif font-bold text-primary mb-2">
              SPECIAL OFFER
            </h2>
            <p className="text-xl font-sans font-medium text-custom-black mb-4">
              FIRST ORDER <span className="text-primary font-bold">-20%</span>
            </p>
            <div className="inline-block bg-secondary px-4 py-2 rounded-lg border border-primary/20">
              <span className="text-xs uppercase tracking-widest text-custom-black/60 mr-2">Promo Code:</span>
              <span className="font-bold text-primary">WELCOME20</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}