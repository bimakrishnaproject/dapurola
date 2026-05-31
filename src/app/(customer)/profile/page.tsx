"use client";

import { useStore } from "@/store/useStore";
import { User, MapPin, Phone, Mail, Package, Heart } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button, buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import { toast } from "sonner";

export default function ProfilePage() {
  const { user, orders, wishlist } = useStore();

  if (!user) {
    return (
      <div className="container mx-auto px-4 py-24 flex flex-col items-center justify-center text-center">
        <h1 className="text-3xl font-heading font-semibold text-brand-primary mb-4">Belum Login</h1>
        <p className="text-muted-foreground text-lg mb-8">Silakan login untuk melihat profil.</p>
        <Link href="/" className={buttonVariants({ size: "lg", className: "rounded-full px-8" })}>Kembali ke Beranda</Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-6 md:py-10 max-w-4xl">
      <h1 className="text-2xl md:text-3xl font-heading font-bold text-brand-primary mb-4 md:mb-6">Profil Saya</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8">
        <div className="md:col-span-1">
          <Card className="rounded-3xl border-transparent shadow-sm overflow-hidden bg-white">
            <div className="bg-brand-cream py-6 flex flex-col items-center justify-center text-center border-b border-brand-beige">
              <div className="w-20 h-20 bg-brand-primary text-white rounded-full flex items-center justify-center text-3xl font-heading font-semibold mb-4">
                {user.name.charAt(0)}
              </div>
              <h2 className="text-lg md:text-xl font-heading font-bold text-foreground">{user.name}</h2>
              <p className="text-xs md:text-sm text-muted-foreground mt-0.5">Pelanggan Setia Dapur Ola</p>
            </div>
            <div className="p-5 space-y-3">
              <div className="flex items-center gap-3 text-sm">
                <Phone className="w-4 h-4 text-brand-primary shrink-0" />
                <span className="text-slate-700">{user.phone}</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Mail className="w-4 h-4 text-brand-primary shrink-0" />
                <span className="text-slate-700">{user.email}</span>
              </div>
              <div className="flex items-start gap-3 text-sm">
                <MapPin className="w-4 h-4 text-brand-primary shrink-0 mt-0.5" />
                <span className="text-slate-700">{user.address}</span>
              </div>
              <Button variant="outline" className="w-full mt-2 rounded-xl h-10 text-sm font-semibold" onClick={() => toast.info("Fitur Edit Profil akan segera hadir!")}>Edit Profil</Button>
            </div>
          </Card>
        </div>

        <div className="md:col-span-2 space-y-4 md:space-y-6">
          <div className="grid grid-cols-2 gap-4 md:gap-6">
            <Card className="rounded-2xl md:rounded-3xl border-transparent shadow-sm bg-brand-light/40">
              <CardContent className="p-4 md:p-6 flex flex-col items-center justify-center text-center">
                <div className="w-10 h-10 md:w-12 md:h-12 bg-white rounded-full flex items-center justify-center text-brand-primary shadow-sm mb-3 md:mb-4">
                  <Package className="w-5 h-5 md:w-6 md:h-6" />
                </div>
                <h3 className="font-heading font-bold text-xl md:text-2xl text-foreground">{orders.length}</h3>
                <p className="text-xs md:text-sm text-muted-foreground mt-0.5">Total Pesanan</p>
                <Link href="/orders" className="text-brand-primary text-xs md:text-sm font-semibold hover:underline mt-2">Lihat Riwayat</Link>
              </CardContent>
            </Card>
            <Card className="rounded-2xl md:rounded-3xl border-transparent shadow-sm bg-brand-pink/40">
              <CardContent className="p-4 md:p-6 flex flex-col items-center justify-center text-center">
                <div className="w-10 h-10 md:w-12 md:h-12 bg-white rounded-full flex items-center justify-center text-destructive shadow-sm mb-3 md:mb-4">
                  <Heart className="w-5 h-5 md:w-6 md:h-6" />
                </div>
                <h3 className="font-heading font-bold text-xl md:text-2xl text-foreground">{wishlist.length}</h3>
                <p className="text-xs md:text-sm text-muted-foreground mt-0.5">Menu Favorit</p>
                <Link href="/wishlist" className="text-brand-primary text-xs md:text-sm font-semibold hover:underline mt-2">Lihat Favorit</Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
