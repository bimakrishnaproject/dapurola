"use client";

import { useStore } from "@/store/useStore";
import Link from "next/link";
import { format } from "date-fns";
import { id as idLocale } from "date-fns/locale";
import { Package, ChevronRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function OrdersPage() {
  const { orders } = useStore();

  if (orders.length === 0) {
    return (
      <div className="container mx-auto px-4 py-24 flex flex-col items-center justify-center text-center">
        <div className="w-20 h-20 bg-brand-light rounded-full flex items-center justify-center mb-6">
          <Package className="w-10 h-10 text-brand-primary" />
        </div>
        <h1 className="text-xl md:text-2xl font-heading font-semibold text-brand-primary mb-3">Belum Ada Pesanan</h1>
        <p className="text-muted-foreground text-base md:text-lg mb-8">Wah, kamu belum pernah pesan Dapur Ola nih.</p>
        <Link href="/products" className="inline-flex items-center justify-center rounded-full bg-brand-primary text-white h-11 px-6 text-base font-medium hover:bg-brand-secondary transition-colors">
          Mulai Belanja
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12 max-w-3xl">
      <h1 className="text-3xl font-heading font-semibold text-brand-primary mb-6">Riwayat Pesanan</h1>
      
      <div className="space-y-4">
        {orders.map((order) => {
          const isDone = order.status === "Selesai 🎉";
          
          return (
            <Link key={order.id} href={`/orders/${order.id}`} className="block group">
              <div className="py-5 border-b border-brand-beige last:border-0 hover:bg-brand-cream/20 transition-colors rounded-xl px-2 sm:px-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <p className="font-heading font-semibold text-brand-primary text-base sm:text-lg">{order.id}</p>
                      <Badge className={
                        isDone 
                          ? "bg-green-100 text-green-700 border-none px-2 py-0.5 text-xs font-medium" 
                          : "bg-brand-light text-brand-primary border-none px-2 py-0.5 text-xs font-medium"
                      }>
                        {order.status}
                      </Badge>
                    </div>
                    <p className="text-xs sm:text-sm text-muted-foreground mb-4">
                      {format(new Date(order.createdAt), "dd MMMM yyyy, HH:mm", { locale: idLocale })}
                    </p>
                    
                    <div className="flex items-center gap-3">
                      <div className="flex -space-x-2">
                        {order.items.slice(0, 3).map(item => (
                          <div key={item.product.id} className="relative w-8 h-8 sm:w-10 sm:h-10 rounded-full overflow-hidden border-2 border-white bg-brand-cream shrink-0">
                            <img src={item.product.image} alt={item.product.name} className="w-full h-full object-cover" />
                          </div>
                        ))}
                        {order.items.length > 3 && (
                          <div className="relative w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-brand-light flex items-center justify-center text-xs font-medium text-brand-primary border-2 border-white z-10">
                            +{order.items.length - 3}
                          </div>
                        )}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-brand-primary">{order.items.length} Barang</p>
                        <p className="text-xs text-muted-foreground">Total: Rp {order.total.toLocaleString("id-ID")}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center text-brand-secondary font-medium text-sm mt-2 sm:mt-0 group-hover:underline">
                    Lihat Detail <ChevronRight className="w-4 h-4 ml-1" />
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
