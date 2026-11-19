"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { Check, ArrowRight } from "lucide-react";
import { useStore } from "@/store/useStore";

function OrderSuccessContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("id");
  const { designConcept } = useStore();
  const isArtisanal = designConcept === "artisanal" || !designConcept;

  return (
    <div
      className={`max-w-xl mx-auto p-5 sm:p-10 text-left transition-all ${
        isArtisanal
          ? "bg-white sm:rounded-3xl border border-stone-200/80 shadow-md text-stone-900"
          : "bg-white sm:rounded-2xl border border-neutral-200 shadow-sm text-neutral-900"
      }`}
    >
      <div className="flex items-center justify-between pb-4 border-b border-stone-100 text-xs">
        <span className="font-semibold text-emerald-700 flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          Status: Pesanan Diterima
        </span>
        <span className="text-stone-400">Dapur Ola Jakarta</span>
      </div>

      <div className="my-6 sm:my-8">
        <div
          className={`w-12 h-12 rounded-full flex items-center justify-center mb-5 ${
            isArtisanal ? "bg-[#1B4332] text-white" : "bg-neutral-900 text-white"
          }`}
        >
          <Check strokeWidth={2.5} className="w-6 h-6" />
        </div>

        <span className="text-xs uppercase tracking-wider text-amber-800 font-semibold block mb-1">
          Dapur Sedang Menyiapkan • Fresh Oven
        </span>

        <h1
          className={`text-2xl sm:text-3xl font-bold mb-2.5 leading-tight ${
            isArtisanal ? "font-playfair text-[#1B4332]" : "text-neutral-900"
          }`}
        >
          Pesananmu Berhasil Diterima!
        </h1>

        <p className="text-xs sm:text-sm text-stone-600 leading-relaxed font-normal">
          Terima kasih telah berbelanja di Dapur Ola! Pesanan Anda segera disiapkan secara higienis oleh tim baker kami dan dipacking rapi dalam boks hijau eksklusif.
        </p>
      </div>

      <div
        className={`p-4 sm:p-5 rounded-2xl text-xs space-y-2 mb-6 ${
          isArtisanal
            ? "bg-[#FAF7F2] border border-[#EAE2D5]"
            : "bg-neutral-50 border border-neutral-200"
        }`}
      >
        <div className="flex justify-between">
          <span className="text-stone-500">Nomor Pesanan</span>
          <span className="font-bold text-stone-900">#{orderId || "DAPUR-OLA"}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-stone-500">Dapur Pengirim</span>
          <span className="text-stone-900">Gandaria Tengah III, Jaksel</span>
        </div>
        <div className="flex justify-between">
          <span className="text-stone-500">Standar Kemasan</span>
          <span className="font-semibold text-emerald-700">Boks Hijau Ikonik + Segel Higienis</span>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-2.5 pt-1">
        <Link
          href={orderId ? `/orders/${orderId}` : "/orders"}
          className={`flex-1 py-3 px-5 text-center text-xs font-semibold flex items-center justify-center gap-2 transition-all shadow-xs cursor-pointer ${
            isArtisanal
              ? "rounded-full bg-[#1B4332] hover:bg-[#143225] text-white"
              : "rounded-xl bg-neutral-900 hover:bg-black text-white"
          }`}
        >
          <span>Pantau Status Pesanan</span>
          <ArrowRight strokeWidth={2} className="w-3.5 h-3.5" />
        </Link>
        <Link
          href="/#menu-list"
          className={`py-3 px-6 text-center text-xs font-semibold border transition-colors ${
            isArtisanal
              ? "rounded-full bg-white hover:bg-stone-50 text-stone-700 border-stone-200"
              : "rounded-xl bg-white hover:bg-neutral-50 text-neutral-700 border-neutral-300"
          }`}
        >
          Pilih Menu Lain
        </Link>
      </div>
    </div>
  );
}

export default function OrderSuccessPage() {
  return (
    <div className="container mx-auto px-3 sm:px-6 md:px-8 py-16 sm:py-24 min-h-[75vh] flex items-center justify-center font-jakarta">
      <Suspense fallback={<div className="text-xs font-medium text-stone-400">Memverifikasi pesanan...</div>}>
        <OrderSuccessContent />
      </Suspense>
    </div>
  );
}
