"use client";

import Image from "next/image";
import { useCartStore } from "@/store/cart-store";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { ShoppingBag, Trash2, Plus, Minus } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

export default function CartSheet() {
  const {
    items,
    removeItem,
    increaseQuantity,
    decreaseQuantity,
    totalPrice,
    clearCart,
  } = useCartStore();

  return (
    <Sheet>
      <SheetTrigger asChild>
        <div className="relative cursor-pointer group">
          <Button variant="ghost" size="icon" aria-label="Cart">
            <ShoppingBag size={24} />
          </Button>
          {items.length > 0 && (
            <span className="absolute top-0 right-0 bg-primary text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
              {items.length}
            </span>
          )}
        </div>
      </SheetTrigger>

      <SheetContent className="w-full sm:w-100 flex flex-col bg-secondary overflow-y-auto px-6">
        <SheetHeader className="flex flex-row justify-between items-center border-b border-primary/10 ">
          <SheetTitle className="font-serif text-2xl text-primary">
            Sepetin
          </SheetTitle>

          {/* Eğer sepette ürün varsa "Clear Cart" butonu göster */}
          {items.length > 0 && (
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="ghost" size="icon-sm">
                  <Trash2 size={16} />
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent className="bg-white border-none rounded-xl">
                <AlertDialogHeader>
                  <AlertDialogTitle>Sepeti Temizlemek istiyor musun?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This will remove{" "}
                    <span className="font-bold text-red-500">all items</span>{" "}
                    from your cart. This action cannot be undone.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel className="border-none bg-gray-100">
                    İptal
                  </AlertDialogCancel>
                  <AlertDialogAction
                    onClick={clearCart} // Tüm sepeti temizle
                    className="bg-red-500 hover:bg-red-600 text-white"
                  >
                    Evet, Hepsini Sil
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          )}
        </SheetHeader>

        <div className="flex-1 py-6 space-y-6">
          {items.length === 0 ? (
            <div className="text-center text-custom-black/50 mt-10">
              <ShoppingBag size={48} className="mx-auto mb-4 opacity-20" />
              <p>Sepetiniz boş.</p>
            </div>
          ) : (
            items.map((item) => (
              <div key={item.id} className="flex gap-4 items-center">
                {/* Resim */}
                <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-white shrink-0">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover"
                  />
                </div>

                {/* Bilgiler */}
                <div className="flex-1">
                  <h4 className="font-serif text-custom-black text-sm line-clamp-1">
                    {item.name}
                  </h4>
                  <div className="flex items-center gap-2 mt-1">
                    <p className="text-primary font-bold text-sm">
                      ${item.price}
                    </p>
                    <span className="text-xs text-custom-black/40">
                      x {item.quantity}
                    </span>
                  </div>
                </div>

                {/* KONTROLLER ALANI */}
                <div className="flex items-center gap-2 bg-white rounded-md p-1 shadow-sm mr-2">
                  {/* --- MANTIKSAL EKSİ BUTONU --- */}
                  {item.quantity > 1 ? (
                    // DURUM 1: Miktar 1'den büyükse normal azaltma yap
                    <Button
                      variant="ghost"
                      size="icon-xs"
                      onClick={() => decreaseQuantity(item.id)}
                    >
                      <Minus />
                    </Button>
                  ) : (
                    // Miktar 1 ise, silme uyarısı göster
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="destructive" size="icon-xs">
                          <Minus />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent className="bg-white border-none rounded-xl">
                        <AlertDialogHeader>
                          <AlertDialogTitle>Ürünü Silmek istiyor musun?</AlertDialogTitle>
                          <AlertDialogDescription>
                            Are you sure you want to remove{" "}
                            <span className="font-bold text-primary">
                              {item.name}
                            </span>{" "}
                            from the cart?
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel className="border-none bg-gray-100">
                            İptal
                          </AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => removeItem(item.id)}
                            className="bg-red-500 hover:bg-red-600 text-white"
                          >
                            Sil
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  )}

                  {/* Miktar Göstergesi */}
                  <span className="text-xs font-bold w-4 text-center">
                    {item.quantity}
                  </span>

                  {/* Artı Butonu (Her zaman normal çalışır) */}
                  <Button
                    variant="ghost"
                    size="icon-xs"
                    onClick={() => increaseQuantity(item.id)}
                  >
                    <Plus />
                  </Button>
                </div>
              </div>
            ))
          )}
        </div>

        {items.length > 0 && (
          <div className="border-t border-primary/20 pt-6 space-y-4 mb-6">
            <div className="flex justify-between items-center text-lg font-bold text-custom-black">
              <span>Total:</span>
              <span>${totalPrice().toFixed(2)}</span>
            </div>
            <Button className="w-full h-12 rounded-xl bg-primary hover:bg-primary/90 text-white font-bold tracking-wide">
              Checkout
            </Button>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
