import Image from "next/image";
import { notFound } from "next/navigation";
import { PRODUCTS } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Heart, Minus, Plus, ShoppingBag } from "lucide-react";

//  Fonksiyonu 'async' yapıyoruz
//  params tipini Promise olarak güncelliyoruz
export default async function ProductDetailPage({ 
  params 
}: { 
  params: Promise<{ slug: string }> 
}) {
  
  //  Parametreleri await ediyoruz 
  const resolvedParams = await params;
  const slug = resolvedParams.slug;

  //  Slug ile ürünü buluyoruz
  const product = PRODUCTS.find((p) => p.slug === slug);

  // Eğer ürün yoksa 404 sayfasına gönder
  if (!product) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-secondary pb-20 pt-10">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12">
        
        {/* SOL TARAF: GÖRSEL */}
        <div className="relative aspect-square rounded-3xl overflow-hidden bg-white shadow-sm">
           {product.isNew && (
            <span className="absolute top-4 left-4 z-10 bg-primary text-white px-3 py-1 rounded text-sm font-bold">
              NEW
            </span>
          )}
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* SAĞ TARAF: DETAYLAR */}
        <div className="flex flex-col justify-center space-y-6">
          
          <div className="text-sm text-custom-black/50">
            Home / Shop / <span className="text-custom-black">{product.name}</span>
          </div>

          <div>
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-primary mb-2">
              {product.name}
            </h1>
            <p className="text-2xl font-sans font-medium text-custom-black">
              ${product.price}
            </p>
          </div>

          <p className="text-custom-black/70 leading-relaxed">
            {product.description || "Fresh and organic food directly from nature to your kitchen. No preservatives, fully natural."}
          </p>

          <div className="flex items-center gap-4 pt-4">
            <div className="flex items-center border border-primary/20 rounded-lg bg-white px-3 py-2 space-x-4">
              <button className="text-primary hover:bg-primary/10 p-1 rounded"><Minus size={16}/></button>
              <span className="font-bold w-4 text-center">1</span>
              <button className="text-primary hover:bg-primary/10 p-1 rounded"><Plus size={16}/></button>
            </div>

            <Button className="flex-1 h-12 text-lg rounded-xl bg-primary hover:bg-primary/90 text-white gap-2">
              Add to Cart <ShoppingBag size={20} />
            </Button>
            
            <Button variant="outline" className="h-12 w-12 rounded-xl border-primary/20 text-primary">
              <Heart size={20} />
            </Button>
          </div>

          <div className="pt-8">
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1" className="border-primary/20">
                <AccordionTrigger className="font-serif text-lg text-custom-black hover:text-primary hover:no-underline">
                  Box Contents
                </AccordionTrigger>
                <AccordionContent className="text-custom-black/70">
                  {product.ingredients?.join(", ") || "Standard ingredients included."}
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-2" className="border-primary/20">
                <AccordionTrigger className="font-serif text-lg text-custom-black hover:text-primary hover:no-underline">
                   Delivery Information
                </AccordionTrigger>
                <AccordionContent className="text-custom-black/70">
                  We deliver within 24 hours for local orders.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>

        </div>
      </div>
    </div>
  );
}