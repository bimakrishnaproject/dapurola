"use client";

import { BarChart } from "lucide-react";

export default function AdminReportsPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-heading font-semibold text-brand-primary mb-2">Laporan Penjualan</h1>
        <p className="text-muted-foreground">Lihat statistik dan laporan performa Dapur Ola.</p>
      </div>

      <div className="bg-white rounded-xl md:rounded-2xl shadow-sm border border-brand-beige overflow-hidden p-12 flex flex-col items-center justify-center text-center">
        <div className="w-16 h-16 bg-brand-light rounded-full flex items-center justify-center mb-4">
          <BarChart className="w-8 h-8 text-brand-primary" />
        </div>
        <h3 className="text-xl font-heading font-semibold text-brand-primary mb-2">Fitur Laporan Segera Hadir</h3>
        <p className="text-muted-foreground max-w-md">Kami sedang menyiapkan laporan analitik yang komprehensif untuk membantu bisnis Anda.</p>
      </div>
    </div>
  );
}
