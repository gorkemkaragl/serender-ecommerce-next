import Link from "next/link";
import { Facebook, Instagram, Twitter, Mail, MapPin, Phone } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-primary text-white pt-16 pb-8 mt-18">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* ÜST KISIM (GRID LAYOUT) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-8 border-b border-white/10 pb-12">
          
          {/* 1. SÜTUN: MARKA & HAKKINDA */}
          <div className="space-y-6">
            <h2 className="text-3xl font-serif font-bold tracking-wide">Serender House</h2>
            <p className="text-white/80 text-sm leading-relaxed max-w-xs">
              En kaliteli yiyecek ve içecekler kapınıza teslim edilir. Taze, organik ve yerel çiftçilerden güvenilir bir şekilde temin edilir.
            </p>
            <div className="flex gap-4 pt-2">
              <Link href="#" className="bg-white/10 p-2 rounded-full hover:bg-accent hover:text-custom-black transition-all">
                <Instagram size={18} />
              </Link>
              <Link href="#" className="bg-white/10 p-2 rounded-full hover:bg-accent hover:text-custom-black transition-all">
                <Twitter size={18} />
              </Link>
              <Link href="#" className="bg-white/10 p-2 rounded-full hover:bg-accent hover:text-custom-black transition-all">
                <Facebook size={18} />
              </Link>
            </div>
          </div>

          {/* 2. SÜTUN: HIZLI LİNKLER */}
          <div>
            <h3 className="font-serif text-lg font-bold mb-6 text-accent">Hızlı Linkler</h3>
            <ul className="space-y-4 text-sm text-white/80">
              <li><Link href="/shop" className="hover:text-white hover:translate-x-1 transition-all inline-block">Ürünler</Link></li>
              <li><Link href="/about" className="hover:text-white hover:translate-x-1 transition-all inline-block">Hakkımızda</Link></li>
              <li><Link href="/blog" className="hover:text-white hover:translate-x-1 transition-all inline-block">Blog</Link></li>
              <li><Link href="/contact" className="hover:text-white hover:translate-x-1 transition-all inline-block">İletişim</Link></li>
            </ul>
          </div>

          {/* 3. SÜTUN: MÜŞTERİ HİZMETLERİ */}
          <div>
            <h3 className="font-serif text-lg font-bold mb-6 text-accent">Müşteri Hizmetleri</h3>
            <ul className="space-y-4 text-sm text-white/80">
              <li><Link href="/faq" className="hover:text-white hover:translate-x-1 transition-all inline-block">FAQ</Link></li>
              <li><Link href="/shipping" className="hover:text-white hover:translate-x-1 transition-all inline-block">Siparişler & İadeler</Link></li>
              <li><Link href="/privacy" className="hover:text-white hover:translate-x-1 transition-all inline-block">Gizlilik Politikası</Link></li>
              <li><Link href="/terms" className="hover:text-white hover:translate-x-1 transition-all inline-block">Şartlar & Koşullar</Link></li>
            </ul>
          </div>

          {/* 4. SÜTUN: İLETİŞİM & BÜLTEN */}
          <div>
            <h3 className="font-serif text-lg font-bold mb-6 text-accent">Bize Ulaşın</h3>
            <ul className="space-y-4 text-sm text-white/80 mb-6">
              <li className="flex items-center gap-3">
                <MapPin size={16} className="text-accent" />
                <span>Trabzon, TR</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={16} className="text-accent" />
                <span>+49 123 456 789</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={16} className="text-accent" />
                <span>gorkemkaragol0@gmail.com</span>
              </li>
            </ul>

            {/* Newsletter Input */}
            <div className="relative">
              <input 
                type="email" 
                placeholder="email adresinizi girin" 
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-accent transition-colors"
              />
              <button className="absolute right-2 top-1/2 -translate-y-1/2 text-xs font-bold bg-accent text-custom-black px-3 py-1.5 rounded hover:bg-white transition-colors">
                Abone Ol
              </button>
            </div>
          </div>

        </div>

        {/* ALT KISIM (COPYRIGHT) */}
        <div className="flex flex-col md:flex-row justify-between items-center text-xs text-white/40 font-sans">
          <p>&copy; {new Date().getFullYear()} Serender. Tüm hakları saklıdır.</p>
          <div className="flex gap-4 mt-4 md:mt-0">
            <span>Portfolyo için tasarlanmıştır</span>
            <span>•</span>
            <span>Next.js & Tailwind CSS</span>
          </div>
        </div>

      </div>
    </footer>
  );
}