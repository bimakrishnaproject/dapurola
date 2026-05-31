import { Product, Banner, CustomerUser } from "./types";

export const mockProducts: Product[] = [
  {
    id: "p1",
    name: "Bolu Gulung Nutella",
    slug: "bolu-gulung-nutella",
    description: "Bolu gulung super lembut dengan isian Nutella asli yang melimpah. Cocok banget buat nemenin ngopi sore atau kumpul keluarga.",
    price: 85000,
    category: "Bolu",
    stock: 12,
    image: "https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=400,h=284,fit=crop/YbNB1g3BWzTZJ42y/bolkar-mePxaLgXKDikjax1.jpg",
    badges: ["🔥 Lagi Banyak Dicari", "❤️ Favorit Pelanggan"],
    ingredients: ["Tepung terigu premium", "Telur ayam kampung", "Butter kualitas tinggi", "Nutella asli"],
    shelfLife: "3 hari di suhu ruang, 7 hari di kulkas",
    storageInstructions: "Simpan dalam wadah tertutup rapat, jauhkan dari sinar matahari langsung.",
    isActive: true,
  },
  {
    id: "p2",
    name: "Brownies Fudgy",
    slug: "brownies-fudgy",
    description: "Brownies panggang dengan tekstur fudgy dan chewy di dalam, tapi crispy di luar. Nyoklat banget!",
    price: 75000,
    category: "Brownies",
    stock: 8,
    image: "https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=400,h=304,fit=crop/YbNB1g3BWzTZJ42y/bonut2-dJoZ0J6E2khPGB19.jpg",
    badges: ["😋 Tim Dapur Ola Suka Ini"],
    ingredients: ["Dark chocolate 70%", "Butter premium", "Gula aren", "Tepung terigu", "Telur"],
    shelfLife: "5 hari di suhu ruang",
    storageInstructions: "Bisa langsung dimakan atau dihangatkan di microwave selama 15 detik sebelum disajikan.",
    isActive: true,
  },
  {
    id: "p3",
    name: "Donat Fluffy (Isi 6)",
    slug: "donat-fluffy",
    description: "Donat kampung yang super empuk dengan berbagai pilihan topping klasik: Gula halus, meses cokelat, dan keju.",
    price: 45000,
    category: "Donat",
    stock: 20,
    image: "https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=400,h=304,fit=crop/YbNB1g3BWzTZJ42y/donat-unyil-mP4OoxZ6wOfLQJXE.jpg",
    badges: ["👀 Banyak yang Lihat"],
    ingredients: ["Tepung protein tinggi", "Ragi instan", "Susu cair segar", "Kuning telur", "Minyak padat"],
    shelfLife: "2 hari di suhu ruang",
    storageInstructions: "Paling enak dimakan di hari yang sama. Jangan dimasukkan ke kulkas agar tidak keras.",
    isActive: true,
  },
  {
    id: "p4",
    name: "Hampers Package",
    slug: "hampers-package",
    description: "Paket hampers cantik isi Bolu Gulung, Brownies, dan kartu ucapan. Pas banget buat dikirim ke orang tersayang.",
    price: 185000,
    category: "Hampers",
    stock: 5,
    image: "https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=800,fit=crop/YbNB1g3BWzTZJ42y/whatsapp-image-2025-03-18-at-16.11.50_74b96e1c-YleWee67obIEVjpj.jpg",
    badges: ["🎁 Cocok Buat Hadiah"],
    ingredients: ["Bolu Gulung mix varian", "Brownies sekat", "Packaging pita exclusive"],
    shelfLife: "Sesuai produk masing-masing",
    storageInstructions: "Sesuai produk masing-masing.",
    isActive: true,
  }
];

export const mockBanners: Banner[] = [
  {
    id: "b1",
    title: "Diskon Akhir Pekan",
    subtitle: "Nikmati potongan 20k untuk semua pembelian di atas 150k! Berlaku Jumat - Minggu.",
    isActive: true,
  },
  {
    id: "b2",
    title: "Hampers Spesial",
    subtitle: "Udah siapin kado buat dia? Cek koleksi hampers kita yuk! 🎁",
    isActive: true,
  }
];

export const mockUser: CustomerUser = {
  id: "u1",
  name: "Alika Putri",
  phone: "081234567890",
  email: "alika.putri@example.com",
  address: "Jl. Mawar Merah No. 12, Jakarta Selatan",
};
