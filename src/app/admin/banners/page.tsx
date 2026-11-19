"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import KitchenOperationsBar from "@/components/admin/KitchenOperationsBar";
import DailySnapshotDock from "@/components/admin/DailySnapshotDock";
import InfinitePromoMarquee from "@/components/banner/InfinitePromoMarquee";
import AutoLoopingPromoBanner from "@/components/banner/AutoLoopingPromoBanner";
import { useStore } from "@/store/useStore";
import { mockBanners } from "@/store/mockData";
import { Plus, Trash2, Megaphone, Tag, Eye, Sparkles, ExternalLink, Check } from "lucide-react";
import { toast } from "sonner";

const AVAILABLE_IMAGES = [
  { label: "Donat Aneka Topping (Kotak Hijau)", path: "/assets/Untitled_design_10.webp" },
  { label: "Donat Gula Aren Tabur (Kotak Hijau)", path: "/assets/Untitled_design_8.webp" },
  { label: "Brownies Keju Drizzle (Kotak Hijau)", path: "/assets/800_8624.webp" },
  { label: "Paket Hampers Sultan Spesial", path: "/assets/800_8634.webp" },
  { label: "Bolu Gulung Keju Melimpah", path: "/assets/800_8611.webp" },
  { label: "Brownies Fudgy Dark Choco", path: "/assets/800_8586.webp" },
];

