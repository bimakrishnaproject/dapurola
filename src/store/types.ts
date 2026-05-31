export type Role = "customer" | "admin";

export type Product = {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  category: string;
  stock: number;
  image: string;
  badges: string[];
  ingredients: string[];
  shelfLife: string;
  storageInstructions: string;
  isActive: boolean;
};

export type CartItem = {
  product: Product;
  quantity: number;
  notes?: string;
};

export type OrderStatus =
  | "Menunggu Pembayaran"
  | "Sudah Dibayar"
  | "Dikonfirmasi"
  | "Lagi Dibikin 🥰"
  | "Siap Dikirim 🚚"
  | "Dalam Perjalanan"
  | "Selesai 🎉"
  | "Dibatalkan";

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
