"use client";

import { useState } from "react";
import { Copy, Check, Sparkles } from "lucide-react";
import { useStore } from "@/store/useStore";
import { toast } from "sonner";

export default function InfinitePromoMarquee() {
  const { designConcept } = useStore();
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText("OLAHEMAT15");
    setCopied(true);
    toast.success('Kode voucher "OLAHEMAT15" berhasil disalin!', {
      description: "Gunakan saat checkout untuk diskon 15%.",
    });
    setTimeout(() => setCopied(false), 2000);
  };

  const isArtisanal = designConcept === "artisanal" || !designConcept;
  const isNordic = designConcept === "nordic";

  const stripBg = isArtisanal
    ? "bg-[#1B4332] text-amber-50/90 border-[#143225]"
    : isNordic
    ? "bg-neutral-900 text-white border-neutral-800"
    : "bg-[#073524] text-[#FAFBF9] border-[#05281B]";

  return (
    <div className={`w-full border-b py-2 px-4 z-30 select-none font-jakarta ${stripBg}`}>
      <div className="container mx-auto flex items-center justify-between gap-3 text-xs">
        {/* Left: Fresh Announcement */}
        <div className="flex items-center gap-2.5 truncate">
          <span
            className={`px-2.5 py-0.5 text-[9.5px] uppercase font-bold tracking-wider shrink-0 rounded-full ${
              isArtisanal
                ? "bg-amber-500 text-stone-950 font-extrabold"
                : isNordic
                ? "bg-white text-neutral-900 font-bold"
                : "bg-[#00A65E] text-white font-bold"
            }`}
          >
            PROMO HARI INI
          </span>
          <span className="truncate text-[11px] sm:text-xs opacity-90">
            Diskon 15% Bolu Gulung &amp; Brownies • Bebas Ongkir Min. 150rb
          </span>
        </div>

        {/* Right: Click to Copy Voucher */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={handleCopy}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-full transition-all text-[10px] font-semibold cursor-pointer ${
              isArtisanal
                ? "bg-white/10 hover:bg-white/20 text-white border border-white/20"
                : isNordic
                ? "bg-neutral-800 hover:bg-neutral-700 text-white border border-neutral-700"
                : "bg-[#0A432F] hover:bg-[#00A65E] text-emerald-200 border border-[#0E4D35]"
            }`}
            title="Salin kode OLAHEMAT15"
          >
            {copied ? (
              <>
                <Check className="w-3 h-3 text-emerald-300" />
                <span className="text-emerald-200">TERSALIN</span>
              </>
            ) : (
              <>
                <Copy className="w-3 h-3 opacity-80" />
                <span>KODE: <strong>OLAHEMAT15</strong></span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
