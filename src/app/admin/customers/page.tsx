"use client";

import { Users } from "lucide-react";

export default function AdminCustomersPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-heading font-semibold text-brand-primary mb-2">Pelanggan</h1>
        <p className="text-muted-foreground">Kelola data pelanggan Dapur Ola.</p>
      </div>

      <div className="bg-white rounded-xl md:rounded-2xl shadow-sm border border-brand-beige overflow-hidden p-12 flex flex-col items-center justify-center text-center">
        <div className="w-16 h-16 bg-brand-light rounded-full flex items-center justify-center mb-4">
          <Users className="w-8 h-8 text-brand-primary" />
        </div>
        <h3 className="text-xl font-heading font-semibold text-brand-primary mb-2">Data Pelanggan Belum Tersedia</h3>
        <p className="text-muted-foreground max-w-md">Belum ada data pelanggan yang terdaftar. Data akan muncul otomatis saat ada pesanan baru.</p>
      </div>
    </div>
  );
}
