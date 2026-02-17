"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { User, Menu, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import CartSheet from "../common/CartSheet";
import { CATEGORIES } from "@/lib/data";
import SearchButton from "../common/SearchButton";
import WishlistSheet from "../common/WishlistSheet";

export default function Header() {
  const pathname = usePathname();
  // Shop sayfasında mıyız? (Tam eşleşme)
  // Eğer /shop/page-2 gibi alt sayfalar yaparsak 'pathname.startsWith("/shop")' kullanabiliriz.
  const isShopPage = pathname === "/shop";
  const navLinks = [
    { name: "Shop", href: "/shop" },
    { name: "Delivery", href: "/delivery" },
    { name: "About us", href: "/about" },
    { name: "Contact us", href: "/contact" },
  ];

  return (
    <header className="w-full sticky top-0 z-50">
      {/* TOP BAR */}
      <div className="bg-primary text-white py-2 text-[11px] md:text-xs tracking-wide ">
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          {/* SOL TARA: Duyuru (Mobilde gizlenebilir veya kısaltılabilir) */}
          <p className=" font-medium opacity-90 hidden md:block">
            Free shipping on orders over <span className="font-bold">$50</span>
          </p>
          <p className="font-medium opacity-90 md:hidden">
            Free shipping over $50
          </p>

          {/* SAĞ TARA: Giriş / Üye Ol / Dil Seçimi */}
          <div className="flex items-center gap-4 md:gap-6">
            {/* Giriş / Kayıt */}
            <div className="flex items-center gap-2">
              <Link
                href="/login"
                className="flex items-center gap-1.5 hover:opacity-80 transition-opacity font-medium"
              >
                <User size={12} />
                <span>Log In</span>
              </Link>

              <span className="opacity-30">|</span>

              <Link
                href="/register"
                className="hover:opacity-80 transition-opacity font-medium"
              >
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* MAIN NAVBAR */}
      <nav className="bg-secondary/50 backdrop-blur-md px-6 py-4 border-b border-primary/10 ">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          {/* LOGO */}
          <Link
            href="/"
            className="text-3xl font-serif font-bold text-primary cursor-default "
          >
            Serender House
          </Link>

          {/* DESKTOP MENU */}
          <ul className="hidden md:flex space-x-6">
            {navLinks.map((link) => (
              <li key={link.name}>
                <Button
                  variant="outline"
                  asChild
                  className="shadow-none border-none text-foreground font-medium text-base hover:text-primary transition-colors"
                >
                  <Link href={link.href}>{link.name}</Link>
                </Button>
              </li>
            ))}
          </ul>

          {/* ICONS (Sağ Kısım) */}
          <div className="flex items-center space-x-2">
            <SearchButton />

            <WishlistSheet />

            {/* Sepet İkonu ve Badge */}
            <CartSheet />

            {/* MOBILE MENU (SHEET) */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>

              <SheetContent side="right" className="w-75 sm:w-87.5 p-4">
                <SheetHeader>
                  <SheetTitle className="font-serif text-2xl text-left text-primary">
                    Serender House
                  </SheetTitle>
                </SheetHeader>
                <div className="flex flex-col mt-8 gap-4">
                  {navLinks.map((link) => (
                    <div key={link.name} className="flex flex-col">
                      <Link
                        href={link.href}
                        className="text-lg font-medium hover:text-primary transition-colors py-2"
                      >
                        {link.name}
                      </Link>
                      <Separator />
                    </div>
                  ))}

                  <div className="mt-4 flex gap-4">
                    <Button className="w-full">Sign In</Button>
                  </div>
                  {/* Kategoriler */}
                  <div className="flex flex-col py-8 border-t border-primary/20">
                    {CATEGORIES.map((cat, index) => (
                      <Link
                        key={cat.id}
                        href={`/shop?category=${cat.id}`}
                        className="flex items-center gap-2 group relative   text-xs md:text-sm font-semibold tracking-tight text-gray-600 transition-all duration-300 hover:text-primary"
                      >
                        {/* İKON ALANI */}
                        <div className="p-1.5 rounded-full bg-secondary text-custom-black/60 group-hover:bg-primary group-hover:text-white transition-colors">
                          <cat.icon size={16} /> {/* Dinamik İkon */}
                        </div>
                        {/* Kategori Metni */}
                        <span className="relative z-10">{cat.name}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </nav>

      {/* bottom bar */}
      {!isShopPage && (
        <div className="bg-secondary/50 backdrop-blur-xl  sticky top-0 z-40 hidden md:block shadow-xl text-black/50">
          <div className="max-w-7xl mx-auto px-4 md:px-6">
            <nav className="flex items-center justify-center gap-1 md:gap-4 ">
              {CATEGORIES.map((cat, index) => (
                <Link
                  key={cat.id}
                  href={`/shop?category=${cat.id}`}
                  className="flex items-center gap-1 group relative px-2 py-4 text-xs md:text-sm font-semibold tracking-tight  transition-all duration-300 hover:text-primary"
                >
                  {/* İKON ALANI */}
                  <div className="p-1.5 rounded-full   group-hover:bg-primary group-hover:text-white transition-colors">
                    <cat.icon size={16} />
                  </div>
                  {/* Kategori Metni */}
                  <span>{cat.name}</span>

                  {/* Hover Alt Çizgi Efekti (Borders yerine daha modern bir yaklaşım) */}
                  <span className="absolute inset-x-2 bottom-1.5 h-0.5 scale-x-0 bg-primary transition-transform duration-300 group-hover:scale-x-100" />
                </Link>
              ))}
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}
