"use client";

import { useStore } from "@/store/useStore";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { X, Plus, Minus, Trash2, ArrowRight, ShoppingBag } from "lucide-react";

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CartDrawer({ isOpen, onClose }: CartDrawerProps) {
  const { cart, updateCartQuantity, removeFromCart, designConcept } = useStore();

  const isArtisanal = designConcept === "artisanal" || !designConcept;
  const isNordic = designConcept === "nordic";

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
            className="fixed inset-0 bg-stone-900/60 backdrop-blur-xs"
          />

          {/* Drawer Panel */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className={`relative z-10 w-full max-w-md h-full flex flex-col shadow-2xl transition-colors duration-200 ${
              isArtisanal
                ? "bg-[#FAF7F2] text-stone-900 border-l border-stone-200"
                : isNordic
                ? "bg-white text-neutral-900 border-l border-neutral-200"
                : "bg-[#FAFBF9] text-[#073524] border-l border-[#D4E5DC]"
            }`}
          >
            {/* Header */}
            <div
              className={`px-6 py-5 border-b flex items-center justify-between ${
                isArtisanal
                  ? "bg-[#F5EFE6] border-stone-200"
                  : isNordic
                  ? "bg-neutral-50 border-neutral-200"
                  : "bg-[#EAF4EE] border-[#D4E5DC]"
              }`}
            >
              <div>
                <span
                  className={`text-[10px] uppercase tracking-wider font-semibold block mb-0.5 ${
                    isArtisanal
                      ? "text-amber-800 font-jakarta"
                      : isNordic
                      ? "text-neutral-500 font-jakarta"
                      : "text-[#00A65E] font-mono"
                  }`}
                >
                  Pesanan Anda
                </span>
                <h2
                  className={`text-xl font-bold tracking-tight ${
                    isArtisanal
                      ? "font-playfair text-[#1B4332]"
                      : isNordic
                      ? "font-jakarta text-neutral-900"
                      : "font-cinzel text-[#073524]"
                  }`}
                >
                  Keranjang Belanja ({totalItems})
                </h2>
              </div>
              <button
                onClick={onClose}
                aria-label="Tutup keranjang"
                className={`p-2 transition-colors cursor-pointer ${
                  isArtisanal
                    ? "rounded-full bg-white hover:bg-stone-100 text-stone-700 shadow-xs border border-stone-200"
                    : isNordic
                    ? "rounded-lg bg-white hover:bg-neutral-100 text-neutral-800 border border-neutral-200"
                    : "rounded-md bg-white hover:bg-[#00A65E] hover:text-white text-[#073524] border border-[#D4E5DC]"
                }`}
              >
                <X strokeWidth={1.75} className="w-4 h-4" />
              </button>
            </div>

            {/* Content List */}
            <div className="flex-1 overflow-y-auto divide-y divide-stone-200/70">
              {cart.length === 0 ? (
                <div className="py-24 px-6 text-center flex flex-col items-center justify-center">
                  <div
                    className={`w-16 h-16 flex items-center justify-center mb-4 ${
                      isArtisanal
                        ? "rounded-full bg-stone-100 text-stone-400"
                        : "rounded-2xl bg-neutral-100 text-neutral-400"
                    }`}
                  >
                    <ShoppingBag strokeWidth={1.5} className="w-7 h-7" />
                  </div>
                  <p
                    className={`text-base font-bold ${
                      isArtisanal ? "font-playfair text-stone-900" : "font-jakarta text-neutral-900"
                    }`}
                  >
                    Keranjang masih kosong
                  </p>
                  <p className="text-xs text-stone-500 max-w-[260px] mt-1 leading-relaxed">
                    Yuk pilih bolu gulung, donat kampung, atau hampers favoritmu hari ini!
                  </p>
                </div>
              ) : (
                cart.map((item) => (
                  <div
                    key={item.product.id}
                    className="p-4 sm:p-5 flex gap-4 bg-white hover:bg-stone-50/60 transition-colors"
                  >
                    {/* Image thumb */}
                    <div
                      className={`relative w-20 h-24 shrink-0 overflow-hidden bg-stone-100 ${
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

                    <div className="flex-1 flex flex-col justify-between min-w-0">
                      <div>
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <span
                              className={`text-[10px] uppercase font-semibold block ${
                                isArtisanal ? "text-amber-800" : "text-stone-400"
                              }`}
                            >
                              {item.product.category}
                            </span>
                            <h3
                              className={`text-sm sm:text-base font-bold leading-snug line-clamp-1 ${
                                isArtisanal
                                  ? "font-playfair text-stone-900"
                                  : "font-jakarta text-neutral-900"
                              }`}
                            >
                              {item.product.name}
                            </h3>
                          </div>
                          <button
                            onClick={() => removeFromCart(item.product.id)}
                            aria-label={`Hapus ${item.product.name}`}
                            className="text-stone-400 hover:text-red-600 transition-colors p-1 cursor-pointer"
                          >
                            <Trash2 strokeWidth={1.75} className="w-4 h-4" />
                          </button>
                        </div>
                        <p
                          className={`text-xs font-bold mt-1 ${
                            isArtisanal ? "text-[#1B4332]" : "text-neutral-900"
                          }`}
                        >
                          Rp {item.product.price.toLocaleString("id-ID")}
                        </p>
                        {item.notes && (
                          <p className="text-[11px] text-stone-600 bg-stone-100 p-1.5 mt-1 rounded-md">
                            Catatan: {item.notes}
                          </p>
                        )}
                      </div>

                      {/* Quantity row */}
                      <div className="flex items-center justify-between mt-3 pt-2 border-t border-stone-100">
                        <div
                          className={`flex items-center ${
                            isArtisanal
                              ? "rounded-full bg-stone-100 border border-stone-200"
                              : "rounded-lg bg-neutral-100 border border-neutral-200"
                          }`}
                        >
                          <button
                            onClick={() =>
                              updateCartQuantity(item.product.id, Math.max(1, item.quantity - 1))
                            }
                            className="w-7 h-7 flex items-center justify-center hover:bg-stone-200 text-stone-800 transition-colors rounded-full cursor-pointer"
                            aria-label="Kurangi jumlah"
                          >
                            <Minus strokeWidth={1.75} className="w-3 h-3" />
                          </button>
                          <span className="w-7 text-center text-xs font-bold text-stone-900">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              updateCartQuantity(
                                item.product.id,
                                Math.min(item.product.stock, item.quantity + 1)
                              )
                            }
                            className="w-7 h-7 flex items-center justify-center hover:bg-stone-200 text-stone-800 transition-colors rounded-full cursor-pointer"
                            aria-label="Tambah jumlah"
                          >
                            <Plus strokeWidth={1.75} className="w-3 h-3" />
                          </button>
                        </div>
                        <span
                          className={`text-xs sm:text-sm font-bold ${
                            isArtisanal ? "text-[#1B4332]" : "text-neutral-900"
                          }`}
                        >
                          Rp {(item.product.price * item.quantity).toLocaleString("id-ID")}
                        </span>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer Summary */}
            {cart.length > 0 && (
              <div
                className={`p-5 sm:p-6 border-t flex flex-col gap-4 ${
                  isArtisanal
                    ? "bg-[#F5EFE6] border-stone-200"
                    : isNordic
                    ? "bg-neutral-50 border-neutral-200"
                    : "bg-[#EAF4EE] border-[#D4E5DC]"
                }`}
              >
                <div className="space-y-1.5 text-xs">
                  <div className="flex justify-between text-stone-500">
                    <span>Jumlah Porsi</span>
                    <span className="font-semibold text-stone-900">{totalItems} Bungkus</span>
                  </div>
                  <div className="flex justify-between text-stone-500">
                    <span>Opsi Kirim</span>
                    <span className="font-semibold text-stone-900">Kurir Instan / Sameday</span>
                  </div>
                  <div className="flex justify-between text-base font-bold text-stone-900 pt-2 border-t border-stone-200/80">
                    <span>Total Belanja</span>
                    <span
                      className={`font-bold ${
                        isArtisanal ? "text-[#1B4332]" : "text-emerald-700"
                      }`}
                    >
                      Rp {subtotal.toLocaleString("id-ID")}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 pt-1">
                  <Link
                    href="/cart"
                    onClick={onClose}
                    className={`py-2.5 px-4 text-center text-xs font-semibold transition-colors cursor-pointer border ${
                      isArtisanal
                        ? "rounded-full bg-white hover:bg-stone-50 text-stone-800 border-stone-200"
                        : "rounded-xl bg-white hover:bg-neutral-100 text-neutral-800 border-neutral-300"
                    }`}
                  >
                    Detail Belanja
                  </Link>
                  <Link
                    href="/checkout"
                    onClick={onClose}
                    className={`py-2.5 px-4 text-center text-xs font-semibold flex items-center justify-center gap-1.5 transition-all shadow-xs cursor-pointer active:scale-95 ${
                      isArtisanal
                        ? "rounded-full bg-[#1B4332] hover:bg-[#143225] text-white"
                        : "rounded-xl bg-neutral-900 hover:bg-black text-white"
                    }`}
                  >
                    <span>Lanjut Bayar</span>
                    <ArrowRight strokeWidth={2} className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