export default function AdminBannersPage() {
  const { banners, addBanner, toggleBannerStatus, deleteBanner } = useStore();
  const [isAdding, setIsAdding] = useState(false);

  // Form states
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [badge, setBadge] = useState("FLASH PROMO");
  const [code, setCode] = useState("");
  const [discountText, setDiscountText] = useState("");
  const [selectedImage, setSelectedImage] = useState(AVAILABLE_IMAGES[0].path);

  const activeBannersList = banners && banners.length > 0 ? banners : mockBanners;

  const handleCreateBanner = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !subtitle.trim()) {
      toast.error("Judul dan deskripsi promo wajib diisi!");
      return;
    }

    addBanner({
      title: title.trim(),
      subtitle: subtitle.trim(),
      badge: badge.trim().toUpperCase() || "PROMO",
      code: code.trim().toUpperCase() || undefined,
      discountText: discountText.trim().toUpperCase() || undefined,
      image: selectedImage,
      isActive: true,
    });

    toast.success("Promo / notifikasi baru berhasil dipasang!", {
      description: "Banner sekarang otomatis berputar di etalase pembeli.",
    });

    // Reset form
    setTitle("");
    setSubtitle("");
    setCode("");
    setDiscountText("");
    setIsAdding(false);
  };

  return (
    <div className="min-h-screen flex flex-col justify-between bg-[#0D0F12] text-[#F4F4F5]">
      <KitchenOperationsBar />

      <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-6xl w-full mx-auto space-y-8">
        {/* Header title */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-neutral-800 pb-5">
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs uppercase text-[#00A65E] font-bold tracking-widest">
                KONTROL PROMOSI & PENGUMUMAN OTOMATIS
              </span>
              <span className="px-2 py-0.5 bg-emerald-950 text-emerald-400 font-mono text-[10px] uppercase font-bold border border-emerald-800">
                LOOPING AKTIF
              </span>
            </div>
            <h1 className="font-mono text-2xl sm:text-3xl font-bold text-white mt-1">
              Banner Promosi & Notifikasi Toko
            </h1>
            <p className="font-sans text-xs text-neutral-400 mt-1 max-w-xl">
              Banner di bawah ini otomatis berputar tanpa henti (*infinite looping never end*) di halaman pembeli untuk mengumumkan diskon, voucher, dan jam operasional.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/"
              target="_blank"
              className="h-11 px-4 border border-neutral-700 bg-neutral-900 hover:bg-neutral-800 text-neutral-300 font-mono text-xs uppercase font-bold flex items-center gap-2 transition-colors"
            >
              <span>Lihat di Etalase</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>

            <button
              onClick={() => setIsAdding(!isAdding)}
              className="h-11 px-5 bg-[#00A65E] hover:bg-[#008F50] text-white font-mono text-xs uppercase font-bold flex items-center gap-2 transition-colors cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>{isAdding ? "Tutup Form" : "Tambah Promo Baru"}</span>
            </button>
          </div>
        </div>

        {/* Live Preview Container */}
        <section className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Eye className="w-4 h-4 text-emerald-400" />
              <h2 className="font-mono text-xs font-bold uppercase tracking-widest text-neutral-300">
                LIVE PREVIEW: TAMPILAN BANNER DI ETALASE PEMBELI
              </h2>
            </div>
            <span className="font-mono text-[10px] text-neutral-500">
              *Tampilan real-time yang sedang dilihat pelanggan
            </span>
          </div>

          {/* Render actual components inside a frame */}
          <div className="border border-neutral-700 bg-[#F6F5F0] overflow-hidden shadow-lg">
            <div className="bg-neutral-900 px-4 py-1.5 flex items-center justify-between text-[11px] font-mono text-neutral-400 border-b border-neutral-800">
              <span>● ● ● DAPUR OLA COMMISSARY // HEADER MARQUEE & BANNER PREVIEW</span>
              <span className="text-emerald-400 font-bold">AUTOMATIC LOOP ACTIVE</span>
            </div>
            <InfinitePromoMarquee />
            <AutoLoopingPromoBanner />
          </div>
        </section>

        {/* Add Banner Form Drawer */}
        {isAdding && (
          <form
            onSubmit={handleCreateBanner}
            className="border border-[#00A65E] bg-[#14181F] p-5 sm:p-7 space-y-5 animate-in fade-in duration-300"
          >
            <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
              <div className="flex items-center gap-2">
                <Megaphone className="w-4 h-4 text-emerald-400" />
                <h3 className="font-mono text-sm font-bold uppercase tracking-wider text-white">
                  Pasang Promo / Pengumuman Baru
                </h3>
              </div>
              <span className="font-mono text-[11px] text-neutral-400">
                Langsung live ke looping banner
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {/* Badge Tag */}
              <div className="space-y-1.5">
                <label className="font-mono text-xs uppercase text-neutral-400 block font-semibold">
                  Kategori / Badge Tag
                </label>
                <select
                  value={badge}
                  onChange={(e) => setBadge(e.target.value)}
                  className="w-full h-11 px-3 bg-[#0D0F12] border border-neutral-700 font-mono text-xs text-white outline-none focus:border-emerald-500"
                >
                  <option value="FLASH PROMO">FLASH PROMO</option>
                  <option value="BEBAS ONGKIR">BEBAS ONGKIR</option>
                  <option value="HAMPERS CANTIK">HAMPERS CANTIK</option>
                  <option value="INFO DAPUR">INFO DAPUR</option>
                  <option value="PROMO GAJIAN">PROMO GAJIAN</option>
                  <option value="EDISI TERBATAS">EDISI TERBATAS</option>
                </select>
              </div>

              {/* Promo Code */}
              <div className="space-y-1.5">
                <label className="font-mono text-xs uppercase text-neutral-400 block font-semibold">
                  Kode Voucher (Opsional)
                </label>
                <input
                  type="text"
                  placeholder="Contoh: OLAHEMAT20"
                  value={code}
                  onChange={(e) => setCode(e.target.value.toUpperCase())}
                  className="w-full h-11 px-3 bg-[#0D0F12] border border-neutral-700 font-mono text-xs text-white placeholder:text-neutral-600 outline-none focus:border-emerald-500"
                />
              </div>

              {/* Discount / Label Text */}
              <div className="space-y-1.5">
                <label className="font-mono text-xs uppercase text-neutral-400 block font-semibold">
                  Label Diskon (Opsional)
                </label>
                <input
                  type="text"
                  placeholder="Contoh: DISKON 20% / HEMAT 25RB"
                  value={discountText}
                  onChange={(e) => setDiscountText(e.target.value)}
                  className="w-full h-11 px-3 bg-[#0D0F12] border border-neutral-700 font-mono text-xs text-white placeholder:text-neutral-600 outline-none focus:border-emerald-500"
                />
              </div>

              {/* Title */}
              <div className="sm:col-span-2 space-y-1.5">
                <label className="font-mono text-xs uppercase text-neutral-400 block font-semibold">
                  Judul Banner Promo <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  placeholder="Contoh: DISKON SPESIAL AKHIR PEKAN SEMUA KUE BOLU GULUNG"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full h-11 px-3 bg-[#0D0F12] border border-neutral-700 font-sans text-xs text-white placeholder:text-neutral-600 outline-none focus:border-emerald-500 font-bold"
                  required
                />
              </div>

              {/* Image Asset Selector */}
              <div className="sm:col-span-2 lg:col-span-1 space-y-1.5">
                <label className="font-mono text-xs uppercase text-neutral-400 block font-semibold">
                  Foto Produk Asset
                </label>
                <select
                  value={selectedImage}
                  onChange={(e) => setSelectedImage(e.target.value)}
                  className="w-full h-11 px-3 bg-[#0D0F12] border border-neutral-700 font-mono text-xs text-white outline-none focus:border-emerald-500"
                >
                  {AVAILABLE_IMAGES.map((img) => (
                    <option key={img.path} value={img.path}>
                      {img.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Subtitle / Description */}
              <div className="sm:col-span-2 lg:col-span-3 space-y-1.5">
                <label className="font-mono text-xs uppercase text-neutral-400 block font-semibold">
                  Rincian Deskripsi / Catatan Promo <span className="text-red-400">*</span>
                </label>
                <textarea
                  placeholder="Tulis deskripsi santai dan jelas buat pembeli, contoh: Masukkan kode saat bayar, kuota terbatas 30 porsi per hari ini."
                  value={subtitle}
                  onChange={(e) => setSubtitle(e.target.value)}
                  rows={2}
                  className="w-full p-3 bg-[#0D0F12] border border-neutral-700 font-sans text-xs text-white placeholder:text-neutral-600 outline-none focus:border-emerald-500"
                  required
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-3 border-t border-neutral-800">
              <button
                type="button"
                onClick={() => setIsAdding(false)}
                className="h-11 px-5 border border-neutral-700 bg-transparent hover:bg-neutral-800 text-neutral-400 font-mono text-xs uppercase font-bold transition-colors"
              >
                Batal
              </button>
              <button
                type="submit"
                className="h-11 px-6 bg-[#00A65E] hover:bg-[#008F50] text-white font-mono text-xs uppercase font-bold flex items-center gap-2 transition-colors cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Simpan & Aktifkan di Looping</span>
              </button>
            </div>
          </form>
        )}

        {/* List of Active & Inactive Banners */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-mono text-sm font-bold uppercase tracking-widest text-neutral-300">
              DAFTAR PROMO DALAM SISTEM LOOPING ({activeBannersList.length})
            </h2>
            <span className="font-mono text-xs text-neutral-500">
              {activeBannersList.filter((b) => b.isActive).length} Sedang Berputar Aktif
            </span>
          </div>

          <div className="border border-neutral-800 bg-[#16181D] divide-y divide-neutral-800">
            {activeBannersList.map((b, idx) => (
              <div
                key={b.id || idx}
                className="p-5 sm:p-6 flex flex-col md:flex-row md:items-center justify-between gap-5 transition-colors hover:bg-[#1A1D23]"
              >
                {/* Left Thumbnail + Details */}
                <div className="flex items-start gap-4">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 relative bg-neutral-900 border border-neutral-700 shrink-0 overflow-hidden">
                    <Image
                      src={b.image || "/assets/Untitled_design_10.webp"}
                      alt={b.title}
                      fill
                      className="object-cover"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-mono text-[10px] uppercase font-bold px-2 py-0.5 bg-neutral-800 text-emerald-400 border border-neutral-700">
                        {b.badge || "PROMO"}
                      </span>
                      {b.code && (
                        <span className="font-mono text-[10px] font-bold px-2 py-0.5 bg-amber-400/10 text-amber-300 border border-amber-400/40">
                          KODE: {b.code}
                        </span>
                      )}
                      {b.discountText && (
                        <span className="font-mono text-[10px] font-bold text-amber-400">
                          [{b.discountText}]
                        </span>
                      )}
                    </div>

                    <h3 className="font-mono text-sm sm:text-base font-bold text-white leading-snug">
                      {b.title}
                    </h3>
                    <p className="font-sans text-xs text-neutral-400 max-w-xl leading-relaxed">
                      {b.subtitle}
                    </p>
                  </div>
                </div>

                {/* Right Action Buttons */}
                <div className="flex items-center gap-3 shrink-0 self-end md:self-center">
                  <button
                    type="button"
                    onClick={() => {
                      toggleBannerStatus(b.id);
                      toast.success(
                        b.isActive
                          ? `Banner "${b.title.slice(0, 20)}..." dinonaktifkan.`
                          : `Banner "${b.title.slice(0, 20)}..." diaktifkan ke looping!`
                      );
                    }}
                    className={`h-11 px-4 font-mono text-xs uppercase font-bold border transition-colors ${
                      b.isActive
                        ? "bg-emerald-950 text-emerald-300 border-emerald-500 hover:bg-emerald-900"
                        : "bg-neutral-800 text-neutral-400 border-neutral-700 hover:bg-neutral-700"
                    }`}
                  >
                    {b.isActive ? "🟢 Aktif di Looping" : "⚪ Dinonaktifkan"}
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      if (confirm("Hapus banner promo ini dari sistem?")) {
                        deleteBanner(b.id);
                        toast.success("Banner berhasil dihapus.");
                      }
                    }}
                    className="h-11 w-11 flex items-center justify-center border border-neutral-800 bg-neutral-900 text-neutral-500 hover:text-red-400 hover:border-red-900 transition-colors"
                    title="Hapus banner"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      <DailySnapshotDock />
    </div>
  );
}
