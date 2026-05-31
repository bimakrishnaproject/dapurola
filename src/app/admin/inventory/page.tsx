"use client";

import { useStore } from "@/store/useStore";
import { Search, AlertTriangle, CheckCircle2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

export default function AdminInventoryPage() {
  const { products, updateInventory } = useStore();
  const [searchTerm, setSearchTerm] = useState("");

  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleStockUpdate = (productId: string, name: string, newStock: number) => {
    if (newStock < 0) return;
    updateInventory(productId, newStock);
    toast.success("Stok Diperbarui", { description: `Stok ${name} menjadi ${newStock}.` });
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-heading font-semibold text-brand-primary mb-2">Manajemen Inventaris</h1>
        <p className="text-muted-foreground">Pantau dan sesuaikan stok produk harian.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl md:rounded-2xl border border-brand-beige shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-brand-light flex items-center justify-center text-brand-primary">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">Stok Tersedia</p>
            <p className="text-2xl font-bold text-brand-primary">{products.filter(p => p.stock > 5).length} Produk</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl md:rounded-2xl border border-brand-beige shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-amber-100 flex items-center justify-center text-amber-600">
            <AlertTriangle className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">Stok Menipis</p>
            <p className="text-2xl font-bold text-brand-primary">{products.filter(p => p.stock > 0 && p.stock <= 5).length} Produk</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl md:rounded-2xl border border-brand-beige shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-red-50 flex items-center justify-center text-red-500">
            <AlertTriangle className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">Stok Habis</p>
            <p className="text-2xl font-bold text-brand-primary">{products.filter(p => p.stock === 0).length} Produk</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl md:rounded-2xl shadow-sm border border-brand-beige overflow-hidden">
        <div className="p-6 border-b border-brand-beige">
          <div className="relative w-full sm:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input 
              placeholder="Cari produk..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 rounded-xl"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <Table>
            <TableHeader className="bg-brand-cream/30 border-b border-brand-beige">
              <TableRow className="hover:bg-transparent">
                <TableHead className="font-semibold text-brand-secondary">Nama Produk</TableHead>
                <TableHead className="font-semibold text-brand-secondary">Kategori</TableHead>
                <TableHead className="font-semibold text-brand-secondary">Status Stok</TableHead>
                <TableHead className="font-semibold text-brand-secondary text-right w-48">Sisa Stok</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredProducts.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4} className="text-center py-8 text-muted-foreground">
                    Tidak ada produk yang ditemukan.
                  </TableCell>
                </TableRow>
              ) : (
                filteredProducts.map((product) => {
                  let statusColor = "bg-brand-light text-brand-primary border border-brand-beige";
                  let statusText = "Tersedia";
                  if (product.stock === 0) {
                    statusColor = "bg-red-50 text-red-600 border border-red-200";
                    statusText = "Habis";
                  } else if (product.stock <= 5) {
                    statusColor = "bg-amber-50 text-amber-600 border border-amber-200";
                    statusText = "Menipis";
                  }

                  return (
                    <TableRow key={product.id} className="hover:bg-brand-cream/10 border-brand-beige/50">
                      <TableCell className="font-medium text-brand-primary">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-md overflow-hidden bg-brand-light border border-brand-beige">
                            <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                          </div>
                          {product.name}
                        </div>
                      </TableCell>
                      <TableCell className="text-muted-foreground">{product.category}</TableCell>
                      <TableCell>
                        <span className={`px-2 py-1 rounded-md text-xs font-medium ${statusColor}`}>
                          {statusText}
                        </span>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Button 
                            variant="outline" 
                            size="icon" 
                            className="h-8 w-8 rounded-full border-brand-beige text-brand-primary hover:bg-brand-light"
                            onClick={() => handleStockUpdate(product.id, product.name, product.stock - 1)}
                          >
                            -
                          </Button>
                          <span className="w-8 text-center font-bold text-brand-primary">{product.stock}</span>
                          <Button 
                            variant="outline" 
                            size="icon" 
                            className="h-8 w-8 rounded-full border-brand-beige text-brand-primary hover:bg-brand-light"
                            onClick={() => handleStockUpdate(product.id, product.name, product.stock + 1)}
                          >
                            +
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
