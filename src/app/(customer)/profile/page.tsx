"use client";

import { useStore } from "@/store/useStore";
import { Phone, Mail, MapPin, Package, Heart, ArrowRight } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";

export default function ProfilePage() {
  const { user, orders, wishlist } = useStore();

  if (!user) {
    return (
      <div className="container mx-auto px-4 md:px-8 py-24 flex flex-col items-center justify-center text-center bg-[#FAFBF9]">
        <span className="font-mono text-xs uppercase tracking-widest text-[#00A65E] font-bold mb-2">
          PROFIL PENGGUNA
        </span>
        <h1 className="font-cinzel text-3xl font-bold text-[#073524] mb-4">
          Profil Belum Terbaca
        </h1>
        <Link
          href="/"
          className="px-8 py-4 bg-[#00A65E] text-white font-mono text-xs uppercase tracking-widest font-bold shadow-xs hover:bg-[#008F50] transition-colors"
        >
          Balik ke Menu Jajan ↗
        </Link>
      </div>
    );
  }

  return (
    <div className="w-full bg-[#FAFBF9] text-[#073524] min-h-screen pb-24">
      {/* Top Banner */}
      <div className="border-b border-[#D4E5DC] py-10 md:py-14 bg-[#EAF4EE]">
        <div className="container mx-auto px-4 md:px-8 max-w-4xl">
          <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.25em] text-[#00A65E] font-bold mb-2">
            <span>DAPUR OLA</span>
            <span>·</span>
            <span>DATA PELANGGAN</span>
          </div>
          <h1 className="font-cinzel text-3xl sm:text-5xl font-bold text-[#073524]">
            Profil Pelanggan
          </h1>
          <p className="font-sans text-sm text-[#2E4A3D] mt-2">
            Kelola data diri, alamat kirim langganan, dan riwayat pesanan.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-8 pt-10 max-w-4xl">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {/* Left Column: Data Profil (5 cols) */}
          <div className="md:col-span-5 border border-[#D4E5DC] bg-white p-6 space-y-6 shadow-xs">
            <div className="flex items-center justify-between pb-3 border-b border-[#D4E5DC] font-mono text-xs uppercase tracking-wider text-[#5A7E6D]">
              <span className="font-bold text-[#073524]">[DATA AKUN]</span>
              <span className="text-[#00A65E] font-bold">AKTIF</span>
            </div>

            <div className="space-y-4">
              <div>
                <span className="font-cinzel text-2xl font-bold text-[#073524] block">
                  {user.name}
                </span>
                <span className="font-mono text-xs text-[#5A7E6D]">Pelanggan Setia Dapur Ola</span>
              </div>

              <div className="space-y-2.5 font-mono text-xs text-[#2E4A3D] pt-2 border-t border-[#D4E5DC]/60">
                <div className="flex items-center gap-2">
                  <Phone strokeWidth={1.5} className="w-4 h-4 text-[#00A65E]" />
                  <span>{user.phone}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail strokeWidth={1.5} className="w-4 h-4 text-[#00A65E]" />
                  <span>{user.email}</span>
                </div>
                <div className="flex items-start gap-2 pt-1">
                  <MapPin strokeWidth={1.5} className="w-4 h-4 text-[#00A65E] shrink-0 mt-0.5" />
                  <span className="font-sans leading-relaxed">{user.address}</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => toast.success("Data profil tersimpan aman.")}
              className="w-full py-3 border border-[#D4E5DC] text-[#073524] hover:bg-[#EAF4EE] font-mono text-xs uppercase tracking-wider font-bold transition-colors cursor-pointer"
            >
              Ubah Data Profil
            </button>
          </div>

          {/* Right Column: Ringkasan Aktivitas (7 cols) */}
          <div className="md:col-span-7 space-y-6">
            <div className="border border-[#D4E5DC] bg-white p-6 shadow-xs space-y-4">
              <span className="font-mono text-xs uppercase tracking-wider font-bold text-[#073524] block pb-3 border-b border-[#D4E5DC]">
                [RINGKASAN AKTIVITAS JAJAN]
              </span>

              <div className="grid grid-cols-2 gap-4 font-mono">
                <div className="p-4 bg-[#EAF4EE] border border-[#D4E5DC]">
                  <span className="text-[10px] uppercase tracking-widest text-[#5A7E6D] block">
                    TOTAL PESANAN
                  </span>
                  <span className="text-2xl font-bold text-[#073524] mt-1 block">
                    {orders.length}x
                  </span>
                </div>
                <div className="p-4 bg-[#EAF4EE] border border-[#D4E5DC]">
                  <span className="text-[10px] uppercase tracking-widest text-[#5A7E6D] block">
                    FAVORIT DISIMPAN
                  </span>
                  <span className="text-2xl font-bold text-[#073524] mt-1 block">
                    {wishlist.length} Menu
                  </span>
                </div>
              </div>

              <div className="pt-2">
                <Link
                  href="/orders"
                  className="flex items-center justify-between p-3.5 bg-[#00A65E] text-white font-mono text-xs uppercase tracking-wider font-bold hover:bg-[#008F50] transition-colors shadow-xs"
                >
                  <span>Lihat Riwayat Pesanan Saya</span>
                  <ArrowRight strokeWidth={2} className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
