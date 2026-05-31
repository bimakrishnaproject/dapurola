"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  Package, 
  ShoppingBag, 
  Users, 
  Image as ImageIcon, 
  Settings, 
  BarChart, 
  LogOut,
  Archive
} from "lucide-react";
import { cn } from "@/lib/utils";

import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import { Menu } from "lucide-react";

export const NAV_ITEMS = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/admin" },
  { icon: ShoppingBag, label: "Pesanan", href: "/admin/orders" },
  { icon: Package, label: "Produk", href: "/admin/products" },
  { icon: Archive, label: "Inventaris", href: "/admin/inventory" },
  { icon: Users, label: "Pelanggan", href: "/admin/customers" },
  { icon: ImageIcon, label: "Banners Promo", href: "/admin/banners" },
  { icon: BarChart, label: "Laporan", href: "/admin/reports" },
  { icon: Settings, label: "Pengaturan", href: "/admin/settings" },
];

export function MobileAdminHeader() {
  const pathname = usePathname();
  
  return (
    <div className="lg:hidden flex items-center justify-between bg-white border-b border-brand-beige h-16 px-4 sticky top-0 z-40 shadow-sm">
      <div className="font-heading font-bold text-xl text-brand-primary flex items-center gap-2">
        Dapur Ola <span className="text-brand-secondary text-[10px] font-medium px-2 py-0.5 rounded-full bg-brand-secondary/10">ADMIN</span>
      </div>
      <Sheet>
        <SheetTrigger render={<button className="p-2 -mr-2 text-brand-primary hover:bg-brand-cream rounded-lg transition-colors" />}>
          <Menu className="w-6 h-6" />
        </SheetTrigger>
        <SheetContent side="left" className="w-[80%] p-0 flex flex-col bg-white">
          <SheetTitle className="sr-only">Admin Menu</SheetTitle>
          <div className="h-16 flex items-center px-6 border-b border-brand-beige bg-brand-cream/30">
            <span className="font-heading font-bold text-xl text-brand-primary">Dapur Ola</span>
          </div>
          <div className="flex-1 py-6 flex flex-col gap-1 overflow-y-auto px-4">
            {NAV_ITEMS.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all font-medium text-sm",
                    isActive 
                      ? "bg-brand-primary text-white shadow-md shadow-brand-primary/20" 
                      : "text-brand-primary/70 hover:bg-brand-cream hover:text-brand-primary"
                  )}
                >
                  <item.icon className={cn("w-5 h-5", isActive ? "text-white" : "text-brand-secondary/60")} />
                  {item.label}
                </Link>
              );
            })}
          </div>
          <div className="p-4 border-t border-brand-beige">
            <button className="flex w-full items-center gap-3 px-3 py-2.5 rounded-xl transition-colors font-medium text-sm text-brand-primary/70 hover:bg-red-50 hover:text-red-500">
              <LogOut className="w-5 h-5" />
              Keluar
            </button>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-white border-r border-brand-beige min-h-screen flex flex-col hidden lg:flex fixed left-0 top-0 bottom-0 z-40 shadow-[4px_0_24px_rgba(0,0,0,0.02)]">
      <div className="h-20 flex flex-col justify-center px-6 border-b border-brand-beige bg-brand-cream/30">
        <span className="font-heading font-bold text-2xl text-brand-primary tracking-tight">Dapur Ola</span>
        <span className="text-brand-secondary text-[10px] font-bold tracking-widest mt-0.5">ADMIN DASHBOARD</span>
      </div>
      
      <div className="flex-1 py-6 flex flex-col gap-1 overflow-y-auto px-4">
        {NAV_ITEMS.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all font-medium text-sm",
                isActive 
                  ? "bg-brand-primary text-white shadow-md shadow-brand-primary/20" 
                  : "text-brand-primary/70 hover:bg-brand-cream hover:text-brand-primary"
              )}
            >
              <item.icon className={cn("w-5 h-5", isActive ? "text-white" : "text-brand-secondary/60")} />
              {item.label}
            </Link>
          );
        })}
      </div>

      <div className="p-4 border-t border-brand-beige bg-brand-cream/10">
        <button className="flex w-full items-center gap-3 px-3 py-2.5 rounded-xl transition-colors font-medium text-sm text-brand-primary/70 hover:bg-red-50 hover:text-red-500">
          <LogOut className="w-5 h-5" />
          Keluar
        </button>
      </div>
    </aside>
  );
}
