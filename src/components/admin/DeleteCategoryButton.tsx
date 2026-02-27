"use client";

import { useState } from "react";
import { Trash2, Loader2, AlertTriangle } from "lucide-react";
import { deleteCategory } from "@/app/actions/admin";
import { toast } from "sonner";

export function DeleteCategoryButton({ id, name }: { id: string, name: string }) {
  const [isDeleting, setIsDeleting] = useState(false);

  async function handleDelete() {
    if (!confirm(`'${name}' kategorisini silmek istediğinize emin misiniz? Bu işlem geri alınamaz.`)) return;
    
    setIsDeleting(true);
    const result = await deleteCategory(id);
    
    if (result.success) {
      toast.success("Kategori silindi.");
    } else {
      toast.error(result.error);
    }
    
    setIsDeleting(false);
  }

  return (
    <button 
      onClick={handleDelete}
      disabled={isDeleting}
      className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors flex items-center gap-2 text-sm font-medium disabled:opacity-50"
    >
      {isDeleting ? <Loader2 size={16} className="animate-spin" /> : <Trash2 size={16} />}
      Sil
    </button>
  );
}
