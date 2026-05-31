import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function CaraPesanPage() {
  return (
    <main className="container mx-auto px-4 py-8 max-w-3xl min-h-[60vh]">
      <Link href="/" className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-brand-primary mb-6">
        <ArrowLeft className="w-4 h-4 mr-2" /> Kembali ke Beranda
      </Link>
      
      <h1 className="text-3xl font-heading font-semibold text-brand-primary mb-6">Cara Pesan</h1>
      
      <div className="space-y-6 text-foreground bg-white p-8 rounded-2xl border border-brand-beige shadow-sm">
        <div className="flex gap-4">
          <div className="w-8 h-8 rounded-full bg-brand-primary text-white flex items-center justify-center font-bold shrink-0">1</div>
          <div>
            <h3 className="font-semibold text-lg mb-1">Pilih Produk</h3>
            <p className="text-muted-foreground">Telusuri menu kami dan pilih kue atau produk favorit Anda.</p>
          </div>
        </div>
        
        <div className="flex gap-4">
          <div className="w-8 h-8 rounded-full bg-brand-primary text-white flex items-center justify-center font-bold shrink-0">2</div>
          <div>
            <h3 className="font-semibold text-lg mb-1">Masukkan ke Keranjang</h3>
            <p className="text-muted-foreground">Tentukan jumlah yang diinginkan dan klik tombol tambah ke keranjang.</p>
          </div>
        </div>
        
        <div className="flex gap-4">
          <div className="w-8 h-8 rounded-full bg-brand-primary text-white flex items-center justify-center font-bold shrink-0">3</div>
          <div>
            <h3 className="font-semibold text-lg mb-1">Checkout</h3>
            <p className="text-muted-foreground">Isi data pengiriman dan pilih metode pembayaran.</p>
          </div>
        </div>
        
        <div className="flex gap-4">
          <div className="w-8 h-8 rounded-full bg-brand-primary text-white flex items-center justify-center font-bold shrink-0">4</div>
          <div>
            <h3 className="font-semibold text-lg mb-1">Konfirmasi Pesanan</h3>
            <p className="text-muted-foreground">Selesaikan pembayaran dan pesanan Anda akan segera kami proses!</p>
          </div>
        </div>
      </div>
    </main>
  );
}
