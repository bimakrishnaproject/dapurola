"use client";

import { useStore } from "@/store/useStore";
import Link from "next/link";
import { format } from "date-fns";
import { id as localeId } from "date-fns/locale";
import { ArrowRight, Package, ChevronRight, ChevronLeft } from "lucide-react";
import Image from "next/image";

const STATUS_LABELS: Record<string, { label: string; color: string }> = {
  "Pesanan Masuk": { label: "Pesanan Masuk", color: "bg-amber-50 text-amber-900 border-amber-200" },
  "Lagi Dimasak": { label: "Lagi Dimasak", color: "bg-purple-50 text-purple-900 border-purple-200" },
  "Siap Di-pickup / Kirim": { label: "Siap Kirim", color: "bg-blue-50 text-blue-900 border-blue-200" },
  "Selesai": { label: "Selesai (Beres)", color: "bg-emerald-50 text-emerald-900 border-emerald-200" },
  Pending: { label: "Menunggu Konfirmasi", color: "bg-amber-50 text-amber-900 border-amber-200" },
  Confirmed: { label: "Dapur Mulai Nyiapin", color: "bg-blue-50 text-blue-900 border-blue-200" },
  Baking: { label: "Lagi Dipanggang Fresh", color: "bg-purple-50 text-purple-900 border-purple-200" },
  "Ready for Delivery": { label: "Siap Kirim", color: "bg-blue-50 text-blue-900 border-blue-200" },
  "Out for Delivery": { label: "Kurir Meluncur", color: "bg-emerald-600 text-white border-emerald-600" },
  Delivered: { label: "Sudah Diterima", color: "bg-stone-100 text-stone-800 border-stone-200" },
  Cancelled: { label: "Dibatalkan", color: "bg-rose-50 text-rose-800 border-rose-200" },
};

export default function OrdersPage() {
  const { orders } = useStore();

  if (orders.length === 0) {
    return (
      <div className="container mx-auto px-4 md:px-8 py-24 flex flex-col items-center justify-center text-center font-jakarta">
        <div className="w-16 h-16 rounded-full bg-stone-100 flex items-center justify-center mb-6 text-stone-400">
          <Package strokeWidth={1.5} className="w-8 h-8" />
        </div>
        <span className="text-xs uppercase tracking-wider text-amber-800 font-semibold mb-2">
          Riwayat Belanja Kosong
        </span>
        <h1 className="font-playfair text-2xl sm:text-4xl font-bold text-[#1B4332] mb-3">
          Belum Ada Pesanan yang Dibuat
        </h1>
        <p className="text-xs sm:text-sm text-stone-500 max-w-sm mb-8 leading-relaxed font-normal">
          Yuk cobain bolu gulung lembut, brownies fudgy premium, atau donat kampung favoritmu sekarang!
        </p>
        <Link
          href="/#menu-list"
          className="px-8 py-3.5 bg-[#1B4332] text-white text-xs font-semibold rounded-full hover:bg-[#143225] transition-all shadow-xs cursor-pointer active:scale-95"
        >
          Lihat Menu Jajan Sekarang →
        </Link>
      </div>
    );
  }

  return (
    <div className="w-full bg-[#FAF7F2] text-stone-900 min-h-screen pb-24 font-jakarta">
      {/* Top Banner */}
      <div className="border-b border-stone-200 py-8 sm:py-12 bg-[#F5EFE6]">
        <div className="container mx-auto px-4 md:px-8 max-w-4xl">
          <Link
            href="/#menu-list"
            className="inline-flex items-center gap-1.5 text-xs text-stone-500 hover:text-stone-900 mb-3 transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Kembali ke Menu Utama</span>
          </Link>
          <span className="text-[10px] uppercase tracking-widest text-amber-800 font-semibold block mb-1">
            Status Pemesanan Online
          </span>
          <h1 className="font-playfair text-2xl sm:text-4xl font-bold text-[#1B4332]">
            Pesanan Saya
          </h1>
          <p className="text-xs sm:text-sm text-stone-600 mt-1.5">
            Pantau proses penyiapan di dapur dan jadwal kirim kurir secara langsung.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-3 sm:px-6 md:px-8 pt-6 sm:pt-10 max-w-4xl">
        {/* "KARTU DIBUKA DI MOBILE": Borderless on mobile, rounded container on desktop */}
        <div className="bg-white sm:rounded-3xl sm:border sm:border-stone-200/80 divide-y divide-stone-100 overflow-hidden shadow-xs">
          {orders.map((order) => {
            const statusConfig = STATUS_LABELS[order.status] || {
              label: order.status,
              color: "bg-stone-100 text-stone-800 border-stone-200",
            };

            return (
              <Link
                key={order.id}
                href={`/orders/${order.id}`}
                className="group p-4 sm:p-6 block hover:bg-stone-50/60 transition-colors"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2 text-xs flex-wrap">
                      <span className="font-bold text-stone-900 text-sm">
                        #{order.id}
                      </span>
                      <span className={`px-2.5 py-0.5 rounded-full border text-[10px] font-semibold ${statusConfig.color}`}>
                        {statusConfig.label}
                      </span>
                    </div>

                    <p className="text-xs text-stone-500">
                      Dipesan: {format(new Date(order.createdAt), "dd MMM yyyy, HH:mm", { locale: localeId })} WIB • {order.deliveryOption}
                    </p>

                    {/* Image Previews */}
                    <div className="flex items-center gap-3 pt-1">
                      <div className="flex -space-x-2">
                        {order.items.slice(0, 3).map((item) => (
                          <div
                            key={item.product.id}
                            className="relative w-10 h-10 rounded-full border-2 border-white bg-stone-100 overflow-hidden shadow-xs"
                          >
                            <Image
                              src={item.product.image}
                              alt={item.product.name}
                              fill
                              className="object-cover"
                            />
                          </div>
                        ))}
                      </div>
                      <span className="text-xs text-stone-700 truncate max-w-[240px] sm:max-w-md">
                        {order.items.map((i) => `${i.quantity}x ${i.product.name}`).join(", ")}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between sm:justify-end gap-4 pt-2 sm:pt-0 border-t sm:border-t-0 border-stone-100">
                    <div className="text-left sm:text-right">
                      <span className="text-[10px] text-stone-400 block uppercase">
                        Total Belanja
                      </span>
                      <span className="text-sm sm:text-base font-bold text-stone-900">
                        Rp {order.total.toLocaleString("id-ID")}
                      </span>
                    </div>
                    <ChevronRight className="w-5 h-5 text-stone-400 group-hover:text-emerald-700 group-hover:translate-x-1 transition-all" />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
