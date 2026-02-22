import Image from "next/image";
import { notFound } from "next/navigation";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import ProductActions from "@/components/products/ProductActions";
import RelatedProducts from "@/components/products/RelatedProducts";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Link from "next/link";
import { getAllProducts } from "@/services/product";
import ProductGallery from "@/components/products/ProductGallery";

//  Fonksiyonu 'async' yapıyoruz
//  params tipini Promise olarak güncelliyoruz
export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const dbProducts = await getAllProducts();

  //  Parametreleri await ediyoruz
  const resolvedParams = await params;
  const slug = resolvedParams.slug;

  //  Slug ile ürünü buluyoruz
  const product = dbProducts.find((p) => p.slug === slug);

  // Eğer ürün yoksa 404 sayfasına gönder
  if (!product) {
    notFound();
  }

  return (
    <div className="w-full px-6 py-8 md:py-12 max-w-7xl mx-auto">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* SOL TARAF: GÖRSEL */}
        <div className="md:col-span-1">
          <ProductGallery 
            image={product.image} 
            gallery={product.gallery} 
            name={product.name} 
          />
        </div>

        {/* SAĞ TARAF: DETAYLAR */}
        <div className="flex flex-col justify-center space-y-6">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href="/">Home</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href="/shop">Shop</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>{product.name}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          <div>
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-primary mb-2">
              {product.name}
            </h1>
            <p className="text-2xl font-sans font-medium text-custom-black">
              {product.price} TL
            </p>
          </div>

          <p className="text-custom-black/70 leading-relaxed">
            {product.description ||
              "Fresh and organic food directly from nature to your kitchen. No preservatives, fully natural."}
          </p>

          {/* Ürün Aksiyonları: Miktar Seçici, Sepete Ekle, Favori Butonu */}
          <div className="flex items-center gap-4 pt-4">
            <ProductActions product={product}></ProductActions>
          </div>

          <div className="pt-8">
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1" className="border-primary/20">
                <AccordionTrigger className="font-serif text-lg text-custom-black hover:text-primary hover:no-underline">
                  Kutu İçeriği
                </AccordionTrigger>
                <AccordionContent className="text-custom-black/70">
                  {product.ingredients || "Standart içerikler dahildir."}
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-2" className="border-primary/20">
                <AccordionTrigger className="font-serif text-lg text-custom-black hover:text-primary hover:no-underline">
                  Teslimat Bilgileri
                </AccordionTrigger>
                <AccordionContent className="text-custom-black/70">
                  Yerel siparişler için 24 saat içinde teslimat yapılır.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </div>
      <RelatedProducts currentProduct={product} dbProducts={dbProducts}></RelatedProducts>
    </div>
  );
}
