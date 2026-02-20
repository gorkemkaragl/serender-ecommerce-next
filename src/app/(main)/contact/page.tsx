"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  Instagram,
  X,
  Twitter,
  Linkedin,
} from "lucide-react";
import { toast } from "sonner";

export default function ContactPage() {
  const [loading, setLoading] = useState(false);

  // Form Gönderme İşlemi (Simülasyon)
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // 1 saniye bekle (sanki sunucuya gidiyor gibi)
    setTimeout(() => {
      setLoading(false);
      toast("Mesaj Gönderildi! 📨", {
        description: "Size en kısa sürede dönüş yapacağız.",
        style: {
          background: "var(--primary)",
          color: "var(--primary-foreground)",
        },
      });
      // Formu temizle (Burada state ile value'ları sıfırlayabilirsin)
      (e.target as HTMLFormElement).reset();
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-secondary pb-20 pt-12 px-6">
      {/* BAŞLIK */}
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-serif font-bold text-primary mb-4">
          Bize Ulaşın
        </h1>
        <p className="text-custom-black/60 max-w-2xl mx-auto">
          Organik ürünlerimiz veya siparişleriniz hakkında bir sorunuz mu var?
          Size yardımcı olmak için buradayız.
        </p>
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
        {/* 1. SOL TARAF: İLETİŞİM BİLGİLERİ (Koyu Kart) */}
        <div className="lg:col-span-1 bg-primary text-white p-8 md:p-10 rounded-3xl relative overflow-hidden shadow-xl">
          {/* Arkaplan Deseni */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>

          <h2 className="text-2xl font-serif font-bold mb-8 relative z-10">
            İletişim Bilgileri
          </h2>

          <div className="space-y-8 relative z-10">
            {/* Adres */}
            <div className="flex items-start gap-4">
              <div className="bg-white/10 p-3 rounded-xl shrink-0">
                <MapPin size={24} />
              </div>
              <div>
                <h3 className="font-bold text-lg mb-1">Bizi Ziyaret Edin</h3>
                <p className="text-white/80 leading-relaxed text-sm">
                  Vakfıkebir / Trabzon <br />
                  TR
                </p>
              </div>
            </div>

            {/* Telefon */}
            <div className="flex items-start gap-4">
              <div className="bg-white/10 p-3 rounded-xl shrink-0">
                <Phone size={24} />
              </div>
              <div>
                <h3 className="font-bold text-lg mb-1">Bizi Arayın</h3>
                <p className="text-white/80 text-sm">+90 555 123 4567</p>
                <p className="text-white/60 text-xs mt-1">
                  Pazartesi - Cuma 08:00 - 17:00
                </p>
              </div>
            </div>

            {/* E-posta */}
            <div className="flex items-start gap-4">
              <div className="bg-white/10 p-3 rounded-xl shrink-0">
                <Mail size={24} />
              </div>
              <div>
                <h3 className="font-bold text-lg mb-1">E-posta</h3>
                <p className="text-white/80 text-sm">ik@serender.com</p>
                <p className="text-white/80 text-sm">support@serender.com</p>
              </div>
            </div>

            {/* Çalışma Saatleri */}
            <div className="flex items-start gap-4">
              <div className="bg-white/10 p-3 rounded-xl shrink-0">
                <Clock size={24} />
              </div>
              <div>
                <h3 className="font-bold text-lg mb-1">Çalışma Saatleri</h3>
                <p className="text-white/80 text-sm">
                  Pazartesi - Cuma: 09:00 - 18:00
                </p>
                <p className="text-white/80 text-sm">
                  Cumartesi - Pazar: Kapalı
                </p>
              </div>
            </div>
          </div>

          {/* Sosyal Medya İkonları (Opsiyonel) */}
          <div className="mt-12 relative z-10 pt-8 border-t border-white/10">
            <p className="text-sm text-white/60 mb-4">
              Bizi sosyal medyada takip edin.
            </p>
            <div className="flex gap-4">
              {/* Buraya sosyal medya ikonları gelebilir */}
              <div className="w-10 h-10 bg-white/10 rounded-full hover:bg-white hover:text-primary transition-colors cursor-pointer flex items-center justify-center font-bold">
                <Instagram></Instagram>
              </div>
              <div className="w-10 h-10 bg-white/10 rounded-full hover:bg-white hover:text-primary transition-colors cursor-pointer flex items-center justify-center font-bold">
                <Twitter></Twitter>
              </div>
              <div className="w-10 h-10 bg-white/10 rounded-full hover:bg-white hover:text-primary transition-colors cursor-pointer flex items-center justify-center font-bold">
                <Linkedin></Linkedin>
              </div>
            </div>
          </div>
        </div>

        {/* 2. SAĞ TARAF: İLETİŞİM FORMU (Beyaz Kart) */}
        <div className="lg:col-span-2 bg-white p-8 md:p-10 rounded-3xl shadow-sm border border-primary/5">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* İsim */}
              <div className="space-y-2">
                <Label
                  htmlFor="name"
                  className="text-custom-black/80 font-medium"
                >
                  Adınız Soyadınız
                </Label>
                <Input
                  id="name"
                  placeholder="Mehmet Yılmaz"
                  required
                  className="h-12 bg-secondary/30 border-primary/10 focus:border-primary"
                />
              </div>

              {/* E-posta */}
              <div className="space-y-2">
                <Label
                  htmlFor="email"
                  className="text-custom-black/80 font-medium"
                >
                  E-posta Adresiniz
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="mehmet@example.com"
                  required
                  className="h-12 bg-secondary/30 border-primary/10 focus:border-primary"
                />
              </div>
            </div>

            {/* Konu */}
            <div className="space-y-2">
              <Label
                htmlFor="subject"
                className="text-custom-black/80 font-medium"
              >
                Konu
              </Label>
              <Input
                id="subject"
                placeholder="Sipariş Sorgulama, İş Birliği, vb."
                required
                className="h-12 bg-secondary/30 border-primary/10 focus:border-primary"
              />
            </div>

            {/* Mesaj */}
            <div className="space-y-2">
              <Label
                htmlFor="message"
                className="text-custom-black/80 font-medium"
              >
                Mesajınız
              </Label>
              <Textarea
                id="message"
                placeholder="Size nasıl yardımcı olabiliriz?"
                required
                className="min-h-38 bg-secondary/30 border-primary/10 focus:border-primary resize-none"
              />
            </div>

            {/* Gönder Butonu */}
            <Button
              type="submit"
              disabled={loading}
              className="w-full md:w-auto px-8 h-12 bg-primary hover:bg-primary/90 text-white rounded-xl text-lg font-bold shadow-lg hover:shadow-xl transition-all flex items-center gap-2"
            >
              {loading ? (
                "Gönderiliyor..."
              ) : (
                <>
                  Mesajı Gönder <Send size={18} />
                </>
              )}
            </Button>
          </form>
        </div>
      </div>

      {/* 3. ALT KISIM: GÖRSEL ALAN (Harita Yerine Çiftlik Fotoğrafı) */}
      <div className="max-w-6xl mx-auto mt-12 md:mt-20">
        <div className="relative w-full h-64 md:h-96 rounded-3xl overflow-hidden shadow-md group">
          <Image
            src="https://images.unsplash.com/photo-1500937386664-56d1dfef3854?q=80&w=2070&auto=format&fit=crop"
            alt="Organic Farm Landscape"
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-1000"
          />
          <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
            <div className="bg-white/90 backdrop-blur-sm px-8 py-4 rounded-2xl text-center shadow-lg">
              <p className="text-primary font-bold uppercase tracking-widest text-xs mb-1">
                Konumumuz
              </p>
              <h3 className="font-serif text-2xl font-bold text-custom-black">
                Çiftliğimizi Ziyaret Edin
              </h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
