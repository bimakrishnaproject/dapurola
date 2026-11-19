"use client";

import { useStore } from "@/store/useStore";
import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, Trash2, ArrowRight, ShoppingBag, ShieldCheck, ChevronLeft } from "lucide-react";

export default function CartPage() {
  const { cart, updateCartQuantity, removeFromCart, designConcept } = useStore();

  const isArtisanal = designConcept === "artisanal" || !designConcept;
  const isNordic = designConcept === "nordic";

  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
  const subtotal = cart.reduce((total, item) => total + item.product.price * item.quantity, 0);

  if (cart.length === 0) {
    return (
      <div className="container mx-auto px-4 md:px-8 py-24 flex flex-col items-center justify-center text-center font-jakarta">
        <div
          className={`w-16 h-16 rounded-full flex items-center justify-center mb-6 ${
            isArtisanal ? "bg-stone-100 text-stone-400" : "bg-neutral-100 text-neutral-400"
          }`}
        >
          <ShoppingBag strokeWidth={1.5} className="w-8 h-8" />
        </div>
        <span
          className={`text-xs uppercase tracking-wider font-semibold mb-2 ${
            isArtisanal ? "text-amber-800" : "text-neutral-500"
          }`}
        >
          Keranjang Masih Kosong
        </span>
        <h1
          className={`text-2xl sm:text-4xl font-bold mb-3 ${
            isArtisanal ? "font-playfair text-stone-900" : "font-jakarta text-neutral-900"
          }`}
        >
          Belum Ada Menu yang Dibungkus
        </h1>
        <p className="text-sm text-stone-500 max-w-sm mb-8 leading-relaxed">
          Yuk cobain donat kampung empuk, bolu gulung lembut, atau brownies fudgy fresh hari ini!
        </p>
        <Link
          href="/#menu-list"
          className={`px-8 py-3.5 text-xs font-semibold shadow-xs transition-all active:scale-95 ${
            isArtisanal
              ? "rounded-full bg-[#1B4332] hover:bg-[#143225] text-white"
              : "rounded-xl bg-neutral-900 hover:bg-black text-white"
          }`}
        >
          Pilih Menu Jajan Sekarang →
        </Link>
      </div>
    );
  }

  return (
    <div
      className={`w-full min-h-screen pb-24 font-jakarta transition-colors duration-200 ${
        isArtisanal ? "bg-[#FAF7F2] text-stone-900" : "bg-white text-neutral-900"
      }`}
    >
      {/* Top Banner Header */}
      <div
        className={`border-b py-8 sm:py-12 ${
          isArtisanal
            ? "bg-[#F5EFE6] border-stone-200"
            : "bg-neutral-50 border-neutral-200"
        }`}
      >
        <div className="container mx-auto px-4 md:px-8">
          <Link
            href="/#menu-list"
            className="inline-flex items-center gap-1.5 text-xs text-stone-500 hover:text-stone-900 mb-3 transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Kembali ke Etalase Menu</span>
          </Link>
          <h1
            className={`text-2xl sm:text-4xl font-bold tracking-tight ${
              isArtisanal ? "font-playfair text-[#1B4332]" : "font-jakarta text-neutral-900"
            }`}
          >
            Keranjang Belanja ({totalItems} Porsi)
          </h1>
          <p className="text-xs sm:text-sm text-stone-600 mt-1.5">
            Periksa kembali pesanan Anda sebelum lanjut ke pengisian alamat dan pembayaran.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-3 sm:px-6 md:px-8 pt-6 sm:pt-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-start">
          {/* Cart Items List: "KARTU DIBUKA DI MOBILE" (Edge-to-Edge with Zero Nested Double-Padding) */}
          <div
            className={`lg:col-span-7 bg-white divide-y divide-stone-100 ${
              isArtisanal
                ? "sm:rounded-3xl sm:border sm:border-stone-200/80 sm:shadow-xs overflow-hidden"
                : "sm:rounded-2xl sm:border sm:border-neutral-200 overflow-hidden"
            }`}
          >
            {cart.map((item) => (
              <div
                key={item.product.id}
                className="p-3.5 sm:p-5 flex gap-3.5 sm:gap-5 hover:bg-stone-50/50 transition-colors"
              >
                {/* Product Thumbnail */}
                <div
                  className={`relative w-20 h-24 sm:w-28 sm:h-28 shrink-0 overflow-hidden bg-stone-100 ${
                    isArtisanal ? "rounded-xl" : "rounded-lg"
                  }`}
                >
                  <Image
                    src={item.product.image}
                    alt={item.product.name}
                    fill
                    className="object-cover"
                  />
                </div>

                {/* Details */}
                <div className="flex-1 flex flex-col justify-between min-w-0">
                  <div>
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0">
                        <span
                          className={`text-[10px] uppercase font-semibold block ${
                            isArtisanal ? "text-amber-800" : "text-neutral-500"
                          }`}
                        >
                          {item.product.category}
                        </span>
                        <h3
                          className={`text-sm sm:text-base font-bold leading-snug line-clamp-2 mt-0.5 ${
                            isArtisanal ? "font-playfair text-stone-900" : "font-jakarta text-neutral-900"
                          }`}
                        >
                          {item.product.name}
                        </h3>
                      </div>
                      <button
                        onClick={() => removeFromCart(item.product.id)}
                        className="text-stone-400 hover:text-rose-600 p-1 transition-colors cursor-pointer shrink-0"
                        aria-label="Hapus menu dari keranjang"
                      >
                        <Trash2 strokeWidth={1.75} className="w-4 h-4" />
                      </button>
                    </div>

                    <p className="text-xs text-stone-500 mt-1">
                      Rp {item.product.price.toLocaleString("id-ID")} • {item.product.portionWeight?.split("•")[0] || "500g"}
                    </p>

                    {item.notes && (
                      <p className="text-xs text-stone-700 bg-stone-100/90 rounded-md px-2.5 py-1 mt-2 inline-block">
                        Catatan: {item.notes}
                      </p>
                    )}
                  </div>

                  {/* Quantity & Subtotal Stepper */}
                  <div className="flex items-center justify-between pt-3 mt-2 border-t border-stone-100">
                    <div
                      className={`flex items-center ${
                        isArtisanal
                          ? "rounded-full bg-stone-100 border border-stone-200"
                          : "rounded-lg bg-neutral-100 border border-neutral-200"
                      }`}
                    >
                      <button
                        onClick={() => updateCartQuantity(item.product.id, Math.max(1, item.quantity - 1))}
                        className="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center hover:bg-stone-200 text-stone-800 transition-colors cursor-pointer rounded-full"
                        aria-label="Kurangi porsi"
                      >
                        <Minus strokeWidth={2} className="w-3.5 h-3.5" />
                      </button>
                      <span className="w-7 sm:w-8 text-center font-bold text-xs sm:text-sm text-stone-900">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateCartQuantity(item.product.id, Math.min(item.product.stock, item.quantity + 1))}
                        className="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center hover:bg-stone-200 text-stone-800 transition-colors cursor-pointer rounded-full"
                        aria-label="Tambah porsi"
                      >
                        <Plus strokeWidth={2} className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <span
                      className={`text-sm sm:text-base font-bold ${
                        isArtisanal ? "text-[#1B4332]" : "text-neutral-900"
                      }`}
                    >
                      Rp {(item.product.price * item.quantity).toLocaleString("id-ID")}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Right Summary Box (Sticky on Desktop) */}
          <div className="lg:col-span-5">
            <div
              className={`bg-white p-5 sm:p-7 space-y-5 sticky top-24 shadow-xs ${
                isArtisanal
                  ? "rounded-3xl border border-stone-200/80"
                  : "rounded-2xl border border-neutral-200"
              }`}
            >
              <h2
                className={`text-base font-bold pb-3 border-b border-stone-100 ${
                  isArtisanal ? "font-playfair text-[#1B4332]" : "font-jakarta text-neutral-900"
                }`}
              >
                Ringkasan Belanja
              </h2>

              <div className="space-y-2.5 text-xs sm:text-sm">
                <div className="flex justify-between text-stone-500">
                  <span>Total Porsi</span>
                  <span className="font-semibold text-stone-900">{totalItems} Porsi</span>
                </div>
                <div className="flex justify-between text-stone-500">
                  <span>Subtotal Menu</span>
                  <span className="font-semibold text-stone-900">
                    Rp {subtotal.toLocaleString("id-ID")}
                  </span>
                </div>
                <div className="flex justify-between text-stone-400 text-xs">
                  <span>Ongkos Kirim</span>
                  <span>Dihitung di langkah checkout</span>
                </div>
                <div className="pt-3 border-t border-stone-100 flex justify-between text-base font-bold text-stone-900">
                  <span>Total Sementara</span>
                  <span className={isArtisanal ? "text-[#1B4332]" : "text-emerald-700"}>
                    Rp {subtotal.toLocaleString("id-ID")}
                  </span>
                </div>
              </div>

              <div className="space-y-2.5 pt-2">
                <Link
                  href="/checkout"
                  className={`w-full h-12 text-xs font-semibold flex items-center justify-center gap-2 transition-all shadow-xs active:scale-95 cursor-pointer ${
                    isArtisanal
                      ? "rounded-full bg-[#1B4332] hover:bg-[#143225] text-white"
                      : "rounded-xl bg-neutral-900 hover:bg-black text-white"
                  }`}
                >
                  <span>Lanjut ke Pengiriman</span>
                  <ArrowRight strokeWidth={2} className="w-4 h-4" />
                </Link>

                <Link
                  href="/#menu-list"
                  className={`w-full h-11 text-xs font-semibold flex items-center justify-center transition-colors border ${
                    isArtisanal
                      ? "rounded-full bg-white hover:bg-stone-50 text-stone-700 border-stone-200"
                      : "rounded-xl bg-white hover:bg-neutral-50 text-neutral-700 border-neutral-300"
                  }`}
                >
                  Tambah Menu Lain
                </Link>
              </div>

              <div className="text-xs text-stone-400 pt-3 flex items-center justify-center gap-1.5 border-t border-stone-100">
                <ShieldCheck strokeWidth={1.75} className="w-4 h-4 text-emerald-600" />
                <span>Bahan alami • 100% Halal ID • Fresh harian</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
