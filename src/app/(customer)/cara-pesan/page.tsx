import { ArrowLeft, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function CaraPesanPage() {
  const steps = [
    {
      num: "01",
      tag: "Pilih Menu Favorit",
      title: "Pilih Menu Hangat di Etalase",
      desc: "Telusuri pilihan donat kampung empuk, bolu gulung lembut aneka topping, brownies fudgy pekat, atau paket hampers boks hijau kami. Stok sisa loyang harian selalu terupdate secara live.",
    },
    {
      num: "02",
      tag: "Tentukan Porsi & Catatan",
      title: "Klik Bungkus & Tulis Catatan",
      desc: "Tentukan berapa porsi yang ingin dibungkus. Mau titip kartu ucapan custom ulang tahun atau minta dipotong rapi jadi 10 bagian? Cukup tulis di kolom catatan pemesanan.",
    },
    {
      num: "03",
      tag: "Alamat & Kurir",
      title: "Isi Alamat & Pilih Jadwal Pengiriman",
      desc: "Tulis alamat penerima dan nomor WhatsApp untuk koordinasi kurir. Anda bisa memilih pengiriman instan langsung sampai, sameday dingin dengan ice gel, atau pickup langsung ke dapur Gandaria.",
    },
    {
      num: "04",
      tag: "Pembayaran Otomatis",
      title: "Bayar via QRIS / Virtual Account",
      desc: "Scan QRIS menggunakan mobile banking atau e-wallet apa pun secara instan. Begitu pembayaran terverifikasi, pesanan Anda langsung diproses dan dikemas rapi dalam boks hijau eksklusif Dapur Ola.",
    },
  ];

  return (
    <div className="w-full bg-[#FAF7F2] text-stone-900 min-h-screen pb-24 font-jakarta">
      {/* Top Banner */}
      <div className="border-b border-stone-200 py-8 sm:py-12 bg-[#F5EFE6]">
        <div className="container mx-auto px-4 md:px-8 max-w-4xl">
          <Link
            href="/#menu-list"
            className="inline-flex items-center gap-1.5 text-xs text-stone-500 hover:text-stone-900 mb-3 transition-colors"
          >
            <ArrowLeft strokeWidth={1.5} className="w-4 h-4" />
            <span>Kembali ke Menu Utama</span>
          </Link>
          <span className="text-[10px] uppercase tracking-widest text-amber-800 font-semibold block mb-1">
            Panduan Pemesanan Online
          </span>
          <h1 className="font-playfair text-2xl sm:text-4xl font-bold text-[#1B4332]">
            Cara Pesan Jajan di Dapur Ola
          </h1>
          <p className="text-xs sm:text-sm text-stone-600 mt-1.5">
            Mudah, cepat, dan dijamin dipanggang fresh tiap pagi tanpa bahan pengawet kimia.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-3 sm:px-6 md:px-8 pt-6 sm:pt-10 max-w-4xl">
        <div className="bg-white sm:rounded-3xl sm:border sm:border-stone-200/80 divide-y divide-stone-100 overflow-hidden shadow-xs">
          {steps.map((step) => (
            <div key={step.num} className="p-4 sm:p-7 flex flex-col sm:flex-row gap-4 sm:gap-6 items-start">
              <div className="w-12 h-12 rounded-2xl bg-[#1B4332] text-white flex items-center justify-center text-lg font-bold shrink-0 shadow-xs">
                {step.num}
              </div>
              <div className="space-y-1.5 flex-1">
                <span className="text-[10px] uppercase tracking-wider text-amber-800 font-semibold block">
                  {step.tag}
                </span>
                <h3 className="font-playfair text-base sm:text-xl font-bold text-stone-900">
                  {step.title}
                </h3>
                <p className="text-xs sm:text-sm text-stone-600 leading-relaxed font-normal">
                  {step.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 flex justify-center">
          <Link
            href="/#menu-list"
            className="h-12 px-8 rounded-full bg-[#1B4332] text-white hover:bg-[#143225] transition-all text-xs font-semibold inline-flex items-center gap-2 shadow-xs active:scale-95 cursor-pointer"
          >
            <span>Pilih Menu Sekarang</span>
            <ArrowRight strokeWidth={2} className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
