import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export default function FAQPage() {
  return (
    <main className="container mx-auto px-4 py-8 max-w-3xl min-h-[60vh]">
      <Link href="/" className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-brand-primary mb-6">
        <ArrowLeft className="w-4 h-4 mr-2" /> Kembali ke Beranda
      </Link>
      
      <h1 className="text-3xl font-heading font-semibold text-brand-primary mb-2">Tanya Jawab (FAQ)</h1>
      <p className="text-muted-foreground mb-8">Pertanyaan yang sering ditanyakan seputar layanan Dapur Ola.</p>
      
      <div className="bg-white p-6 rounded-2xl border border-brand-beige shadow-sm">
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger className="text-left font-semibold text-brand-primary">Berapa lama proses pembuatan kue?</AccordionTrigger>
            <AccordionContent className="text-muted-foreground">
              Untuk kue tart dan pesanan khusus (custom), kami membutuhkan waktu minimal 2-3 hari. Sedangkan untuk produk pastry harian (seperti bomboloni), bisa dikirim di hari yang sama jika stok tersedia.
            </AccordionContent>
          </AccordionItem>
          
          <AccordionItem value="item-2">
            <AccordionTrigger className="text-left font-semibold text-brand-primary">Apakah bisa request desain kue sendiri?</AccordionTrigger>
            <AccordionContent className="text-muted-foreground">
              Tentu bisa! Anda dapat menghubungi admin kami melalui WhatsApp setelah melakukan pemesanan untuk mendiskusikan desain, warna, dan tulisan yang diinginkan.
            </AccordionContent>
          </AccordionItem>
          
          <AccordionItem value="item-3">
            <AccordionTrigger className="text-left font-semibold text-brand-primary">Metode pengiriman apa saja yang tersedia?</AccordionTrigger>
            <AccordionContent className="text-muted-foreground">
              Saat ini kami menyediakan opsi pengiriman menggunakan kurir internal kami untuk menjaga kualitas kue, atau Anda bisa memilih opsi Ambil Sendiri (Pickup) di toko kami.
            </AccordionContent>
          </AccordionItem>
          
          <AccordionItem value="item-4">
            <AccordionTrigger className="text-left font-semibold text-brand-primary">Bagaimana cara membatalkan pesanan?</AccordionTrigger>
            <AccordionContent className="text-muted-foreground">
              Pembatalan pesanan dapat dilakukan maksimal H-2 sebelum tanggal pengiriman. Silakan hubungi admin kami secepatnya untuk proses pembatalan.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </main>
  );
}
