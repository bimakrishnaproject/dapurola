"use client";

import { useStore } from "@/store/useStore";
import Image from "next/image";
import Link from "next/link";
import { useParams, notFound } from "next/navigation";
import { useState, use } from "react";
import { Heart, ShoppingBag, Minus, Plus, Calendar as CalendarIcon, Clock, Package } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

export default function ProductDetailPage() {
  const { slug } = useParams() as { slug: string };
  const { products, addToCart, toggleWishlist, wishlist } = useStore();
  const [quantity, setQuantity] = useState(1);
  const [notes, setNotes] = useState("");

  const product = products.find(p => p.slug === slug);

  if (!product) {
    return notFound();
  }

  const handleAddToCart = () => {
    addToCart(product, quantity, notes);
    toast.success("Masukin Keranjang", {
      description: `${quantity}x ${product.name} berhasil ditambahkan.`,
    });
  };

  const relatedProducts = products.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4);

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16 mb-20">
        {/* Product Images */}
        <div className="space-y-4">
          <div className="relative aspect-square rounded-3xl overflow-hidden bg-brand-cream border border-brand-beige">
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover"
              priority
            />
            {product.badges[0] && (
              <Badge className="absolute top-6 left-6 bg-white/90 text-brand-primary backdrop-blur-sm border-none text-sm px-3 py-1">
                {product.badges[0]}
              </Badge>
            )}
          </div>
          <div className="grid grid-cols-4 gap-4">
            {/* Mocking thumbnails since we only have 1 image per product in our mock data */}
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className={cn("relative aspect-square rounded-2xl overflow-hidden cursor-pointer", i === 1 ? "border-2 border-brand-primary" : "opacity-60 hover:opacity-100")}>
                <Image src={product.image} alt={product.name} fill className="object-cover" />
              </div>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="flex flex-col">
          <div className="mb-2">
            <p className="text-brand-secondary/80 font-medium mb-2">{product.category}</p>
            <h1 className="text-4xl font-heading font-semibold text-foreground mb-4">{product.name}</h1>
            <p className="text-3xl font-semibold text-brand-primary mb-6">
              Rp {product.price.toLocaleString("id-ID")}
            </p>
          </div>

          <div className="prose prose-slate mb-8 text-muted-foreground">
            <p>{product.description}</p>
          </div>

          <div className="bg-brand-light/50 p-4 rounded-2xl mb-8 flex flex-col gap-3">
            <div className="flex items-center gap-3 text-sm text-foreground">
              <CalendarIcon className="w-5 h-5 text-brand-primary" />
              <span><strong>Masa Simpan:</strong> {product.shelfLife}</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-foreground">
              <Package className="w-5 h-5 text-brand-primary" />
              <span><strong>Sisa Stok:</strong> {product.stock > 0 ? `${product.stock} box` : <span className="text-destructive">Habis</span>}</span>
            </div>
          </div>

          <div className="space-y-6 mb-8">
            <div>
              <label className="block text-sm font-medium mb-2">Jumlah</label>
              <div className="flex items-center gap-4">
                <div className="flex items-center bg-brand-cream rounded-full border border-brand-beige">
                  <button 
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-10 flex items-center justify-center text-brand-primary hover:bg-brand-beige rounded-full transition-colors"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="w-12 text-center font-medium">{quantity}</span>
                  <button 
                    onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                    className="w-10 h-10 flex items-center justify-center text-brand-primary hover:bg-brand-beige rounded-full transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
                <span className="text-sm text-muted-foreground">Tersedia {product.stock}</span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Catatan Tambahan (Opsional)</label>
              <textarea 
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Contoh: Tolong pita warna pink ya / Kartu ucapan Happy Birthday..."
                className="w-full rounded-xl border-border bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 h-24 resize-none"
              />
            </div>
          </div>

          <div className="flex items-center gap-4 mt-auto">
            <Button 
              size="lg" 
              className="flex-1 rounded-full h-14 text-lg"
              onClick={handleAddToCart}
              disabled={product.stock === 0}
            >
              <ShoppingBag className="w-5 h-5 mr-2" />
              {product.stock === 0 ? "Stok Habis" : "Masukin Keranjang"}
            </Button>
            <Button 
              variant="outline" 
              size="icon" 
              className={cn("w-14 h-14 rounded-full border-brand-primary/20", wishlist.includes(product.id) && "bg-brand-pink border-brand-pink")}
              onClick={() => toggleWishlist(product.id)}
            >
              <Heart className={cn("w-6 h-6", wishlist.includes(product.id) ? "fill-destructive text-destructive" : "text-brand-primary")} />
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto mb-20">
        <Tabs defaultValue="ingredients" className="w-full">
          <TabsList className="w-full justify-start bg-transparent border-b border-border rounded-none h-auto p-0 mb-8 space-x-8">
            <TabsTrigger 
              value="ingredients" 
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-brand-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none px-0 py-3 text-base"
            >
              Bahan-Bahan
            </TabsTrigger>
            <TabsTrigger 
              value="storage" 
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-brand-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none px-0 py-3 text-base"
            >
              Penyimpanan
            </TabsTrigger>
          </TabsList>
          <TabsContent value="ingredients" className="pt-4">
            <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
              {product.ingredients.map((ingredient, idx) => (
                <li key={idx}>{ingredient}</li>
              ))}
            </ul>
          </TabsContent>
          <TabsContent value="storage" className="pt-4">
            <p className="text-muted-foreground leading-relaxed">
              {product.storageInstructions}
            </p>
          </TabsContent>
        </Tabs>
      </div>

      {relatedProducts.length > 0 && (
        <section className="pt-12 border-t border-brand-beige">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-heading font-semibold text-brand-primary">Sering dibeli bareng ini juga lho</h2>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
            {relatedProducts.map((p) => (
              <Card key={p.id} className="group overflow-hidden rounded-xl md:rounded-2xl border border-border/60 shadow-sm hover:shadow hover:-translate-y-0.5 transition-all duration-300 bg-white p-0 gap-0">
                <div className="relative aspect-square overflow-hidden bg-brand-cream/50">
                  <Image src={p.image} alt={p.name} fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
                  <button 
                    onClick={() => toggleWishlist(p.id)}
                    className="absolute top-2 right-2 md:top-3 md:right-3 p-2 rounded-full bg-white/90 backdrop-blur-sm text-muted-foreground hover:text-destructive transition-colors shadow-sm z-10"
                  >
                    <Heart className={cn("w-4 h-4", wishlist.includes(p.id) && "fill-destructive text-destructive")} />
                  </button>
                </div>
                <CardContent className="p-3 md:p-5 flex flex-col flex-1 justify-between">
                  <div>
                    <div className="flex flex-col gap-1.5 mb-2">
                      {p.badges[0] && (
                        <Badge className="bg-brand-secondary/10 text-brand-secondary border-none text-[10px] md:text-xs px-2 py-0.5 md:py-1 self-start truncate max-w-full">
                          {p.badges[0]}
                        </Badge>
                      )}
                      <p className="text-xs md:text-sm text-brand-secondary/70">{p.category}</p>
                    </div>
                    <Link href={`/products/${p.slug}`} className="block group-hover:text-brand-primary transition-colors">
                      <h3 className="font-heading font-medium text-sm md:text-lg text-foreground mb-1 md:mb-2 line-clamp-2 md:line-clamp-1 leading-snug">{p.name}</h3>
                    </Link>
                  </div>
                  <div className="flex items-center justify-between mt-3 md:mt-4">
                    <span className="font-semibold text-brand-primary text-sm md:text-base">
                      Rp {p.price.toLocaleString("id-ID")}
                    </span>
                    <div className="flex items-center gap-1.5 md:gap-2 shrink-0">
                      <Button 
                        size="icon" 
                        className="h-8 w-8 md:h-10 md:w-10 rounded-full bg-brand-light text-brand-primary hover:bg-brand-primary hover:text-white shrink-0"
                        onClick={() => addToCart(p, 1)}
                      >
                        <ShoppingBag className="w-4 h-4 md:w-5 md:h-5" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
