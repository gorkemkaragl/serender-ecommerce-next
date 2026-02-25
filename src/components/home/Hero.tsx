"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import Autoplay from "embla-carousel-autoplay";
import { ArrowRight, Leaf, Nut } from "lucide-react";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";

// Slayt Verileri (Görselleri değiştirebilirsin)
const HERO_SLIDES = [
  {
    id: 1,
    title: "Tarladan Sofranıza Taze ve Organik Gıdalar.",
    description:
      "Her gün hasat edilen sebze ve meyvelerimizle doğanın gerçek tadını keşfedin. Kimyasal yok, sadece saf emek ve sevgi.",
    image:
      "https://images.unsplash.com/photo-1610348725531-843dff563e2c?q=80&w=2070&auto=format&fit=crop",
    cta: "Marketimizi Keşfedin",
    link: "/shop",
    badge: "100% doğal",
  },
  {
    id: 2,
    title: "24 Saat İçinde Kapınıza Teslim.",
    description:
      "Taze ve organik ürünlerinizi bekleyen bir kurye ile kapınıza teslim edilir. Sadece doğanın tadını yaşayın.",
    image:
      "https://images.unsplash.com/photo-1617347454431-f49d7ff5c3b1?q=80&w=2015&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", // Kurye/Paket görseli
    cta: "Teslimatı Görüntüle",
    link: "/delivery",
    badge: "Hızlı Teslimat",
  },
  {
    id: 3,
    title: "Haftalık Kutular, Sadece Sizin İçin Hazırlanmış.",
    description:
      "Sezonluk kutularımıza abone olun ve %20'ye kadar tasarruf edin. Sağlıklı yemek yemek ve yerel çiftçileri desteklemek için en iyi yöntem.",
    image:
      "https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=1974&auto=format&fit=crop", // Çiftçi/Kutu görseli
    cta: "Abone Olun",
    link: "/contact",
    badge: "Abonelik Kutuları",
  },
];

export default function Hero() {
  // Autoplay Plugin Ayarı
  const plugin = React.useRef(
    Autoplay({ delay: 5000, stopOnInteraction: true }),
  );

  return (
    <section className="bg-secondary relative overflow-hidden md:py-8">
      
      <div className=" max-w-7xl mx-auto px-6 py-12 md:py-20 lg:py-0">
        <Carousel
          plugins={[plugin.current]}
          className="w-full"
          onMouseEnter={plugin.current.stop}
          onMouseLeave={plugin.current.reset}
        >
          {/* Navigasyon Okları (Sadece Desktop) */}

          <div className="hidden lg:block">
            <CarouselPrevious className=" bg-white/50 hover:bg-white border-none" />
            <CarouselNext className=" bg-white/50 hover:bg-white border-none" />
          </div>
          <CarouselContent>
            {HERO_SLIDES.map((slide) => (
              <CarouselItem key={slide.id}>
                <div className=" grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-125 md:min-h-150">
                  {/* SOL TARA: METİN ALANI */}
                  <div className="space-y-8 px-2 relative z-10 order-2 lg:order-1 text-center lg:text-left">
                    {/* Badge */}
                    <div className="inline-flex items-center gap-2 bg-white/60 backdrop-blur-sm border border-primary/10 px-4 py-1.5 rounded-full text-primary text-sm font-bold tracking-wide uppercase shadow-sm">
                      <Leaf size={14} />
                      {slide.badge}
                    </div>

                    {/* Başlık */}
                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif font-bold text-custom-black leading-none">
                      {slide.title.split(" ").map((word, i) => (
                        <span
                          key={i}
                          className={i % 3 === 1 ? "text-primary" : ""}
                        >
                          {word}{" "}
                        </span>
                      ))}
                    </h1>

                    {/* Açıklama */}
                    <p className="text-lg text-custom-black/60 font-sans max-w-xl mx-auto lg:mx-0 leading-relaxed">
                      {slide.description}
                    </p>

                    {/* Butonlar */}
                    <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                      <Link href={slide.link}>
                        <Button
                          variant="default"
                          size="lg"
                          className="  text-lg font-bold shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all  "
                        >
                          {slide.cta} <ArrowRight className="ml-2 w-5 h-5" />
                        </Button>
                      </Link>

                      <Link href="/about">
                        <Button
                          variant="outline"
                          size="lg"
                          className="    text-lg font-medium "
                        >
                          Hikayemiz
                        </Button>
                      </Link>
                    </div>
                  </div>

                  {/* SAĞ TARA: GÖRSEL ALANI */}
                  <div className="relative h-75 md:h-125  w-full order-1 lg:order-2">
                    {/* Görsel Çerçevesi (Modern Blob/Shape Efekti) */}
                    <div className="absolute inset-0 bg-accent rounded-[3rem] transform rotate-8 scale-95"></div>
                    <div className="absolute inset-0 bg-primary/50  rounded-[3rem] transform -rotate-8 scale-95"></div>

                    {/* Ana Görsel */}
                    <div className="relative h-full w-full rounded-[2.5rem] overflow-hidden">
                      <Image
                        src={slide.image}
                        alt={slide.title}
                        fill
                        className="object-cover hover:scale-105 transition-transform duration-1000 "
                        priority 
                      />
                    </div>

                    {/* Süsleme Kartı (Floating Card) */}
                    <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-2xl shadow-lg shadow-black/75 hidden md:flex items-center gap-4 animate-bounce-slow">
                      <div className="bg-green-100 p-3 rounded-full text-green-600">
                        <Leaf size={24} />
                      </div>
                      <div>
                        <p className="font-bold text-custom-black text-sm">
                          100% Taze
                        </p>
                        <p className="text-xs text-custom-black/50">
                          Doğal ve Organik Ürünler
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </section>
  );
}
