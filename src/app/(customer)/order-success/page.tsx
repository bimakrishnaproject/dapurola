"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { CheckCircle2, Package, ArrowRight } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";

function OrderSuccessContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("id");

  return (
    <div className="max-w-md mx-auto text-center">
      <div className="w-24 h-24 bg-brand-light rounded-full flex items-center justify-center mx-auto mb-8 relative">
        <div className="absolute inset-0 bg-brand-light animate-ping rounded-full opacity-50" />
        <CheckCircle2 className="w-12 h-12 text-brand-primary relative z-10" />
      </div>
      
      <h1 className="text-3xl md:text-4xl font-heading font-semibold text-brand-primary mb-4">
        Yeay! Pesananmu Udah Masuk 🎉
      </h1>
      
      <p className="text-lg text-muted-foreground mb-8">
        Terima kasih sudah memesan di Dapur Ola. Pesananmu lagi kami siapkan dengan penuh cinta 🥰.
      </p>

      <div className="bg-white border border-brand-beige rounded-2xl p-6 mb-8 text-left shadow-sm">
        <p className="text-sm text-muted-foreground mb-1">Nomor Pesanan</p>
        <p className="font-heading font-semibold text-lg text-foreground">{orderId || "ORD-XXXX"}</p>
      </div>

      <div className="flex flex-col sm:flex-row items-center gap-4 justify-center">
        <Link href={orderId ? `/orders/${orderId}` : "/orders"} className={buttonVariants({ size: "lg", className: "rounded-full w-full sm:w-auto h-14 px-8" })}>
          Lacak Pesanan <Package className="w-5 h-5 ml-2" />
        </Link>
        <Link href="/" className={buttonVariants({ variant: "outline", size: "lg", className: "rounded-full w-full sm:w-auto h-14 px-8" })}>
          Kembali ke Beranda
        </Link>
      </div>
    </div>
  );
}

export default function OrderSuccessPage() {
  return (
    <div className="container mx-auto px-4 py-24 flex items-center justify-center min-h-[70vh]">
      <Suspense fallback={<div className="animate-pulse w-24 h-24 bg-brand-light rounded-full mx-auto" />}>
        <OrderSuccessContent />
      </Suspense>
    </div>
  );
}
