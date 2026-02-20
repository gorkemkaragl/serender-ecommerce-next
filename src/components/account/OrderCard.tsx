"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Package, ChevronDown } from "lucide-react";

export default function OrderCard({ order }: { order: any }) {
  // Dropdown'ın açık mı kapalı mı olduğunu tutan state
  const [isOpen, setIsOpen] = useState(false);

  // Durum renkleri fonksiyonunu buraya aldık
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'processing': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'shipped': return 'bg-indigo-100 text-indigo-800 border-indigo-200';
      case 'delivered': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="border border-gray-100 rounded-xl overflow-hidden bg-white shadow-sm transition-all hover:shadow-md">
      
      {/* --- BAŞLIK KISMI (TIKLANABİLİR ALAN) --- */}
      <div 
        onClick={() => setIsOpen(!isOpen)}
        className="bg-gray-50 px-6 py-4 flex flex-wrap justify-between items-center gap-4 border-b border-gray-100 cursor-pointer select-none"
      >
        <div className="flex gap-8">
          <div>
            <p className="text-xs text-gray-500 font-medium uppercase mb-1">Date Placed</p>
            <p className="font-bold text-sm text-gray-900">
              {new Date(order.createdAt!).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </div>
          <div>
            <p className="text-xs text-gray-500 font-medium uppercase mb-1">Total</p>
            <p className="font-bold text-sm text-gray-900">${Number(order.totalAmount).toFixed(2)}</p>
          </div>
          <div className="hidden sm:block">
            <p className="text-xs text-gray-500 font-medium uppercase mb-1">Order Number</p>
            <p className="font-medium text-sm text-gray-600 truncate w-32">{order.id}</p>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <div className={`px-3 py-1 rounded-full border text-xs font-bold uppercase tracking-wider ${getStatusColor(order.status)}`}>
            {order.status}
          </div>
          {/* AÇIK/KAPALI DURUMUNA GÖRE DÖNEN İKON */}
          <div className={`p-1 rounded-full bg-white shadow-sm border border-gray-100 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
             <ChevronDown size={18} className="text-gray-500" />
          </div>
        </div>
      </div>

      {/* --- İÇERİK KISMI (SADECE ISOPEN TRUE İSE GÖRÜNÜR) --- */}
      {isOpen && (
        <div className="p-6 animate-in fade-in slide-in-from-top-4 duration-300">
          <div className="space-y-4">
            {order.items.map((item: any) => (
              <div key={item.id} className="flex items-center gap-4">
                <div className="relative w-16 h-16 bg-secondary rounded-lg overflow-hidden border border-gray-100">
                  {item.product?.image ? (
                    <Image src={item.product.image} alt={item.product.name} fill className="object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400"><Package size={24} /></div>
                  )}
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-sm text-gray-900">{item.product?.name || "Unknown Product"}</h4>
                  <p className="text-xs text-gray-500 mt-1">Qty: {item.quantity} • ${item.price}</p>
                </div>
                <Button variant="outline" size="sm" className="hidden sm:flex" asChild>
                  <Link href={`/product/${item.product?.slug}`}>Buy Again</Link>
                </Button>
              </div>
            ))}
          </div>
          
          <div className="mt-6 pt-4 border-t border-gray-100 flex justify-between items-center">
            <p className="text-sm text-gray-500">
               Shipped to: <span className="font-medium text-gray-900">{order.address}</span>
            </p>
            <Button variant="link" className="text-primary h-auto p-0">View Invoice</Button>
          </div>
        </div>
      )}
      
    </div>
  );
}