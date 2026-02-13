"use client";

import Image from "next/image";
import { useWishlistStore } from "@/store/wishlist-store";
import { useCartStore } from "@/store/cart-store";

import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Heart, Trash2, ShoppingBag } from "lucide-react";
import { toast } from "sonner";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "./ui/alert-dialog";

export default function WishlistSheet() {
  const { items, removeItem, clearWishlist } = useWishlistStore();
  const addItemToCart = useCartStore((state) => state.addItem);

  // Favoriden Sepete Taşıma Fonksiyonu
  const handleMoveToCart = (product: any) => {
    addItemToCart(product);
    toast("Moved to Cart 🛒",{
      description: `${product.name} is now in your cart.`,
      style: {
          background: "var(--primary)",
          color: "var(--primary-foreground)",
        },
    });
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <div className="relative cursor-pointer group">
          <Button variant="ghost" size="icon" aria-label="Favorites">
              <Heart className="h-5 w-5" />
            </Button>
          {items.length > 0 && (
            <span className="absolute top-0 right-0 bg-primary text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
              {items.length}
            </span>
          )}
        </div>
      </SheetTrigger>

      <SheetContent className="w-full sm:w-100 flex flex-col bg-secondary overflow-y-auto px-6">
        <SheetHeader className="flex flex-row justify-between items-center border-b border-custom-black/5 pb-4 mb-4">
          <SheetTitle className="font-serif text-2xl text-primary">Your Wishlist</SheetTitle>
          {items.length > 0 && (
                        <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="ghost" size="icon-sm">
                  <Trash2 size={16} />
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent className="bg-white border-none rounded-xl">
                <AlertDialogHeader>
                  <AlertDialogTitle>Clear Wishlist ?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This will remove{" "}
                    <span className="font-bold text-red-500">all items</span>{" "}
                    from your wishlist. This action cannot be undone.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel className="border-none bg-gray-100">
                    Cancel
                  </AlertDialogCancel>
                  <AlertDialogAction
                    onClick={clearWishlist} // Tüm favorileri temizle
                    className="bg-red-500 hover:bg-red-600 text-white"
                  >
                    Yes, Clear All
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          )}
        </SheetHeader>

        <div className="flex-1 space-y-6">
          {items.length === 0 ? (
            <div className="text-center text-custom-black/50 mt-10">
              <Heart size={48} className="mx-auto mb-4 opacity-20" />
              <p>Your wishlist is empty.</p>
            </div>
          ) : (
            items.map((item) => (
              <div key={item.id} className="flex gap-4 items-center bg-white p-3 rounded-xl shadow-sm">
                {/* Resim */}
                <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-secondary shrink-0">
                  <Image src={item.image} alt={item.name} fill className="object-cover" />
                </div>

                {/* Bilgiler */}
                <div className="flex-1 flex flex-col items-center">
                  <h4 className="font-serif text-custom-black text-sm line-clamp-1">{item.name}</h4>
                  <p className="text-primary font-bold text-sm">${item.price}</p>
                  
                  {/* Sepete Ekle Butonu */}
                  <Button
                    onClick={() => handleMoveToCart(item)}
                    variant="link"
                    size="xs"
                    >
                    <ShoppingBag size={12} /> Move to Cart
                  </Button>
                  
                </div>

                {/* Sil Butonu */}
                <Button variant="ghost" size="icon-sm" onClick={() => removeItem(item.id)}>
                  <Trash2 size={16} />
                </Button>

              </div>
            ))
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}