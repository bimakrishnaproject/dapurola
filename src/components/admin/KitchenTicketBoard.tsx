"use client";

import { useState } from "react";
import { useStore } from "@/store/useStore";
import { Order } from "@/store/types";
import { playKitchenDing } from "./audioChime";
import { 
  Flame, 
  Check, 
  Clock, 
  AlertCircle, 
  Printer, 
  Truck, 
  User, 
  Phone, 
  ArrowRight,
  PackageCheck,
  CheckCircle2
} from "lucide-react";
import { toast } from "sonner";
import ReceiptSlideOver from "./ReceiptSlideOver";

export default function KitchenTicketBoard() {
  const { orders, updateOrderStatus, isAudioAlertEnabled } = useStore();
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [mobileTab, setMobileTab] = useState<"incoming" | "cooking" | "ready">("incoming");

  // Group orders into 3 active KDS columns
  const incomingOrders = orders.filter(
    (o) =>
      o.status === "Pesanan Masuk" ||
      o.status === "Menunggu Pembayaran" ||
      o.status === "Sudah Dibayar" ||
      o.status === "Dikonfirmasi"
  );

  const cookingOrders = orders.filter(
    (o) => o.status === "Lagi Dimasak" || o.status === "Lagi Dibikin 🥰"
  );

  const readyOrders = orders.filter(
    (o) =>
      o.status === "Siap Di-pickup / Kirim" ||
      o.status === "Siap Dikirim 🚚" ||
      o.status === "Dalam Perjalanan"
  );

  const getElapsedTime = (isoString: string) => {
    const diffMs = Date.now() - new Date(isoString).getTime();
    const diffMins = Math.floor(diffMs / 60000);
    if (diffMins < 1) return "Baru saja";
    if (diffMins < 60) return `${diffMins} mnt lalu`;
    const diffHours = Math.floor(diffMins / 60);
    return `${diffHours} jam ${diffMins % 60} mnt lalu`;
  };

  const handleStartCooking = (order: Order) => {
    updateOrderStatus(order.id, "Lagi Dimasak");
    if (isAudioAlertEnabled) playKitchenDing();
    toast.success(`Order #${order.id} Mulai Dimasak!`, {
      description: "Tiket dipindahkan ke kolom Lagi Dimasak.",
    });
  };

  const handleMarkReady = (order: Order) => {
    updateOrderStatus(order.id, "Siap Di-pickup / Kirim");
    if (isAudioAlertEnabled) playKitchenDing();
    toast.success(`Order #${order.id} Siap Kirim / Pickup!`, {
      description: "Boks siap diserahkan ke kurir atau pelanggan.",
    });
  };

  const handleCompleteOrder = (order: Order) => {
    updateOrderStatus(order.id, "Selesai");
    if (isAudioAlertEnabled) playKitchenDing();
    toast.success(`Order #${order.id} Selesai (Beres)!`, {
      description: "Pesanan masuk ke arsip riwayat selesai.",
    });
  };

  const renderTicketCard = (
    order: Order,
    stage: "incoming" | "cooking" | "ready"
  ) => {
    const elapsed = getElapsedTime(order.createdAt);
    const isUrgent = order.deliveryOption.includes("Instan");

    return (
      <div
        key={order.id}
        className="bg-white border-b sm:border border-stone-200/90 sm:rounded-2xl p-3.5 sm:p-5 shadow-none sm:shadow-xs hover:border-emerald-600/40 transition-all flex flex-col justify-between space-y-3"
      >
        {/* Ticket Header Meta */}
        <div className="flex items-start justify-between gap-2 pb-2.5 border-b border-stone-100">
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-sm sm:text-base text-stone-900">
                #{order.id}
              </span>
              {isUrgent && (
                <span className="bg-rose-50 text-rose-700 border border-rose-200 text-[10px] font-bold px-2 py-0.5 rounded-full">
                  KIRIM INSTAN
                </span>
              )}
            </div>
            <div className="text-xs text-stone-500 mt-0.5 flex items-center gap-1.5 flex-wrap">
              <User className="w-3.5 h-3.5 text-stone-400" />
              <span className="text-stone-900 font-semibold">{order.customerName}</span>
              <span>•</span>
              <span>{order.customerPhone}</span>
            </div>
          </div>

          <span
            className={`text-[10px] font-semibold px-2.5 py-1 rounded-full shrink-0 flex items-center gap-1 ${
              stage === "incoming"
                ? "bg-amber-50 text-amber-900 border border-amber-200"
                : stage === "cooking"
                ? "bg-emerald-50 text-emerald-900 border border-emerald-200"
                : "bg-blue-50 text-blue-900 border border-blue-200"
            }`}
          >
            <Clock className="w-3 h-3" />
            <span>{elapsed}</span>
          </span>
        </div>

        {/* Items List */}
        <div className="space-y-1.5 py-1">
          {order.items.map((item, idx) => (
            <div key={idx} className="flex items-start justify-between gap-2 text-xs sm:text-sm">
              <div className="flex items-center gap-2">
                <span className="font-bold text-white bg-[#1B4332] px-2 py-0.5 rounded-md text-xs">
                  {item.quantity}x
                </span>
                <span className="font-medium text-stone-800">
                  {item.product.name}
                </span>
              </div>
              <span className="text-stone-500 text-xs shrink-0 font-medium">
                Rp {(item.product.price * item.quantity).toLocaleString("id-ID")}
              </span>
            </div>
          ))}
        </div>

        {/* Customer Special Notes */}
        {order.items.some((i) => i.notes) && (
          <div className="bg-amber-50/90 border border-amber-200/80 rounded-xl p-2.5 sm:p-3 text-xs text-amber-950 space-y-1">
            <div className="flex items-center gap-1.5 font-semibold text-amber-900 text-[11px]">
              <AlertCircle className="w-3.5 h-3.5" />
              <span>Catatan Khusus Pelanggan:</span>
            </div>
            {order.items
              .filter((i) => i.notes)
              .map((i, idx) => (
                <p key={idx} className="italic text-xs pl-5 text-amber-900/90">
                  "{i.notes}"
                </p>
              ))}
          </div>
        )}

        {/* Delivery & Total */}
        <div className="flex items-center justify-between text-xs text-stone-500 pt-1 border-t border-stone-100">
          <span className="truncate max-w-[60%]">{order.deliveryOption}</span>
          <span className="text-stone-900 font-bold text-sm sm:text-base">
            Rp {order.total.toLocaleString("id-ID")}
          </span>
        </div>

        {/* Action Buttons (Large, Touch-Friendly on All Screens) */}
        <div className="grid grid-cols-3 gap-2 pt-1">
          <button
            onClick={() => setSelectedOrder(order)}
            className="col-span-1 h-10 sm:h-11 rounded-xl bg-stone-50 hover:bg-stone-100 text-stone-800 text-xs font-semibold flex items-center justify-center gap-1.5 border border-stone-200 active:scale-95 transition-all cursor-pointer"
            title="Cetak struk thermal"
          >
            <Printer strokeWidth={1.75} className="w-4 h-4 text-stone-600" />
            <span className="hidden sm:inline">Struk</span>
          </button>

          {stage === "incoming" && (
            <button
              onClick={() => handleStartCooking(order)}
              className="col-span-2 h-10 sm:h-11 rounded-xl bg-[#1B4332] hover:bg-[#143225] text-white text-xs font-semibold flex items-center justify-center gap-1.5 active:scale-95 transition-all shadow-xs cursor-pointer"
            >
              <span>Mulai Masak</span>
              <ArrowRight strokeWidth={2} className="w-4 h-4" />
            </button>
          )}

          {stage === "cooking" && (
            <button
              onClick={() => handleMarkReady(order)}
              className="col-span-2 h-10 sm:h-11 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-semibold flex items-center justify-center gap-1.5 active:scale-95 transition-all shadow-xs cursor-pointer"
            >
              <PackageCheck strokeWidth={2} className="w-4 h-4" />
              <span>Siap Kirim</span>
            </button>
          )}

          {stage === "ready" && (
            <button
              onClick={() => handleCompleteOrder(order)}
              className="col-span-2 h-10 sm:h-11 rounded-xl bg-stone-900 hover:bg-black text-white text-xs font-semibold flex items-center justify-center gap-1.5 active:scale-95 transition-all shadow-xs cursor-pointer"
            >
              <CheckCircle2 strokeWidth={2} className="w-4 h-4" />
              <span>Beres (Selesai)</span>
            </button>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="w-full space-y-4 font-jakarta">
      {/* MOBILE SEGMENTED FILTER BAR (Solves cramped columns on mobile phone) */}
      <div className="md:hidden flex items-center gap-1 bg-stone-100 p-1 rounded-xl">
        <button
          onClick={() => setMobileTab("incoming")}
          className={`flex-1 py-2 rounded-lg text-xs font-semibold transition-all flex items-center justify-center gap-1.5 ${
            mobileTab === "incoming"
              ? "bg-white text-amber-950 shadow-xs"
              : "text-stone-600 hover:text-stone-900"
          }`}
        >
          <span>Masuk</span>
          <span className="px-1.5 py-0.2 rounded-full bg-amber-100 text-amber-900 text-[10px] font-bold">
            {incomingOrders.length}
          </span>
        </button>

        <button
          onClick={() => setMobileTab("cooking")}
          className={`flex-1 py-2 rounded-lg text-xs font-semibold transition-all flex items-center justify-center gap-1.5 ${
            mobileTab === "cooking"
              ? "bg-white text-emerald-950 shadow-xs"
              : "text-stone-600 hover:text-stone-900"
          }`}
        >
          <span>Dimasak</span>
          <span className="px-1.5 py-0.2 rounded-full bg-emerald-100 text-emerald-900 text-[10px] font-bold">
            {cookingOrders.length}
          </span>
        </button>

        <button
          onClick={() => setMobileTab("ready")}
          className={`flex-1 py-2 rounded-lg text-xs font-semibold transition-all flex items-center justify-center gap-1.5 ${
            mobileTab === "ready"
              ? "bg-white text-blue-950 shadow-xs"
              : "text-stone-600 hover:text-stone-900"
          }`}
        >
          <span>Siap Kirim</span>
          <span className="px-1.5 py-0.2 rounded-full bg-blue-100 text-blue-900 text-[10px] font-bold">
            {readyOrders.length}
          </span>
        </button>
      </div>

      {/* MOBILE VIEW: "KARTU DIBUKA" FULL-BLEED STREAM (ZERO DOUBLE PADDING) */}
      <div className="md:hidden bg-white border border-stone-200 rounded-2xl overflow-hidden divide-y divide-stone-100">
        {mobileTab === "incoming" && (
          <div className="space-y-0">
            {incomingOrders.map((o) => renderTicketCard(o, "incoming"))}
            {incomingOrders.length === 0 && (
              <div className="py-16 text-center text-xs text-stone-400">
                Belum ada pesanan masuk baru.
              </div>
            )}
          </div>
        )}

        {mobileTab === "cooking" && (
          <div className="space-y-0">
            {cookingOrders.map((o) => renderTicketCard(o, "cooking"))}
            {cookingOrders.length === 0 && (
              <div className="py-16 text-center text-xs text-stone-400">
                Tidak ada menu yang sedang dimasak saat ini.
              </div>
            )}
          </div>
        )}

        {mobileTab === "ready" && (
          <div className="space-y-0">
            {readyOrders.map((o) => renderTicketCard(o, "ready"))}
            {readyOrders.length === 0 && (
              <div className="py-16 text-center text-xs text-stone-400">
                Belum ada pesanan yang siap di-pickup/kirim.
              </div>
            )}
          </div>
        )}
      </div>

      {/* TABLET & DESKTOP VIEW: 3-COLUMN KANBAN BOARD */}
      <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-5 items-start">
        {/* ================= COLUMN 1: PESANAN MASUK ================= */}
        <div className="rounded-3xl bg-[#FAF9F5] border border-amber-200/80 overflow-hidden flex flex-col shadow-xs">
          <div className="p-4 border-b border-amber-200/80 bg-amber-50/80 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-ping" />
              <h2 className="text-xs uppercase font-bold text-amber-950 tracking-wider">
                Pesanan Masuk
              </h2>
            </div>
            <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-amber-400 text-amber-950">
              {incomingOrders.length}
            </span>
          </div>

          <div className="p-3.5 space-y-3.5 min-h-[460px]">
            {incomingOrders.map((o) => renderTicketCard(o, "incoming"))}
            {incomingOrders.length === 0 && (
              <div className="py-24 text-center text-xs text-stone-400">
                Belum ada pesanan masuk baru.
              </div>
            )}
          </div>
        </div>

        {/* ================= COLUMN 2: LAGI DIMASAK ================= */}
        <div className="rounded-3xl bg-[#F4F9F6] border border-emerald-200/80 overflow-hidden flex flex-col shadow-xs">
          <div className="p-4 border-b border-emerald-200/80 bg-emerald-50/80 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Flame className="w-4 h-4 text-emerald-600 animate-pulse" />
              <h2 className="text-xs uppercase font-bold text-emerald-950 tracking-wider">
                Lagi Dimasak
              </h2>
            </div>
            <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-emerald-700 text-white">
              {cookingOrders.length}
            </span>
          </div>

          <div className="p-3.5 space-y-3.5 min-h-[460px]">
            {cookingOrders.map((o) => renderTicketCard(o, "cooking"))}
            {cookingOrders.length === 0 && (
              <div className="py-24 text-center text-xs text-stone-400">
                Dapur sedang santai, tidak ada yang dimasak.
              </div>
            )}
          </div>
        </div>

        {/* ================= COLUMN 3: SIAP DI-PICKUP / KIRIM ================= */}
        <div className="rounded-3xl bg-[#F6F8FA] border border-blue-200/80 overflow-hidden flex flex-col shadow-xs md:col-span-2 lg:col-span-1">
          <div className="p-4 border-b border-blue-200/80 bg-blue-50/80 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Truck className="w-4 h-4 text-blue-600" />
              <h2 className="text-xs uppercase font-bold text-blue-950 tracking-wider">
                Siap Di-pickup / Kirim
              </h2>
            </div>
            <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-blue-600 text-white">
              {readyOrders.length}
            </span>
          </div>

          <div className="p-3.5 space-y-3.5 min-h-[460px]">
            {readyOrders.map((o) => renderTicketCard(o, "ready"))}
            {readyOrders.length === 0 && (
              <div className="py-24 text-center text-xs text-stone-400">
                Semua pesanan siap sudah diantar kurir.
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Receipt Slide-over Modal */}
      <ReceiptSlideOver
        order={selectedOrder}
        onClose={() => setSelectedOrder(null)}
      />
    </div>
  );
}
