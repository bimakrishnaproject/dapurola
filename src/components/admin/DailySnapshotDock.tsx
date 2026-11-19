"use client";

import { useStore } from "@/store/useStore";
import { Banknote, ShoppingBag, Trophy } from "lucide-react";

export default function DailySnapshotDock() {
  const { orders } = useStore();

  // Filter today's orders
  const todayStr = new Date().toISOString().split("T")[0];
  const todayOrders = orders.filter((o) => o.createdAt.startsWith(todayStr));
  const activeOrders = todayOrders.length > 0 ? todayOrders : orders;

  // 1. Total Cuan Hari Ini
  const totalCuan = activeOrders.reduce((acc, order) => acc + order.total, 0);

  // 2. Total Porsi Terjual
  const totalPorsi = activeOrders.reduce(
    (acc, order) =>
      acc + order.items.reduce((sum, item) => sum + item.quantity, 0),
    0
  );

  // 3. Menu Paling Laris Hari Ini
  const itemCountMap: Record<string, number> = {};
  activeOrders.forEach((order) => {
    order.items.forEach((item) => {
      itemCountMap[item.product.name] =
        (itemCountMap[item.product.name] || 0) + item.quantity;
    });
  });

  let topItemName = "-";
  let topItemCount = 0;
  Object.entries(itemCountMap).forEach(([name, count]) => {
    if (count > topItemCount) {
      topItemCount = count;
      topItemName = name;
    }
  });

  return (
    <div className="sticky bottom-0 z-30 w-full bg-white/95 backdrop-blur-md border-t border-stone-200 text-stone-900 py-2 sm:py-3 px-3 sm:px-6 lg:px-8 shadow-md font-jakarta">
      {/* MOBILE COMPACT SINGLE-ROW SNAPSHOT */}
      <div className="sm:hidden flex items-center justify-between gap-1 text-xs">
        <div className="flex items-center gap-1.5 min-w-0">
          <span className="w-6 h-6 rounded-full bg-emerald-50 text-emerald-800 flex items-center justify-center shrink-0">
            <Banknote className="w-3.5 h-3.5" />
          </span>
          <div className="min-w-0">
            <span className="text-[9px] text-stone-400 block leading-none">Cuan</span>
            <span className="font-bold text-xs text-stone-900 truncate">
              Rp {(totalCuan / 1000).toLocaleString("id-ID")}k
            </span>
          </div>
        </div>

        <div className="h-6 w-px bg-stone-200" />

        <div className="flex items-center gap-1.5 min-w-0">
          <span className="w-6 h-6 rounded-full bg-blue-50 text-blue-800 flex items-center justify-center shrink-0">
            <ShoppingBag className="w-3.5 h-3.5" />
          </span>
          <div className="min-w-0">
            <span className="text-[9px] text-stone-400 block leading-none">Terjual</span>
            <span className="font-bold text-xs text-stone-900">
              {totalPorsi} porsi
            </span>
          </div>
        </div>

        <div className="h-6 w-px bg-stone-200" />

        <div className="flex items-center gap-1.5 min-w-0 max-w-[38%]">
          <span className="w-6 h-6 rounded-full bg-amber-50 text-amber-800 flex items-center justify-center shrink-0">
            <Trophy className="w-3.5 h-3.5" />
          </span>
          <div className="min-w-0">
            <span className="text-[9px] text-stone-400 block leading-none">Terlaris</span>
            <span className="font-bold text-xs text-stone-900 truncate block">
              {topItemName}
            </span>
          </div>
        </div>
      </div>

      {/* TABLET & DESKTOP FULL-SIZE SNAPSHOT */}
      <div className="hidden sm:flex max-w-[1720px] mx-auto items-center justify-between gap-4">
        {/* Metric 1: Total Cuan Hari Ini */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-800 shrink-0">
            <Banknote strokeWidth={1.8} className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] uppercase tracking-wider text-stone-400 font-semibold block">
              Total Cuan Hari Ini
            </span>
            <span className="text-base sm:text-lg font-bold text-stone-900 tracking-tight">
              Rp {totalCuan.toLocaleString("id-ID")}
            </span>
          </div>
        </div>

        {/* Divider */}
        <div className="w-px h-8 bg-stone-200" />

        {/* Metric 2: Total Porsi Terjual */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-700 shrink-0">
            <ShoppingBag strokeWidth={1.8} className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] uppercase tracking-wider text-stone-400 font-semibold block">
              Total Porsi Terjual
            </span>
            <span className="text-base sm:text-lg font-bold text-stone-900 tracking-tight">
              {totalPorsi} Porsi
            </span>
          </div>
        </div>

        {/* Divider */}
        <div className="w-px h-8 bg-stone-200" />

        {/* Metric 3: Menu Paling Laris */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-700 shrink-0">
            <Trophy strokeWidth={1.8} className="w-5 h-5" />
          </div>
          <div className="min-w-0">
            <span className="text-[10px] uppercase tracking-wider text-stone-400 font-semibold block">
              Menu Paling Laris
            </span>
            <div className="flex items-center gap-1.5">
              <span className="font-playfair text-sm sm:text-base font-bold text-stone-900 truncate">
                {topItemName}
              </span>
              {topItemCount > 0 && (
                <span className="text-xs font-semibold text-emerald-700">
                  ({topItemCount} porsi)
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
