"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useStore } from "@/store/useStore";
import { mockBanners } from "@/store/mockData";
import { Copy, Check, ChevronLeft, ChevronRight, ArrowRight, Tag } from "lucide-react";
import { toast } from "sonner";

export default function AutoLoopingPromoBanner() {
  const { banners, designConcept } = useStore();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isPaused, setIsPaused] = useState(false);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const isArtisanal = designConcept === "artisanal" || !designConcept;
  const isNordic = designConcept === "nordic";

  // GUARANTEE at least 3-4 active dummy banners so sliding animation works properly
  const storeBanners = banners && banners.length >= 3 ? banners.filter((b) => b.isActive) : [];
  const displayItems = storeBanners.length >= 3 ? storeBanners : mockBanners;

  const total = displayItems.length;
  const currentBanner = displayItems[currentIndex] || displayItems[0];

  // Auto-advance sliding timer every 5 seconds
  useEffect(() => {
    if (isPaused || total <= 1) return;

    const timer = setInterval(() => {
      setDirection(1);
      setCurrentIndex((prev) => (prev + 1) % total);
    }, 5000);

    return () => clearInterval(timer);
  }, [isPaused, total]);

  const handlePrev = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + total) % total);
  };

  const handleNext = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % total);
  };

  const handleCopyCode = (code: string, e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    toast.success(`Kode voucher "${code}" berhasil disalin!`, {
      description: "Gunakan saat checkout untuk menikmati potongan harga.",
    });
    setTimeout(() => {
      setCopiedCode((prev) => (prev === code ? null : prev));
    }, 2000);
  };

  if (!currentBanner) return null;

  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 50 : -50,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (dir: number) => ({
      x: dir > 0 ? -50 : 50,
      opacity: 0,
    }),
  };

  return (
    <section
      className={`relative w-full border-b select-none transition-colors duration-200 ${
        isArtisanal
          ? "bg-[#FAF7F2] border-[#EFE8DD]"
          : isNordic
          ? "bg-white border-neutral-200"
          : "bg-[#F2F8F4] border-[#D4E5DC]"
      }`}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      aria-label="Pemberitahuan Promo & Penawaran Spesial Dapur Ola"
    >
      <div className="container mx-auto px-4 md:px-8 py-4 sm:py-6">
        <div
          className={`relative overflow-hidden transition-all duration-300 ${
            isArtisanal
              ? "rounded-2xl sm:rounded-3xl border border-[#E8DFD1] bg-white shadow-xs"
              : isNordic
              ? "rounded-2xl border border-neutral-200 bg-neutral-50 shadow-none"
              : "rounded-2xl border border-[#C2DDD0] bg-white shadow-xs"
          }`}
        >
          {/* Subtle Progress Bar */}
          <div
            className={`h-0.5 sm:h-1 w-full overflow-hidden ${
              isArtisanal
                ? "bg-[#F3EDE2]"
                : isNordic
                ? "bg-neutral-200"
                : "bg-[#DCEEE4]"
            }`}
          >
            <motion.div
              key={currentIndex + (isPaused ? "-paused" : "-running")}
              initial={{ width: "0%" }}
              animate={{ width: isPaused ? undefined : "100%" }}
              transition={{ duration: 5, ease: "linear" }}
              className={`h-full ${
                isArtisanal
                  ? "bg-[#1B4332]"
                  : isNordic
                  ? "bg-neutral-900"
                  : "bg-[#00A65E]"
              }`}
            />
          </div>

          <div className="relative min-h-[180px] sm:min-h-[210px] overflow-hidden">
            <AnimatePresence custom={direction} mode="wait" initial={false}>
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="grid grid-cols-1 lg:grid-cols-12 items-center min-h-[180px] sm:min-h-[210px]"
              >
                {/* Left Content / Promo Details */}
                <div className="p-4 sm:p-7 lg:p-8 lg:col-span-8 flex flex-col justify-between h-full z-10">
                  <div className="space-y-2 sm:space-y-3">
                    {/* Badge and Indicators */}
                    <div className="flex flex-wrap items-center gap-2">
                      <span
                        className={`text-[10px] sm:text-xs font-semibold px-3 py-1 uppercase tracking-wider ${
                          isArtisanal
                            ? "rounded-full bg-[#EBF3ED] text-[#1B4332] font-jakarta"
                            : isNordic
                            ? "rounded-md bg-neutral-900 text-white font-jakarta text-[10px]"
                            : "rounded-lg bg-[#00A65E] text-white font-mono text-[10px]"
                        }`}
                      >
                        {currentBanner.badge || "PENAWARAN SPESIAL"}
                      </span>

                      {currentBanner.discountText && (
                        <span
                          className={`text-[10px] sm:text-xs font-semibold px-2.5 py-1 ${
                            isArtisanal
                              ? "rounded-full bg-amber-50 text-amber-800 border border-amber-200/80 font-jakarta"
                              : isNordic
                              ? "rounded-md bg-white border border-neutral-300 text-neutral-800 font-jakarta"
                              : "rounded-lg bg-[#FEF3C7] text-[#92400E] border border-[#FDE68A] font-mono"
                          }`}
                        >
                          {currentBanner.discountText}
                        </span>
                      )}

                      <span
                        className={`text-[11px] font-medium hidden sm:inline ${
                          isArtisanal
                            ? "text-stone-400 font-jakarta"
                            : isNordic
                            ? "text-neutral-400 font-jakarta"
                            : "text-[#00A65E] font-mono"
                        }`}
                      >
                        • Promo {currentIndex + 1} dari {total}
                      </span>
                    </div>

                    {/* Headline Title */}
                    <h3
                      className={`text-base sm:text-xl md:text-2xl font-bold tracking-tight leading-snug ${
                        isArtisanal
                          ? "font-playfair text-[#1B4332]"
                          : isNordic
                          ? "font-jakarta text-neutral-900 tracking-tight"
                          : "font-cinzel text-[#073524]"
                      }`}
                    >
                      {currentBanner.title}
                    </h3>

                    {/* Subtitle / Description */}
                    <p
                      className={`text-xs sm:text-sm line-clamp-2 max-w-2xl leading-relaxed ${
                        isArtisanal
                          ? "font-jakarta text-stone-600 font-normal"
                          : isNordic
                          ? "font-jakarta text-neutral-600"
                          : "font-sans text-[#3B574A]"
                      }`}
                    >
                      {currentBanner.subtitle}
                    </p>

                    {/* Voucher Pill & Action CTA */}
                    <div className="flex flex-wrap items-center gap-2 sm:gap-3 pt-1">
                      {currentBanner.code && (
                        <button
                          type="button"
                          onClick={(e) => handleCopyCode(currentBanner.code!, e)}
                          className={`inline-flex items-center gap-1.5 px-3.5 py-2 transition-all cursor-pointer text-xs font-medium ${
                            isArtisanal
                              ? "rounded-full bg-[#FAF7F2] border border-[#E2D8C7] hover:border-[#1B4332] text-stone-800 font-jakarta"
                              : isNordic
                              ? "rounded-lg bg-white border border-neutral-300 hover:border-neutral-900 text-neutral-900 font-jakarta"
                              : "rounded-lg bg-[#EAF5EF] border border-[#A8D3BC] hover:border-[#00A65E] text-[#073524] font-mono"
                          }`}
                          title="Klik untuk menyalin kode voucher"
                        >
                          {copiedCode === currentBanner.code ? (
                            <>
                              <Check className="w-3.5 h-3.5 text-emerald-600" />
                              <span className="font-semibold text-emerald-700">Kode Berhasil Disalin!</span>
                            </>
                          ) : (
                            <>
                              <Tag className="w-3.5 h-3.5 text-stone-500" />
                              <span>Kode: <strong className="font-bold text-stone-900">{currentBanner.code}</strong></span>
                              <span className="text-[10px] text-stone-400 hidden sm:inline">(Salin)</span>
                            </>
                          )}
                        </button>
                      )}

                      <Link
                        href="#menu-list"
                        className={`inline-flex items-center gap-1.5 px-4 sm:px-5 py-2 transition-all text-xs font-semibold shadow-xs cursor-pointer active:scale-95 ${
                          isArtisanal
                            ? "rounded-full bg-[#1B4332] hover:bg-[#143225] text-white font-jakarta"
                            : isNordic
                            ? "rounded-lg bg-neutral-900 hover:bg-black text-white font-jakarta"
                            : "rounded-lg bg-[#00A65E] hover:bg-[#008F50] text-white font-mono"
                        }`}
                      >
                        <span>Pilih Menu Sekarang</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>

                  {/* Bottom Carousel Controls & Indicators */}
                  <div
                    className={`mt-4 pt-3 flex items-center justify-between border-t ${
                      isArtisanal
                        ? "border-stone-100"
                        : isNordic
                        ? "border-neutral-200"
                        : "border-[#EAF4EE]"
                    }`}
                  >
                    {/* Dots / Segment indicators */}
                    <div className="flex items-center gap-1.5">
                      {displayItems.map((_, i) => (
                        <button
                          key={i}
                          type="button"
                          onClick={() => {
                            setDirection(i > currentIndex ? 1 : -1);
                            setCurrentIndex(i);
                          }}
                          className={`h-1.5 transition-all cursor-pointer ${
                            isArtisanal ? "rounded-full" : isNordic ? "rounded-sm" : "rounded-full"
                          } ${
                            currentIndex === i
                              ? isArtisanal
                                ? "w-7 bg-[#1B4332]"
                                : isNordic
                                ? "w-6 bg-neutral-900"
                                : "w-7 bg-[#00A65E]"
                              : isArtisanal
                              ? "w-2 bg-stone-300 hover:bg-stone-400"
                              : isNordic
                              ? "w-2 bg-neutral-300 hover:bg-neutral-400"
                              : "w-2 bg-[#C2DDD0] hover:bg-[#00A65E]/60"
                          }`}
                          aria-label={`Buka slide ${i + 1}`}
                        />
                      ))}
                      <span
                        className={`ml-2 text-[11px] font-medium ${
                          isArtisanal
                            ? "text-stone-400 font-jakarta"
                            : isNordic
                            ? "text-neutral-400 font-jakarta"
                            : "text-[#3A6B53] font-mono text-[10px] font-bold"
                        }`}
                      >
                        {currentIndex + 1} / {total}
                      </span>
                    </div>

                    {/* Arrow buttons */}
                    <div className="flex items-center gap-1.5">
                      <span
                        className={`text-[10px] mr-2 hidden sm:inline ${
                          isArtisanal
                            ? "text-stone-400 font-jakarta"
                            : isNordic
                            ? "text-neutral-400 font-jakarta"
                            : "text-[#5A7E6D] font-mono text-[9px]"
                        }`}
                      >
                        {isPaused ? "Dijeda" : "Berputar Otomatis"}
                      </span>
                      <button
                        type="button"
                        onClick={handlePrev}
                        className={`p-1.5 transition-colors cursor-pointer border ${
                          isArtisanal
                            ? "rounded-full bg-stone-50 hover:bg-stone-100 border-stone-200 text-stone-700"
                            : isNordic
                            ? "rounded-md bg-white hover:bg-neutral-100 border-neutral-200 text-neutral-800"
                            : "rounded-md bg-white hover:bg-[#00A65E] hover:text-white border-[#C2DDD0] text-[#073524]"
                        }`}
                        aria-label="Slide sebelumnya"
                      >
                        <ChevronLeft className="w-4 h-4" />
                      </button>
                      <button
                        type="button"
                        onClick={handleNext}
                        className={`p-1.5 transition-colors cursor-pointer border ${
                          isArtisanal
                            ? "rounded-full bg-stone-50 hover:bg-stone-100 border-stone-200 text-stone-700"
                            : isNordic
                            ? "rounded-md bg-white hover:bg-neutral-100 border-neutral-200 text-neutral-800"
                            : "rounded-md bg-white hover:bg-[#00A65E] hover:text-white border-[#C2DDD0] text-[#073524]"
                        }`}
                        aria-label="Slide berikutnya"
                      >
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Right Food Asset Visual */}
                <div className="hidden lg:block lg:col-span-4 h-full min-h-[210px] relative overflow-hidden bg-stone-100">
                  <Image
                    src={currentBanner.image || "/assets/Untitled_design_10.webp"}
                    alt={currentBanner.title}
                    fill
                    className="object-cover object-center"
                    sizes="33vw"
                    priority
                  />
                  {/* Subtle corner badge */}
                  <div
                    className={`absolute bottom-3 right-3 px-3 py-1 text-[10px] uppercase tracking-wider font-semibold backdrop-blur-md ${
                      isArtisanal
                        ? "rounded-full bg-stone-900/80 text-white font-jakarta"
                        : isNordic
                        ? "rounded-md bg-black/80 text-white font-jakarta"
                        : "rounded-md bg-[#073524]/90 text-white font-mono"
                    }`}
                  >
                    DAPUR OLA • FRESH BAKED
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
