import type { Metadata } from "next";
import { Inter, DM_Serif_Display } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import { Toaster } from "@/components/ui/sonner";
import Footer from "@/components/layout/Footer";
import { Leaf } from "lucide-react";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const dmSerif = DM_Serif_Display({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
  variable: "--font-dm-serif",
});

export const metadata: Metadata = {
  title: "Serender ",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${dmSerif.variable} antialiased`}>
        <Header />
        
        <main className="min-h-screen">
          {/* Dekoratif Arka Plan (Hafif Yaprak Deseni) */}
        <div className="absolute z-1 top-40 left-0 w-full h-full opacity-5 pointer-events-none">
          <div className="absolute top-10 left-10 transform -rotate-12">
            <Leaf size={100} />
          </div>
          <div className="absolute bottom-10 right-10 transform rotate-45">
            <Leaf size={150} />
          </div>
          
        </div>
          {children}
          <Toaster />
        </main>
        <Footer />
      </body>
    </html>
  );
}
