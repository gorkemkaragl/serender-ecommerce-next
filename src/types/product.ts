export interface Product {
  id: string;
  categoryId: string;
  slug: string;
  name: string;
  price: number;
  weight: string;     
  image: string;      
  isNew?: boolean;    
  description?: string; 
  ingredients?: string[]; 
}

// Kategori Tipi
export interface Category {
  id: string;
  name: string;
  slug: string; // URL'de kullanmak için (örn: 'sut-urunleri')
}