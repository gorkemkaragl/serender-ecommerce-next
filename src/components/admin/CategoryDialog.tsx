"use client";

import { useState } from "react";
import { Plus, X, Loader2 } from "lucide-react";
import { createCategory } from "@/app/actions/admin";
import { toast } from "sonner"; // Assuming sonner is used in the project

export function CategoryDialog() {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const id = formData.get("id") as string;
    const name = formData.get("name") as string;
    const icon = formData.get("icon") as string;

    const result = await createCategory({ id, name, icon });

    if (result.success) {
      toast.success("Kategori başarıyla eklendi!");
      setIsOpen(false);
    } else {
      toast.error(result.error);
    }

    setLoading(false);
  }

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)}
        className="bg-amber-500 hover:bg-amber-600 text-white px-4 py-2 rounded-xl flex items-center gap-2 font-medium transition-colors"
      >
        <Plus size={18} />
        Kategori Ekle
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between p-4 border-b border-slate-100">
              <h2 className="text-lg font-bold text-slate-900">Yeni Kategori Ekle</h2>
              <button 
                onClick={() => setIsOpen(false)}
                className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
              >
                <X size={20} />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-4 space-y-4">
              <div className="space-y-1.5">
                <label htmlFor="id" className="text-sm font-medium text-slate-700">Kategori ID</label>
                <input 
                  type="text" 
                  id="id" 
                  name="id" 
                  required
                  placeholder="örn: c-1, c-kuruyemis"
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 text-sm"
                />
              </div>

              <div className="space-y-1.5">
                <label htmlFor="name" className="text-sm font-medium text-slate-700">Kategori Adı</label>
                <input 
                  type="text" 
                  id="name" 
                  name="name" 
                  required
                  placeholder="Kuruyemiş"
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 text-sm"
                />
              </div>

              <div className="space-y-1.5">
                <label htmlFor="icon" className="text-sm font-medium text-slate-700">İkon (Emoji)</label>
                <input 
                  type="text" 
                  id="icon" 
                  name="icon" 
                  required
                  placeholder="🥜"
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 text-sm"
                />
              </div>

              <div className="pt-4 flex gap-3">
                <button 
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="flex-1 px-4 py-2 border border-slate-200 text-slate-600 rounded-xl font-medium hover:bg-slate-50 transition-colors"
                >
                  İptal
                </button>
                <button 
                  type="submit"
                  disabled={loading}
                  className="flex-1 px-4 py-2 bg-amber-500 text-white rounded-xl font-medium hover:bg-amber-600 transition-colors disabled:opacity-50 flex items-center justify-center"
                >
                  {loading ? <Loader2 className="animate-spin" size={20} /> : "Kaydet"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
