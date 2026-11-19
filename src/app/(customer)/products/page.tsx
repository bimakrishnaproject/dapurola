"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { useStore } from "@/store/useStore";
import CommissaryBoard from "@/components/home/CommissaryBoard";

function ProductsContent() {
  const { products } = useStore();
  const searchParams = useSearchParams();
  const query = searchParams.get("q") || searchParams.get("category") || "";

  return <CommissaryBoard products={products} initialQuery={query} />;
}

export default function ProductsPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#F6F5F0] flex items-center justify-center font-mono text-xs uppercase tracking-widest text-neutral-500">
          Memuat Menu Dapur Ola...
        </div>
      }
    >
      <ProductsContent />
    </Suspense>
  );
}
