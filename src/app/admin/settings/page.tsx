"use client";

import KitchenOperationsBar from "@/components/admin/KitchenOperationsBar";
import DailySnapshotDock from "@/components/admin/DailySnapshotDock";
import { useStore } from "@/store/useStore";
import { Store, Volume2, ShieldCheck } from "lucide-react";
import { toast } from "sonner";

export default function AdminSettingsPage() {
  const { isStoreOpen, toggleStoreOpen, isAudioAlertEnabled, toggleAudioAlert } = useStore();

  return (
    <div className="min-h-screen flex flex-col justify-between bg-[#0D0F12] text-[#F4F4F5]">
      <KitchenOperationsBar />

      <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-4xl w-full mx-auto space-y-6">
        <div className="border-b border-neutral-800 pb-4">
          <span className="font-mono text-xs uppercase text-[#246B4E] font-bold">
            PREFERENSI OPERASIONAL
          </span>
          <h1 className="font-mono text-2xl font-bold text-white mt-1">
            Pengaturan Dapur &amp; KDS
          </h1>
        </div>

        <div className="border border-neutral-800 bg-[#16181D] divide-y divide-neutral-800">
          <div className="p-6 flex items-center justify-between gap-4">
            <div>
              <h3 className="font-mono text-sm font-bold text-white">Status Toko Online</h3>
              <p className="font-sans text-xs text-neutral-400 mt-1">
                Buka atau tutup toko untuk menerima pesanan pelanggan.
              </p>
            </div>
            <button
              onClick={toggleStoreOpen}
              className={`h-11 px-5 font-mono text-xs uppercase font-bold border transition-colors ${
                isStoreOpen
                  ? "bg-emerald-950 text-emerald-300 border-emerald-500"
                  : "bg-rose-950 text-rose-300 border-rose-500"
              }`}
            >
              {isStoreOpen ? "🟢 Dapur Buka" : "🔴 Dapur Tutup"}
            </button>
          </div>

          <div className="p-6 flex items-center justify-between gap-4">
            <div>
              <h3 className="font-mono text-sm font-bold text-white">Audio Alert Bell</h3>
              <p className="font-sans text-xs text-neutral-400 mt-1">
                Bunyikan chime bel dapur saat ada pesanan baru masuk.
              </p>
            </div>
            <button
              onClick={toggleAudioAlert}
              className={`h-11 px-5 font-mono text-xs uppercase font-bold border transition-colors ${
                isAudioAlertEnabled
                  ? "bg-emerald-950 text-emerald-300 border-emerald-500"
                  : "bg-neutral-800 text-neutral-400 border-neutral-700"
              }`}
            >
              {isAudioAlertEnabled ? "🔔 Alert Aktif" : "🔕 Bisu"}
            </button>
          </div>
        </div>
      </main>

      <DailySnapshotDock />
    </div>
  );
}
