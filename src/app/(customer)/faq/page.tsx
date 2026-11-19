import { ArrowLeft, ChevronDown } from "lucide-react";
import Link from "next/link";

export default function FAQPage() {
  const faqs = [
    {
      q: "Bolu gulung, brownies, dan donatnya tahan berapa lama?",
      a: "Karena kami 100% tanpa bahan pengawet kimia: Bolu Gulung tahan 3 hari di suhu ruang sejuk, dan tahan sampai 7 hari jika disimpan di dalam kulkas. Brownies Fudgy tahan 5 hari di suhu ruang dan 14 hari di kulkas. Donat Kampung paling nikmat disantap langsung di hari yang sama atau maksimal 2 hari.",
    },
    {
      q: "Pengirimannya aman gak? Nanti pas sampai kuenya rusak atau miring gak?",
      a: "Aman banget! Semua pesanan kami kemas dalam boks hijau tebal Dapur Ola dengan sekat pas, dilapisi plastik segel higienis, dan dilengkapi ice gel pendingin untuk pengiriman sameday. Kurir motor juga sudah dibriefing khusus agar membawa boks tetap datar dan hati-hati.",
    },
    {
      q: "Bisa titip kartu ucapan buat kado ulang tahun atau hantaran?",
      a: "Bisa banget dan GRATIS! Saat checkout di halaman pemesanan, tersedia kolom Catatan Khusus. Cukup tuliskan pesan yang ingin disampaikan, tim kami akan menuliskannya dengan rapi di kartu ucapan eksklusif Dapur Ola.",
    },
    {
      q: "Apakah semua menu Dapur Ola halal dan higienis?",
      a: "Pasti halal dan higienis 100%. Kami hanya memakai bahan bersertifikasi Halal Indonesia: mentega murni berkualitas (Wijsman/Anchor), keju cheddar melimpah, dark chocolate murni tanpa campuran minyak curah, dan telur segar setiap pagi.",
    },
    {
      q: "Bisa pesan untuk acara kantor, arisan, atau hampers partai besar?",
      a: "Sangat bisa! Untuk pesanan di atas 10 boks, silakan hubungi tim dapur kami via WhatsApp di 0822-6001-1317 agar jadwal panggang fresh dapat dialokasikan tepat waktu.",
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
            Pusat Informasi &amp; Bantuan
          </span>
          <h1 className="font-playfair text-2xl sm:text-4xl font-bold text-[#1B4332]">
            Pertanyaan yang Sering Diajukan
          </h1>
          <p className="text-xs sm:text-sm text-stone-600 mt-1.5">
            Informasi lengkap seputar daya tahan kue, standar packing boks hijau, pengiriman, dan pesanan hampers.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-3 sm:px-6 md:px-8 pt-6 sm:pt-10 max-w-4xl">
        <div className="bg-white sm:rounded-3xl sm:border sm:border-stone-200/80 divide-y divide-stone-100 overflow-hidden shadow-xs">
          {faqs.map((faq, idx) => (
            <details
              key={idx}
              className="group p-4 sm:p-6 cursor-pointer open:bg-stone-50/60 transition-colors"
            >
              <summary className="flex items-center justify-between list-none font-playfair text-base sm:text-lg font-bold text-stone-900 select-none group-hover:text-[#1B4332] transition-colors">
                <span>{faq.q}</span>
                <ChevronDown strokeWidth={1.75} className="w-5 h-5 text-emerald-700 group-open:rotate-180 transition-transform shrink-0 ml-3" />
              </summary>
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed mt-3 pt-3 border-t border-stone-100 font-normal">
                {faq.a}
              </p>
            </details>
          ))}
        </div>
      </div>
    </div>
  );
}
