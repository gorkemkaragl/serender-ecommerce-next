"use client";

import Link from "next/link";
import { User, Heart, ShoppingBag, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import CartSheet from "./CartSheet";
import WishlistSheet from "./WishlistSheet";

export default function Header() {
  const navLinks = [
    { name: "Shop", href: "/shop" },
    { name: "Delivery", href: "/delivery" },
    { name: "About us", href: "/about" },
    { name: "Contact us", href: "/contact" },
  ];

  return (
    <header className="w-full">
      {/* TOP BAR */}
      <div className="bg-primary text-primary-foreground text-xs md:text-sm py-2 text-center font-medium tracking-wide">
        Weekend Special: -10% on all frozen products!
      </div>

      {/* MAIN NAVBAR */}
      <nav className="bg-secondary/50 backdrop-blur-md px-6 py-4 shadow-sm border-b">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          
          {/* LOGO */}
          <Link href="/" className="text-3xl font-serif font-bold text-primary cursor-default">
            Serender House
          </Link>

          {/* DESKTOP MENU */}
          <ul className="hidden md:flex space-x-6">
            {navLinks.map((link) => (
              <li key={link.name}>
                <Button variant="outline" asChild className="text-foreground font-medium text-base hover:text-primary transition-colors">
                  <Link href={link.href}>{link.name}</Link>
                </Button>
              </li>
            ))}
          </ul>

          {/* ICONS (Sağ Kısım) */}
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="icon" aria-label="User Account">
              <User className="h-5 w-5" />
            </Button>
            
            <WishlistSheet/>

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
                  
                  {/* Mobilde ikonları da menü içine ekleyebilirsin veya yukarıda bırakabilirsin. 
                      Burada örnek olarak ek butonlar koydum */}
                  <div className="mt-4 flex gap-4">
                     <Button className="w-full">Sign In</Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>

          </div>
        </div>
      </nav>
    </header>
  );
}