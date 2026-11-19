"use client";

import { useState } from "react";
import { useStore } from "@/store/useStore";
import { Sparkles, Check, ChevronUp, Palette, Layers, HelpCircle } from "lucide-react";

export default function ClientConceptSwitcher() {
  const { designConcept, setDesignConcept } = useStore();
  const [isOpen, setIsOpen] = useState(false);

  const concepts = [
    {
      id: "artisanal" as const,
      name: "Opsi 1: Warm Artisanal Patisserie",
      tagline: "Rekomendasi Utama • Bakery Mewah & Hangat",
      description: "Inspirasi patisserie Prancis & Jepang (seperti Monsieur Spoon & Butterman). Kanvas warm cream, tipografi serif elegan Playfair Display, kartu lembut rounded-2xl, dan fokus pada kelezatan bahan alami.",
      color: "#1B4332",
      bgLight: "#FBF8F4",
      accent: "#D97706",
    },
    {
      id: "nordic" as const,
      name: "Opsi 2: Nordic Minimalist (Apple Clean)",
      tagline: "Super Clean • Modern & Tanpa Bising Visual",
      description: "Gaya Scandinavian minimalis (seperti Blue Bottle Coffee & Tartine). Kanvas putih bersih, tipografi Swiss modern Plus Jakarta Sans, kontras tinggi, foto produk tajam, dan nol kesan jadul/ramai.",
      color: "#059669",
      bgLight: "#FFFFFF",
      accent: "#18181B",
    },
    {
      id: "tokyo" as const,
      name: "Opsi 3: Tokyo Dessert Boutique",
      tagline: "Playful • Ceria & Konversi Penjualan Tinggi",
      description: "Gaya modern dessert shop Jakarta-Tokyo. Badge pastel yang ramah, tombol aksi cepat, highlight diskon yang ceria, dan sangat nyaman digunakan untuk pemesanan cepat di smartphone.",
      color: "#00A65E",
      bgLight: "#F2F8F4",
      accent: "#EA580C",
    },
  ];

  const currentConcept = concepts.find((c) => c.id === designConcept) || concepts[0];

  return (
    <aside
      aria-label="Pilih Opsi Konsep Desain Klien"
      className="fixed bottom-4 left-4 z-50 flex flex-col items-start font-sans select-none"
    >
      {/* Expanded Selection Card */}
      {isOpen && (
        <div className="mb-2 w-[340px] sm:w-[400px] bg-white rounded-2xl shadow-2xl border border-stone-200 p-4 animate-in fade-in slide-in-from-bottom-3 duration-200 text-stone-800">
          <div className="flex items-center justify-between pb-3 border-b border-stone-100 mb-3">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center">
                <Palette className="w-4 h-4" />
              </div>
              <div>
                <h4 className="font-bold text-xs uppercase tracking-wider text-stone-900">
                  Pilih Opsi Konsep Desain
                </h4>
                <p className="text-[11px] text-stone-500">
                  Untuk presentasi &amp; pemilihan arah visual klien
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-stone-400 hover:text-stone-700 p-1 rounded-md text-xs"
            >
              ✕
            </button>
          </div>

          <div className="space-y-2">
            {concepts.map((c) => {
              const isSelected = designConcept === c.id;

              return (
                <button
                  key={c.id}
                  onClick={() => {
                    setDesignConcept(c.id);
                    setIsOpen(false);
                  }}
                  className={`w-full text-left p-3 rounded-xl border transition-all cursor-pointer ${
                    isSelected
                      ? "border-emerald-600 bg-emerald-50/70 shadow-xs"
                      : "border-stone-200/80 hover:border-stone-300 hover:bg-stone-50/80 bg-white"
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-1.5">
                        <span className="font-bold text-xs text-stone-900">
                          {c.name}
                        </span>
                        {c.id === "artisanal" && (
                          <span className="px-1.5 py-0.2 bg-amber-100 text-amber-800 rounded-full text-[9px] font-bold">
                            Favorit
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] font-medium text-emerald-700">
                        {c.tagline}
                      </p>
                    </div>

                    <div
                      className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 transition-colors ${
                        isSelected
                          ? "bg-emerald-600 text-white"
                          : "border border-stone-300"
                      }`}
                    >
                      {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                    </div>
                  </div>

                  <p className="text-[11px] text-stone-600 mt-1.5 leading-relaxed">
                    {c.description}
                  </p>
                </button>
              );
            })}
          </div>

          <div className="mt-3 pt-2.5 border-t border-stone-100 flex items-center justify-between text-[11px] text-stone-500">
            <span>✨ Tampilan berubah seketika</span>
            <span className="font-medium text-emerald-700">3 Opsi Siap Pitching</span>
          </div>
        </div>
      )}

      {/* Floating Trigger Pill */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3.5 py-2.5 bg-stone-900 hover:bg-stone-800 text-white rounded-full shadow-xl border border-stone-700/50 text-xs font-medium cursor-pointer transition-transform active:scale-95 group"
      >
        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
        <Palette className="w-3.5 h-3.5 text-amber-300" />
        <span>Konsep: <strong>{currentConcept.name.split(":")[1]?.trim() || "Artisanal"}</strong></span>
        <ChevronUp
          className={`w-3.5 h-3.5 text-stone-400 transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>
    </aside>
  );
}
