import { Button } from "@/components/ui/button";
import { CheckCircle2 } from "lucide-react";
import Link from "next/link";

// 1. Componenti 'async' yapıyoruz ve searchParams'ın tipini Promise olarak belirtiyoruz
export default async function SuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ orderId: string }>;
}) {
  // 2. searchParams'ı await ile çözümlüyoruz
  const resolvedParams = await searchParams;
  const orderId = resolvedParams.orderId;

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white p-8 rounded-3xl shadow-xl border border-primary/10 text-center space-y-6">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 size={40} className="text-green-600" />
        </div>
        
        <h1 className="text-3xl font-serif font-bold text-gray-900">Thank You!</h1>
        <p className="text-gray-500">
          Your order has been successfully placed. We will send you an email with your order details and tracking information.
        </p>
        
        <div className="bg-secondary/30 p-4 rounded-xl text-sm text-gray-700 font-mono">
          {/* 3. Çözümlediğimiz orderId'yi kullanıyoruz */}
          Order ID: <span className="font-bold">{orderId}</span>
        </div>

        <div className="pt-4 flex flex-col gap-3">
           <Button asChild className="w-full h-12">
             <Link href="/account">View Order Status</Link>
           </Button>
           <Button asChild variant="outline" className="w-full h-12">
             <Link href="/shop">Continue Shopping</Link>
           </Button>
        </div>
      </div>
    </div>
  );
}