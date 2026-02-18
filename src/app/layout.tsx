import type { Metadata } from "next";
import { Inter, DM_Serif_Display } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import { Toaster } from "@/components/ui/sonner";
import Footer from "@/components/layout/Footer";
import { Leaf } from "lucide-react";
import { getAllCategories, getAllProducts } from "@/services/product";
import { createClient } from "@/lib/supabase/server";
import {  Playfair_Display } from "next/font/google"; // Fontların
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" });
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

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">
      <body className={`${inter.variable} ${playfair.variable} antialiased`}>
        {/* BURADA HEADER YOK! */}
        {children}
        <Toaster />
      </body>
    </html>
  );
}
