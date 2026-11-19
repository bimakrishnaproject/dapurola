"use client";

import { useStore } from "@/store/useStore";
import { useParams, notFound, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { format } from "date-fns";
import { id as localeId } from "date-fns/locale";
import { ArrowLeft, Printer, Check, Clock, User, Phone, MapPin, Truck, AlertCircle } from "lucide-react";
import KitchenOperationsBar from "@/components/admin/KitchenOperationsBar";
import DailySnapshotDock from "@/components/admin/DailySnapshotDock";
import { playKitchenDing } from "@/components/admin/audioChime";
import { toast } from "sonner";

export default function AdminOrderDetailPage() {
  const { id } = useParams() as { id: string };
  const { orders, updateOrderStatus, isAudioAlertEnabled } = useStore();
  const router = useRouter();

  const order = orders.find((o) => o.id === id);

  if (!order) {
    return notFound();
  }

  const handlePrint = () => {
    window.print();
  };

  const advanceStatus = () => {
    let nextStatus: any = "Lagi Dimasak";
    if (order.status === "Pesanan Masuk" || order.status === "Menunggu Pembayaran") {
      nextStatus = "Lagi Dimasak";
    } else if (order.status === "Lagi Dimasak") {
      nextStatus = "Siap Di-pickup / Kirim";
    } else if (order.status === "Siap Di-pickup / Kirim") {
      nextStatus = "Selesai";
    }

    updateOrderStatus(order.id, nextStatus);
    if (isAudioAlertEnabled) playKitchenDing();
    toast.success(`Status Order #${order.id} Diperbarui: ${nextStatus}`);
  };

  return (
    <div className="min-h-screen flex flex-col justify-between bg-[#0D0F12] text-[#F4F4F5]">
      <KitchenOperationsBar />

      <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-4xl w-full mx-auto space-y-6">
        {/* Back Link & Header */}
        <div className="flex items-center justify-between">
          <Link
            href="/admin"
            className="inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-widest text-neutral-400 hover:text-white transition-colors"
          >
            <ArrowLeft strokeWidth={1.5} className="w-4 h-4" />
            <span>Kembali ke KDS</span>
          </Link>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="h-11 px-4 bg-white text-black font-mono text-xs uppercase font-bold flex items-center gap-1.5 active:scale-95 transition-all"
            >
              <Printer strokeWidth={1.5} className="w-4 h-4" />
              <span>Cetak Struk Thermal</span>
            </button>
            <button
              onClick={advanceStatus}
              className="h-11 px-5 bg-[#246B4E] hover:bg-emerald-600 text-white font-mono text-xs uppercase font-bold flex items-center gap-1.5 active:scale-95 transition-all"
            >
              <Check strokeWidth={2} className="w-4 h-4" />
              <span>Lanjut Status</span>
            </button>
          </div>
        </div>

        {/* Thermal Slip Card */}
        <div className="border border-neutral-800 bg-[#16181D] p-6 sm:p-8 space-y-6">
          <div className="flex items-center justify-between border-b border-neutral-800 pb-4">
            <div>
              <span className="font-mono text-xs uppercase text-[#246B4E] font-bold block">
                TIKET OPERASIONAL
              </span>
              <h1 className="font-mono text-2xl font-bold text-white mt-1">
                #{order.id}
              </h1>
            </div>
            <span className="px-3 py-1 font-mono text-xs font-bold uppercase bg-amber-950 text-amber-300 border border-amber-500/50">
              {order.status}
            </span>
          </div>

          {/* Customer & Logistics Details */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-mono text-xs bg-black/40 p-4 border border-neutral-800">
            <div>
              <span className="text-neutral-500 text-[10px] uppercase block">
                PELANGGAN
              </span>
              <span className="font-bold text-white text-sm block mt-0.5">
                {order.customerName}
              </span>
              <span className="text-neutral-400">{order.customerPhone}</span>
            </div>
            <div>
              <span className="text-neutral-500 text-[10px] uppercase block">
                METODE PENGIRIMAN
              </span>
              <span className="font-bold text-emerald-400 text-sm block mt-0.5">
                {order.deliveryOption}
              </span>
              <span className="text-neutral-400">
                {format(new Date(order.createdAt), "dd MMMM yyyy, HH:mm", { locale: localeId })} WIB
              </span>
            </div>
            <div className="sm:col-span-2 pt-2 border-t border-neutral-800">
              <span className="text-neutral-500 text-[10px] uppercase block">
                ALAMAT LENGKAP PENGIRIMAN
              </span>
              <span className="font-sans text-xs text-neutral-300 block mt-0.5 leading-relaxed">
                {order.address}
              </span>
            </div>
          </div>

          {/* Menu Items */}
          <div className="space-y-3">
            <span className="font-mono text-xs uppercase tracking-wider font-bold text-neutral-400 block">
              DAFTAR PESANAN
            </span>

            <div className="divide-y divide-neutral-800 border border-neutral-800 bg-[#121417]">
              {order.items.map((item, idx) => (
                <div key={idx} className="p-4 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <span className="w-8 h-8 bg-white text-black font-mono font-bold text-xs flex items-center justify-center shrink-0">
                      {item.quantity}x
                    </span>
                    <div>
                      <h4 className="font-cinzel text-sm font-bold text-white">
                        {item.product.name}
                      </h4>
                      <p className="font-mono text-[11px] text-neutral-400">
                        Rp {item.product.price.toLocaleString("id-ID")} per porsi
                      </p>
                      {item.notes && (
                        <p className="font-sans text-xs text-amber-300 bg-amber-950/60 border border-amber-500/40 px-2 py-0.5 mt-1 inline-block">
                          Catatan: {item.notes}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="font-mono text-sm font-bold text-white">
                    Rp {(item.product.price * item.quantity).toLocaleString("id-ID")}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Totals */}
          <div className="flex justify-between items-center pt-4 border-t border-neutral-800 font-mono">
            <span className="text-xs uppercase text-neutral-400">TOTAL PEMBAYARAN</span>
            <span className="text-xl font-bold text-white">
              Rp {order.total.toLocaleString("id-ID")}
            </span>
          </div>
        </div>
      </main>

      <DailySnapshotDock />
    </div>
  );
}
