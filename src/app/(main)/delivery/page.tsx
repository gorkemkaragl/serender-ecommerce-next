import {
  Truck,
  Package,
  Clock,
  ShieldCheck,
  MapPin,
  AlertCircle,
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function DeliveryPage() {
  return (
    <div className="min-h-screen bg-secondary pb-20 pt-12 px-6">
      {/* BAŞLIK */}
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-serif font-bold text-primary mb-4">
          Kargo ve Teslimat
        </h1>
        <p className="text-custom-black/60 max-w-2xl mx-auto">
          Organik ürünlerinizin taze, güvenli ve zamanında ulaşmasını
          sağlıyoruz. Gönderim yöntemlerimiz ve politikalarımız hakkında bilgi
          edinin.
        </p>
      </div>

      <div className="max-w-4xl mx-auto space-y-16">
        {/* 1. ÖNE ÇIKAN ÖZELLİKLER (KARTLAR) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-2xl shadow-sm text-center">
            <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-primary">
              <Clock size={24} />
            </div>
            <h3 className="font-bold mb-2">Ertesi Gün Teslimat</h3>
            <p className="text-sm text-custom-black/60">
              Trabzon'da ertesi gün teslimat için siparişinizi saat 14:00’ten
              önce verin.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm text-center">
            <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-primary">
              <Package size={24} />
            </div>
            <h3 className="font-bold mb-2">Çevre Dostu Ambalaj</h3>
            <p className="text-sm text-custom-black/60">
              %100 plastiksiz ve biyolojik olarak parçalanabilir malzemeler.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm text-center">
            <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-primary">
              <ShieldCheck size={24} />
            </div>
            <h3 className="font-bold mb-2">Taze Ürün Garantisi</h3>
            <p className="text-sm text-custom-black/60">
              Ürün taze değilse, anında iade veya değişim yaparız.
            </p>
          </div>
        </div>

        {/* 2. KARGO ÜCRETLERİ */}
        <div className="bg-white rounded-3xl p-8 md:p-10 shadow-sm border border-primary/5">
          <h2 className="text-2xl font-serif font-bold text-primary mb-6 flex items-center gap-2">
            <Truck size={24} /> Kargo Ücretleri
          </h2>

          <div className="space-y-6">
            {/* Yerel Teslimat */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center p-4 bg-secondary/30 rounded-xl border border-primary/10">
              <div className="flex gap-4">
                <MapPin className="text-primary mt-1" size={20} />
                <div>
                  <h4 className="font-bold text-lg">
                    Yerel Teslimat (Trabzon)
                  </h4>
                  <p className="text-sm text-custom-black/60">
                    Elektrikli bisiklet kuryesi. Aynı gün veya ertesi gün
                    teslimat.
                  </p>
                </div>
              </div>
              <div className="mt-4 md:mt-0 text-right">
                <p className="font-bold text-lg text-primary">250 TL</p>
                <p className="text-xs text-custom-black/50">
                  2000 TL üzeri ücretsiz kargo
                </p>
              </div>
            </div>

            {/* Ulusal Teslimat */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center p-4 bg-white border border-gray-100 rounded-xl">
              <div className="flex gap-4">
                <Truck className="text-gray-400 mt-1" size={20} />
                <div>
                  <h4 className="font-bold text-lg text-gray-700">
                    Standard Kargo (Türkiye)
                  </h4>
                  <p className="text-sm text-custom-black/60">
                    DHL GoGreen. 2-3 İş Günü.
                  </p>
                </div>
              </div>
              <div className="mt-4 md:mt-0 text-right">
                <p className="font-bold text-lg text-gray-700">300 TL</p>
                <p className="text-xs text-custom-black/50">
                  2000 TL üzeri ücretsiz kargo
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* 3. İADE POLİTİKASI (Önemli Uyarı) */}
        <div className="bg-orange-50 border border-orange-100 p-6 rounded-2xl flex gap-4 items-start">
          <AlertCircle className="text-orange-500 shrink-0 mt-1" size={24} />
          <div>
            <h3 className="font-bold text-orange-800 mb-2">
              Bozulabilir Ürünler İçin İade Politikası
            </h3>
            <p className="text-orange-800/80 text-sm leading-relaxed">
              Taze ürünlerin doğası gereği, meyve, sebze veya süt ürünlerinde;
              yalnızca hasarlı ya da bozulmuş şekilde teslim edilmiş olmaları
              durumunda iade kabul edebiliyoruz.
              <br />
              <br />
              <strong>Bir sorun mu var?</strong> Lütfen bir fotoğraf çekin ve
              bize e-posta gönderin.{" "}
              <span className="underline cursor-pointer">
                support@serender.com
              </span>{" "}
              Teslimattan sonraki 24 saat içinde. İade tutarı derhal tarafınıza
              geri ödenecektir.
            </p>
          </div>
        </div>

        {/* 4. SIKÇA SORULAN SORULAR (Accordion) */}
        <div>
          <h2 className="text-2xl font-serif font-bold text-primary mb-6 text-center">
            Sıkça Sorulan Sorular
          </h2>
          <div className="bg-white p-6 rounded-2xl shadow-sm">
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger className="text-left font-bold text-custom-black">
                  Yurt dışına kargo yapılıyor mu?
                </AccordionTrigger>
                <AccordionContent className="text-custom-black/70">
                  Şu anda, ürünlerimizin taze kalmasını sağlamak için yalnızca
                  Almanya içinde kargo yapıyoruz.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-2">
                <AccordionTrigger className="text-left font-bold text-custom-black">
                  Ürünler nasıl paketleniyor?
                </AccordionTrigger>
                <AccordionContent className="text-custom-black/70">
                  100% plastiksiz paketleme kullanıyoruz. Kutularımız yeniden
                  kullanılabilir kartonlardan yapılmıştır ve soğuk ürünler için
                  yün izolasyonu kullanıyoruz.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-3">
                <AccordionTrigger className="text-left font-bold text-custom-black">
                  Evde değilsem ne olur?
                </AccordionTrigger>
                <AccordionContent className="text-custom-black/70">
                  Teslimat sırasında evde değilse, paketi komşuya veya güvenli
                  bir yere bırakmak için checkout sırasında bir not
                  bırakabilirsiniz.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-4">
                <AccordionTrigger className="text-left font-bold text-custom-black">
                  Minimum sipariş tutarı var mı?
                </AccordionTrigger>
                <AccordionContent className="text-custom-black/70">
                  Evet, minimum sipariş tutarı, sürdürülebilir paketleme
                  maliyetlerini karşılamak için 750 TL'dir.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </div>
    </div>
  );
}
