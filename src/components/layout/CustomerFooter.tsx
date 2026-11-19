"use client";

import Link from "next/link";
import { ArrowUpRight, MessageCircle } from "lucide-react";
import { useStore } from "@/store/useStore";

export default function CustomerFooter() {
  const { designConcept } = useStore();
  const isArtisanal = designConcept === "artisanal" || !designConcept;

  return (
    <footer
      className={`w-full pt-16 pb-12 mt-16 transition-colors duration-300 ${
        isArtisanal
          ? "bg-[#143225] text-[#FAF7F2] border-t border-[#0F281D]"
          : "bg-neutral-950 text-neutral-100 border-t border-neutral-800"
      }`}
    >
      <div className="container mx-auto px-4 md:px-8">
        {/* Brand & Tagline Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between pb-12 border-b border-white/10 gap-6">
          <div>
            <span
              className={`text-[11px] uppercase tracking-[0.25em] font-semibold block mb-2 ${
                isArtisanal ? "text-amber-400 font-jakarta" : "text-emerald-400 font-jakarta"
              }`}
            >
              Artisanal Bakery &amp; Patisserie • Jakarta
            </span>
            <h2
              className={`text-3xl md:text-5xl font-bold tracking-tight text-white ${
                isArtisanal ? "font-playfair" : "font-jakarta"
              }`}
            >
              DAPUR OLA
            </h2>
            <span className="text-xs uppercase tracking-widest text-emerald-200/80 font-medium block mt-1.5">
              Happiness is Homemade • Dipanggang Hangat Setiap Hari
            </span>
          </div>
          <p className="text-xs sm:text-sm text-stone-300 max-w-md leading-relaxed font-jakarta">
            Dapur rumahan spesialis donat kampung empuk, bolu gulung lembut aneka topping, brownies fudgy pekat, dan paket hampers boks hijau eksklusif. Siap kirim fresh ke seluruh Jakarta.
          </p>
        </div>

        {/* 4-Column Grid: Clean & Modern */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 py-12 border-b border-white/10 text-xs">
          {/* Col 1: Lokasi & Jam Operasional */}
          <div className="space-y-3">
            <span
              className={`uppercase tracking-wider block font-bold text-xs ${
                isArtisanal ? "text-amber-400" : "text-emerald-400"
              }`}
            >
              Lokasi &amp; Jadwal
            </span>
            <p className="text-stone-300 leading-relaxed">
              Jl. Gandaria Tengah III, Kebayoran Baru, Jakarta Selatan.
            </p>
            <div className="text-stone-400 space-y-1 pt-1 text-[11px]">
              <p>Mulai manggang: 05:00 WIB</p>
              <p>Dapur buka: 08:00 – 17:00 WIB</p>
              <p>Kirim kurir: Setiap Hari</p>
            </div>
          </div>

          {/* Col 2: Komitmen Bahan Jujur */}
          <div className="space-y-3">
            <span
              className={`uppercase tracking-wider block font-bold text-xs ${
                isArtisanal ? "text-amber-400" : "text-emerald-400"
              }`}
            >
              Jaminan Dapur
            </span>
            <ul className="text-stone-300 space-y-1.5">
              <li>• Tanpa bahan pengawet buatan</li>
              <li>• Butter murni &amp; keju melimpah</li>
              <li>• Cokelat hitam pekat berkualitas</li>
              <li>• Perasan buah &amp; pandan asli</li>
              <li>• 100% Halal Indonesia</li>
            </ul>
          </div>

          {/* Col 3: Navigasi Menu */}
          <div className="space-y-3">
            <span
              className={`uppercase tracking-wider block font-bold text-xs ${
                isArtisanal ? "text-amber-400" : "text-emerald-400"
              }`}
            >
              Pilihan Sajian
            </span>
            <ul className="space-y-2 text-stone-300">
              <li>
                <Link href="/#menu-list" className="hover:text-white transition-colors flex items-center justify-between">
                  <span>Donat Kampung &amp; Bomboloni</span>
                  <span className="text-stone-400 text-[11px]">3 Menu</span>
                </Link>
              </li>
              <li>
                <Link href="/#menu-list" className="hover:text-white transition-colors flex items-center justify-between">
                  <span>Bolu Gulung Lembut</span>
                  <span className="text-stone-400 text-[11px]">4 Menu</span>
                </Link>
              </li>
              <li>
                <Link href="/#menu-list" className="hover:text-white transition-colors flex items-center justify-between">
                  <span>Brownies Fudgy Panggang</span>
                  <span className="text-stone-400 text-[11px]">3 Menu</span>
                </Link>
              </li>
              <li>
                <Link href="/#menu-list" className="hover:text-white transition-colors flex items-center justify-between">
                  <span>Paket Hampers Boks Hijau</span>
                  <span className="text-stone-400 text-[11px]">2 Paket</span>
                </Link>
              </li>
              <li>
                <Link href="/orders" className="hover:text-white transition-colors flex items-center justify-between pt-1 border-t border-white/10">
                  <span>Lacak Status Pesanan</span>
                  <ArrowUpRight strokeWidth={1.5} className="w-3.5 h-3.5 text-emerald-400" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Kontak Resmi */}
          <div className="space-y-3">
            <span
              className={`uppercase tracking-wider block font-bold text-xs ${
                isArtisanal ? "text-amber-400" : "text-emerald-400"
              }`}
            >
              Kontak Dapur
            </span>
            <p className="text-stone-300 leading-relaxed">
              Pesanan acara khusus atau hampers kantor? Hubungi langsung tim baker kami:
            </p>
            <div className="pt-2 space-y-2">
              <a
                href="https://wa.me/6282260011317"
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex items-center gap-2 px-3.5 py-2.5 text-xs font-semibold transition-all w-full justify-center shadow-xs cursor-pointer ${
                  isArtisanal
                    ? "rounded-full bg-emerald-600 hover:bg-emerald-500 text-white"
                    : "rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white"
                }`}
              >
                <MessageCircle className="w-4 h-4" />
                <span>WhatsApp: 0822-6001-1317</span>
              </a>
              <a
                href="https://instagram.com/dapurola"
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex items-center gap-2 px-3.5 py-2.5 border border-white/20 hover:border-white/50 text-stone-200 hover:text-white text-xs transition-colors w-full justify-center ${
                  isArtisanal ? "rounded-full" : "rounded-xl"
                }`}
              >
                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
                <span>Instagram: @dapurola</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Notes */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-400">
          <div>
            © {new Date().getFullYear()} DAPUR OLA. Happiness is Homemade. Semua resep diracik sendiri.
          </div>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 text-white font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              Sistem Pemesanan Online Dapur Ola
            </span>
            <span>•</span>
            <Link href="/admin" className="text-emerald-400 hover:text-white underline">
              POS Dapur (Admin)
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
