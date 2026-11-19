"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plus,
  Minus,
  Check,
  ArrowRight,
  Info,
  X,
  ShoppingBag,
  Sparkles,
  Flame,
  Clock,
  ShieldCheck,
  ChevronRight,
} from "lucide-react";
import { Product } from "@/store/types";
import { useStore } from "@/store/useStore";
import useEmblaCarousel from "embla-carousel-react";
import { toast } from "sonner";
import AutoLoopingPromoBanner from "@/components/banner/AutoLoopingPromoBanner";

interface CommissaryBoardProps {
  products: Product[];
  initialQuery?: string;
}

const CATEGORIES = [
  { id: "Semua", label: "Semua Menu" },
  { id: "Donat & Roti", label: "Donat & Roti" },
  { id: "Bolu Gulung", label: "Bolu Gulung" },
  { id: "Brownies Fudgy", label: "Brownies Fudgy" },
  { id: "Paket Hampers", label: "Paket Hampers" },
];

export default function CommissaryBoard({ products, initialQuery = "" }: CommissaryBoardProps) {
  const [selectedCategory, setSelectedCategory] = useState("Semua");
  const [selectedDetailProduct, setSelectedDetailProduct] = useState<Product | null>(null);
  const [addedId, setAddedId] = useState<string | null>(null);
  const { addToCart, updateCartQuantity, cart, isStoreOpen, designConcept } = useStore();

  const isArtisanal = designConcept === "artisanal" || !designConcept;
  const isNordic = designConcept === "nordic";

  const [emblaRef] = useEmblaCarousel({
    align: "start",
    containScroll: "trimSnaps",
    dragFree: true,
  });

  const filteredProducts = products.filter((p) => {
    const matchesCategory =
      selectedCategory === "Semua" || p.category === selectedCategory;
    const matchesQuery =
      !initialQuery ||
      p.name.toLowerCase().includes(initialQuery.toLowerCase()) ||
      p.shortDescription?.toLowerCase().includes(initialQuery.toLowerCase()) ||
      p.ingredients.some((ing) => ing.toLowerCase().includes(initialQuery.toLowerCase()));

    return matchesCategory && matchesQuery;
  });

  const cartTotalQty = cart.reduce((acc, item) => acc + item.quantity, 0);
  const cartSubtotal = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);

  const getItemCartQty = (productId: string) => {
    const item = cart.find((i) => i.product.id === productId);
    return item ? item.quantity : 0;
  };

  const handleBungkus = (product: Product, e?: React.MouseEvent) => {
    e?.stopPropagation();
    addToCart(product, 1);
    setAddedId(product.id);
    toast.success(`${product.name} berhasil dibungkus!`, {
      description: "Telah ditambahkan ke keranjang belanja Anda.",
    });
    setTimeout(() => {
      setAddedId((prev) => (prev === product.id ? null : prev));
    }, 1400);
  };

  const handleUpdateQty = (productId: string, delta: number, e: React.MouseEvent) => {
    e.stopPropagation();
    const current = getItemCartQty(productId);
    const newQty = current + delta;
    updateCartQuantity(productId, newQty);
  };

  return (
    <div
      className={`w-full transition-colors duration-300 ${
        isArtisanal
          ? "bg-[#FAF7F2] text-stone-900"
          : isNordic
          ? "bg-white text-neutral-900"
          : "bg-[#F2F8F4] text-[#073524]"
      }`}
      id="menu-list"
    >
      {/* 1. AUTO-LOOPING PROMO BANNER (CLIENT OPTION STYLED) */}
      <AutoLoopingPromoBanner />

      {/* 2. CATEGORY FILTER BAR (CLEAN, STICKY & TOUCH-FRIENDLY) */}
      <div
        className={`sticky top-16 sm:top-20 z-30 border-b py-3 transition-colors duration-200 shadow-xs ${
          isArtisanal
            ? "bg-[#FAF7F2] border-[#EFE8DD]"
            : isNordic
            ? "bg-white border-neutral-200"
            : "bg-[#F2F8F4] border-[#D4E5DC]"
        }`}
      >
        <div className="container mx-auto px-4 md:px-8 flex flex-col md:flex-row md:items-center justify-between gap-3">
          {/* Category Tabs */}
          <div className="overflow-hidden w-full md:w-auto" ref={emblaRef}>
            <div className="flex items-center gap-2">
              {CATEGORIES.map((cat) => {
                const isActive = selectedCategory === cat.id;
                const count =
                  cat.id === "Semua"
                    ? products.length
                    : products.filter((p) => p.category === cat.id).length;

                return (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`shrink-0 px-4 sm:px-5 py-2 sm:py-2.5 text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                      isArtisanal
                        ? `rounded-full ${
                            isActive
                              ? "bg-[#1B4332] text-white shadow-md shadow-emerald-950/15"
                              : "bg-white text-stone-700 border border-stone-200 hover:border-[#1B4332]/50 hover:bg-stone-50"
                          }`
                        : isNordic
                        ? `rounded-xl ${
                            isActive
                              ? "bg-neutral-900 text-white shadow-xs"
                              : "bg-neutral-100 text-neutral-700 hover:bg-neutral-200"
                          }`
                        : `rounded-2xl border ${
                            isActive
                              ? "bg-[#00A65E] text-white border-[#008F50] shadow-xs"
                              : "bg-white text-[#073524] border-[#D4E5DC] hover:bg-[#F2F8F4]"
                          }`
                    }`}
                  >
                    <span>{cat.label}</span>
                    <span
                      className={`ml-1.5 text-[11px] ${
                        isActive
                          ? "opacity-80"
                          : isArtisanal
                          ? "text-stone-400 font-normal"
                          : isNordic
                          ? "text-neutral-400 font-normal"
                          : "text-[#00A65E] font-bold"
                      }`}
                    >
                      ({count})
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Kitchen Pulse on Desktop */}
          <div
            className={`hidden lg:flex items-center gap-3 text-xs ${
              isArtisanal
                ? "text-stone-500 font-jakarta"
                : isNordic
                ? "text-neutral-500 font-jakarta"
                : "text-[#5A7E6D] font-mono"
            }`}
          >
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <strong className={isArtisanal ? "text-[#1B4332]" : "text-neutral-900"}>
                Dapur Buka:
              </strong>{" "}
              08:00 – 17:00 WIB
            </span>
            <span>•</span>
            <span className={isArtisanal ? "text-[#1B4332] font-semibold" : "text-emerald-700 font-semibold"}>
              100% Homemade • Halal ID
            </span>
          </div>
        </div>
      </div>

      {/* 3. MENU SECTION HEADER */}
      <div className="container mx-auto px-4 md:px-8 pt-6 sm:pt-10 pb-4">
        <div
          className={`flex flex-col sm:flex-row sm:items-end justify-between gap-2 border-b pb-4 sm:pb-6 ${
            isArtisanal
              ? "border-stone-200/80"
              : isNordic
              ? "border-neutral-200"
              : "border-[#D4E5DC]"
          }`}
        >
          <div>
            <span
              className={`text-[11px] uppercase tracking-widest font-semibold block mb-1 ${
                isArtisanal
                  ? "text-amber-800 font-jakarta"
                  : isNordic
                  ? "text-neutral-500 font-jakarta"
                  : "text-[#00A65E] font-mono font-bold"
              }`}
            >
              {isArtisanal ? "KOLEKSI FRESH OVEN HARI INI" : isNordic ? "CURRENT COMMISSARY BATCH" : "DAFTAR MENU FRESH"}
            </span>
            <h2
              className={`text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight ${
                isArtisanal
                  ? "font-playfair text-[#1B4332]"
                  : isNordic
                  ? "font-jakarta text-neutral-900"
                  : "font-cinzel text-[#073524]"
              }`}
            >
              Pilihan Jajan Hari Ini
            </h2>
          </div>
          <p
            className={`text-xs sm:text-sm max-w-md leading-relaxed ${
              isArtisanal
                ? "text-stone-600 font-jakarta"
                : isNordic
                ? "text-neutral-500 font-jakarta"
                : "text-[#5A7E6D] font-sans"
            }`}
          >
            Dipanggang hangat tiap pagi tanpa bahan pengawet. Dikemas cantik dan aman dalam boks hijau eksklusif Dapur Ola.
          </p>
        </div>
      </div>

      {/* 4. HIGH-END PRODUCT CARD GRID (STRICTLY 2 PER ROW ON MOBILE) */}
      <div className="container mx-auto px-3 sm:px-4 md:px-8 pb-32">
        <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-6 lg:gap-7">
          {filteredProducts.map((product) => {
            const isAdded = addedId === product.id;
            const cartQty = getItemCartQty(product.id);
            const remainingPortion = product.remainingPortion ?? product.stock ?? 5;

            return (
              <div
                key={product.id}
                onClick={() => setSelectedDetailProduct(product)}
                className={`group relative flex flex-col justify-between cursor-pointer transition-all duration-300 ${
                  isArtisanal
                    ? "rounded-2xl sm:rounded-3xl bg-white border border-[#EFE8DD] hover:border-[#1B4332]/40 shadow-xs hover:shadow-xl hover:-translate-y-1 overflow-hidden"
                    : isNordic
                    ? "rounded-xl bg-white border border-neutral-200 hover:border-neutral-900 hover:shadow-md overflow-hidden"
                    : "rounded-2xl bg-white border border-[#D4E5DC] hover:border-[#00A65E] shadow-xs hover:shadow-md overflow-hidden"
                }`}
              >
                {/* Product Photo Showcase */}
                <div
                  className={`relative w-full aspect-[4/3] sm:aspect-[1/1] overflow-hidden ${
                    isArtisanal ? "bg-[#FAF7F2]" : isNordic ? "bg-neutral-100" : "bg-[#EAF4EE]"
                  }`}
                >
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
                  />

                  {/* Top Floating Badges */}
                  <div className="absolute top-2 left-2 right-2 flex items-center justify-between z-10 gap-1">
                    <span
                      className={`text-[9px] sm:text-[11px] font-semibold px-2 sm:px-2.5 py-0.5 sm:py-1 backdrop-blur-md shadow-xs truncate max-w-[65%] sm:max-w-none ${
                        isArtisanal
                          ? "rounded-full bg-white/95 text-[#1B4332]"
                          : isNordic
                          ? "rounded-md bg-white/95 text-neutral-900"
                          : "rounded-md bg-white/95 text-[#073524] border border-[#BDE0CD]"
                      }`}
                    >
                      {product.category}
                    </span>

                    {remainingPortion <= 8 && (
                      <span
                        className={`text-[9px] sm:text-[11px] font-semibold px-2 py-0.5 sm:py-1 backdrop-blur-md shadow-xs shrink-0 ${
                          isArtisanal
                            ? "rounded-full bg-amber-900/90 text-amber-100"
                            : isNordic
                            ? "rounded-md bg-neutral-900/90 text-white"
                            : "rounded-md bg-[#073524]/90 text-white"
                        }`}
                      >
                        Sisa {remainingPortion}
                      </span>
                    )}
                  </div>

                  {/* Subtle Detail Quick-peek trigger on Desktop */}
                  <div className="absolute bottom-2 right-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity hidden sm:block">
                    <span
                      className={`inline-flex items-center gap-1 px-2.5 py-1 text-[11px] font-medium shadow-md ${
                        isArtisanal
                          ? "rounded-full bg-white/95 text-stone-800"
                          : isNordic
                          ? "rounded-md bg-white/95 text-neutral-900"
                          : "rounded-md bg-white/95 text-[#073524]"
                      }`}
                    >
                      <Info className="w-3.5 h-3.5 text-emerald-700" />
                      <span>Detail Resep</span>
                    </span>
                  </div>
                </div>

                {/* Product Content & Direct Action */}
                <div className="p-3 sm:p-4 flex-1 flex flex-col justify-between space-y-2 sm:space-y-3">
                  <div className="space-y-1">
                    {/* Portion & Freshness Note */}
                    <div
                      className={`flex items-center justify-between text-[10px] sm:text-xs ${
                        isArtisanal
                          ? "text-stone-400 font-jakarta"
                          : isNordic
                          ? "text-neutral-400 font-jakarta"
                          : "text-[#5A7E6D] font-mono"
                      }`}
                    >
                      <span className="truncate">{product.portionWeight?.split("•")[0]?.trim() || "500g"}</span>
                      <span className="text-emerald-700 font-medium truncate max-w-[70px] sm:max-w-none">
                        Fresh Oven
                      </span>
                    </div>

                    <h3
                      className={`text-xs sm:text-base font-bold leading-snug line-clamp-2 min-h-[2rem] sm:min-h-[2.75rem] transition-colors ${
                        isArtisanal
                          ? "font-playfair text-stone-900 group-hover:text-[#1B4332]"
                          : isNordic
                          ? "font-jakarta text-neutral-900 group-hover:text-emerald-700"
                          : "font-cinzel text-[#073524] group-hover:text-[#00A65E]"
                      }`}
                    >
                      {product.name}
                    </h3>

                    <p
                      className={`text-xs line-clamp-2 leading-relaxed hidden sm:block ${
                        isArtisanal
                          ? "font-jakarta text-stone-500"
                          : isNordic
                          ? "font-jakarta text-neutral-500"
                          : "font-sans text-[#3B574A]"
                      }`}
                    >
                      {product.shortDescription || product.description}
                    </p>
                  </div>

                  {/* Price & Action Area */}
                  <div
                    className={`pt-2 sm:pt-3 border-t flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 sm:gap-2 ${
                      isArtisanal
                        ? "border-stone-100"
                        : isNordic
                        ? "border-neutral-100"
                        : "border-[#D4E5DC]/70"
                    }`}
                  >
                    <div>
                      <span
                        className={`text-xs sm:text-base font-bold ${
                          isArtisanal
                            ? "font-jakarta text-[#1B4332]"
                            : isNordic
                            ? "font-jakarta text-neutral-900"
                            : "font-mono text-[#073524]"
                        }`}
                      >
                        Rp {product.price.toLocaleString("id-ID")}
                      </span>
                    </div>

                    {/* Interactive Bungkus / Cart Counter */}
                    {cartQty > 0 ? (
                      <div
                        onClick={(e) => e.stopPropagation()}
                        className={`flex items-center justify-between sm:justify-center gap-2 px-2 py-1 ${
                          isArtisanal
                            ? "rounded-full bg-[#EBF3ED] text-[#1B4332] border border-[#C6DEC9]"
                            : isNordic
                            ? "rounded-lg bg-neutral-100 text-neutral-900 border border-neutral-300"
                            : "rounded-lg bg-[#EAF5EF] text-[#073524] border border-[#BDE0CD]"
                        }`}
                      >
                        <button
                          type="button"
                          onClick={(e) => handleUpdateQty(product.id, -1, e)}
                          className="p-1 hover:bg-black/5 rounded-full transition-colors cursor-pointer"
                          aria-label="Kurangi porsi"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="font-bold text-xs sm:text-sm px-1 min-w-[16px] text-center">
                          {cartQty}
                        </span>
                        <button
                          type="button"
                          onClick={(e) => handleUpdateQty(product.id, 1, e)}
                          className="p-1 hover:bg-black/5 rounded-full transition-colors cursor-pointer"
                          aria-label="Tambah porsi"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ) : (
                      <button
                        type="button"
                        onClick={(e) => handleBungkus(product, e)}
                        className={`h-8 sm:h-9 px-2 sm:px-3.5 text-[11px] sm:text-xs font-semibold flex items-center justify-center gap-1 transition-all cursor-pointer active:scale-95 w-full sm:w-auto shadow-xs ${
                          isArtisanal
                            ? `rounded-full ${
                                isAdded
                                  ? "bg-[#143225] text-white"
                                  : "bg-[#1B4332] hover:bg-[#143225] text-white"
                              }`
                            : isNordic
                            ? `rounded-lg ${
                                isAdded
                                  ? "bg-black text-white"
                                  : "bg-neutral-900 hover:bg-black text-white"
                              }`
                            : `rounded-lg ${
                                isAdded
                                  ? "bg-[#073524] text-white"
                                  : "bg-[#00A65E] hover:bg-[#008F50] text-white"
                              }`
                        }`}
                        aria-label={`Bungkus ${product.name}`}
                      >
                        {isAdded ? (
                          <>
                            <Check strokeWidth={2.4} className="w-3.5 h-3.5 text-emerald-300" />
                            <span>Dibungkus</span>
                          </>
                        ) : (
                          <>
                            <Plus strokeWidth={2.4} className="w-3.5 h-3.5" />
                            <span>Bungkus</span>
                          </>
                        )}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {filteredProducts.length === 0 && (
          <div
            className={`py-20 text-center p-8 max-w-lg mx-auto ${
              isArtisanal
                ? "rounded-3xl bg-white border border-stone-200"
                : isNordic
                ? "rounded-2xl bg-neutral-50 border border-neutral-200"
                : "rounded-2xl bg-white border border-[#D4E5DC]"
            }`}
          >
            <p
              className={`text-lg font-bold ${
                isArtisanal
                  ? "font-playfair text-stone-900"
                  : isNordic
                  ? "font-jakarta text-neutral-900"
                  : "font-cinzel text-[#073524]"
              }`}
            >
              Belum ada menu di kategori ini
            </p>
            <p className="text-xs text-stone-500 mt-1">
              Silakan pilih kategori lainnya untuk melihat menu hangat Dapur Ola.
            </p>
            <button
              onClick={() => setSelectedCategory("Semua")}
              className={`mt-4 px-5 py-2.5 text-xs font-semibold cursor-pointer shadow-xs ${
                isArtisanal
                  ? "rounded-full bg-[#1B4332] text-white"
                  : isNordic
                  ? "rounded-lg bg-neutral-900 text-white"
                  : "rounded-lg bg-[#00A65E] text-white"
              }`}
            >
              Lihat Semua Menu
            </button>
          </div>
        )}
      </div>

      {/* 5. CULINARY SPEC & INGREDIENT DETAIL MODAL */}
      <AnimatePresence>
        {selectedDetailProduct && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs"
            onClick={() => setSelectedDetailProduct(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={(e) => e.stopPropagation()}
              className={`relative w-full max-w-lg shadow-2xl overflow-hidden max-h-[90vh] flex flex-col ${
                isArtisanal
                  ? "rounded-3xl bg-white border border-stone-200 text-stone-900"
                  : isNordic
                  ? "rounded-2xl bg-white border border-neutral-200 text-neutral-900"
                  : "rounded-2xl bg-white border border-[#D4E5DC] text-[#073524]"
              }`}
            >
              {/* Header */}
              <div
                className={`p-4 border-b flex items-center justify-between ${
                  isArtisanal
                    ? "bg-[#FAF7F2] border-stone-100"
                    : isNordic
                    ? "bg-neutral-50 border-neutral-200"
                    : "bg-[#FAFBF9] border-[#D4E5DC]"
                }`}
              >
                <div className="flex items-center gap-2">
                  <span
                    className={`text-xs uppercase font-bold tracking-wider ${
                      isArtisanal ? "text-[#1B4332]" : "text-emerald-700"
                    }`}
                  >
                    Detail Resep &amp; Komposisi
                  </span>
                </div>
                <button
                  onClick={() => setSelectedDetailProduct(null)}
                  className={`p-2 transition-colors cursor-pointer ${
                    isArtisanal
                      ? "rounded-full bg-stone-100 hover:bg-stone-200 text-stone-700"
                      : "rounded-lg bg-neutral-100 hover:bg-neutral-200 text-neutral-800"
                  }`}
                  aria-label="Tutup"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Body */}
              <div className="p-5 overflow-y-auto space-y-4">
                <div className="relative w-full h-56 rounded-2xl overflow-hidden bg-stone-100">
                  <Image
                    src={selectedDetailProduct.image}
                    alt={selectedDetailProduct.name}
                    fill
                    className="object-cover"
                  />
                  <div
                    className={`absolute top-3 left-3 px-3 py-1 text-xs font-semibold shadow-xs ${
                      isArtisanal
                        ? "rounded-full bg-white/95 text-[#1B4332]"
                        : "rounded-md bg-white/95 text-neutral-900"
                    }`}
                  >
                    {selectedDetailProduct.category}
                  </div>
                </div>

                <div>
                  <h3
                    className={`text-xl sm:text-2xl font-bold leading-tight ${
                      isArtisanal
                        ? "font-playfair text-[#1B4332]"
                        : isNordic
                        ? "font-jakarta text-neutral-900"
                        : "font-cinzel text-[#073524]"
                    }`}
                  >
                    {selectedDetailProduct.name}
                  </h3>
                  <p className="text-xs sm:text-sm text-stone-600 mt-2 leading-relaxed">
                    {selectedDetailProduct.description}
                  </p>
                </div>

                {/* Honest Specs Matrix */}
                <div
                  className={`grid grid-cols-2 gap-3 p-3.5 text-xs ${
                    isArtisanal
                      ? "rounded-2xl bg-[#FAF7F2] border border-[#EAE2D5]"
                      : "rounded-xl bg-neutral-50 border border-neutral-200"
                  }`}
                >
                  <div>
                    <span className="text-[10px] text-stone-500 font-semibold block uppercase">
                      Ukuran / Kemasan
                    </span>
                    <span className="font-bold text-stone-900 mt-0.5 block">
                      {selectedDetailProduct.portionWeight || "500g"}
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] text-stone-500 font-semibold block uppercase">
                      Karakter Rasa
                    </span>
                    <span className="font-bold text-stone-900 mt-0.5 block">
                      {selectedDetailProduct.tasteProfile || "Bahan alami pilihan"}
                    </span>
                  </div>
                  <div className="col-span-2 pt-2 border-t border-stone-200/60">
                    <span className="text-[10px] text-emerald-800 font-semibold block uppercase">
                      Saran Penyajian dari Dapur
                    </span>
                    <span className="text-stone-700 text-xs block mt-0.5">
                      {selectedDetailProduct.servingAdvice || "Simpan di tempat sejuk dalam boks tertutup."}
                    </span>
                  </div>
                </div>

                {/* Ingredients */}
                {selectedDetailProduct.ingredients && selectedDetailProduct.ingredients.length > 0 && (
                  <div>
                    <span className="text-[11px] uppercase tracking-wider text-stone-500 font-semibold block mb-2">
                      Komposisi Bahan Berkualitas
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {selectedDetailProduct.ingredients.map((ing, idx) => (
                        <span
                          key={idx}
                          className={`px-3 py-1 text-xs font-medium ${
                            isArtisanal
                              ? "rounded-full bg-stone-100 text-stone-800 border border-stone-200"
                              : "rounded-md bg-neutral-100 text-neutral-800 border border-neutral-200"
                          }`}
                        >
                          {ing}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Footer CTA */}
              <div
                className={`p-4 border-t flex items-center justify-between ${
                  isArtisanal
                    ? "bg-[#FAF7F2] border-stone-100"
                    : "bg-neutral-50 border-neutral-200"
                }`}
              >
                <div>
                  <span className="text-[10px] text-stone-500 uppercase block font-semibold">Harga</span>
                  <span
                    className={`text-xl font-bold ${
                      isArtisanal ? "text-[#1B4332]" : "text-neutral-900"
                    }`}
                  >
                    Rp {selectedDetailProduct.price.toLocaleString("id-ID")}
                  </span>
                </div>
                <button
                  onClick={() => {
                    handleBungkus(selectedDetailProduct);
                    setSelectedDetailProduct(null);
                  }}
                  className={`px-6 py-2.5 text-xs font-semibold flex items-center gap-1.5 shadow-sm transition-all cursor-pointer active:scale-95 ${
                    isArtisanal
                      ? "rounded-full bg-[#1B4332] hover:bg-[#143225] text-white"
                      : "rounded-xl bg-neutral-900 hover:bg-black text-white"
                  }`}
                >
                  <Plus className="w-4 h-4" />
                  <span>Bungkus Sekarang</span>
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 6. MOBILE FLOATING CART DOCK (ELEGANT PILL FORMAT) */}
      <AnimatePresence>
        {cartTotalQty > 0 && (
          <motion.div
            initial={{ y: 80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 80, opacity: 0 }}
            transition={{ type: "spring", stiffness: 350, damping: 30 }}
            className="fixed bottom-4 left-4 right-4 z-40 sm:max-w-md sm:mx-auto"
          >
            <div
              className={`p-3 sm:p-3.5 backdrop-blur-md shadow-2xl flex items-center justify-between ${
                isArtisanal
                  ? "rounded-full bg-[#1B4332]/95 border border-emerald-800/60 text-white"
                  : isNordic
                  ? "rounded-2xl bg-neutral-900/95 border border-neutral-700 text-white"
                  : "rounded-2xl bg-[#073524] border border-[#0E4D35] text-white"
              }`}
            >
              <div className="flex items-center gap-2.5 pl-1.5">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs ${
                    isArtisanal
                      ? "bg-amber-400 text-stone-900"
                      : "bg-emerald-500 text-white"
                  }`}
                >
                  {cartTotalQty}
                </div>
                <div>
                  <span className="text-[10px] text-stone-300 block leading-tight">
                    Pesanan Anda
                  </span>
                  <span className="font-bold text-sm text-white">
                    Rp {cartSubtotal.toLocaleString("id-ID")}
                  </span>
                </div>
              </div>

              <Link
                href="/checkout"
                className={`px-4 sm:px-5 py-2 text-xs font-semibold flex items-center gap-1.5 transition-transform active:scale-95 shadow-md cursor-pointer ${
                  isArtisanal
                    ? "rounded-full bg-amber-400 hover:bg-amber-300 text-stone-900"
                    : "rounded-xl bg-emerald-500 hover:bg-emerald-400 text-white"
                }`}
              >
                <span>Lanjut Bayar</span>
                <ArrowRight strokeWidth={2.2} className="w-3.5 h-3.5" />
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
