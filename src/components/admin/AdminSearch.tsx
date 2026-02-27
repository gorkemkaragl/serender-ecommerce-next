"use client";

import { Search } from "lucide-react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useTransition, useState, useEffect } from "react";

export default function AdminSearch() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();
  const [searchTerm, setSearchTerm] = useState(searchParams.get("q") || "");

  // Kullanıcı yazmayı bıraktıktan 300ms sonra veritabanına istek atar (Debounce)
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      const params = new URLSearchParams(searchParams);
      if (searchTerm) {
        params.set("q", searchTerm);
      } else {
        params.delete("q");
      }
      
      startTransition(() => {
        router.replace(`${pathname}?${params.toString()}`);
      });
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm, pathname, router, searchParams]);

  return (
    <div className="relative w-full max-w-md">
      <Search 
        className={`absolute left-3 top-1/2 -translate-y-1/2 transition-colors ${isPending ? 'text-primary animate-pulse' : 'text-slate-400'}`} 
        size={18} 
      />
      <input 
        type="text" 
        placeholder="Bir şeyler ara..." 
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm transition-all"
      />
    </div>
  );
}