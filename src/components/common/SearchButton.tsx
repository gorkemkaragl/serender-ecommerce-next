"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Search, Settings, User, Rocket } from "lucide-react";

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import { Button } from "@/components/ui/button";
import { Category, Product } from "@/types";
import { getIconByName } from "@/lib/utils";

interface SearchButtonProps {
  categories: Category[]; // Kategorileri içeren prop
  dbProducts: Product[]; // Tüm ürünleri içeren prop
}

export default function SearchButton({
  categories,
  dbProducts,
}: SearchButtonProps) {
  const [open, setOpen] = React.useState(false);
  const router = useRouter();

  // Klavye Kısayolu (Ctrl + K veya Cmd + K)
  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  // Bir şeye tıklayınca pencereyi kapat ve git
  const runCommand = React.useCallback((command: () => unknown) => {
    setOpen(false);
    command();
  }, []);

  return (
    <>
      {/* --- TETİKLEYİCİ BUTONLAR --- */}

      {/* 1. DESKTOP GÖRÜNÜMÜ (Şık Input Benzeri Buton) */}
      <Button
        variant="ghost"
        onClick={() => setOpen(true)}
        className="hidden md:flex items-center gap-2 w-42 rounded-full text-black/50 transition-colors "
      >
        <Search size={16} />
        <span>Search products...</span>
      </Button>

      {/* 2. MOBİL GÖRÜNÜMÜ (Sadece İkon) */}
      <Button
        size="icon"
        variant="ghost"
        onClick={() => setOpen(true)}
        className="md:hidden p-2 text-custom-black/70 hover:text-primary transition-colors"
      >
        <Search size={24} />
      </Button>

      {/* --- AÇILAN PENCERE (COMMAND PALETTE) --- */}
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Type a command or search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>

          {/* GRUP 1: KATEGORİLER */}
          <CommandGroup heading="Categories">
            {categories.map((category) => {
              const Icon = getIconByName(category.icon);
              return (
                <CommandItem
                  key={category.id}
                  value={category.name} // Arama yaparken bu metne bakacak
                  onSelect={() => {
                    runCommand(() =>
                      router.push(`/shop?category=${category.id}`),
                    );
                  }}
                >
                  <Icon className="mr-2 h-4 w-4" />
                  <span>{category.name}</span>
                </CommandItem>
              );
            })}
          </CommandGroup>

          <CommandSeparator />

          {/* GRUP 2: ÜRÜNLER */}
          <CommandGroup heading="Products">
            {dbProducts.map((product) => (
              <CommandItem
                key={product.id}
                value={product.name}
                onSelect={() => {
                  runCommand(() => router.push(`/product/${product.slug}`));
                }}
              >
                <Rocket className="mr-2 h-4 w-4 text-primary" />{" "}
                {/* Veya ürün resmi olabilir */}
                <span>{product.name}</span>
                <span className="ml-auto text-xs text-custom-black/50">
                  ${product.price}
                </span>
              </CommandItem>
            ))}
          </CommandGroup>

          <CommandSeparator />

          {/* GRUP 3: SAYFALAR (Hızlı Erişim) */}
          <CommandGroup heading="Pages">
            <CommandItem
              onSelect={() => runCommand(() => router.push("/about"))}
            >
              <User className="mr-2 h-4 w-4" />
              <span>About Us</span>
            </CommandItem>
            <CommandItem
              onSelect={() => runCommand(() => router.push("/contact"))}
            >
              <Settings className="mr-2 h-4 w-4" />
              <span>Contact</span>
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
}
