"use client";

import { useFormStatus } from "react-dom";
import { LogOut, Loader2 } from "lucide-react";

export default function HeaderLogoutBtn() {
  // Formun arka planda işlem yapıp yapmadığını dinler
  const { pending } = useFormStatus();

  return (
    <button 
      type="submit" 
      disabled={pending}
      className="flex items-center gap-1.5 hover:text-red-200 transition-colors font-medium cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {pending ? (
        <Loader2 size={12} className="animate-spin" />
      ) : (
        <LogOut size={12} />
      )}
      <span>{pending ? "Çıkılıyor..." : "Çıkış Yap"}</span>
    </button>
  );
}