"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useStore } from "@/store/useStore";
import { playKitchenDing } from "./audioChime";
import { 
  Flame, 
  Volume2, 
  VolumeX, 
  ExternalLink, 
  Store, 
  Package, 
  History 
} from "lucide-react";
import { toast } from "sonner";

interface KitchenOperationsBarProps {
  activeView?: "tickets" | "inventory" | "history";
  onViewChange?: (view: "tickets" | "inventory" | "history") => void;
}

export default function KitchenOperationsBar({
  activeView = "tickets",
  onViewChange,
}: KitchenOperationsBarProps) {
  const { 
    isStoreOpen, 
    toggleStoreOpen, 
    isAudioAlertEnabled, 
    toggleAudioAlert,
    orders 
  } = useStore();

  const [timeStr, setTimeStr] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTimeStr(
        now.toLocaleTimeString("id-ID", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false,
        }) + " WIB"
      );
    };
    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  const activeOrdersCount = orders.filter(
    (o) =>
      o.status === "Pesanan Masuk" ||
      o.status === "Lagi Dimasak" ||
      o.status === "Siap Di-pickup / Kirim" ||
      o.status === "Menunggu Pembayaran" ||
      o.status === "Sudah Dibayar" ||
      o.status === "Dikonfirmasi" ||
      o.status === "Lagi Dibikin 🥰" ||
      o.status === "Siap Dikirim 🚚"
  ).length;

  const handleToggleStore = () => {
    toggleStoreOpen();
    if (!isStoreOpen) {
      toast.success("Dapur Resmi Dibuka!", {
        description: "Toko online kembali menerima pesanan pelanggan.",
      });
      playKitchenDing();
    } else {
      toast.warning("Dapur Ditutup Sementara", {
        description: "Pelanggan sementara tidak bisa checkout pesanan baru.",
      });
    }
  };

  const handleToggleAudio = () => {
    toggleAudioAlert();
    if (!isAudioAlertEnabled) {
      playKitchenDing();
      toast.info("Audio Alert Aktif 🔔", {
        description: "Bel berbunyi saat ada pesanan baru masuk.",
      });
    } else {
      toast.info("Audio Alert Dinonaktifkan 🔕");
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-white border-b border-stone-200 text-stone-900 select-none shadow-xs font-jakarta">
      {/* Top Operations Header */}
      <div className="px-3 sm:px-6 lg:px-8 h-14 sm:h-16 flex items-center justify-between gap-2 sm:gap-4">
        {/* Left: Brand Name & Storefront Link */}
        <div className="flex items-center gap-2 sm:gap-4 shrink-0">
          <Link href="/admin" className="flex flex-col group py-0.5">
            <span className="font-playfair text-lg sm:text-2xl font-bold tracking-tight text-[#1B4332] leading-tight">
              DAPUR OLA
            </span>
            <span className="text-[9px] uppercase tracking-widest text-emerald-700 font-bold hidden sm:block">
              KITCHEN POS &amp; KDS
            </span>
          </Link>

          <Link
            href="/"
            target="_blank"
            className="hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-medium transition-colors"
          >
            <span>Buka Etalase</span>
            <ExternalLink strokeWidth={1.75} className="w-3 h-3 text-emerald-700" />
          </Link>
        </div>

        {/* Center: Live Store Status Master Toggle */}
        <div className="flex items-center">
          <button
            onClick={handleToggleStore}
            aria-label="Ubah status buka/tutup dapur"
            className={`h-9 sm:h-10 px-3 sm:px-4 rounded-full text-xs font-semibold transition-all flex items-center gap-2 shadow-xs active:scale-95 cursor-pointer border ${
              isStoreOpen
                ? "bg-emerald-50 text-emerald-900 border-emerald-300 hover:bg-emerald-100"
                : "bg-rose-50 text-rose-900 border-rose-300 hover:bg-rose-100"
            }`}
          >
            <span className="relative flex h-2.5 w-2.5">
              {isStoreOpen ? (
                <>
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-600" />
                </>
              ) : (
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-rose-600" />
              )}
            </span>
            <span className="hidden sm:inline">
              {isStoreOpen ? "Dapur Buka (Terima Pesanan)" : "Dapur Tutup"}
            </span>
            <span className="sm:hidden font-bold">
              {isStoreOpen ? "Buka" : "Tutup"}
            </span>
          </button>
        </div>

        {/* Right: Clock & Audio Alert */}
        <div className="flex items-center gap-1.5 sm:gap-3 text-xs shrink-0">
          {/* Real-time Clock on Desktop */}
          <div className="hidden lg:flex flex-col items-end">
            <span className="text-[9px] uppercase tracking-wider text-stone-400 font-semibold">
              Waktu Dapur
            </span>
            <span className="font-bold text-stone-800 tracking-wide text-xs">
              {timeStr || "--:--:-- WIB"}
            </span>
          </div>

          {/* Active Orders Count Badge */}
          <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-full bg-amber-50 border border-amber-200 text-amber-900 text-xs font-semibold">
            <Flame className="w-3.5 h-3.5 text-amber-600" />
            <span>{activeOrdersCount}</span>
            <span className="hidden sm:inline text-amber-800/80">Order</span>
          </div>

          {/* Audio Toggle */}
          <button
            onClick={handleToggleAudio}
            title={isAudioAlertEnabled ? "Audio alert aktif" : "Audio dibisukan"}
            className={`p-2 rounded-full border text-xs flex items-center justify-center transition-colors cursor-pointer ${
              isAudioAlertEnabled
                ? "bg-emerald-50 text-emerald-800 border-emerald-300 hover:bg-emerald-100"
                : "bg-stone-100 text-stone-400 border-stone-200 hover:text-stone-700"
            }`}
          >
            {isAudioAlertEnabled ? (
              <Volume2 strokeWidth={2} className="w-4 h-4 text-emerald-700" />
            ) : (
              <VolumeX strokeWidth={2} className="w-4 h-4 text-stone-400" />
            )}
          </button>
        </div>
      </div>

      {/* Operational View Selector Tabs (Responsive Clean Segmented Bar) */}
      {onViewChange && (
        <div className="border-t border-stone-200 bg-stone-50/80 px-3 sm:px-6 lg:px-8 py-2 flex items-center justify-between overflow-x-auto no-scrollbar">
          <div className="flex items-center gap-1.5 sm:gap-2">
            <button
              onClick={() => onViewChange("tickets")}
              className={`px-3 sm:px-4 py-1.5 sm:py-2 text-xs font-semibold transition-all cursor-pointer rounded-full ${
                activeView === "tickets"
                  ? "bg-[#1B4332] text-white shadow-xs"
                  : "bg-white text-stone-700 border border-stone-200 hover:bg-stone-100"
              }`}
            >
              <span className="flex items-center gap-1.5">
                <Flame className="w-3.5 h-3.5" />
                <span>Tiket Dapur</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                  activeView === "tickets" ? "bg-white/20 text-white" : "bg-stone-100 text-stone-700 font-bold"
                }`}>
                  {activeOrdersCount}
                </span>
              </span>
            </button>

            <button
              onClick={() => onViewChange("inventory")}
              className={`px-3 sm:px-4 py-1.5 sm:py-2 text-xs font-semibold transition-all cursor-pointer rounded-full ${
                activeView === "inventory"
                  ? "bg-[#1B4332] text-white shadow-xs"
                  : "bg-white text-stone-700 border border-stone-200 hover:bg-stone-100"
              }`}
            >
              <span className="flex items-center gap-1.5">
                <Package className="w-3.5 h-3.5" />
                <span>Kelola Stok</span>
              </span>
            </button>

            <button
              onClick={() => onViewChange("history")}
              className={`px-3 sm:px-4 py-1.5 sm:py-2 text-xs font-semibold transition-all cursor-pointer rounded-full ${
                activeView === "history"
                  ? "bg-[#1B4332] text-white shadow-xs"
                  : "bg-white text-stone-700 border border-stone-200 hover:bg-stone-100"
              }`}
            >
              <span className="flex items-center gap-1.5">
                <History className="w-3.5 h-3.5" />
                <span>Riwayat Selesai</span>
              </span>
            </button>
          </div>

          <div className="hidden md:flex items-center gap-2 text-xs text-stone-500">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="font-medium">POS Dapur Aktif</span>
          </div>
        </div>
      )}
    </header>
  );
}
