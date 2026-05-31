"use client";

import { useStore } from "@/store/useStore";
import { format } from "date-fns";
import { id as idLocale } from "date-fns/locale";
import { OrderStatus } from "@/store/types";
import { Search, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";
import { toast } from "sonner";

const STATUS_OPTIONS: OrderStatus[] = [
  "Menunggu Pembayaran",
  "Sudah Dibayar",
  "Dikonfirmasi",
  "Lagi Dibikin 🥰",
  "Siap Dikirim 🚚",
  "Dalam Perjalanan",
  "Selesai 🎉",
  "Dibatalkan"
];

export default function AdminOrdersPage() {
  const { orders, updateOrderStatus } = useStore();
  const [searchTerm, setSearchTerm] = useState("");

  const filteredOrders = orders.filter(o => 
    o.id.toLowerCase().includes(searchTerm.toLowerCase()) || 
    o.customerName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleStatusChange = (orderId: string, newStatus: OrderStatus) => {
    updateOrderStatus(orderId, newStatus);
    toast.success("Status Diperbarui", {
      description: `Order ${orderId} diubah menjadi ${newStatus}.`,
    });
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-heading font-semibold text-brand-primary mb-2">Manajemen Pesanan</h1>
        <p className="text-muted-foreground">Kelola semua pesanan masuk dan update statusnya.</p>
      </div>

      <div className="bg-white rounded-xl md:rounded-2xl shadow-sm border border-brand-beige overflow-hidden">
        <div className="p-6 border-b border-brand-beige flex flex-col sm:flex-row gap-4 items-center justify-between">
          <div className="relative w-full sm:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input 
              placeholder="Cari ID Pesanan / Nama..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 rounded-xl"
            />
          </div>
          <div className="flex gap-2 w-full sm:w-auto">
            {/* Filter buttons can go here */}
          </div>
        </div>

        <div className="divide-y divide-brand-beige">
          {filteredOrders.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              Tidak ada pesanan yang ditemukan.
            </div>
          ) : (
            filteredOrders.map((order) => (
              <div key={order.id} className="p-4 hover:bg-brand-cream/10 transition-colors flex flex-col md:flex-row md:items-center gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between md:mb-1">
                    <div>
                      <span className="font-medium text-brand-primary">{order.id}</span>
                      <span className="mx-2 text-brand-beige hidden md:inline">|</span>
                      <span className="text-sm text-muted-foreground block md:inline mt-1 md:mt-0">
                        {format(new Date(order.createdAt), "dd MMM yyyy, HH:mm", { locale: idLocale })}
                      </span>
                    </div>
                    <Link href={`/admin/orders/${order.id}`} className="md:hidden">
                      <Button variant="ghost" size="sm" className="h-8 px-3 text-brand-secondary bg-brand-light rounded-lg">Detail</Button>
                    </Link>
                  </div>
                  
                  <div className="flex flex-wrap gap-x-6 gap-y-2 mt-3 text-sm">
                    <div>
                      <p className="text-muted-foreground text-[11px] uppercase tracking-wider mb-0.5">Pelanggan</p>
                      <p className="font-medium text-brand-primary">{order.customerName}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground text-[11px] uppercase tracking-wider mb-0.5">Total</p>
                      <p className="font-medium text-brand-secondary">Rp {order.total.toLocaleString("id-ID")}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground text-[11px] uppercase tracking-wider mb-0.5">Item</p>
                      <p className="font-medium text-brand-primary">{order.items.length} item</p>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 mt-2 md:mt-0 md:w-64 shrink-0">
                  <div className="flex-1">
                    <Select 
                      value={order.status} 
                      onValueChange={(val: string | null) => val && handleStatusChange(order.id, val as OrderStatus)}
                    >
                      <SelectTrigger className="w-full rounded-lg h-10 bg-white border-brand-beige">
                        <SelectValue placeholder="Status" />
                      </SelectTrigger>
                      <SelectContent>
                        {STATUS_OPTIONS.map((status) => (
                          <SelectItem key={status} value={status}>{status}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <Link href={`/admin/orders/${order.id}`} className="hidden md:block">
                    <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-brand-primary hover:bg-brand-light shrink-0">
                      <Eye className="w-4 h-4" />
                    </Button>
                  </Link>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
