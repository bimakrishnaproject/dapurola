"use client";

import Link from "next/link";
import { useState } from "react";
import { ShoppingBag, Search, X } from "lucide-react";
import { useStore } from "@/store/useStore";
import CartDrawer from "@/components/cart/CartDrawer";
import { useRouter } from "next/navigation";

export default function CustomerHeader() {
  const router = useRouter();
  const { cart, isStoreOpen, designConcept } = useStore();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const cartItemsCount = cart.reduce((total, item) => total + item.quantity, 0);
  const cartSubtotal = cart.reduce((total, item) => total + item.product.price * item.quantity, 0);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/?q=${encodeURIComponent(searchQuery.trim())}`);
      setIsSearchOpen(false);
    }
  };

  // Dynamic Theme Styling based on selected client concept
  const isArtisanal = designConcept === "artisanal" || !designConcept;
  const isNordic = designConcept === "nordic";

  const headerBg = isArtisanal
    ? "bg-[#FAF7F2]/95 border-[#EFE8DD] text-[#1B4332]"
    : isNordic
    ? "bg-white/95 border-neutral-200 text-neutral-900"
    : "bg-[#F2F8F4]/95 border-[#D4E5DC] text-[#073524]";

  const buttonRadius = isArtisanal
    ? "rounded-full"
    : isNordic
    ? "rounded-xl"
    : "rounded-2xl";

  const primaryBtnBg = isArtisanal
    ? "bg-[#1B4332] hover:bg-[#143225] text-white shadow-sm"
    : isNordic
    ? "bg-neutral-900 hover:bg-black text-white shadow-xs"
    : "bg-[#00A65E] hover:bg-[#008F50] text-white shadow-xs";

  return (
    <>
      <header className={`sticky top-0 z-40 w-full backdrop-blur-md border-b shadow-xs transition-colors duration-200 ${headerBg}`}>
        {/* Full-width Search Bar */}
        {isSearchOpen && (
          <div className="absolute inset-0 z-50 bg-white/98 border-b border-stone-200 flex items-center px-4 md:px-8">
            <form onSubmit={handleSearch} className="flex-1 flex items-center gap-3 max-w-4xl mx-auto h-full">
              <Search className="w-5 h-5 text-stone-400" />
              <input
                type="text"
                placeholder="Cari bolu gulung, brownies fudgy, donat kampung, hampers..."
                className="flex-1 bg-transparent border-none outline-none font-jakarta text-base sm:text-lg placeholder:text-stone-400 text-stone-900"
                autoFocus
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button
                type="button"
                onClick={() => setIsSearchOpen(false)}
                className="p-2 text-stone-400 hover:text-stone-700 transition-colors cursor-pointer"
                aria-label="Tutup pencarian"
              >
                <X strokeWidth={2} className="w-5 h-5" />
              </button>
            </form>
          </div>
        )}

        <div className="container mx-auto px-4 md:px-8 h-16 sm:h-20 flex items-center justify-between">
          {/* Brand Name on the Left */}
          <Link href="/" className="flex flex-col group py-1">
            <span
              className={`leading-tight transition-colors ${
                isArtisanal
                  ? "font-playfair text-2xl sm:text-[30px] font-bold text-[#1B4332] group-hover:text-amber-800"
                  : isNordic
                  ? "font-jakarta text-2xl sm:text-[28px] font-black tracking-tight text-neutral-900 group-hover:text-emerald-700"
                  : "font-cinzel text-2xl sm:text-[28px] font-bold tracking-[0.12em] text-[#073524] group-hover:text-[#00A65E]"
              }`}
            >
              DAPUR OLA
            </span>
            <span
              className={`text-[9px] uppercase tracking-[0.25em] font-semibold -mt-0.5 ${
                isArtisanal
                  ? "font-jakarta text-amber-700"
                  : isNordic
                  ? "font-jakarta text-neutral-400 tracking-widest"
                  : "font-sans text-[#00A65E]"
              }`}
            >
              {isArtisanal ? "ARTISANAL PATISSERIE & BAKERY" : isNordic ? "COPENHAGEN & JAKARTA COMMISSARY" : "HAPPINESS IS HOMEMADE"}
            </span>
          </Link>

          {/* Kitchen Pulse Badge in Center */}
          <div
            className={`hidden md:flex items-center gap-2.5 px-4 py-1.5 text-xs font-jakarta ${buttonRadius} ${
              isArtisanal
                ? "bg-[#EAF2EC] border border-[#D2E4DA] text-[#1B4332]"
                : isNordic
                ? "bg-neutral-100 border border-neutral-200 text-neutral-700"
                : "bg-[#EAF5EF] border border-[#BDE0CD] text-[#073524]"
            }`}
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-600" />
            </span>
            <span className="font-semibold">
              {isStoreOpen ? "Dapur Buka • Fresh Keluar Oven" : "Dapur Istirahat"}
            </span>
            <span className="opacity-40">|</span>
            <span className="opacity-80">Jakarta Selatan</span>
          </div>

          {/* Actions on the Right */}
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={() => setIsSearchOpen(true)}
              className={`p-2.5 transition-colors cursor-pointer border ${buttonRadius} ${
                isArtisanal
                  ? "bg-white hover:bg-stone-50 border-stone-200 text-stone-700"
                  : isNordic
                  ? "bg-white hover:bg-neutral-100 border-neutral-200 text-neutral-800"
                  : "bg-white hover:bg-[#00A65E] hover:text-white border-[#D4E5DC] text-[#073524]"
              }`}
              aria-label="Buka pencarian"
            >
              <Search strokeWidth={1.75} className="w-4 h-4" />
            </button>

            {/* Bag Trigger */}
            <button
              onClick={() => setIsCartOpen(true)}
              className={`flex items-center gap-2 px-4 py-2.5 transition-all cursor-pointer font-jakarta text-xs font-semibold ${buttonRadius} ${primaryBtnBg} active:scale-95`}
              aria-label="Buka keranjang"
            >
              <ShoppingBag strokeWidth={2} className="w-4 h-4" />
              <span className="hidden sm:inline">Keranjang</span>
              <span className="bg-white/20 text-white font-bold px-1.5 py-0.5 rounded-full text-[11px]">
                {cartItemsCount}
              </span>
              {cartSubtotal > 0 && (
                <span className="hidden lg:inline text-white/90 font-medium pl-0.5">
                  • Rp {cartSubtotal.toLocaleString("id-ID")}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Slide-over Cart Drawer */}
      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
}
