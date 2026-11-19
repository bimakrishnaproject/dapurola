"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { useStore } from "@/store/useStore";
import { mockProducts } from "@/store/mockData";
import CommissaryBoard from "@/components/home/CommissaryBoard";

function HomeContent() {
  const { products } = useStore();
  const searchParams = useSearchParams();
  const query = searchParams?.get("q") || "";

  return <CommissaryBoard products={products.length ? products : mockProducts} initialQuery={query} />;
}

export default function HomePage() {
  return (
    <Suspense fallback={<CommissaryBoard products={mockProducts} initialQuery="" />}>
      <HomeContent />
    </Suspense>
  );
}
