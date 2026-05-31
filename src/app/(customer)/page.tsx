"use client";

import { useStore } from "@/store/useStore";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Star, Heart, ShoppingBag, Gift } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

export default function HomePage() {
  const { products, banners, addToCart, toggleWishlist, wishlist } = useStore();

  const activeBanners = banners.filter(b => b.isActive);
  const featuredProducts = products.slice(0, 4);

  return (
    <div className="flex flex-col gap-16 pb-16">
      {/* Hero Section */}
      <section className="relative w-full h-[85vh] min-h-[600px] flex items-center justify-center bg-brand-cream overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image 
            src="https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=1920,fit=crop/YbNB1g3BWzTZJ42y/whatsapp-image-2025-03-18-at-16.11.50_74b96e1c-YleWee67obIEVjpj.jpg" 
            alt="Dapur Ola Bakery"
            fill
            className="object-cover opacity-20"
            priority
          />
        </div>
        <div className="container relative z-10 mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl mx-auto flex flex-col items-center"
          >
            <Badge className="bg-brand-secondary/20 text-brand-secondary hover:bg-brand-secondary/30 border-none mb-6 text-sm px-4 py-1.5">
              ⭐ Homemade Dengan Bahan Premium
            </Badge>
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-heading font-semibold text-brand-primary mb-6 leading-tight">
              Lagi ngidam yang <br/>
              <span className="text-brand-brown relative">
                manis-manis? 🍩
                <svg className="absolute -bottom-2 left-0 w-full h-3 text-brand-secondary/40" viewBox="0 0 100 20" preserveAspectRatio="none">
                  <path d="M0 10 Q 50 20 100 10" fill="transparent" stroke="currentColor" strokeWidth="4" />
                </svg>
              </span>
            </h1>
            <p className="text-lg md:text-2xl text-muted-foreground mb-8 max-w-2xl">
              Dibikin fresh setelah kamu pesan. Cocok buat hadiah, acara keluarga, atau buat nemenin ngopi sore.
            </p>
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <Link href="/products" className={buttonVariants({ size: "lg", className: "h-14 px-8 text-lg rounded-full w-full sm:w-auto" })}>Lihat Menu Kami</Link>
              <Link href="/products?category=hampers" className={buttonVariants({ variant: "outline", size: "lg", className: "h-14 px-8 text-lg rounded-full w-full sm:w-auto bg-white/50 backdrop-blur-sm border-brand-primary/20 text-brand-primary hover:bg-white/80" })}>Pesan Hampers <Gift className="w-5 h-5 ml-2" /></Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Promo Banners */}
      {activeBanners.length > 0 && (
        <section className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {activeBanners.map((banner, index) => (
              <motion.div
                key={banner.id}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="bg-brand-light rounded-3xl p-8 relative overflow-hidden flex flex-col justify-center min-h-[200px]"
              >
                <div className="relative z-10 max-w-[80%]">
                  <h3 className="text-2xl font-heading font-semibold text-brand-primary mb-2">{banner.title}</h3>
                  <p className="text-brand-secondary/80 mb-6">{banner.subtitle}</p>
                  <Button variant="link" className="p-0 h-auto text-brand-primary font-medium flex items-center gap-2 group" onClick={() => toast.success("Promo berhasil diklaim!")}>
                    Klaim Sekarang <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>
                {/* Decorative blob */}
                <div className="absolute -right-8 -bottom-8 w-40 h-40 bg-brand-secondary/10 rounded-full blur-2xl" />
              </motion.div>
            ))}
          </div>
        </section>
      )}

      {/* Featured Products */}
      <section className="container mx-auto px-4 pt-8">
        <div className="flex items-end justify-between mb-10">
          <div>
            <h2 className="text-2xl md:text-3xl font-heading font-semibold text-brand-primary mb-2">Lagi favorit minggu ini ❤️</h2>
            <p className="text-sm md:text-base text-muted-foreground">Banyak yang repeat order nih 👀</p>
          </div>
          <Link href="/products" className="hidden md:flex items-center gap-2 text-brand-primary font-medium hover:underline">
            Lihat Semua <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
          {featuredProducts.map((product) => (
            <Card key={product.id} className="group overflow-hidden rounded-xl md:rounded-2xl border border-border/60 shadow-sm hover:shadow hover:-translate-y-0.5 transition-all duration-300 bg-white p-0 gap-0">
              <div className="relative aspect-square overflow-hidden bg-brand-cream/50">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <button 
                  onClick={() => toggleWishlist(product.id)}
                  className="absolute top-2 right-2 md:top-3 md:right-3 p-2 rounded-full bg-white/90 backdrop-blur-sm text-muted-foreground hover:text-destructive transition-colors shadow-sm z-10"
                >
                  <Heart className={cn("w-4 h-4", wishlist.includes(product.id) && "fill-destructive text-destructive")} />
                </button>
              </div>
              <CardContent className="p-3 md:p-5 flex flex-col flex-1 justify-between">
                <div>
                  <div className="flex flex-col gap-1.5 mb-2">
                    {product.badges[0] && (
                      <Badge className="bg-brand-secondary/10 text-brand-secondary border-none text-[10px] md:text-xs px-2 py-0.5 md:py-1 self-start truncate max-w-full">
                        {product.badges[0]}
                      </Badge>
                    )}
                    <p className="text-xs md:text-sm text-brand-secondary/70">{product.category}</p>
                  </div>
                  <Link href={`/products/${product.slug}`} className="block group-hover:text-brand-primary transition-colors">
                    <h3 className="font-heading font-medium text-sm md:text-lg text-foreground mb-1 md:mb-2 line-clamp-2 md:line-clamp-1 leading-snug">{product.name}</h3>
                  </Link>
                </div>
                <div className="flex items-center justify-between mt-3 md:mt-4">
                  <span className="font-semibold text-brand-primary text-sm md:text-base">
                    Rp {product.price.toLocaleString("id-ID")}
                  </span>
                  <div className="flex items-center gap-1.5 md:gap-2 shrink-0">
                    <Button 
                      size="icon" 
                      className="h-8 w-8 md:h-10 md:w-10 rounded-full bg-brand-light text-brand-primary hover:bg-brand-primary hover:text-white shrink-0"
                      onClick={() => addToCart(product, 1)}
                    >
                      <ShoppingBag className="w-4 h-4 md:w-5 md:h-5" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="mt-8 text-center md:hidden">
          <Link href="/products" className={buttonVariants({ variant: "outline", className: "w-full rounded-full" })}>Lihat Semua Menu</Link>
        </div>
      </section>

      {/* Brand Pillars / Value */}
      <section className="bg-brand-beige py-20 mt-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-brand-primary mb-6 shadow-sm">
                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="font-heading font-semibold text-xl mb-3">Fresh dari Oven</h3>
              <p className="text-muted-foreground">Pesananmu baru akan dibuat setelah konfirmasi pembayaran. Dijamin fresh!</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-brand-primary mb-6 shadow-sm">
                <Gift className="w-8 h-8" />
              </div>
              <h3 className="font-heading font-semibold text-xl mb-3">Bisa Untuk Hampers</h3>
              <p className="text-muted-foreground">Tersedia pilihan kartu ucapan dan pita cantik untuk dikirim ke orang tersayang.</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-brand-primary mb-6 shadow-sm">
                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="font-heading font-semibold text-xl mb-3">Pilih Tanggal Kirim</h3>
              <p className="text-muted-foreground">Atur jadwal pengiriman sesukamu agar sampai di momen yang paling tepat.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
