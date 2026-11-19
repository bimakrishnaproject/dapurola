"use client";

import KitchenOperationsBar from "@/components/admin/KitchenOperationsBar";
import QuickInventoryMatrix from "@/components/admin/QuickInventoryMatrix";
import DailySnapshotDock from "@/components/admin/DailySnapshotDock";
import { useRouter } from "next/navigation";

export default function AdminInventoryPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex flex-col justify-between bg-[#0D0F12] text-[#F4F4F5]">
      <KitchenOperationsBar
        activeView="inventory"
        onViewChange={(v) => {
          if (v === "tickets") router.push("/admin/orders");
          else router.push("/admin");
        }}
      />

      <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-[1720px] w-full mx-auto space-y-4">
        <div className="flex items-center justify-between font-mono text-xs text-neutral-400 pb-2">
          <span className="font-bold text-white uppercase tracking-wider flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            KONTROL STOK CEPAT (INVENTORY MATRIX)
          </span>
          <span className="text-[11px] text-neutral-500">
            Atur sisa porsi harian &amp; aktif/nonaktifkan menu sekali klik
          </span>
        </div>
        <QuickInventoryMatrix />
      </main>

      <DailySnapshotDock />
    </div>
  );
}
