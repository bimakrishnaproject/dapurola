"use client";

import { useStore } from "@/store/useStore";
import { useParams, notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { format } from "date-fns";
import { id as localeId } from "date-fns/locale";
import { Check, Clock, Truck, Home, ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";

const STATUS_STEPS = [
  "Menunggu Pembayaran",
  "Sudah Dibayar",
  "Dikonfirmasi Dapur",
  "Lagi Dibaking Fresh",
  "Siap Dipacking Boks Hijau",
  "Kurir di Jalan",
  "Sudah Diterima",
];

export default function OrderDetailPage() {
  const { id } = useParams() as { id: string };
  const { orders } = useStore();

  const order = orders.find((o) => o.id === id);

  if (!order) {
    return notFound();
  }

  const currentStepIndex = STATUS_STEPS.indexOf(order.status) !== -1 ? STATUS_STEPS.indexOf(order.status) : 2;

  return (
    <div className="w-full bg-[#FAFBF9] text-[#073524] min-h-screen pb-24">
      {/* Top Banner */}
      <div className="border-b border-[#D4E5DC] py-10 md:py-14 bg-[#EAF4EE]">
        <div className="container mx-auto px-4 md:px-8">
          <Link
            href="/orders"
            className="inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-widest text-[#3A6B53] hover:text-[#00A65E] mb-3 font-semibold transition-colors"
          >
            <ArrowLeft strokeWidth={1.5} className="w-3.5 h-3.5" />
            <span>Kembali ke Riwayat Pesanan</span>
          </Link>
          <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.25em] text-[#00A65E] font-bold mb-2">
            <span>DAPUR OLA</span>
            <span>·</span>
            <span>STATUS PESANAN</span>
            <span>·</span>
            <span>#{order.id}</span>
          </div>
          <h1 className="font-cinzel text-3xl sm:text-5xl font-bold text-[#073524]">
            Rincian Pesanan
          </h1>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-8 pt-10 max-w-4xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Status Progression (12 cols) */}
          <div className="lg:col-span-12 border border-[#D4E5DC] bg-white p-6 sm:p-8 space-y-6 shadow-xs">
            <div className="flex items-center justify-between pb-4 border-b border-[#D4E5DC] font-mono text-xs uppercase tracking-wider">
              <span className="font-bold text-[#073524]">[STATUS TERKINI DI DAPUR]</span>
              <span className="text-[#00A65E] font-bold bg-[#EAF4EE] px-3 py-1 border border-[#BDE0CD]">
                {order.status}
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-2">
              {STATUS_STEPS.map((step, idx) => {
                const isPassed = idx <= currentStepIndex;
                const isCurrent = idx === currentStepIndex;

                return (
                  <div
                    key={step}
                    className={cn(
                      "p-3 border font-mono text-[10px] flex flex-col justify-between transition-colors",
                      isCurrent
                        ? "bg-[#00A65E] text-white border-[#008F50] shadow-xs"
                        : isPassed
                        ? "bg-[#EAF4EE] text-[#073524] border-[#BDE0CD]"
                        : "bg-[#FAFBF9] text-[#7A9C8D] border-[#D4E5DC]/60"
                    )}
                  >
                    <span className="text-[9px] uppercase tracking-widest block opacity-80">
                      LANGKAH 0{idx + 1}
                    </span>
                    <span className="font-bold mt-1 line-clamp-2">
                      {step}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Items Allocated (7 cols) */}
          <div className="lg:col-span-7 border border-[#D4E5DC] bg-white p-6 space-y-4 shadow-xs">
            <span className="font-mono text-xs uppercase tracking-wider font-bold text-[#073524] block pb-3 border-b border-[#D4E5DC]">
              [MENU YANG DIBUNGKUS]
            </span>

            <div className="divide-y divide-[#D4E5DC]">
              {order.items.map((item) => (
                <div key={item.product.id} className="py-4 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="relative w-14 h-14 bg-[#EAF4EE] border border-[#D4E5DC] overflow-hidden shrink-0">
                      <Image
                        src={item.product.image}
                        alt={item.product.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <h4 className="font-cinzel text-sm font-bold text-[#073524]">
                        {item.product.name}
                      </h4>
                      <p className="font-mono text-xs text-[#5A7E6D] mt-0.5">
                        {item.quantity} porsi x Rp {item.product.price.toLocaleString("id-ID")}
                      </p>
                      {item.notes && (
                        <p className="font-sans text-[11px] text-[#00A65E] mt-0.5">
                          Catatan: {item.notes}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="font-mono text-xs font-bold text-[#073524]">
                    Rp {(item.product.price * item.quantity).toLocaleString("id-ID")}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Logistics & Delivery Details (5 cols) */}
          <div className="lg:col-span-5 border border-[#D4E5DC] bg-white p-6 space-y-5 shadow-xs">
            <span className="font-mono text-xs uppercase tracking-wider font-bold text-[#073524] block pb-3 border-b border-[#D4E5DC]">
              [ALAMAT &amp; PENGIRIMAN]
            </span>

            <div className="font-mono text-xs space-y-3">
              <div>
                <span className="text-[#5A7E6D] text-[10px] uppercase block tracking-wider">
                  PENERIMA
                </span>
                <span className="font-bold text-[#073524] block mt-0.5">
                  {order.customerName} ({order.customerPhone})
                </span>
              </div>

              <div>
                <span className="text-[#5A7E6D] text-[10px] uppercase block tracking-wider">
                  ALAMAT LENGKAP
                </span>
                <span className="font-sans text-xs text-[#2E4A3D] block mt-0.5 leading-relaxed">
                  {order.address}
                </span>
              </div>

              <div>
                <span className="text-[#5A7E6D] text-[10px] uppercase block tracking-wider">
                  JADWAL KIRIM
                </span>
                <span className="font-bold text-[#073524] block mt-0.5">
                  {format(new Date(order.deliveryDate), "dd MMMM yyyy", { locale: localeId })} ({order.deliveryTimeSlot})
                </span>
              </div>

              <div className="pt-3 border-t border-[#D4E5DC]">
                <span className="text-[#5A7E6D] text-[10px] uppercase block tracking-wider">
                  METODE BAYAR
                </span>
                <span className="font-bold text-[#073524] block mt-0.5">
                  {order.paymentMethod}
                </span>
              </div>

              <div className="pt-3 border-t border-[#D4E5DC] flex items-center justify-between">
                <span className="font-mono text-xs uppercase font-bold text-[#3A6B53]">
                  TOTAL AKHIR
                </span>
                <span className="font-mono text-lg font-bold text-[#00A65E]">
                  Rp {order.total.toLocaleString("id-ID")}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
