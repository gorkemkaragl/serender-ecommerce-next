"use client";

import { useState } from "react";
import { Trash2, Loader2 } from "lucide-react";
import { deleteProduct } from "@/app/actions/admin";
import { toast } from "sonner";

export function DeleteProductButton({ id, name }: { id: string, name: string }) {
  const [isDeleting, setIsDeleting] = useState(false);

  async function handleDelete() {
    if (!confirm(`'${name}' ürününü katalogdan silmek istediğinize emin misiniz? Bu işlem geri alınamaz.`)) return;
    
    setIsDeleting(true);
    const result = await deleteProduct(id);
    
    if (result.success) {
      toast.success("Ürün silindi.");
    } else {
      toast.error(result.error);
    }
    
    setIsDeleting(false);
  }

  return (
    <button 
      onClick={handleDelete}
      disabled={isDeleting}
      className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50"
      title="Ürünü Sil"
    >
      {isDeleting ? <Loader2 size={16} className="animate-spin" /> : <Trash2 size={16} />}
    </button>
  );
}
