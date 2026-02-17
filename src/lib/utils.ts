import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { 
  Carrot, Apple, Milk, Croissant, Coffee, Beef, Wheat, LucideIcon 
} from "lucide-react";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

//  İkon Eşleştirici
export const getIconByName = (name: string): LucideIcon => {
  const icons: Record<string, LucideIcon> = {
    Carrot, Apple, Milk, Croissant, Coffee, Beef, Wheat
  };
  // Eğer veritabanındaki isimle eşleşen ikon yoksa varsayılan olarak Carrot dönsün
  return icons[name] || Carrot;
};