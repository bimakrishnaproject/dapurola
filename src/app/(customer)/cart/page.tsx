"use client";

import { useStore } from "@/store/useStore";
import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, Trash2, ArrowRight } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export default function CartPage() {
  const { cart, updateCartQuantity, removeFromCart } = useStore();

  const subtotal = cart.reduce((total, item) => total + (item.product.price * item.quantity), 0);

  if (cart.length === 0) {
    return (
      <div className="container mx-auto px-4 py-24 flex flex-col items-center justify-center text-center">
        <div className="w-32 h-32 bg-brand-light rounded-full flex items-center justify-center mb-6">
          <ShoppingBagIcon className="w-16 h-16 text-brand-primary" />
        </div>
        <h1 className="text-xl md:text-2xl font-heading font-semibold text-brand-primary mb-4">Keranjangmu masih kosong</h1>
        <p className="text-muted-foreground text-lg mb-8">Yuk pilih dessert favoritmu dulu.</p>
        <Link href="/products" className="inline-flex items-center justify-center rounded-full bg-brand-primary text-white h-11 px-6 text-base font-medium hover:bg-brand-secondary transition-colors">Mulai Belanja</Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-2xl md:text-3xl font-heading font-semibold text-brand-primary mb-6 md:mb-8">Keranjang Belanja</h1>

      <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
        {/* Cart Items */}
        <div className="flex-1 space-y-0">
          {cart.map((item) => (
            <div key={item.product.id} className="py-5 flex flex-row gap-4 border-b border-brand-beige/60 bg-transparent first:pt-0">
              <div className="relative w-24 h-24 sm:w-32 sm:h-32 rounded-xl overflow-hidden bg-brand-cream shrink-0">
                <Image src={item.product.image} alt={item.product.name} fill className="object-cover" />
              </div>
              <div className="flex-1 flex flex-col justify-between py-1">
                <div>
                  <div className="flex justify-between items-start mb-1">
                    <h3 className="font-heading font-medium text-base sm:text-lg text-foreground line-clamp-2 pr-2">
                      {item.product.name}
                    </h3>
                    <button
                      onClick={() => removeFromCart(item.product.id)}
                      className="text-muted-foreground hover:text-destructive transition-colors p-1 shrink-0"
                    >
                      <Trash2 className="w-4 h-4 sm:w-5 sm:h-5" />
                    </button>
                  </div>
                  <p className="text-brand-secondary/80 text-sm sm:text-base font-medium mb-2">Rp {item.product.price.toLocaleString("id-ID")}</p>
                  {item.notes && (
                    <p className="text-xs sm:text-sm text-muted-foreground bg-brand-light/50 p-2 rounded-lg mb-2">
                      Catatan: {item.notes}
                    </p>
                  )}
                </div>

                <div className="flex flex-wrap items-center justify-between gap-2 mt-auto">
                  <div className="flex items-center bg-brand-cream rounded-full border border-brand-beige">
                    <button
                      onClick={() => updateCartQuantity(item.product.id, Math.max(1, item.quantity - 1))}
                      className="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center text-brand-primary hover:bg-brand-beige rounded-full transition-colors"
                    >
                      <Minus className="w-3 h-3 sm:w-4 sm:h-4" />
                    </button>
                    <span className="w-8 sm:w-10 text-center font-medium text-xs sm:text-sm">{item.quantity}</span>
                    <button
                      onClick={() => updateCartQuantity(item.product.id, Math.min(item.product.stock, item.quantity + 1))}
                      className="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center text-brand-primary hover:bg-brand-beige rounded-full transition-colors"
                    >
                      <Plus className="w-3 h-3 sm:w-4 sm:h-4" />
                    </button>
                  </div>
                  <p className="font-semibold text-brand-primary text-sm sm:text-base">
                    Rp {(item.product.price * item.quantity).toLocaleString("id-ID")}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div className="w-full lg:w-[400px]">
          <div className="p-5 md:p-6 sticky top-24 border border-brand-beige shadow-sm bg-white md:bg-brand-light/10 rounded-2xl">
            <h2 className="text-xl font-heading font-semibold text-brand-primary mb-6">Ringkasan Pesanan</h2>

            <div className="space-y-4 mb-6">
              <div className="flex justify-between text-muted-foreground">
                <span>Subtotal ({cart.length} item)</span>
                <span>Rp {subtotal.toLocaleString("id-ID")}</span>
              </div>
              <div className="flex justify-between text-muted-foreground">
                <span>Diskon</span>
                <span>Rp 0</span>
              </div>
            </div>

            <Separator className="my-6 bg-brand-beige" />

            <div className="flex justify-between items-end mb-8">
              <span className="font-heading font-semibold text-lg">Total</span>
              <span className="font-heading font-bold text-2xl text-brand-primary">
                Rp {subtotal.toLocaleString("id-ID")}
              </span>
            </div>

            <Link href="/checkout" className={buttonVariants({ size: "lg", className: "w-full rounded-full h-14 text-lg" })}>
              Lanjut Checkout <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

function ShoppingBagIcon(props: React.ComponentProps<"svg">) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
      <path d="M3 6h18" />
      <path d="M16 10a4 4 0 0 1-8 0" />
    </svg>
  );
}
