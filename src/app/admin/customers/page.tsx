"use client";

import KitchenOperationsBar from "@/components/admin/KitchenOperationsBar";
import DailySnapshotDock from "@/components/admin/DailySnapshotDock";
import { useStore } from "@/store/useStore";
import { User, Phone, MapPin, ShoppingBag } from "lucide-react";

export default function AdminCustomersPage() {
  const { orders } = useStore();

  // Extract unique customers from orders
  const customerMap = new Map();
  orders.forEach((o) => {
    if (!customerMap.has(o.customerPhone)) {
      customerMap.set(o.customerPhone, {
        name: o.customerName,
        phone: o.customerPhone,
        address: o.address,
        orderCount: 1,
        totalSpent: o.total,
      });
    } else {
      const existing = customerMap.get(o.customerPhone);
      existing.orderCount += 1;
      existing.totalSpent += o.total;
    }
  });

  const customers = Array.from(customerMap.values());

  return (
    <div className="min-h-screen flex flex-col justify-between bg-[#0D0F12] text-[#F4F4F5]">
      <KitchenOperationsBar />

      <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-4xl w-full mx-auto space-y-6">
        <div className="border-b border-neutral-800 pb-4">
          <span className="font-mono text-xs uppercase text-[#246B4E] font-bold">
            DATA PELANGGAN AKTIF
          </span>
          <h1 className="font-mono text-2xl font-bold text-white mt-1">
            Buku Kontak Pelanggan ({customers.length})
          </h1>
        </div>

        <div className="border border-neutral-800 bg-[#16181D] divide-y divide-neutral-800">
          {customers.map((c, idx) => (
            <div key={idx} className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1 font-mono text-xs">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-white text-sm">{c.name}</span>
                  <span className="text-neutral-400">({c.phone})</span>
                </div>
                <div className="text-neutral-400 text-[11px] truncate max-w-md font-sans">
                  {c.address}
                </div>
              </div>

              <div className="flex items-center gap-4 font-mono text-xs">
                <div className="text-right">
                  <span className="text-neutral-500 text-[10px] uppercase block">TOTAL ORDER</span>
                  <span className="font-bold text-white">{c.orderCount}x pesanan</span>
                </div>
                <div className="text-right">
                  <span className="text-neutral-500 text-[10px] uppercase block">TOTAL BELANJA</span>
                  <span className="font-bold text-emerald-400">Rp {c.totalSpent.toLocaleString("id-ID")}</span>
                </div>
              </div>
            </div>
          ))}

          {customers.length === 0 && (
            <div className="p-16 text-center font-mono text-xs text-neutral-500">
              Belum ada data pelanggan.
            </div>
          )}
        </div>
      </main>

      <DailySnapshotDock />
    </div>
  );
}
