import { ArrowLeft, ChevronDown } from "lucide-react";
import Link from "next/link";

export default function FAQPage() {
  return (
    <main className="container mx-auto px-4 py-8 max-w-3xl min-h-[60vh]">
      <Link href="/" className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-brand-primary mb-6">
        <ArrowLeft className="w-4 h-4 mr-2" /> Kembali ke Beranda
      </Link>
      
      <h1 className="text-3xl font-heading font-semibold text-brand-primary mb-2">Tanya Jawab (FAQ)</h1>
      <p className="text-muted-foreground mb-8">Pertanyaan yang sering ditanyakan seputar layanan Dapur Ola.</p>
      
      <div className="bg-white p-6 rounded-2xl border border-brand-beige shadow-sm space-y-4">
        
        <details className="group [&_summary::-webkit-details-marker]:hidden border-b border-brand-beige pb-4">
          <summary className="flex cursor-pointer items-center justify-between font-semibold text-brand-primary">
            <span>Berapa lama proses pembuatan kue?</span>
            <span className="transition group-open:rotate-180">
              <ChevronDown className="w-5 h-5 text-brand-primary/50" />
            </span>
          </summary>
          <div className="text-muted-foreground mt-4 leading-relaxed">
            Untuk kue tart dan pesanan khusus (custom), kami membutuhkan waktu minimal 2-3 hari. Sedangkan untuk produk pastry harian (seperti bomboloni), bisa dikirim di hari yang sama jika stok tersedia.
          </div>
        </details>
        
        <details className="group [&_summary::-webkit-details-marker]:hidden border-b border-brand-beige pb-4">
          <summary className="flex cursor-pointer items-center justify-between font-semibold text-brand-primary">
            <span>Apakah bisa request desain kue sendiri?</span>
            <span className="transition group-open:rotate-180">
              <ChevronDown className="w-5 h-5 text-brand-primary/50" />
            </span>
          </summary>
          <div className="text-muted-foreground mt-4 leading-relaxed">
            Tentu bisa! Anda dapat menghubungi admin kami melalui WhatsApp setelah melakukan pemesanan untuk mendiskusikan desain, warna, dan tulisan yang diinginkan.
          </div>
        </details>
        
        <details className="group [&_summary::-webkit-details-marker]:hidden border-b border-brand-beige pb-4">
          <summary className="flex cursor-pointer items-center justify-between font-semibold text-brand-primary">
            <span>Metode pengiriman apa saja yang tersedia?</span>
            <span className="transition group-open:rotate-180">
              <ChevronDown className="w-5 h-5 text-brand-primary/50" />
            </span>
          </summary>
          <div className="text-muted-foreground mt-4 leading-relaxed">
            Saat ini kami menyediakan opsi pengiriman menggunakan kurir internal kami untuk menjaga kualitas kue, atau Anda bisa memilih opsi Ambil Sendiri (Pickup) di toko kami.
          </div>
        </details>
        
        <details className="group [&_summary::-webkit-details-marker]:hidden border-b border-brand-beige pb-4">
          <summary className="flex cursor-pointer items-center justify-between font-semibold text-brand-primary">
            <span>Bagaimana cara membatalkan pesanan?</span>
            <span className="transition group-open:rotate-180">
              <ChevronDown className="w-5 h-5 text-brand-primary/50" />
            </span>
          </summary>
          <div className="text-muted-foreground mt-4 leading-relaxed">
            Pembatalan pesanan dapat dilakukan maksimal H-2 sebelum tanggal pengiriman. Silakan hubungi admin kami secepatnya untuk proses pembatalan.
          </div>
        </details>

      </div>
    </main>
  );
}
