"use client";

import { useStore } from "@/store/useStore";
import Link from "next/link";
import Image from "next/image";
import { Heart, ShoppingBag, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function WishlistPage() {
  const { wishlist, products, addToCart, toggleWishlist } = useStore();

  const wishlistProducts = products.filter(p => wishlist.includes(p.id));

  if (wishlistProducts.length === 0) {
    return (
      <div className="container mx-auto px-4 py-24 flex flex-col items-center justify-center text-center">
        <div className="w-24 h-24 bg-brand-light rounded-full flex items-center justify-center mb-6">
          <Heart className="w-12 h-12 text-brand-primary" />
        </div>
        <h1 className="text-xl md:text-2xl font-heading font-semibold text-brand-primary mb-4">Wishlist Kosong</h1>
        <p className="text-muted-foreground text-base md:text-lg mb-8">Kamu belum menyimpan menu favorit apapun.</p>
        <Link href="/products" className="inline-flex items-center justify-center rounded-full bg-brand-primary text-white h-11 px-6 text-base font-medium hover:bg-brand-secondary transition-colors">
          Lihat Menu Dapur Ola
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12 max-w-5xl">
      <h1 className="text-2xl md:text-3xl font-heading font-semibold text-brand-primary mb-6 md:mb-8">Menu Favoritmu ❤️</h1>
      
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
        {wishlistProducts.map((product) => (
          <Card key={product.id} className="group overflow-hidden rounded-xl md:rounded-2xl border border-border/60 shadow-sm hover:shadow hover:-translate-y-0.5 transition-all duration-300 bg-white p-0 gap-0">
            <div className="relative aspect-square overflow-hidden bg-brand-cream/50">
              <Image src={product.image} alt={product.name} fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
              <button 
                onClick={() => toggleWishlist(product.id)}
                className="absolute top-2 right-2 md:top-3 md:right-3 p-2 rounded-full bg-white/90 backdrop-blur-sm text-destructive hover:bg-white transition-colors shadow-sm z-10"
              >
                <Heart className="w-4 h-4 fill-destructive" />
              </button>
            </div>
            <CardContent className="p-3 md:p-5 flex flex-col flex-1 justify-between">
              <div>
                <div className="flex flex-col gap-1.5 mb-2">
                  {product.badges && product.badges[0] && (
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
                    disabled={product.stock === 0}
                  >
                    <ShoppingBag className="w-4 h-4 md:w-5 md:h-5" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
