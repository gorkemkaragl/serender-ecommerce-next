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
          We believe in <br />
          <span className="italic">real food.</span>
        </h1>
        <p className="text-lg md:text-xl text-custom-black/60 font-sans max-w-2xl mx-auto leading-relaxed">
          GX Food was born from a simple idea: to bring the freshest, most organic produce from local farms directly to your kitchen table, without compromising on quality or taste.
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
            <span className="text-primary font-bold tracking-widest uppercase text-sm">Our Story</span>
            <h2 className="text-3xl md:text-5xl font-serif font-bold text-custom-black">
              From the farm, <br /> with love.
            </h2>
            <p className="text-custom-black/70 leading-relaxed text-lg">
              It started in 2023 with a small group of local farmers in Berlin. We noticed that supermarkets were prioritizing shelf life over flavor and nutrition. We wanted to change that.
            </p>
            <p className="text-custom-black/70 leading-relaxed text-lg">
              Today, GX Food partners with over 50 sustainable farms to deliver seasonal boxes that support the environment and your health. Every apple, every leaf of spinach tells a story of care and dedication.
            </p>
            
            <div className="pt-4 flex flex-col gap-3">
              <div className="flex items-center gap-3">
                <CheckCircle className="text-primary" size={20} />
                <span className="font-medium text-custom-black">100% Organic & Pesticide-free</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle className="text-primary" size={20} />
                <span className="font-medium text-custom-black">Supports Local Communities</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle className="text-primary" size={20} />
                <span className="font-medium text-custom-black">Eco-friendly Packaging</span>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* DEĞERLERİMİZ (Kartlar) */}
      <section className=" py-20 mb-24 border-t-2 border-dashed border-b-2 border-primary/40">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary mb-4">Why Choose GX Food?</h2>
            <p className="text-custom-black/50">Our core values define everything we do.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Kart 1 */}
            <div className="bg-secondary p-8 rounded-2xl text-center hover:-translate-y-2 transition-transform duration-300 shadow-2xl">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 text-primary">
                <Leaf size={32} />
              </div>
              <h3 className="font-serif text-xl font-bold mb-3">Freshness Guaranteed</h3>
              <p className="text-custom-black/60">
                We harvest on demand. That means the vegetables you get were likely in the ground just 24 hours ago.
              </p>
            </div>

            {/* Kart 2 */}
            <div className="bg-secondary p-8 rounded-2xl text-center hover:-translate-y-2 transition-transform duration-300 shadow-2xl">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 text-primary">
                <Truck size={32} />
              </div>
              <h3 className="font-serif text-xl font-bold mb-3">Sustainable Delivery</h3>
              <p className="text-custom-black/60">
                We use electric vehicles for our local deliveries and plastic-free packaging to minimize our carbon footprint.
              </p>
            </div>

            {/* Kart 3 */}
            <div className="bg-secondary p-8 rounded-2xl text-center hover:-translate-y-2 transition-transform duration-300 shadow-2xl">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 text-primary">
                <Users size={32} />
              </div>
              <h3 className="font-serif text-xl font-bold mb-3">Community First</h3>
              <p className="text-custom-black/60">
                We believe in fair trade. Our farmers get paid fairly for their hard work, ensuring a thriving local economy.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* TAKIM (Basit Grid) */}
      <section className="max-w-7xl mx-auto px-6 mb-24">
        <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary mb-12 text-center">Meet the Minds</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { name: "Görkem Karagöl", role: "Founder", img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=2070&auto=format&fit=crop" },
            { name: "David Chen", role: "Head of Operations", img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=2070&auto=format&fit=crop" },
            { name: "Emma Wilson", role: "Nutritionist", img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=1976&auto=format&fit=crop" },
            { name: "James Carter", role: "Lead Farmer", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1974&auto=format&fit=crop" }
          ].map((member, index) => (
            <div key={index} className="text-center group">
              <div className="relative aspect-3/4 rounded-xl overflow-hidden mb-4 grayscale group-hover:grayscale-0 transition-all duration-500">
                <Image src={member.img} alt={member.name} fill className="object-cover" />
              </div>
              <h3 className="font-serif font-bold text-lg">{member.name}</h3>
              <p className="text-sm text-primary uppercase tracking-wider">{member.role}</p>
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
            <h2 className="text-3xl md:text-5xl font-serif font-bold mb-6">Ready to taste the difference?</h2>
            <p className="text-white/80 text-lg mb-8 max-w-xl mx-auto">
              Join thousands of happy customers who have switched to a healthier, more sustainable lifestyle.
            </p>
            <Link href="/shop">
              <Button className="bg-white text-primary hover:bg-secondary hover:text-custom-black text-lg px-8 py-6 rounded-xl font-bold transition-all">
                Shop Now
              </Button>
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}