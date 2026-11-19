"use client";

import { useStore } from "@/store/useStore";
import Image from "next/image";
import Link from "next/link";
import { useParams, notFound } from "next/navigation";
import { useState } from "react";
import { Minus, Plus, Check, ArrowLeft, ShieldCheck } from "lucide-react";
import { toast } from "sonner";

export default function ProductDetailPage() {
  const { slug } = useParams() as { slug: string };
  const { products, addToCart } = useStore();
  const [quantity, setQuantity] = useState(1);
  const [notes, setNotes] = useState("");
  const [isAllocated, setIsAllocated] = useState(false);

  const product = products.find((p) => p.slug === slug);

  if (!product) {
    return notFound();
  }

  const handleAddToCart = () => {
    addToCart(product, quantity, notes);
    setIsAllocated(true);
    toast.success(`${quantity}x ${product.name} berhasil dibungkus!`, {
      description: "Sudah masuk ke keranjang jajanmu.",
    });
    setTimeout(() => setIsAllocated(false), 2000);
  };

  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 3);

  return (
    <div className="w-full bg-[#F6F5F0] text-[#121417] min-h-screen pb-24">
      {/* Top Breadcrumb */}
      <div className="border-b border-neutral-300 py-3.5 px-4 md:px-8 bg-[#EFECE3]">
        <div className="container mx-auto flex items-center justify-between font-mono text-[11px] uppercase tracking-wider text-neutral-600">
          <div className="flex items-center gap-2">
            <Link href="/" className="hover:text-black font-cinzel font-bold text-neutral-900">
              DAPUR OLA
            </Link>
            <span>/</span>
            <Link href="/" className="hover:text-black">
              MENU
            </Link>
            <span>/</span>
            <span className="text-black font-bold">[{product.codeNumber || "#01"}]</span>
          </div>
          <span className="text-emerald-700 font-bold hidden sm:inline">
            {product.prepStatus}
          </span>
        </div>
      </div>

      {/* Main 50/50 Half-Screen Split Spread: Full-Bleed Photo & Spec Sheet */}
      <div className="w-full border-b border-neutral-300">
        <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[640px] lg:min-h-[800px]">
          {/* Left Half-Screen: Edge-to-Edge Macro Photo Bleed (50vw) */}
          <div className="relative w-full h-[450px] sm:h-[550px] lg:h-full min-h-[450px] lg:min-h-full border-b lg:border-b-0 lg:border-r border-neutral-300 overflow-hidden bg-[#121417] group">
            <Image
              src={product.image}
              alt={product.name}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover object-center scale-100 group-hover:scale-102 transition-transform duration-700 ease-out"
            />

            {/* Packaging Brand Watermark */}
            <div className="absolute top-6 left-6 font-mono text-[10px] uppercase tracking-widest bg-white/90 backdrop-blur-sm px-3.5 py-2 border border-neutral-300 z-10 text-neutral-900 font-bold">
              {product.codeNumber} // {product.category.toUpperCase()}
            </div>

            <div className="absolute bottom-6 left-6 font-mono text-[10px] uppercase tracking-widest bg-[#121417]/90 text-white backdrop-blur-sm px-3.5 py-2 z-10 border border-white/20">
              <span className="font-cinzel text-xs font-bold block">DAPUR OLA</span>
              <span className="text-[8px] tracking-[0.2em] text-emerald-300 block">HAPPINESS IS HOMEMADE</span>
            </div>
          </div>

          {/* Right Half-Screen: Culinary Spec Sheet & Action */}
          <div className="p-6 sm:p-10 md:p-14 lg:p-16 xl:p-20 flex flex-col justify-between bg-white">
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-neutral-200 font-mono text-xs uppercase tracking-wider text-neutral-500">
                <span className="text-[#246B4E] font-bold">100% HOMEMADE TANPA PENGAWET</span>
                <span className="text-amber-800 font-semibold">Tersisa {product.remainingPortion} porsi</span>
              </div>

              {/* Title & Slogan */}
              <div>
                <span className="font-cinzel text-xs uppercase tracking-[0.2em] text-[#246B4E] block mb-2 font-bold">
                  DAPUR OLA · SIGNATURE
                </span>
                <h1 className="font-cinzel text-3xl sm:text-4xl lg:text-5xl font-bold text-neutral-950 leading-tight">
                  {product.name}
                </h1>
                <span className="font-sans text-[10px] sm:text-xs uppercase tracking-[0.26em] text-neutral-500 font-medium block mt-1.5">
                  HAPPINESS IS HOMEMADE
                </span>
              </div>

              <p className="font-sans text-sm sm:text-base text-neutral-700 leading-relaxed font-normal pt-1">
                {product.description}
              </p>

              {/* Culinary Specs Grid */}
              <div className="grid grid-cols-2 gap-4 py-5 border-y border-neutral-200 font-mono text-xs">
                <div>
                  <span className="text-[10px] uppercase tracking-widest text-neutral-500 block">
                    UKURAN &amp; BERAT
                  </span>
                  <span className="text-neutral-950 font-bold block mt-0.5">
                    {product.portionWeight}
                  </span>
                </div>
                <div>
                  <span className="text-[10px] uppercase tracking-widest text-neutral-500 block">
                    PROFIL RASA
                  </span>
                  <span className="text-neutral-950 font-semibold block mt-0.5 font-sans">
                    {product.tasteProfile}
                  </span>
                </div>
                <div className="col-span-2 pt-2 border-t border-neutral-100">
                  <span className="text-[10px] uppercase tracking-widest text-emerald-800 font-bold block">
                    SARAN PENYAJIAN
                  </span>
                  <span className="text-neutral-700 font-sans text-xs block mt-0.5">
                    {product.servingAdvice}
                  </span>
                </div>
              </div>

              {/* Composition */}
              <div>
                <span className="font-mono text-[10px] uppercase tracking-widest text-neutral-500 block mb-2">
                  BAHAN PILIHAN:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {product.ingredients.map((ing) => (
                    <span
                      key={ing}
                      className="font-mono text-xs px-2.5 py-1 bg-[#F6F5F0] border border-neutral-300 text-neutral-800"
                    >
                      {ing}
                    </span>
                  ))}
                </div>
              </div>

              {/* Note Input */}
              <div>
                <label className="font-mono text-[10px] uppercase tracking-widest text-neutral-500 block mb-1.5 font-bold">
                  CATATAN UNTUK DAPUR (OPSIONAL)
                </label>
                <input
                  type="text"
                  placeholder="Misal: Tolong potong jadi 10 / pesan kartu ucapan..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full bg-[#F6F5F0] border border-neutral-300 p-3 font-sans text-xs text-neutral-900 outline-none focus:border-black"
                />
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="pt-8 mt-6 border-t border-neutral-200 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <span className="font-mono text-[10px] uppercase tracking-widest text-neutral-500 block">
                    HARGA PER PORSI
                  </span>
                  <span className="font-mono text-2xl font-bold text-neutral-950">
                    Rp {product.price.toLocaleString("id-ID")}
                  </span>
                </div>

                {/* Quantity Controller */}
                <div className="flex items-center border border-neutral-300 font-mono text-xs">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-10 flex items-center justify-center hover:bg-neutral-100 transition-colors"
                  >
                    <Minus strokeWidth={1.5} className="w-4 h-4" />
                  </button>
                  <span className="w-12 text-center font-bold">
                    {quantity.toString().padStart(2, "0")}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-10 h-10 flex items-center justify-center hover:bg-neutral-100 transition-colors"
                  >
                    <Plus strokeWidth={1.5} className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Big Action Button */}
              <button
                onClick={handleAddToCart}
                className={`w-full h-14 font-mono text-xs uppercase tracking-widest font-bold flex items-center justify-center gap-2 transition-all ${
                  isAllocated
                    ? "bg-emerald-700 text-white"
                    : "bg-[#121417] text-white hover:bg-neutral-800"
                }`}
              >
                {isAllocated ? (
                  <>
                    <Check strokeWidth={2} className="w-4 h-4" />
                    <span>SUDAH DIBUNGKUS</span>
                  </>
                ) : (
                  <>
                    <Plus strokeWidth={2} className="w-4 h-4" />
                    <span>BUNGKUS SEKARANG • RP {(product.price * quantity).toLocaleString("id-ID")}</span>
                  </>
                )}
              </button>

              <div className="font-mono text-[11px] text-neutral-500 text-center flex items-center justify-center gap-1.5 pt-1">
                <ShieldCheck strokeWidth={1.5} className="w-4 h-4 text-[#246B4E]" />
                <span>Dipacking aman dengan boks hijau Dapur Ola &amp; segel rapi</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
