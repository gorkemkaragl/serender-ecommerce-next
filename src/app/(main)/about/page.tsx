import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Leaf, Truck, Users, CheckCircle } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="bg-secondary min-h-screen pb-20">
      {/* HERO BÖLÜMÜ */}
      <section className="relative py-20 md:py-32 px-6 text-center max-w-4xl mx-auto ">
        <h1 className="text-5xl md:text-7xl font-serif font-bold text-primary mb-6 leading-tight">
          <span className="italic">Doğal Gıdaya</span> <br />
          İnanıyoruz.
        </h1>
        <p className="text-lg md:text-xl text-custom-black/60 font-sans max-w-2xl mx-auto leading-relaxed">
          Serender Nut House, yerel çiftliklerden temin edilen en taze ve en
          organik ürünleri; kalite ve lezzetten asla ödün vermeden doğrudan
          sofralarınıza ulaştırma vizyonuyla kuruldu.
        </p>
      </section>

      {/* HİKAYEMİZ (Görsel + Metin) */}
      <section className="max-w-7xl mx-auto px-6 mb-24 ">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Görsel */}
          <div className="relative aspect-4/5 md:aspect-square rounded-3xl overflow-hidden shadow-xl">
            <Image
              src="https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=1974&auto=format&fit=crop"
              alt="Farmer holding fresh vegetables"
              fill
              className="object-cover hover:scale-105 transition-transform duration-700"
            />
          </div>

          {/* Metin */}
          <div className="space-y-6 md:pl-10">
            <span className="text-primary font-bold tracking-widest uppercase text-sm">
              Hikayemiz
            </span>
            <h2 className="text-3xl md:text-5xl font-serif font-bold text-custom-black">
              Tarladan, <br /> sevgiyle sofranıza.
            </h2>
            <p className="text-custom-black/70 leading-relaxed text-lg">
              2023 yılında Trabzon'da yerel çiftliklerden gelen taze ve organik
              ürünlerle sofranızda kaliteyi ön planda tutmak için kuruldu.
              Supermarketlerin ürün ömrüne göre seçim yapmalarını engellemek
              istedik.
            </p>
            <p className="text-custom-black/70 leading-relaxed text-lg">
              Bugün, Serender Nut House, doğayı ve sağlığı destekleyen 50'den
              fazla sürdürülebilir çiftlikle iş birliği yaparak sezonluk kutular
              sunar. Her elma, her ıspanak yaprağı, sevgiyle anlatılan bir
              hikayeyi anlatır.
            </p>

            <div className="pt-4 flex flex-col gap-3">
              <div className="flex items-center gap-3">
                <CheckCircle className="text-primary" size={20} />
                <span className="font-medium text-custom-black">
                  %100 Organik ve Kimyasal İlaç İçermez
                </span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle className="text-primary" size={20} />
                <span className="font-medium text-custom-black">
                  Yerel Toplulukları Destekler
                </span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle className="text-primary" size={20} />
                <span className="font-medium text-custom-black">
                  Doğa Dostu Ambalaj
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* DEĞERLERİMİZ (Kartlar) */}
      <section className=" py-20 mb-24 border-t-2 border-dashed border-b-2 border-primary/40">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary mb-4">
              Neden Serender Nut House?
            </h2>
            <p className="text-custom-black/50">
              Temel değerlerimiz, her şeyi belirler.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Kart 1 */}
            <div className="bg-secondary p-8 rounded-2xl text-center hover:-translate-y-2 transition-transform duration-300 shadow-2xl">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 text-primary">
                <Leaf size={32} />
              </div>
              <h3 className="font-serif text-xl font-bold mb-3">
                Tazelik Garantili
              </h3>
              <p className="text-custom-black/60">
                Siparişe göre hasat yapıyoruz. Bu da demek oluyor ki, size
                ulaşan sebzeler büyük ihtimalle sadece 24 saat önce topraktan
                çıkarıldı.
              </p>
            </div>

            {/* Kart 2 */}
            <div className="bg-secondary p-8 rounded-2xl text-center hover:-translate-y-2 transition-transform duration-300 shadow-2xl">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 text-primary">
                <Truck size={32} />
              </div>
              <h3 className="font-serif text-xl font-bold mb-3">
                Sürdürülebilir Teslimat
              </h3>
              <p className="text-custom-black/60">
                Yerel teslimatlarımız için elektrikli araçlar kullanıyoruz ve
                karbon ayak izimizi minimize etmek için plastik-ücretsiz ambalaj
                kullanıyoruz.
              </p>
            </div>

            {/* Kart 3 */}
            <div className="bg-secondary p-8 rounded-2xl text-center hover:-translate-y-2 transition-transform duration-300 shadow-2xl">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 text-primary">
                <Users size={32} />
              </div>
              <h3 className="font-serif text-xl font-bold mb-3">
                Topluluk Öncelikli
              </h3>
              <p className="text-custom-black/60">
                Adaletli ticaret inancımız var. Tarım işçilerimiz, emeklerinin
                karşılığını adil şekilde alır ve bu da yerel ekonomiyi canlı
                tutar.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* TAKIM (Basit Grid) */}
      <section className="max-w-7xl mx-auto px-6 mb-24">
        <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary mb-12 text-center">
          Meet the Minds
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            {
              name: "Görkem Karagöl",
              role: "Kurucu",
              img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=2070&auto=format&fit=crop",
            },
            {
              name: "David Chen",
              role: "Operasyon Müdürü",
              img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=2070&auto=format&fit=crop",
            },
            {
              name: "Emma Wilson",
              role: "Beslenme Uzmanı",
              img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=1976&auto=format&fit=crop",
            },
            {
              name: "James Carter",
              role: "Lider Tarım İşçisi",
              img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1974&auto=format&fit=crop",
            },
          ].map((member, index) => (
            <div key={index} className="text-center group">
              <div className="relative aspect-3/4 rounded-xl overflow-hidden mb-4 grayscale group-hover:grayscale-0 transition-all duration-500">
                <Image
                  src={member.img}
                  alt={member.name}
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="font-serif font-bold text-lg">{member.name}</h3>
              <p className="text-sm text-primary uppercase tracking-wider">
                {member.role}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA (Call to Action) */}
      <section className="max-w-5xl mx-auto px-6">
        <div className="bg-primary rounded-3xl p-12 md:p-20 text-center text-white relative overflow-hidden">
          {/* Arkaplan Deseni (Süsleme) */}
          <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>

          <div className="relative z-10">
            <h2 className="text-3xl md:text-5xl font-serif font-bold mb-6">
              Gerçek lezzet farkını deneyimlemeye hazır mısınız?
            </h2>
            <p className="text-white/80 text-lg mb-8 max-w-xl mx-auto">
              Daha sağlıklı ve sürdürülebilir bir yaşam tarzına geçen binlerce
              mutlu müşterimize siz de katılın.
            </p>
            <Link href="/shop">
              <Button className="bg-white text-primary hover:bg-secondary hover:text-custom-black text-lg px-8 py-6 rounded-xl font-bold transition-all">
                Şimdi Alışverişe Başla
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
