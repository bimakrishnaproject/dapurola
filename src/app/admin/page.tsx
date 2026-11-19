"use client";

import { useState } from "react";
import KitchenOperationsBar from "@/components/admin/KitchenOperationsBar";
import KitchenTicketBoard from "@/components/admin/KitchenTicketBoard";
import QuickInventoryMatrix from "@/components/admin/QuickInventoryMatrix";
import DailySnapshotDock from "@/components/admin/DailySnapshotDock";
import ReceiptSlideOver from "@/components/admin/ReceiptSlideOver";
import { useStore } from "@/store/useStore";
import { Order } from "@/store/types";
import { format } from "date-fns";
import { id as localeId } from "date-fns/locale";
import { Printer, CheckCircle2, User } from "lucide-react";

export default function AdminPage() {
  const [activeView, setActiveView] = useState<"tickets" | "inventory" | "history">("tickets");
  const { orders } = useStore();
  const [selectedReceipt, setSelectedReceipt] = useState<Order | null>(null);

  const completedOrders = orders.filter(
    (o) => o.status === "Selesai" || o.status === "Selesai 🎉"
  );

  return (
    <div className="min-h-screen flex flex-col justify-between bg-stone-50/60 text-stone-900 font-jakarta">
      {/* 1. Global Operations Bar (Sticky Header) */}
      <KitchenOperationsBar
        activeView={activeView}
        onViewChange={setActiveView}
      />

      {/* 2. Main Stage (Full-Width Touch-Ready KDS Workspace) */}
      <main className="flex-1 p-2.5 sm:p-6 lg:p-8 max-w-[1720px] w-full mx-auto">
        {activeView === "tickets" && (
          <div className="space-y-3 sm:space-y-4">
            <div className="flex items-center justify-between text-xs text-stone-500 px-1 pb-1">
              <span className="font-semibold text-stone-900 uppercase tracking-wider flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                Stream Orderan Aktif
              </span>
              <span className="hidden sm:inline text-xs text-stone-400">
                Pindah kolom otomatis via tombol aksi • Tablet &amp; Mobile Touch Ergonomic
              </span>
            </div>
            <KitchenTicketBoard />
          </div>
        )}

        {activeView === "inventory" && (
          <div className="space-y-3 sm:space-y-4">
            <div className="flex items-center justify-between text-xs text-stone-500 px-1 pb-1">
              <span className="font-semibold text-stone-900 uppercase tracking-wider flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                Kontrol Stok &amp; Porsi Sekali Klik
              </span>
              <span className="hidden sm:inline text-xs text-stone-400">
                Menu habis? Klik tombol toggle untuk mematikan menu seketika di etalase
              </span>
            </div>
            <QuickInventoryMatrix />
          </div>
        )}

        {activeView === "history" && (
          <div className="space-y-3 sm:space-y-4">
            <div className="flex items-center justify-between text-xs text-stone-500 px-1 pb-1">
              <span className="font-semibold text-stone-900 uppercase tracking-wider flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                Arsip Pesanan Selesai ({completedOrders.length})
              </span>
              <span className="hidden sm:inline text-xs text-stone-400">
                Pesanan yang sudah beres dan diserahkan ke pelanggan / kurir
              </span>
            </div>

            <div className="bg-white border sm:border-stone-200 sm:rounded-3xl overflow-hidden divide-y divide-stone-100 shadow-xs">
              {completedOrders.map((order) => (
                <div
                  key={order.id}
                  className="p-3.5 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 hover:bg-stone-50/60 transition-colors"
                >
                  <div className="space-y-1 text-xs">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-stone-900 text-sm">
                        #{order.id}
                      </span>
                      <span className="bg-emerald-50 text-emerald-800 px-2 py-0.5 text-[10px] font-bold rounded-full border border-emerald-200">
                        Selesai (Beres)
                      </span>
                    </div>

                    <div className="flex items-center gap-2 text-stone-500 text-xs flex-wrap">
                      <User className="w-3 h-3 text-stone-400" />
                      <span className="text-stone-900 font-semibold">{order.customerName}</span>
                      <span>•</span>
                      <span>{order.deliveryOption}</span>
                      <span>•</span>
                      <span>
                        {format(new Date(order.createdAt), "dd MMM, HH:mm", { locale: localeId })} WIB
                      </span>
                    </div>

                    <div className="text-xs text-stone-600">
                      {order.items.map((i) => `${i.quantity}x ${i.product.name}`).join(", ")}
                    </div>
                  </div>

                  <div className="flex items-center justify-between sm:justify-end gap-3 pt-2 sm:pt-0 border-t sm:border-t-0 border-stone-100">
                    <span className="text-base font-bold text-stone-900">
                      Rp {order.total.toLocaleString("id-ID")}
                    </span>

                    <button
                      onClick={() => setSelectedReceipt(order)}
                      className="h-9 px-3.5 rounded-xl bg-stone-50 border border-stone-200 hover:bg-stone-100 text-stone-800 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <Printer strokeWidth={1.75} className="w-3.5 h-3.5 text-stone-600" />
                      <span>Struk</span>
                    </button>
                  </div>
                </div>
              ))}

              {completedOrders.length === 0 && (
                <div className="p-16 text-center text-xs text-stone-400">
                  Belum ada pesanan yang selesai hari ini.
                </div>
              )}
            </div>
          </div>
        )}
      </main>

      {/* 3. Daily Snapshot Dock (Sticky Bottom Bar) */}
      <DailySnapshotDock />

      {/* Receipt Slide-over Modal */}
      <ReceiptSlideOver
        order={selectedReceipt}
        onClose={() => setSelectedReceipt(null)}
      />
    </div>
  );
}
