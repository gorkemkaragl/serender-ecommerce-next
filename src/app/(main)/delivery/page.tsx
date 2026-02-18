import { Truck, Package, Clock, ShieldCheck, MapPin, AlertCircle } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Separator } from "@/components/ui/separator";

export default function DeliveryPage() {
  return (
    <div className="min-h-screen bg-secondary pb-20 pt-12 px-6">
      
      {/* BAŞLIK */}
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-serif font-bold text-primary mb-4">
          Shipping & Delivery
        </h1>
        <p className="text-custom-black/60 max-w-2xl mx-auto">
          We ensure your organic goods arrive fresh, safe, and on time. 
          Learn about our shipping methods and policies.
        </p>
      </div>

      <div className="max-w-4xl mx-auto space-y-16">

        {/* 1. ÖNE ÇIKAN ÖZELLİKLER (KARTLAR) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-2xl shadow-sm text-center">
            <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-primary">
              <Clock size={24} />
            </div>
            <h3 className="font-bold mb-2">Next Day Delivery</h3>
            <p className="text-sm text-custom-black/60">Order before 2 PM for next-day delivery in Berlin.</p>
          </div>
          
          <div className="bg-white p-6 rounded-2xl shadow-sm text-center">
            <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-primary">
              <Package size={24} />
            </div>
            <h3 className="font-bold mb-2">Eco Packaging</h3>
            <p className="text-sm text-custom-black/60">100% plastic-free and biodegradable materials.</p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm text-center">
            <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-primary">
              <ShieldCheck size={24} />
            </div>
            <h3 className="font-bold mb-2">Freshness Guarantee</h3>
            <p className="text-sm text-custom-black/60">If it's not fresh, we'll refund or replace it instantly.</p>
          </div>
        </div>

        {/* 2. KARGO ÜCRETLERİ */}
        <div className="bg-white rounded-3xl p-8 md:p-10 shadow-sm border border-primary/5">
          <h2 className="text-2xl font-serif font-bold text-primary mb-6 flex items-center gap-2">
            <Truck size={24}/> Shipping Rates
          </h2>
          
          <div className="space-y-6">
            {/* Yerel Teslimat */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center p-4 bg-secondary/30 rounded-xl border border-primary/10">
              <div className="flex gap-4">
                <MapPin className="text-primary mt-1" size={20} />
                <div>
                  <h4 className="font-bold text-lg">Local Delivery (Berlin)</h4>
                  <p className="text-sm text-custom-black/60">Electric bike courier. Same day or Next day.</p>
                </div>
              </div>
              <div className="mt-4 md:mt-0 text-right">
                <p className="font-bold text-lg text-primary">€4.90</p>
                <p className="text-xs text-custom-black/50">Free over €50</p>
              </div>
            </div>

            {/* Ulusal Teslimat */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center p-4 bg-white border border-gray-100 rounded-xl">
              <div className="flex gap-4">
                <Truck className="text-gray-400 mt-1" size={20} />
                <div>
                  <h4 className="font-bold text-lg text-gray-700">Standard Shipping (Germany)</h4>
                  <p className="text-sm text-custom-black/60">DHL GoGreen. 2-3 Business Days.</p>
                </div>
              </div>
              <div className="mt-4 md:mt-0 text-right">
                <p className="font-bold text-lg text-gray-700">€6.90</p>
                <p className="text-xs text-custom-black/50">Free over €80</p>
              </div>
            </div>
          </div>
        </div>

        {/* 3. İADE POLİTİKASI (Önemli Uyarı) */}
        <div className="bg-orange-50 border border-orange-100 p-6 rounded-2xl flex gap-4 items-start">
          <AlertCircle className="text-orange-500 shrink-0 mt-1" size={24} />
          <div>
            <h3 className="font-bold text-orange-800 mb-2">Return Policy for Perishable Goods</h3>
            <p className="text-orange-800/80 text-sm leading-relaxed">
              Due to the nature of fresh produce, we cannot accept returns for fruits, vegetables, or dairy products unless they arrived damaged or spoiled. 
              <br /><br />
              <strong>Something wrong?</strong> Please take a photo and email us at <span className="underline cursor-pointer">support@gxfood.com</span> within 24 hours of delivery. We will issue a refund immediately.
            </p>
          </div>
        </div>

        {/* 4. SIKÇA SORULAN SORULAR (Accordion) */}
        <div>
          <h2 className="text-2xl font-serif font-bold text-primary mb-6 text-center">Frequently Asked Questions</h2>
          <div className="bg-white p-6 rounded-2xl shadow-sm">
            <Accordion type="single" collapsible className="w-full">
              
              <AccordionItem value="item-1">
                <AccordionTrigger className="text-left font-bold text-custom-black">Do you ship internationally?</AccordionTrigger>
                <AccordionContent className="text-custom-black/70">
                  Currently, we only ship within Germany to ensure the freshness of our products.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-2">
                <AccordionTrigger className="text-left font-bold text-custom-black">How is the food packaged?</AccordionTrigger>
                <AccordionContent className="text-custom-black/70">
                  We use 100% plastic-free packaging. Our boxes are made from recycled cardboard, and we use wool insulation for chilled items.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-3">
                <AccordionTrigger className="text-left font-bold text-custom-black">What if I'm not home?</AccordionTrigger>
                <AccordionContent className="text-custom-black/70">
                  You can leave a note during checkout to leave the package with a neighbor or in a safe spot.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-4">
                <AccordionTrigger className="text-left font-bold text-custom-black">Is there a minimum order value?</AccordionTrigger>
                <AccordionContent className="text-custom-black/70">
                  Yes, the minimum order value is €15.00 to cover our sustainable packaging costs.
                </AccordionContent>
              </AccordionItem>

            </Accordion>
          </div>
        </div>

      </div>
    </div>
  );
}