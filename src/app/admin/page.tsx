"use client";

import { useStore } from "@/store/useStore";
import { format, addDays, startOfWeek } from "date-fns";
import { id as idLocale } from "date-fns/locale";
import { Package, ShoppingBag, Banknote, Clock, ArrowUpRight, Calendar as CalendarIcon } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

export default function AdminDashboard() {
  const { orders } = useStore();

  const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0);
  const pendingOrders = orders.filter(o => o.status === "Menunggu Pembayaran" || o.status === "Sudah Dibayar" || o.status === "Dikonfirmasi").length;
  const inProgressOrders = orders.filter(o => o.status === "Lagi Dibikin 🥰" || o.status === "Siap Dikirim 🚚").length;

  // Generate 7 days for the calendar starting today
  const today = new Date();
  const calendarDays = Array.from({ length: 7 }).map((_, i) => addDays(today, i));

  // Mock production counts based on date
  const getOrdersCountForDate = (date: Date) => {
    const dateStr = format(date, "yyyy-MM-dd");
    return orders.filter(o => o.deliveryDate === dateStr).length || 0; 
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-heading font-semibold text-brand-primary mb-2">Dashboard</h1>
        <p className="text-muted-foreground">Ringkasan bisnis Dapur Ola hari ini.</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
        <Card className="rounded-xl md:rounded-2xl border border-brand-beige shadow-sm bg-white">
          <CardContent className="p-4 md:p-6">
            <div className="flex items-center justify-between mb-3 md:mb-4">
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg md:rounded-xl bg-brand-secondary/10 flex items-center justify-center text-brand-secondary">
                <Banknote className="w-5 h-5 md:w-6 md:h-6" />
              </div>
            </div>
            <p className="text-xs md:text-sm font-medium text-muted-foreground mb-1 line-clamp-1">Total Pendapatan</p>
            <h3 className="text-lg md:text-2xl font-bold text-brand-primary truncate">Rp {totalRevenue.toLocaleString("id-ID")}</h3>
          </CardContent>
        </Card>

        <Card className="rounded-xl md:rounded-2xl border border-brand-beige shadow-sm bg-white">
          <CardContent className="p-4 md:p-6">
            <div className="flex items-center justify-between mb-3 md:mb-4">
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg md:rounded-xl bg-brand-brown/10 flex items-center justify-center text-brand-brown">
                <ShoppingBag className="w-5 h-5 md:w-6 md:h-6" />
              </div>
            </div>
            <p className="text-xs md:text-sm font-medium text-muted-foreground mb-1 line-clamp-1">Total Pesanan</p>
            <h3 className="text-lg md:text-2xl font-bold text-brand-primary">{orders.length}</h3>
          </CardContent>
        </Card>

        <Card className="rounded-xl md:rounded-2xl border border-brand-beige shadow-sm bg-white">
          <CardContent className="p-4 md:p-6">
            <div className="flex items-center justify-between mb-3 md:mb-4">
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg md:rounded-xl bg-amber-100 flex items-center justify-center text-amber-600">
                <Clock className="w-5 h-5 md:w-6 md:h-6" />
              </div>
            </div>
            <p className="text-xs md:text-sm font-medium text-muted-foreground mb-1 line-clamp-1">Perlu Diproses</p>
            <h3 className="text-lg md:text-2xl font-bold text-brand-primary">{pendingOrders}</h3>
          </CardContent>
        </Card>

        <Card className="rounded-xl md:rounded-2xl border border-brand-beige shadow-sm bg-white">
          <CardContent className="p-4 md:p-6">
            <div className="flex items-center justify-between mb-3 md:mb-4">
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg md:rounded-xl bg-brand-light flex items-center justify-center text-brand-primary">
                <Package className="w-5 h-5 md:w-6 md:h-6" />
              </div>
            </div>
            <p className="text-xs md:text-sm font-medium text-muted-foreground mb-1 line-clamp-1">Sedang Dibikin</p>
            <h3 className="text-lg md:text-2xl font-bold text-brand-primary">{inProgressOrders}</h3>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 md:gap-8">
        {/* Production Calendar */}
        <div className="xl:col-span-2">
          <Card className="rounded-xl md:rounded-2xl border border-brand-beige shadow-sm overflow-hidden bg-white">
            <CardHeader className="border-b border-brand-beige p-4 md:p-6 pb-3 md:pb-4">
              <CardTitle className="text-xl font-heading flex items-center gap-2 text-brand-primary">
                <CalendarIcon className="w-5 h-5 text-brand-secondary" />
                Kalender Produksi
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 md:p-6 bg-brand-cream/10">
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 md:gap-4">
                {calendarDays.map((date, i) => {
                  const isToday = i === 0;
                  const orderCount = getOrdersCountForDate(date);
                  
                  return (
                    <div 
                      key={date.toISOString()} 
                      className={`p-4 rounded-xl md:rounded-2xl flex flex-col justify-between transition-all duration-300 ${
                        isToday 
                          ? 'bg-brand-primary text-white shadow-md' 
                          : 'bg-white border border-brand-beige hover:border-brand-primary/30 text-brand-primary shadow-sm'
                      }`}
                    >
                      <div>
                        <p className={`text-xs font-medium mb-1 ${isToday ? 'text-white/80' : 'text-muted-foreground'}`}>
                          {format(date, "EEEE", { locale: idLocale })}
                        </p>
                        <p className="text-xl md:text-2xl font-bold mb-4">
                          {format(date, "dd MMM")}
                        </p>
                      </div>
                      <div className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs md:text-sm font-medium w-fit ${
                        isToday
                          ? 'bg-white/20 text-white'
                          : 'bg-brand-light text-brand-primary border border-brand-beige/50'
                      }`}>
                        <ShoppingBag className="w-3.5 h-3.5 shrink-0" />
                        {orderCount} Pesanan
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Orders Widget */}
        <div className="xl:col-span-1">
          <Card className="rounded-xl md:rounded-2xl border border-brand-beige shadow-sm h-full overflow-hidden bg-white">
            <CardHeader className="border-b border-brand-beige p-4 md:p-6 pb-3 md:pb-4">
              <div className="flex items-center justify-between">
                <CardTitle className="text-xl font-heading text-brand-primary">Pesanan Terbaru</CardTitle>
                <Link href="/admin/orders" className="text-sm font-medium text-brand-secondary hover:underline flex items-center gap-1">
                  Lihat Semua <ArrowUpRight className="w-4 h-4" />
                </Link>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y divide-brand-beige">
                {orders.slice(0, 5).map((order) => (
                  <div key={order.id} className="p-4 md:px-6 hover:bg-brand-cream/50 transition-colors">
                    <div className="flex justify-between items-start mb-1">
                      <p className="font-medium text-brand-primary">{order.customerName}</p>
                      <span className="text-xs font-medium px-2 py-1 bg-brand-light text-brand-primary rounded-md border border-brand-beige/50">
                        {order.status}
                      </span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <p className="text-muted-foreground">{order.items.length} item</p>
                      <p className="font-semibold text-brand-secondary">Rp {order.total.toLocaleString("id-ID")}</p>
                    </div>
                  </div>
                ))}
                {orders.length === 0 && (
                  <div className="p-8 text-center text-slate-500">
                    Belum ada pesanan masuk.
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
