"use client";

import KitchenOperationsBar from "@/components/admin/KitchenOperationsBar";
import DailySnapshotDock from "@/components/admin/DailySnapshotDock";
import { useStore } from "@/store/useStore";
import { Banknote, ShoppingBag, Trophy, Calendar } from "lucide-react";
import { format } from "date-fns";
import { id as localeId } from "date-fns/locale";

export default function AdminReportsPage() {
  const { orders } = useStore();

  const totalCuan = orders.reduce((sum, o) => sum + o.total, 0);
  const totalPorsi = orders.reduce((sum, o) => sum + o.items.reduce((acc, i) => acc + i.quantity, 0), 0);

  return (
    <div className="min-h-screen flex flex-col justify-between bg-[#0D0F12] text-[#F4F4F5]">
      <KitchenOperationsBar />

      <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-4xl w-full mx-auto space-y-6">
        <div className="border-b border-neutral-800 pb-4">
          <span className="font-mono text-xs uppercase text-[#246B4E] font-bold">
            REKONSILIASI KAS &amp; PORSI
          </span>
          <h1 className="font-mono text-2xl font-bold text-white mt-1">
            Ringkasan Penjualan Dapur
          </h1>
          <p className="font-sans text-xs text-neutral-400 mt-1">
            Per {format(new Date(), "dd MMMM yyyy", { locale: localeId })}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-6 border border-neutral-800 bg-[#16181D]">
            <span className="font-mono text-[10px] uppercase tracking-widest text-neutral-500 block">
              TOTAL PENDAPATAN
            </span>
            <span className="font-mono text-3xl font-bold text-white block mt-2">
              Rp {totalCuan.toLocaleString("id-ID")}
            </span>
            <span className="font-mono text-xs text-emerald-400 mt-1 block">
              Dari {orders.length} transaksi
            </span>
          </div>

          <div className="p-6 border border-neutral-800 bg-[#16181D]">
            <span className="font-mono text-[10px] uppercase tracking-widest text-neutral-500 block">
              TOTAL PORSI TERJUAL
            </span>
            <span className="font-mono text-3xl font-bold text-white block mt-2">
              {totalPorsi} Porsi
            </span>
            <span className="font-mono text-xs text-blue-400 mt-1 block">
              Bolu, brownies, donat &amp; roti
            </span>
          </div>
        </div>
      </main>

      <DailySnapshotDock />
    </div>
  );
}
