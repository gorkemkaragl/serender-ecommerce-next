"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  Package, 
  ShoppingCart, 
  Users, 
  Tags,
  LogOut
} from "lucide-react";

const navItems = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/orders", label: "Siparişler", icon: ShoppingCart },
  { href: "/admin/products", label: "Ürünler", icon: Package },
  { href: "/admin/categories", label: "Kategoriler", icon: Tags },
  { href: "/admin/users", label: "Kullanıcılar", icon: Users },
];

export function Sidebar() {
  const pathname = usePathname();

  // Exact match for dashboard, prefix match for others
  const isRouteActive = (href: string) => {
    if (href === "/admin") return pathname === href;
    return pathname?.startsWith(href);
  };

  return (
    <aside className="w-64 bg-slate-900 text-white hidden md:flex flex-col h-full min-h-screen top-0 sticky">
      <div className="p-6 font-serif font-bold text-xl tracking-wider text-primary border-b border-slate-800 flex items-center gap-2">
        <Package className="text-amber-500" />
        <span>SERENDER <span className="text-white opacity-50 text-sm">ADMIN</span></span>
      </div>
      
      <nav className="flex-1 p-4 flex flex-col gap-2">
        <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2 px-4">Menu</div>
        {navItems.map((item) => {
          const isActive = isRouteActive(item.href);
          return (
            <Link 
              key={item.href} 
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                isActive 
                  ? "bg-white/10 text-white shadow-sm" 
                  : "text-slate-400 hover:text-white hover:bg-white/5"
              }`}
            >
              <item.icon size={18} className={isActive ? "text-amber-500" : "text-slate-400"} />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-slate-800">
         <Link href="/" className="flex items-center gap-3 px-4 py-3 text-slate-400 hover:text-white hover:bg-white/5 transition-colors rounded-xl text-sm font-medium">
            <LogOut size={18} />
            Siteye Dön
         </Link>
      </div>
    </aside>
  );
}
