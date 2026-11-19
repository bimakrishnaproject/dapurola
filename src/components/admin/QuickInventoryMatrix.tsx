"use client";

import { useState } from "react";
import Image from "next/image";
import { useStore } from "@/store/useStore";
import { Product } from "@/store/types";
import { 
  Check, 
  X, 
  Minus, 
  Plus, 
  AlertTriangle, 
  RotateCcw, 
  Sparkles,
  Edit2
} from "lucide-react";
import { toast } from "sonner";

export default function QuickInventoryMatrix() {
  const { products, toggleProductAvailability, updateProductStock, updateProductPrice } = useStore();
  const [editingPriceId, setEditingPriceId] = useState<string | null>(null);
  const [tempPrice, setTempPrice] = useState<number>(0);

  const handleStockChange = (product: Product, delta: number) => {
    const current = product.remainingPortion ?? product.stock ?? 0;
    const newStock = Math.max(0, current + delta);
    updateProductStock(product.id, newStock);
    if (newStock === 0) {
      toast.warning(`${product.name} habis hari ini!`, {
        description: "Status otomatis diubah jadi Habis Hari Ini.",
      });
    } else {
      toast.success(`${product.name}: sisa ${newStock} porsi`);
    }
  };

  const handleToggleActive = (product: Product) => {
    toggleProductAvailability(product.id);
    if (product.isActive) {
      toast.warning(`${product.name} Ditandai HABIS`, {
        description: "Menu tidak bisa dipilih pelanggan di etalase.",
      });
    } else {
      toast.success(`${product.name} Kembali TERSEDIA`, {
        description: "Menu aktif kembali di etalase belanja.",
      });
    }
  };

  const startEditPrice = (product: Product) => {
    setEditingPriceId(product.id);
    setTempPrice(product.price);
  };

  const savePrice = (productId: string) => {
    if (tempPrice > 0) {
      updateProductPrice(productId, tempPrice);
      toast.success("Harga berhasil diperbarui!");
    }
    setEditingPriceId(null);
  };

  return (
    <div className="w-full space-y-4 font-jakarta">
      {/* Table / Matrix Container (Clean White Modern POS) */}
      <div className="bg-white border sm:border-stone-200 sm:rounded-3xl overflow-hidden shadow-xs">
        {/* Table Header (Desktop Only) */}
        <div className="hidden md:grid grid-cols-12 px-6 py-3.5 bg-stone-50 border-b border-stone-200 text-[11px] uppercase tracking-wider text-stone-500 font-bold">
          <div className="col-span-5">Menu &amp; Kategori</div>
          <div className="col-span-2 text-center">Status Etalase</div>
          <div className="col-span-3 text-center">Batch Porsi Harian</div>
          <div className="col-span-2 text-right">Harga Jual</div>
        </div>

        {/* Matrix Rows (Card Dibuka di Mobile) */}
        <div className="divide-y divide-stone-200/80">
          {products.map((product) => {
            const portions = product.remainingPortion ?? product.stock ?? 0;
            const isAvailable = product.isActive && portions > 0;
            const isLowStock = isAvailable && portions <= 3;

            return (
              <div
                key={product.id}
                className={`p-3.5 sm:px-6 sm:py-4 transition-colors flex flex-col md:grid md:grid-cols-12 md:items-center gap-3 sm:gap-4 ${
                  !isAvailable ? "bg-rose-50/20" : "bg-white hover:bg-stone-50/60"
                }`}
              >
                {/* 1. Menu Info with Soft Thumbnail */}
                <div className="md:col-span-5 flex items-center gap-3">
                  <div className="relative w-14 h-14 sm:w-16 sm:h-16 shrink-0 rounded-xl overflow-hidden bg-stone-100 border border-stone-200/80">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover"
                    />
                  </div>

                  <div className="min-w-0 flex-1">
                    <span className="text-[10px] uppercase font-semibold text-amber-800 block">
                      {product.category}
                    </span>
                    <h3 className="font-playfair text-sm sm:text-base font-bold text-stone-900 truncate">
                      {product.name}
                    </h3>
                    <p className="text-xs text-stone-500 truncate mt-0.5">
                      {product.portionWeight?.split("•")[0] || "500g"}
                    </p>
                  </div>
                </div>

                {/* 2. Instant Toggle: Tersedia vs Habis */}
                <div className="md:col-span-2 flex items-center justify-between md:justify-center">
                  <span className="md:hidden text-xs text-stone-500 font-medium">Status Etalase:</span>
                  <button
                    onClick={() => handleToggleActive(product)}
                    className={`h-9 px-3.5 rounded-full text-xs font-semibold flex items-center gap-1.5 border transition-all active:scale-95 cursor-pointer ${
                      !isAvailable
                        ? "bg-rose-50 text-rose-800 border-rose-300 hover:bg-rose-100"
                        : isLowStock
                        ? "bg-amber-50 text-amber-900 border-amber-300 hover:bg-amber-100"
                        : "bg-emerald-50 text-emerald-900 border-emerald-300 hover:bg-emerald-100"
                    }`}
                  >
                    <span className="w-2 h-2 rounded-full shrink-0 bg-current" />
                    <span>
                      {!isAvailable
                        ? "Habis Hari Ini"
                        : isLowStock
                        ? "Sisa Sedikit"
                        : "Tersedia"}
                    </span>
                  </button>
                </div>

                {/* 3. Batch Portion Stepper */}
                <div className="md:col-span-3 flex items-center justify-between md:justify-center gap-2">
                  <span className="md:hidden text-xs text-stone-500 font-medium">Porsi Hari Ini:</span>
                  <div className="flex items-center gap-1.5">
                    <div className="flex items-center rounded-full border border-stone-300 bg-stone-50/60 overflow-hidden shadow-2xs">
                      <button
                        onClick={() => handleStockChange(product, -1)}
                        className="w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center hover:bg-stone-200 text-stone-800 active:scale-95 transition-colors cursor-pointer"
                        aria-label="Kurangi 1 porsi"
                      >
                        <Minus strokeWidth={2} className="w-3.5 h-3.5" />
                      </button>

                      <div className="w-12 sm:w-14 text-center">
                        <span className="font-bold text-xs sm:text-sm text-stone-900">
                          {portions}
                        </span>
                        <span className="text-[9px] text-stone-400 block -mt-1 uppercase font-medium">
                          porsi
                        </span>
                      </div>

                      <button
                        onClick={() => handleStockChange(product, 1)}
                        className="w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center hover:bg-stone-200 text-stone-800 active:scale-95 transition-colors cursor-pointer"
                        aria-label="Tambah 1 porsi"
                      >
                        <Plus strokeWidth={2} className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {/* Quick +5 batch jump */}
                    <button
                      onClick={() => handleStockChange(product, 5)}
                      className="h-8 sm:h-9 px-2.5 rounded-full bg-emerald-50 hover:bg-emerald-100 text-emerald-900 text-xs font-bold border border-emerald-200 active:scale-95 transition-colors cursor-pointer"
                      title="Tambah batch +5 porsi"
                    >
                      +5
                    </button>
                  </div>
                </div>

                {/* 4. Fast Price Editor */}
                <div className="md:col-span-2 flex items-center justify-between md:justify-end gap-2">
                  <span className="md:hidden text-xs text-stone-500 font-medium">Harga:</span>

                  {editingPriceId === product.id ? (
                    <div className="flex items-center gap-1.5">
                      <input
                        type="number"
                        value={tempPrice}
                        onChange={(e) => setTempPrice(parseInt(e.target.value) || 0)}
                        autoFocus
                        className="w-24 h-9 bg-white border border-[#1B4332] rounded-lg px-2 text-xs font-bold text-stone-900 outline-none"
                      />
                      <button
                        onClick={() => savePrice(product.id)}
                        className="h-9 px-2.5 rounded-lg bg-[#1B4332] text-white font-bold text-xs hover:bg-[#143225] cursor-pointer"
                      >
                        <Check strokeWidth={2.5} className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => setEditingPriceId(null)}
                        className="h-9 px-2 rounded-lg bg-stone-200 text-stone-600 text-xs hover:bg-stone-300 cursor-pointer"
                      >
                        <X strokeWidth={2} className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <span className="text-xs sm:text-sm font-bold text-stone-900">
                        Rp {product.price.toLocaleString("id-ID")}
                      </span>
                      <button
                        onClick={() => startEditPrice(product)}
                        className="p-1.5 rounded-full hover:bg-stone-100 text-stone-400 hover:text-stone-700 transition-colors cursor-pointer"
                        title="Ubah harga"
                      >
                        <Edit2 strokeWidth={1.75} className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
