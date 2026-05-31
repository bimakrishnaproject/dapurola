"use client";

import { useStore } from "@/store/useStore";
import { Plus, Search, Edit, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useState } from "react";
import { toast } from "sonner";
import { Product } from "@/store/types";

function AddProductDialog() {
  const [open, setOpen] = useState(false);
  const { addProduct } = useStore();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    addProduct({
      name: formData.get("name") as string,
      category: formData.get("category") as string,
      price: parseInt(formData.get("price") as string),
      image: formData.get("image") as string || "https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=400,fit=crop/YbNB1g3BWzTZJ42y/whatsapp-image-2025-03-18-at-16.11.50_74b96e1c-YleWee67obIEVjpj.jpg",
      isActive: true,
      stock: 100,
      description: "Deskripsi belum ditambahkan",
      badges: [],
      slug: (formData.get("name") as string).toLowerCase().replace(/\s+/g, '-'),
      ingredients: [],
      shelfLife: "",
      storageInstructions: "",
    });
    toast.success("Produk berhasil ditambahkan!");
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger render={<Button className="bg-brand-primary hover:bg-brand-secondary rounded-xl" />}>
        <Plus className="w-5 h-5 mr-2" /> Tambah Produk
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle className="text-brand-primary font-heading">Tambah Produk Baru</DialogTitle>
            <DialogDescription>Masukkan detail produk baru ke katalog Dapur Ola.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <label className="text-sm font-medium">Nama Produk</label>
              <Input name="name" required placeholder="Misal: Chiffon Cake Pandan" className="rounded-lg" />
            </div>
            <div className="grid gap-2">
              <label className="text-sm font-medium">Kategori</label>
              <Input name="category" required placeholder="Misal: Cake" className="rounded-lg" />
            </div>
            <div className="grid gap-2">
              <label className="text-sm font-medium">Harga (Rp)</label>
              <Input name="price" required type="number" placeholder="85000" className="rounded-lg" />
            </div>
            <div className="grid gap-2">
              <label className="text-sm font-medium">URL Gambar</label>
              <Input name="image" placeholder="https://..." className="rounded-lg" />
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" className="rounded-lg" onClick={() => setOpen(false)}>Batal</Button>
            <Button type="submit" className="bg-brand-primary hover:bg-brand-secondary rounded-lg">Simpan Produk</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

function EditProductDialog({ product }: { product: Product }) {
  const [open, setOpen] = useState(false);
  const { updateProduct } = useStore();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    updateProduct(product.id, {
      name: formData.get("name") as string,
      category: formData.get("category") as string,
      price: parseInt(formData.get("price") as string),
      image: formData.get("image") as string,
    });
    toast.success("Produk berhasil diperbarui!");
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger render={<Button variant="ghost" size="icon" className="text-muted-foreground hover:text-brand-primary hover:bg-brand-light" />}>
        <Edit className="w-4 h-4" />
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle className="text-brand-primary font-heading">Edit Produk</DialogTitle>
            <DialogDescription>Ubah detail informasi produk ini.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4 text-left">
            <div className="grid gap-2">
              <label className="text-sm font-medium">Nama Produk</label>
              <Input name="name" defaultValue={product.name} required className="rounded-lg" />
            </div>
            <div className="grid gap-2">
              <label className="text-sm font-medium">Kategori</label>
              <Input name="category" defaultValue={product.category} required className="rounded-lg" />
            </div>
            <div className="grid gap-2">
              <label className="text-sm font-medium">Harga (Rp)</label>
              <Input name="price" type="number" defaultValue={product.price} required className="rounded-lg" />
            </div>
            <div className="grid gap-2">
              <label className="text-sm font-medium">URL Gambar</label>
              <Input name="image" defaultValue={product.image} required className="rounded-lg" />
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" className="rounded-lg" onClick={() => setOpen(false)}>Batal</Button>
            <Button type="submit" className="bg-brand-primary hover:bg-brand-secondary rounded-lg">Simpan Perubahan</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default function AdminProductsPage() {
  const { products, deleteProduct } = useStore();
  const [searchTerm, setSearchTerm] = useState("");

  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    p.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = (id: string, name: string) => {
    if (confirm(`Yakin ingin menghapus ${name}?`)) {
      deleteProduct(id);
      toast.success("Produk Dihapus", { description: `${name} berhasil dihapus.` });
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row justify-between sm:items-end gap-4">
        <div>
          <h1 className="text-3xl font-heading font-semibold text-brand-primary mb-2">Manajemen Produk</h1>
          <p className="text-muted-foreground">Kelola daftar menu, harga, dan kategori Dapur Ola.</p>
        </div>
        <AddProductDialog />
      </div>

      <div className="bg-white rounded-xl md:rounded-2xl shadow-sm border border-brand-beige overflow-hidden">
        <div className="p-6 border-b border-brand-beige">
          <div className="relative w-full sm:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input 
              placeholder="Cari menu..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 rounded-xl"
            />
          </div>
        </div>

        <div className="divide-y divide-brand-beige">
          {filteredProducts.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              Tidak ada produk yang ditemukan.
            </div>
          ) : (
            filteredProducts.map((product) => (
              <div key={product.id} className="p-4 hover:bg-brand-cream/10 flex gap-4 items-center">
                <div className="w-16 h-16 rounded-xl overflow-hidden bg-brand-light border border-brand-beige shrink-0">
                  <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 min-w-0 flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-brand-primary truncate">{product.name}</h3>
                    <div className="flex items-center gap-2 mt-0.5 text-sm">
                      <span className="text-muted-foreground">{product.category}</span>
                      <span className="w-1 h-1 rounded-full bg-brand-beige" />
                      <span className="font-semibold text-brand-secondary">Rp {product.price.toLocaleString("id-ID")}</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between sm:justify-end gap-3 sm:w-48 shrink-0">
                    <div>
                      {product.isActive ? (
                        <span className="px-2 py-1 bg-brand-secondary/10 text-brand-secondary rounded-md text-xs font-medium border border-brand-secondary/20">Aktif</span>
                      ) : (
                        <span className="px-2 py-1 bg-brand-light text-muted-foreground rounded-md text-xs font-medium border border-brand-beige">Nonaktif</span>
                      )}
                    </div>
                    <div className="flex items-center gap-1 bg-white border border-brand-beige rounded-lg shadow-sm">
                      <EditProductDialog product={product} />
                      <div className="w-px h-4 bg-brand-beige"></div>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="text-muted-foreground hover:text-red-600 hover:bg-red-50 rounded-l-none"
                        onClick={() => handleDelete(product.id, product.name)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
