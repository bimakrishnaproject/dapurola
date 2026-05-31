"use client";

import { useStore } from "@/store/useStore";
import Image from "next/image";
import Link from "next/link";
import { Suspense, useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Heart, ShoppingBag, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";

const CATEGORIES = ["Semua", "Bolu", "Brownies", "Donat", "Hampers"];

function AnimatedAddToCartButton({ product, onAdd }: { product: any; onAdd: () => void }) {
  const [isAdded, setIsAdded] = useState(false);

  const handleClick = () => {
    onAdd();
    setIsAdded(true);
    toast.success(`${product.name} ditambahkan ke keranjang!`);
    setTimeout(() => setIsAdded(false), 2000);
  };

  return (
    <motion.button
      whileTap={product.stock > 0 ? { scale: 0.95 } : {}}
      onClick={handleClick}
      disabled={product.stock === 0 || isAdded}
      className={cn(
        "w-full rounded-full text-white text-xs md:text-sm font-semibold h-8 md:h-10 flex items-center justify-center transition-colors relative overflow-hidden",
        isAdded ? "bg-emerald-600 hover:bg-emerald-700" : "bg-brand-primary hover:bg-brand-secondary",
        product.stock === 0 && "opacity-50 cursor-not-allowed"
      )}
    >
      <AnimatePresence mode="wait">
        {isAdded ? (
          <motion.div
            key="added"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.2 }}
            className="flex items-center absolute"
          >
            <Check className="w-3.5 h-3.5 md:w-4 md:h-4 mr-1.5 md:mr-2" />
            Ditambahkan
          </motion.div>
        ) : (
          <motion.div
            key="add"
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 15 }}
            transition={{ duration: 0.2 }}
            className="flex items-center absolute"
          >
            <ShoppingBag className="w-3.5 h-3.5 md:w-4 md:h-4 mr-1.5 md:mr-2" />
            {product.stock === 0 ? "Habis" : "Pesan"}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.button>
  );
}

function ProductsContent() {
  const { products, addToCart, toggleWishlist, wishlist } = useStore();
  const searchParams = useSearchParams();
  const query = searchParams.get("q") || "";
  const [activeCategory, setActiveCategory] = useState("Semua");
  
  const filteredProducts = products.filter(p => {
    const matchesCategory = activeCategory === "Semua" || p.category === activeCategory;
    const matchesQuery = !query || 
      p.name.toLowerCase().includes(query.toLowerCase()) || 
      p.description?.toLowerCase().includes(query.toLowerCase());
      
    return matchesCategory && matchesQuery;
  });

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-2xl mx-auto text-center mb-12">
        {query ? (
          <>
            <h1 className="text-4xl font-heading font-semibold text-brand-primary mb-4">Hasil Pencarian</h1>
            <p className="text-muted-foreground text-lg">
              Menampilkan menu untuk "{query}"
            </p>
          </>
        ) : (
          <>
            <h1 className="text-4xl font-heading font-semibold text-brand-primary mb-4">Menu Kami</h1>
            <p className="text-muted-foreground text-lg">
              Belum tau mau pilih yang mana? Tenang, semua enak kok 😆
            </p>
          </>
        )}
      </div>

      <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
        {CATEGORIES.map(category => (
          <Button
            key={category}
            variant={activeCategory === category ? "default" : "outline"}
            className={cn(
              "rounded-full px-6",
              activeCategory === category 
                ? "bg-brand-primary text-white hover:bg-brand-secondary" 
                : "border-brand-primary/20 text-brand-primary hover:bg-brand-light"
            )}
            onClick={() => setActiveCategory(category)}
          >
            {category}
          </Button>
        ))}
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
        {filteredProducts.map((product) => (
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
              <div className="flex flex-col gap-2 mt-3 md:mt-4">
                <span className="font-semibold text-brand-primary text-sm md:text-base">
                  Rp {product.price.toLocaleString("id-ID")}
                </span>
                <AnimatedAddToCartButton 
                  product={product} 
                  onAdd={() => addToCart(product, 1)} 
                />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      {filteredProducts.length === 0 && (
        <div className="text-center py-20">
          <p className="text-muted-foreground text-lg mb-4">
            Wah, {query ? `kami tidak menemukan menu untuk "${query}" 😢` : `menu ${activeCategory} lagi kosong nih 😢`}
          </p>
          <Button variant="outline" className="rounded-full" onClick={() => {
            setActiveCategory("Semua");
            if (query) {
              window.history.pushState({}, '', '/products');
              window.location.reload();
            }
          }}>
            Lihat Semua Menu
          </Button>
        </div>
      )}
    </div>
  );
}

export default function ProductsPage() {
  return (
    <Suspense fallback={<div className="container mx-auto px-4 py-20 text-center text-muted-foreground">Memuat menu...</div>}>
      <ProductsContent />
    </Suspense>
  );
}
