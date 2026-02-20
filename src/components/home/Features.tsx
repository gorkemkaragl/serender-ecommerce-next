import { Sprout, PackageCheck, ShieldCheck, HeartHandshake } from "lucide-react";

// Özelliklerin Listesi (Veri)
const features = [
  {
    icon: Sprout,
    title: "%100 Doğal Üretim",
    description: "Kimyasal kullanmadan yetiştirilen ürünlerimizle doğanın gerçek tadını yaşayın.",
  },
  {
    icon: PackageCheck,
    title: "Özenli Paketleme",
    description: "Çevre dostu, plastiksiz ambalajlarımız; ürünlerinizi taşıma sırasında taze ve güvenli şekilde korumak için tasarlanmıştır.",
  },
  {
    icon: ShieldCheck,
    title: "Kalite Garantisi",
    description: "Taze olmayan ürünlerinizi memnuniyetle değiştirebilir veya iade edebiliriz. Soru sormadan.",
  },
  {
    icon: HeartHandshake,
    title: "Yerel Çiftçileri Destekleyin",
    description: "Bizimle seçim yaparak yerel topluluklarda adil ücretler ve sürdürülebilir uygulamaları desteklersiniz.",
  },
];

export default function Features() {
  return (
    <section className="py-24">
      <div className="max-w-7xl mx-auto px-6">
        
      

        {/* Özellik Grid'i */}
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="flex flex-col items-center text-center group"
            >
              {/* İkon Alanı (Modern & Organik Dokunuş) */}
              <div className="mb-6 relative">
                {/* Arkadaki hafif renkli şekil */}
                <div className="w-20 h-20 bg-primary/10 rounded-3xl rotate-3 group-hover:rotate-40 group-hover:bg-primary/20 transition-all duration-300 ease-out"></div>
                {/* Öndeki İkon */}
                <div className="absolute inset-0 flex items-center justify-center text-primary">
                  <feature.icon size={40} strokeWidth={2} />
                </div>
              </div>
              
              {/* Başlık ve Açıklama */}
              <h3 className="font-serif text-xl font-bold text-custom-black mb-3">
                {feature.title}
              </h3>
              <p className="text-black/65 leading-tight text-md">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}