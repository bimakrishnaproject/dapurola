"use client";

import { useStore } from "@/store/useStore";
import Link from "next/link";
import Image from "next/image";
import { Heart, Plus, ArrowRight, Trash2 } from "lucide-react";
import { toast } from "sonner";

export default function WishlistPage() {
  const { wishlist, products, addToCart, toggleWishlist } = useStore();

  const wishlistProducts = products.filter((p) => wishlist.includes(p.id));

  if (wishlistProducts.length === 0) {
    return (
      <div className="container mx-auto px-4 md:px-8 py-24 flex flex-col items-center justify-center text-center bg-[#FAFBF9]">
        <div className="w-16 h-16 border border-[#D4E5DC] bg-[#EAF4EE] flex items-center justify-center mb-6 text-[#00A65E]">
          <Heart strokeWidth={1.5} className="w-8 h-8" />
        </div>
        <span className="font-mono text-xs uppercase tracking-widest text-[#00A65E] font-bold mb-2">
          FAVORIT KOSONG
        </span>
        <h1 className="font-cinzel text-3xl sm:text-4xl font-bold text-[#073524] mb-3">
          Belum Ada Menu yang Disimpan
        </h1>
        <p className="font-sans text-sm text-[#2E4A3D] max-w-sm mb-8 leading-relaxed">
          Suka sama donat kampung empuk, bolu gulung keju melimpah, atau brownies fudgy pekat? Tandai menu favoritmu biar gampang dibungkus nanti!
        </p>
        <Link
          href="/"
          className="px-8 py-4 bg-[#00A65E] text-white font-mono text-xs uppercase tracking-widest font-bold hover:bg-[#008F50] transition-colors shadow-xs"
        >
          Lihat Papan Menu ↗
        </Link>
      </div>
    );
  }

  return (
    <div className="w-full bg-[#FAFBF9] text-[#073524] min-h-screen pb-24">
      {/* Top Banner */}
      <div className="border-b border-[#D4E5DC] py-10 md:py-14 bg-[#EAF4EE]">
        <div className="container mx-auto px-4 md:px-8">
          <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.25em] text-[#00A65E] font-bold mb-2">
            <span>DAPUR OLA</span>
            <span>·</span>
            <span>MENU FAVORIT</span>
            <span>·</span>
            <span>({wishlistProducts.length} MENU)</span>
          </div>
          <h1 className="font-cinzel text-3xl sm:text-5xl font-bold text-[#073524]">
            Menu Favorit Kamu
          </h1>
          <p className="font-sans text-sm text-[#2E4A3D] mt-2">
            Daftar menu andalan yang kamu simpan untuk dibungkus sewaktu-waktu.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-8 pt-10 max-w-5xl">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {wishlistProducts.map((product) => (
            <div
              key={product.id}
              className="border border-[#D4E5DC] bg-white flex flex-col justify-between shadow-xs group"
            >
              <div>
                <div className="relative w-full aspect-[4/3] bg-[#EAF4EE] overflow-hidden">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover group-hover:scale-103 transition-transform duration-500"
                  />
                  <button
                    onClick={() => {
                      toggleWishlist(product.id);
                      toast.success("Dihapus dari daftar favorit.");
                    }}
                    className="absolute top-3 right-3 p-2 bg-white/95 backdrop-blur-xs border border-[#D4E5DC] text-rose-500 hover:text-black transition-colors cursor-pointer"
                    aria-label="Hapus favorit"
                  >
                    <Trash2 strokeWidth={1.5} className="w-4 h-4" />
                  </button>
                  <div className="absolute bottom-3 left-3 font-mono text-[10px] bg-[#073524] text-white px-2 py-0.5 font-bold">
                    {product.codeNumber}
                  </div>
                </div>

                <div className="p-5 space-y-2">
                  <span className="font-mono text-[10px] uppercase tracking-wider text-[#00A65E] font-bold block">
                    {product.category}
                  </span>
                  <h3 className="font-cinzel text-lg font-bold text-[#073524]">
                    {product.name}
                  </h3>
                  <p className="font-sans text-xs text-[#2E4A3D] line-clamp-2">
                    {product.shortDescription || product.description}
                  </p>
                </div>
              </div>

              <div className="p-5 pt-0 border-t border-[#D4E5DC]/60 mt-2 flex items-center justify-between">
                <span className="font-mono text-sm font-bold text-[#073524]">
                  Rp {product.price.toLocaleString("id-ID")}
                </span>

                <button
                  onClick={() => {
                    addToCart(product, 1);
                    toast.success(`${product.name} berhasil dibungkus!`);
                  }}
                  className="px-4 py-2 bg-[#00A65E] text-white hover:bg-[#008F50] font-mono text-xs uppercase tracking-wider font-bold flex items-center gap-1.5 transition-colors shadow-xs cursor-pointer"
                >
                  <Plus strokeWidth={2} className="w-3.5 h-3.5" />
                  <span>BUNGKUS</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
