"use client";

import { useStore } from "@/store/useStore";
import { Plus, Edit, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { toast } from "sonner";
import { useState } from "react";
import { Banner } from "@/store/types";

function AddBannerDialog() {
  const [open, setOpen] = useState(false);
  const { addBanner } = useStore();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    addBanner({
      title: formData.get("title") as string,
      subtitle: formData.get("subtitle") as string,
      isActive: true,
    });
    toast.success("Banner berhasil ditambahkan!");
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger render={<Button className="bg-brand-primary hover:bg-brand-secondary rounded-xl" />}>
        <Plus className="w-5 h-5 mr-2" /> Tambah Banner
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle className="text-brand-primary font-heading">Tambah Banner Baru</DialogTitle>
            <DialogDescription>Buat banner promo untuk ditampilkan di beranda.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <label className="text-sm font-medium">Judul Promo</label>
              <Input name="title" required placeholder="Misal: Diskon Akhir Pekan" className="rounded-lg" />
            </div>
            <div className="grid gap-2">
              <label className="text-sm font-medium">Deskripsi</label>
              <Input name="subtitle" required placeholder="Misal: Nikmati potongan 20k..." className="rounded-lg" />
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" className="rounded-lg" onClick={() => setOpen(false)}>Batal</Button>
            <Button type="submit" className="bg-brand-primary hover:bg-brand-secondary rounded-lg">Simpan Banner</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

function EditBannerDialog({ banner }: { banner: Banner }) {
  const [open, setOpen] = useState(false);
  const { updateBanner } = useStore();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    updateBanner(banner.id, {
      title: formData.get("title") as string,
      subtitle: formData.get("subtitle") as string,
    });
    toast.success("Banner berhasil diperbarui!");
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
            <DialogTitle className="text-brand-primary font-heading">Edit Banner</DialogTitle>
            <DialogDescription>Ubah detail promo untuk banner ini.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4 text-left">
            <div className="grid gap-2">
              <label className="text-sm font-medium">Judul Promo</label>
              <Input name="title" defaultValue={banner.title} required className="rounded-lg" />
            </div>
            <div className="grid gap-2">
              <label className="text-sm font-medium">Deskripsi</label>
              <Input name="subtitle" defaultValue={banner.subtitle} required className="rounded-lg" />
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

export default function AdminBannersPage() {
  const { banners, toggleBannerStatus, deleteBanner } = useStore();

  const handleToggle = (id: string, currentStatus: boolean, title: string) => {
    toggleBannerStatus(id);
    toast.success("Status Diperbarui", { 
      description: `Banner "${title}" sekarang ${!currentStatus ? 'aktif' : 'nonaktif'}.` 
    });
  };

  const handleDelete = (id: string, title: string) => {
    if (confirm(`Yakin ingin menghapus banner "${title}"?`)) {
      deleteBanner(id);
      toast.success("Banner Dihapus");
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row justify-between sm:items-end gap-4">
        <div>
          <h1 className="text-3xl font-heading font-semibold text-brand-primary mb-2">Banners Promo</h1>
          <p className="text-muted-foreground">Atur banner promosi yang tampil di halaman utama pelanggan.</p>
        </div>
        <AddBannerDialog />
      </div>

      <div className="bg-white rounded-xl md:rounded-2xl shadow-sm border border-brand-beige overflow-hidden">
        <div className="divide-y divide-brand-beige">
          {banners.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              Belum ada banner promo.
            </div>
          ) : (
            banners.map((banner) => (
              <div key={banner.id} className="p-4 hover:bg-brand-cream/10 flex flex-col sm:flex-row gap-4 justify-between sm:items-center">
                <div className="flex-1">
                  <h3 className="font-medium text-brand-primary">{banner.title}</h3>
                  <p className="text-sm text-muted-foreground line-clamp-2 mt-1">{banner.subtitle}</p>
                </div>
                <div className="flex items-center justify-between sm:justify-end gap-4 sm:w-64 shrink-0">
                  <div className="flex items-center gap-2 bg-brand-light px-3 py-1.5 rounded-lg border border-brand-beige">
                    <span className="text-xs font-medium text-brand-primary uppercase tracking-wider">Beranda:</span>
                    <Switch 
                      checked={banner.isActive}
                      onCheckedChange={() => handleToggle(banner.id, banner.isActive, banner.title)}
                      className="data-[state=checked]:bg-brand-primary"
                    />
                  </div>
                  <div className="flex items-center gap-1 bg-white border border-brand-beige rounded-lg shadow-sm">
                    <EditBannerDialog banner={banner} />
                    <div className="w-px h-4 bg-brand-beige"></div>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="text-muted-foreground hover:text-red-600 hover:bg-red-50 rounded-l-none"
                      onClick={() => handleDelete(banner.id, banner.title)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
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
