import Link from "next/link";
import { Camera, MessageCircle, MapPin } from "lucide-react";

export default function CustomerFooter() {
  return (
    <footer className="bg-brand-cream pt-16 pb-8 border-t border-brand-beige">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="md:col-span-2">
            <h3 className="font-heading text-2xl font-semibold text-brand-primary mb-4">Dapur Ola</h3>
            <p className="text-muted-foreground mb-6 max-w-sm">
              Menyajikan bolu gulung, brownies, dan dessert pilihan yang dibikin fresh setiap hari.
              Cocok banget buat nemenin waktu santai atau hadiah buat orang tersayang.
            </p>
            <div className="flex items-center gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-brand-light flex items-center justify-center text-brand-primary hover:bg-brand-primary hover:text-white transition-colors">
                <Camera className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-brand-light flex items-center justify-center text-brand-primary hover:bg-brand-primary hover:text-white transition-colors">
                <MessageCircle className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-heading font-semibold text-lg text-foreground mb-4">Menu Bantuan</h4>
            <ul className="space-y-3">
              <li><Link href="/products" className="text-muted-foreground hover:text-brand-primary transition-colors">Menu Kami</Link></li>
              <li><Link href="/orders" className="text-muted-foreground hover:text-brand-primary transition-colors">Lacak Pesanan</Link></li>
              <li><Link href="/cara-pesan" className="text-muted-foreground hover:text-brand-primary transition-colors">Cara Pesan</Link></li>
              <li><Link href="/faq" className="text-muted-foreground hover:text-brand-primary transition-colors">FAQ</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-heading font-semibold text-lg text-foreground mb-4">Hubungi Kami</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-brand-primary shrink-0 mt-0.5" />
                <span className="text-muted-foreground text-sm">
                  Jl. Bahagia Raya No. 123,<br />
                  Jakarta Selatan, 12345
                </span>
              </li>
              <li className="flex items-start gap-3">
                <MessageCircle className="w-5 h-5 text-brand-primary shrink-0 mt-0.5" />
                <span className="text-muted-foreground text-sm">
                  WhatsApp: 0812-3456-7890<br />
                  (Senin - Sabtu, 08:00 - 17:00)
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-brand-beige text-center">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} Dapur Ola. HAPPINESS IS HOMEMADE.
          </p>
        </div>
      </div>
    </footer>
  );
}
