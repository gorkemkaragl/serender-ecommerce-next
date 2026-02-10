export interface Product {
  id: string;
  name: string;
  price: number;
  weight: string;     // Örn: "1000g"
  image: string;      // Resim URL'si
  category?: string;  // İsteğe bağlı (şimdilik)
  isNew?: boolean;    // "Yeni Ürün" etiketi için
}