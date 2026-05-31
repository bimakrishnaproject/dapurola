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
      <section className="relative w-full min-h-[80vh] flex items-center justify-center bg-[#2F6B52] overflow-hidden py-20">
        <div className="container relative z-10 mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto flex flex-col items-center"
          >
            {/* Quote Icon */}
            <div className="mb-6 md:mb-10 text-[#F59E0B]">
              <svg
                className="w-16 h-16 md:w-24 md:h-24 mx-auto fill-current"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
              </svg>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-heading font-black text-white mb-8 leading-[1.1] tracking-wide uppercase">
              Nggak Laper, <br />
              Cuma Pengen <br />
              Ngemil Aja
            </h1>

            {/* Yellow Separator */}
            <div className="w-24 h-1.5 md:h-2 bg-[#F59E0B] rounded-full mb-8 md:mb-10"></div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
              <Link
                href="/products"
                className={buttonVariants({
                  size: "lg",
                  className: "h-14 px-8 text-lg font-bold rounded-full w-full sm:w-auto bg-[#F59E0B] hover:bg-[#D97706] text-[#2F6B52] shadow-lg hover:shadow-xl transition-all"
                })}
              >
                Lihat Menu
              </Link>
              <Link
                href="/products?category=hampers"
                className={buttonVariants({
                  variant: "outline",
                  size: "lg",
                  className: "h-14 px-8 text-lg font-bold rounded-full w-full sm:w-auto bg-transparent border-2 border-white text-white hover:bg-white hover:text-[#2F6B52] transition-all"
                })}
              >
                Pesan Hampers <Gift className="w-5 h-5 ml-2" />
              </Link>
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
    </div>
  );
}
