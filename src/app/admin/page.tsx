"use client";

import { useStore } from "@/store/useStore";
import { format, addDays, startOfWeek } from "date-fns";
import { id as idLocale } from "date-fns/locale";
import { Package, ShoppingBag, Banknote, Clock, ArrowUpRight, Calendar as CalendarIcon, TrendingUp, ChevronRight, User } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { cn } from "@/lib/utils";

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

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Menunggu Pembayaran": return "bg-rose-100 text-rose-700";
      case "Sudah Dibayar": return "bg-blue-100 text-blue-700";
      case "Dikonfirmasi": return "bg-indigo-100 text-indigo-700";
      case "Lagi Dibikin 🥰": return "bg-amber-100 text-amber-700";
      case "Siap Dikirim 🚚": return "bg-teal-100 text-teal-700";
      default: return "bg-emerald-100 text-emerald-700";
    }
  };

  return (
    <div className="space-y-8 pb-10">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl md:text-4xl font-heading font-bold text-brand-primary mb-2 tracking-tight">Dashboard Overview</h1>
          <p className="text-muted-foreground text-sm md:text-base">Ringkasan performa bisnis Dapur Ola hari ini.</p>
        </div>
        <div className="flex items-center gap-2 text-sm font-medium text-brand-secondary bg-brand-secondary/10 px-4 py-2 rounded-full w-fit">
          <CalendarIcon className="w-4 h-4" />
          {format(new Date(), "dd MMMM yyyy", { locale: idLocale })}
        </div>
      </div>

      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4 md:gap-6">
        {/* Premium Revenue Card */}
        <Card className="rounded-2xl md:rounded-3xl border-0 shadow-lg bg-gradient-to-br from-brand-primary via-emerald-900 to-brand-primary overflow-hidden relative group">
          <div className="absolute top-0 right-0 p-6 opacity-20 transform translate-x-1/4 -translate-y-1/4 group-hover:scale-110 transition-transform duration-500">
            <Banknote className="w-32 h-32 text-white" />
          </div>
          <CardContent className="p-5 md:p-8 relative z-10 flex flex-col h-full justify-between">
            <div className="flex items-center justify-between mb-8">
              <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-white shadow-inner">
                <Banknote className="w-6 h-6" />
              </div>
              <div className="flex items-center gap-1 text-emerald-300 text-xs font-semibold bg-white/10 px-2.5 py-1 rounded-full backdrop-blur-md">
                <TrendingUp className="w-3.5 h-3.5" /> +12%
              </div>
            </div>
            <div>
              <p className="text-sm font-medium text-white/80 mb-1">Total Pendapatan</p>
              <h3 className="text-2xl md:text-4xl font-bold text-white tracking-tight">Rp {totalRevenue.toLocaleString("id-ID")}</h3>
            </div>
          </CardContent>
        </Card>

        {/* Regular Metric Cards */}
        <Card className="rounded-2xl md:rounded-3xl border-0 shadow-sm hover:shadow-md transition-shadow duration-300 bg-white group">
          <CardContent className="p-5 md:p-8 flex flex-col h-full justify-between">
            <div className="w-12 h-12 rounded-2xl bg-brand-cream/50 flex items-center justify-center text-brand-secondary mb-8 group-hover:bg-brand-secondary group-hover:text-white transition-colors duration-300">
              <ShoppingBag className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground mb-1">Total Pesanan</p>
              <h3 className="text-2xl md:text-4xl font-bold text-brand-primary tracking-tight">{orders.length}</h3>
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-2xl md:rounded-3xl border-0 shadow-sm hover:shadow-md transition-shadow duration-300 bg-white group">
          <CardContent className="p-5 md:p-8 flex flex-col h-full justify-between">
            <div className="w-12 h-12 rounded-2xl bg-amber-50 flex items-center justify-center text-amber-500 mb-8 group-hover:bg-amber-500 group-hover:text-white transition-colors duration-300">
              <Clock className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground mb-1">Perlu Diproses</p>
              <h3 className="text-2xl md:text-4xl font-bold text-brand-primary tracking-tight">{pendingOrders}</h3>
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-2xl md:rounded-3xl border-0 shadow-sm hover:shadow-md transition-shadow duration-300 bg-white group">
          <CardContent className="p-5 md:p-8 flex flex-col h-full justify-between">
            <div className="w-12 h-12 rounded-2xl bg-teal-50 flex items-center justify-center text-teal-600 mb-8 group-hover:bg-teal-600 group-hover:text-white transition-colors duration-300">
              <Package className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground mb-1">Sedang Dibikin</p>
              <h3 className="text-2xl md:text-4xl font-bold text-brand-primary tracking-tight">{inProgressOrders}</h3>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 md:gap-8 pt-4">
        {/* Production Calendar */}
        <div className="xl:col-span-2">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-heading font-bold text-brand-primary flex items-center gap-2">
              Kalender Produksi
            </h2>
            <div className="h-[1px] flex-1 bg-brand-beige mx-4 hidden sm:block"></div>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {calendarDays.map((date, i) => {
              const isToday = i === 0;
              const orderCount = getOrdersCountForDate(date);
              
              return (
                <div 
                  key={date.toISOString()} 
                  className={cn(
                    "p-5 rounded-3xl flex flex-col justify-between transition-all duration-300 cursor-default group",
                    isToday 
                      ? "bg-brand-primary text-white shadow-xl shadow-brand-primary/20 scale-105 z-10" 
                      : "bg-white shadow-sm hover:shadow-md border border-transparent hover:border-brand-beige"
                  )}
                >
                  <div className="mb-6">
                    <p className={cn(
                      "text-sm font-semibold mb-1 uppercase tracking-wider", 
                      isToday ? "text-brand-cream/80" : "text-muted-foreground"
                    )}>
                      {format(date, "EEEE", { locale: idLocale })}
                    </p>
                    <p className="text-3xl font-bold tracking-tight">
                      {format(date, "dd")}
                      <span className={cn(
                        "text-base font-medium ml-1",
                        isToday ? "text-brand-cream/80" : "text-muted-foreground"
                      )}>{format(date, "MMM")}</span>
                    </p>
                  </div>
                  
                  <div className={cn(
                    "inline-flex items-center justify-between px-3 py-2 rounded-xl text-sm font-medium w-full transition-colors",
                    isToday
                      ? "bg-white/10 text-white hover:bg-white/20"
                      : "bg-brand-light text-brand-primary group-hover:bg-brand-cream/50"
                  )}>
                    <div className="flex items-center gap-2">
                      <ShoppingBag className="w-4 h-4 shrink-0" />
                      <span>{orderCount}</span>
                    </div>
                    <span className={cn(
                      "text-xs",
                      isToday ? "text-white/60" : "text-brand-primary/60"
                    )}>Pesanan</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Recent Orders Widget */}
        <div className="xl:col-span-1">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-heading font-bold text-brand-primary">Pesanan Terbaru</h2>
            <Link href="/admin/orders" className="text-sm font-semibold text-brand-secondary hover:text-brand-primary transition-colors flex items-center gap-1 group">
              Lihat <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
          
          <Card className="rounded-3xl border-0 shadow-sm bg-white overflow-hidden">
            <CardContent className="p-0">
              <div className="divide-y divide-brand-light/50">
                {orders.slice(0, 5).map((order) => {
                  // Get initials
                  const initials = order.customerName
                    .split(' ')
                    .map(n => n[0])
                    .slice(0, 2)
                    .join('')
                    .toUpperCase();
                    
                  return (
                    <div key={order.id} className="p-5 hover:bg-brand-light/30 transition-colors group cursor-pointer flex gap-4 items-center">
                      <div className="w-12 h-12 rounded-full bg-brand-light flex items-center justify-center text-brand-secondary font-bold text-sm shrink-0 group-hover:bg-brand-secondary group-hover:text-white transition-colors">
                        {initials || <User className="w-5 h-5" />}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-start mb-1">
                          <p className="font-semibold text-brand-primary truncate pr-2">{order.customerName}</p>
                          <span className={cn(
                            "text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wider whitespace-nowrap",
                            getStatusColor(order.status)
                          )}>
                            {order.status}
                          </span>
                        </div>
                        <div className="flex justify-between items-center text-sm">
                          <p className="text-muted-foreground flex items-center gap-1">
                            <Package className="w-3.5 h-3.5" /> {order.items.length} item
                          </p>
                          <p className="font-bold text-brand-primary">Rp {order.total.toLocaleString("id-ID")}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
                {orders.length === 0 && (
                  <div className="p-12 text-center flex flex-col items-center justify-center text-muted-foreground">
                    <ShoppingBag className="w-12 h-12 mb-3 text-brand-beige" />
                    <p>Belum ada pesanan masuk.</p>
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
