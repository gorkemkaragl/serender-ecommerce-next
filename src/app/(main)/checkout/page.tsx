"use client";

import { useState } from "react";
import { useCartStore } from "@/store/cart-store";
import { useRouter } from "next/navigation";
import { createOrder } from "@/app/actions/checkout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, CreditCard, MapPin, ShieldCheck } from "lucide-react";
import { toast } from "sonner";
import Image from "next/image";
import Link from "next/link";

export default function CheckoutPage() {
  const router = useRouter();
  const { items, totalPrice, clearCart } = useCartStore();
  const [isPending, setIsPending] = useState(false);

  // Kargo mantığı (Header'daki kural: $50 üzerine bedava)
  const shippingCost = totalPrice() > 50 ? 0 : 5.99;
  const finalTotal = totalPrice() + shippingCost;

  // Form gönderildiğinde çalışacak fonksiyon
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsPending(true);

    const formData = new FormData(e.currentTarget);
    
    // Server Action'ı çağır
    const result = await createOrder(items, formData, finalTotal);

    if (result.success) {
      clearCart(); // Sipariş başarılıysa sepeti boşalt!
      toast.success("Siparişiniz başarıyla alındı!");
      router.push(`/checkout/success?orderId=${result.orderId}`); // Teşekkürler sayfasına at
    } else {
      toast.error(result.error);
      setIsPending(false);
    }
  };

  // Sepet boşsa sayfayı gösterme, mağazaya yolla
  if (items.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center space-y-4">
        <h2 className="text-2xl font-serif font-bold text-primary">Your cart is empty</h2>
        <Button asChild><Link href="/shop">Return to Shop</Link></Button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-serif font-bold text-primary mb-8">Checkout</h1>

      <div className="grid lg:grid-cols-12 gap-12">
        
        {/* --- SOL KOLON: FORMLAR --- */}
        <div className="lg:col-span-7 space-y-8">
          <form id="checkout-form" onSubmit={handleSubmit} className="space-y-8">
            
            {/* 1. Teslimat Adresi */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-primary/10 space-y-4">
              <div className="flex items-center gap-2 mb-4 text-primary font-bold">
                <MapPin size={20} />
                <h2 className="text-xl font-serif">Shipping Address</h2>
              </div>
              
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="address">Full Address</Label>
                  <Input id="address" name="address" placeholder="123 Organic Street, Apt 4B" required />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="city">City</Label>
                    <Input id="city" name="city" placeholder="New York" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="zip">ZIP / Postal Code</Label>
                    <Input id="zip" name="zip" placeholder="10001" required />
                  </div>
                </div>
              </div>
            </div>

            {/* 2. Ödeme Bilgileri (Görsel) */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-primary/10 space-y-4">
               <div className="flex items-center gap-2 mb-4 text-primary font-bold">
                <CreditCard size={20} />
                <h2 className="text-xl font-serif">Payment Method</h2>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="cardName">Name on Card</Label>
                  <Input id="cardName" placeholder="John Doe" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cardNumber">Card Number</Label>
                  <Input id="cardNumber" placeholder="0000 0000 0000 0000" maxLength={19} required />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="expiry">Expiry Date</Label>
                    <Input id="expiry" placeholder="MM/YY" maxLength={5} required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cvv">CVV</Label>
                    <Input id="cvv" placeholder="123" maxLength={3} type="password" required />
                  </div>
                </div>
              </div>
            </div>

          </form>
        </div>

        {/* --- SAĞ KOLON: SİPARİŞ ÖZETİ --- */}
        <div className="lg:col-span-5">
          <div className="bg-secondary/20 p-6 rounded-2xl border border-primary/10 sticky top-24">
            <h2 className="text-xl font-serif font-bold text-primary mb-6">Order Summary</h2>
            
            <div className="space-y-4 mb-6 max-h-[40vh] overflow-y-auto pr-2">
              {items.map((item) => (
                <div key={item.id} className="flex gap-4 items-center bg-white p-3 rounded-xl shadow-sm">
                  <div className="relative w-16 h-16 rounded-md overflow-hidden bg-secondary shrink-0">
                    <Image src={item.image} alt={item.name} fill className="object-cover" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-serif text-sm font-bold text-custom-black line-clamp-1">{item.name}</h4>
                    <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                  </div>
                  <p className="font-bold text-primary">${(Number(item.price) * item.quantity).toFixed(2)}</p>
                </div>
              ))}
            </div>

            <div className="space-y-3 border-t border-primary/10 pt-4 mb-6">
              <div className="flex justify-between text-sm text-gray-600">
                <span>Subtotal</span>
                <span>${totalPrice().toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm text-gray-600">
                <span>Shipping</span>
                <span>{shippingCost === 0 ? <span className="text-green-600 font-bold">Free</span> : `$${shippingCost.toFixed(2)}`}</span>
              </div>
              <div className="flex justify-between items-center border-t border-primary/10 pt-3 text-lg font-bold text-primary">
                <span>Total</span>
                <span>${finalTotal.toFixed(2)}</span>
              </div>
            </div>

            {/* Buton formu dışarıda tetikliyor (form="checkout-form") */}
            <Button 
              type="submit" 
              form="checkout-form" 
              disabled={isPending} 
              className="w-full h-14 text-lg shadow-xl shadow-primary/20"
            >
              {isPending ? <><Loader2 className="mr-2 h-5 w-5 animate-spin" /> Processing...</> : "Place Order"}
            </Button>
            
            <div className="flex items-center justify-center gap-2 mt-4 text-xs text-gray-500">
               <ShieldCheck size={14} className="text-green-600"/>
               <span>Secure encrypted checkout</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}