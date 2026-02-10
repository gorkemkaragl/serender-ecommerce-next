export interface Product {
  id: string;
  slug: string;
  name: string;
  price: number;
  weight: string;     // Örn: "1000g"
  image: string;      // Resim URL'si
  category: string;  
  isNew?: boolean;    // "Yeni Ürün" etiketi için
  description?: string; // Yeni (Detay sayfası için)
  ingredients?: string[]; 
}