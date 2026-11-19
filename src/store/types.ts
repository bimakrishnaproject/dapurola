export type Role = "customer" | "admin";

export type Product = {
  id: string;
  name: string;
  slug: string;
  description: string;
  shortDescription?: string;
  price: number;
  category: string;
  stock: number;
  image: string;
  badges: string[];
  ingredients: string[];
  shelfLife: string;
  storageInstructions: string;
  isActive: boolean;
  // Commissary Board Data (Casual & Authentic)
  codeNumber?: string; // e.g. "#01", "#02"
  portionWeight?: string; // e.g. "540g (Panjang 24cm)"
  tasteProfile?: string; // e.g. "Gurih mentega tebal, gak bikin eneg"
  prepStatus?: string; // e.g. "Ready • Langsung bungkus"
  remainingPortion?: number; // e.g. 7
  servingAdvice?: string; // e.g. "Makin mantap dimakan pas dingin"
};

export type CartItem = {
  product: Product;
  quantity: number;
  notes?: string;
};

export type OrderStatus =
  // Operational Kitchen States (POS & KDS)
  | "Pesanan Masuk"
  | "Lagi Dimasak"
  | "Siap Di-pickup / Kirim"
  | "Selesai"
  | "Dibatalkan"
  // Legacy / Storefront compatibility
  | "Menunggu Pembayaran"
  | "Sudah Dibayar"
  | "Dikonfirmasi"
  | "Lagi Dibikin 🥰"
  | "Siap Dikirim 🚚"
  | "Dalam Perjalanan"
  | "Selesai 🎉";

export type Order = {
  id: string;
  customerId: string;
  customerName: string;
  customerPhone: string;
  address: string;
  items: CartItem[];
  total: number;
  status: OrderStatus;
  createdAt: string;
  deliveryOption: string;
  deliveryDate: string;
  deliveryTimeSlot: string;
  giftMessage?: string;
  paymentMethod: string;
};

export type Banner = {
  id: string;
  title: string;
  subtitle: string;
  badge?: string;
  code?: string;
  discountText?: string;
  link?: string;
  image?: string;
  isActive: boolean;
};

export type CustomerUser = {
  id: string;
  name: string;
  phone: string;
  email: string;
  address: string;
};
