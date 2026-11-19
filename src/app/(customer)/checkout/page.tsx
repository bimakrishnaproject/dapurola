"use client";

import { useStore } from "@/store/useStore";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ShieldCheck, ArrowRight, Check, MapPin, Truck, CreditCard, ChevronLeft } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

const DELIVERY_OPTIONS = [
  {
    id: "Instant Delivery",
    label: "Kurir Instan (Motor)",
    desc: "Langsung diantar sehabis dipacking dari dapur Gandaria.",
    price: 30000,
  },
  {
    id: "Same Day",
    label: "Sameday Dingin (Ice Pack)",
    desc: "Dikemas aman pakai ice gel & kardus tebal, sampai hari ini.",
    price: 20000,
  },
  {
    id: "Pickup",
    label: "Ambil Sendiri ke Dapur",
    desc: "Gratis! Ambil langsung ke dapur Gandaria Tengah III, Jaksel.",
    price: 0,
  },
];

const PAYMENT_METHODS = [
  { id: "QRIS", label: "QRIS (BCA, Mandiri, GoPay, OVO, ShopeePay)", desc: "Scan instan langsung terverifikasi otomatis" },
  { id: "Bank Transfer", label: "Virtual Account (BCA / Mandiri / BRI)", desc: "Transfer aman lewat m-banking atau ATM" },
];

export default function CheckoutPage() {
  const router = useRouter();
  const { cart, user, placeOrder, clearCart, designConcept } = useStore();
  const [mounted, setMounted] = useState(false);

  const isArtisanal = designConcept === "artisanal" || !designConcept;

  // Form State
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [deliveryOption, setDeliveryOption] = useState("Same Day");
  const [deliveryDate, setDeliveryDate] = useState("");
  const [deliveryTimeSlot, setDeliveryTimeSlot] = useState("Siang (11:00 - 14:00 WIB)");
  const [paymentMethod, setPaymentMethod] = useState("QRIS");
  const [customerNote, setCustomerNote] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (user) {
      setName(user.name);
      setPhone(user.phone);
      setAddress(user.address);
    }
  }, [user]);

  if (!mounted) return null;

  if (cart.length === 0) {
    router.push("/cart");
    return null;
  }

  const subtotal = cart.reduce((total, item) => total + item.product.price * item.quantity, 0);
  const selectedDelivery = DELIVERY_OPTIONS.find((d) => d.id === deliveryOption) || DELIVERY_OPTIONS[1];
  const shipping = selectedDelivery.price;
  const total = subtotal + shipping;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    await new Promise((resolve) => setTimeout(resolve, 800));

    try {
      const order = placeOrder({
        customerId: user?.id || `PEMBELI-${Date.now()}`,
        customerName: name,
        customerPhone: phone,
        address,
        items: cart,
        total,
        deliveryOption,
        deliveryDate: deliveryDate || new Date().toISOString().split("T")[0],
        deliveryTimeSlot,
        paymentMethod,
      });

      clearCart();

      toast.success("Pesanan Berhasil Dibuat!", {
        description: `Nomor pesananmu #${order.id}. Dapur langsung proses ya.`,
      });

      router.push(`/order-success?id=${order.id}`);
    } catch (error) {
      toast.error("Waduh, ada kendala saat proses pesanan. Coba lagi ya!");
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className={`w-full min-h-screen pb-24 font-jakarta transition-colors duration-200 ${
        isArtisanal ? "bg-[#FAF7F2] text-stone-900" : "bg-white text-neutral-900"
      }`}
    >
      {/* Top Header */}
      <div
        className={`border-b py-8 sm:py-12 ${
          isArtisanal
            ? "bg-[#F5EFE6] border-stone-200"
            : "bg-neutral-50 border-neutral-200"
        }`}
      >
        <div className="container mx-auto px-4 md:px-8">
          <Link
            href="/cart"
            className="inline-flex items-center gap-1.5 text-xs text-stone-500 hover:text-stone-900 mb-3 transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Kembali ke Keranjang</span>
          </Link>
          <h1
            className={`text-2xl sm:text-4xl font-bold tracking-tight ${
              isArtisanal ? "font-playfair text-[#1B4332]" : "font-jakarta text-neutral-900"
            }`}
          >
            Penyelesaian Pesanan
          </h1>
          <p className="text-xs sm:text-sm text-stone-600 mt-1.5">
            Lengkapi alamat pengiriman dan pilih metode pembayaran untuk memproses pesanan Anda.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-3 sm:px-6 md:px-8 pt-6 sm:pt-10">
        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-start">
          {/* Form Kiri (7 cols): "KARTU DIBUKA DI MOBILE" */}
          <div className="lg:col-span-7 space-y-6">
            {/* 1. Data Penerima */}
            <section
              className={`bg-white p-4 sm:p-7 space-y-4 ${
                isArtisanal
                  ? "sm:rounded-3xl sm:border sm:border-stone-200/80 sm:shadow-xs"
                  : "sm:rounded-2xl sm:border sm:border-neutral-200"
              }`}
            >
              <div className="flex items-center justify-between pb-3 border-b border-stone-100">
                <h2
                  className={`text-base font-bold ${
                    isArtisanal ? "font-playfair text-[#1B4332]" : "text-neutral-900"
                  }`}
                >
                  1. Data Penerima &amp; Alamat
                </h2>
                <span className="text-[10px] font-bold text-amber-800 bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-200">
                  Wajib Diisi
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 text-xs">
                <div>
                  <label className="text-xs text-stone-600 block mb-1.5 font-medium">
                    Nama Lengkap Penerima
                  </label>
                  <input
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Contoh: Alika Putri"
                    className="w-full rounded-xl bg-stone-50 border border-stone-200 p-3 outline-none focus:bg-white focus:border-[#1B4332] text-sm text-stone-900 transition-colors"
                  />
                </div>
                <div>
                  <label className="text-xs text-stone-600 block mb-1.5 font-medium">
                    Nomor WhatsApp (Update Kurir)
                  </label>
                  <input
                    required
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Contoh: 081234567890"
                    className="w-full rounded-xl bg-stone-50 border border-stone-200 p-3 outline-none focus:bg-white focus:border-[#1B4332] text-sm text-stone-900 transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs text-stone-600 block mb-1.5 font-medium">
                  Alamat Lengkap Pengiriman
                </label>
                <textarea
                  required
                  rows={3}
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Nama jalan, nomor rumah/kantor, patokan, RT/RW, kelurahan..."
                  className="w-full rounded-xl bg-stone-50 border border-stone-200 p-3 outline-none focus:bg-white focus:border-[#1B4332] text-sm text-stone-900 transition-colors"
                />
              </div>

              <div>
                <label className="text-xs text-stone-600 block mb-1.5 font-medium">
                  Catatan untuk Dapur / Pesan Kartu Ucapan (Opsional)
                </label>
                <input
                  type="text"
                  value={customerNote}
                  onChange={(e) => setCustomerNote(e.target.value)}
                  placeholder="Misal: Tolong potong 10 bagian / Tulis kartu: Selamat Ulang Tahun!"
                  className="w-full rounded-xl bg-stone-50 border border-stone-200 p-3 outline-none focus:bg-white focus:border-[#1B4332] text-sm text-stone-900 transition-colors"
                />
              </div>
            </section>

            {/* 2. Pilihan Pengiriman */}
            <section
              className={`bg-white p-4 sm:p-7 space-y-4 ${
                isArtisanal
                  ? "sm:rounded-3xl sm:border sm:border-stone-200/80 sm:shadow-xs"
                  : "sm:rounded-2xl sm:border sm:border-neutral-200"
              }`}
            >
              <div className="flex items-center justify-between pb-3 border-b border-stone-100">
                <h2
                  className={`text-base font-bold ${
                    isArtisanal ? "font-playfair text-[#1B4332]" : "text-neutral-900"
                  }`}
                >
                  2. Opsi Pengiriman
                </h2>
                <span className="text-[10px] font-semibold text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                  Kemasan Aman Dingin
                </span>
              </div>

              <div className="grid grid-cols-1 gap-2.5">
                {DELIVERY_OPTIONS.map((opt) => (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => setDeliveryOption(opt.id)}
                    className={cn(
                      "p-3.5 sm:p-4 rounded-2xl border text-left transition-all flex items-center justify-between cursor-pointer",
                      deliveryOption === opt.id
                        ? isArtisanal
                          ? "bg-[#1B4332] text-white border-[#1B4332] shadow-xs"
                          : "bg-neutral-900 text-white border-neutral-900"
                        : "bg-stone-50/70 hover:bg-stone-100/70 text-stone-800 border-stone-200/90"
                    )}
                  >
                    <div className="min-w-0 pr-2">
                      <span className="text-xs sm:text-sm font-bold block">
                        {opt.label}
                      </span>
                      <span
                        className={cn(
                          "text-xs mt-0.5 block line-clamp-1",
                          deliveryOption === opt.id ? "text-stone-200" : "text-stone-500"
                        )}
                      >
                        {opt.desc}
                      </span>
                    </div>
                    <span className="text-xs sm:text-sm font-bold shrink-0">
                      {opt.price === 0 ? "GRATIS" : `Rp ${opt.price.toLocaleString("id-ID")}`}
                    </span>
                  </button>
                ))}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2 text-xs">
                <div>
                  <label className="text-xs text-stone-600 block mb-1.5 font-medium">
                    Tanggal Pengiriman
                  </label>
                  <input
                    type="date"
                    value={deliveryDate}
                    onChange={(e) => setDeliveryDate(e.target.value)}
                    className="w-full rounded-xl bg-stone-50 border border-stone-200 p-3 outline-none focus:bg-white focus:border-[#1B4332] text-xs text-stone-900"
                  />
                </div>
                <div>
                  <label className="text-xs text-stone-600 block mb-1.5 font-medium">
                    Estimasi Jam Tiba
                  </label>
                  <select
                    value={deliveryTimeSlot}
                    onChange={(e) => setDeliveryTimeSlot(e.target.value)}
                    className="w-full rounded-xl bg-stone-50 border border-stone-200 p-3 outline-none focus:bg-white focus:border-[#1B4332] text-xs text-stone-900 cursor-pointer"
                  >
                    <option value="Pagi (09:00 - 12:00 WIB)">Pagi (09:00 - 12:00 WIB)</option>
                    <option value="Siang (12:00 - 15:00 WIB)">Siang (12:00 - 15:00 WIB)</option>
                    <option value="Sore (15:00 - 18:00 WIB)">Sore (15:00 - 18:00 WIB)</option>
                  </select>
                </div>
              </div>
            </section>

            {/* 3. Cara Pembayaran */}
            <section
              className={`bg-white p-4 sm:p-7 space-y-4 ${
                isArtisanal
                  ? "sm:rounded-3xl sm:border sm:border-stone-200/80 sm:shadow-xs"
                  : "sm:rounded-2xl sm:border sm:border-neutral-200"
              }`}
            >
              <div className="flex items-center justify-between pb-3 border-b border-stone-100">
                <h2
                  className={`text-base font-bold ${
                    isArtisanal ? "font-playfair text-[#1B4332]" : "text-neutral-900"
                  }`}
                >
                  3. Cara Pembayaran
                </h2>
                <span className="text-[10px] font-semibold text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                  Otomatis &amp; Aman
                </span>
              </div>

              <div className="space-y-2.5">
                {PAYMENT_METHODS.map((pm) => (
                  <label
                    key={pm.id}
                    onClick={() => setPaymentMethod(pm.id)}
                    className={cn(
                      "flex items-center justify-between p-3.5 sm:p-4 rounded-2xl border cursor-pointer text-xs transition-colors",
                      paymentMethod === pm.id
                        ? isArtisanal
                          ? "bg-[#1B4332] text-white border-[#1B4332] shadow-xs"
                          : "bg-neutral-900 text-white border-neutral-900"
                        : "bg-stone-50/70 hover:bg-stone-100/70 text-stone-800 border-stone-200/90"
                    )}
                  >
                    <div>
                      <span className="font-bold text-xs sm:text-sm block">{pm.label}</span>
                      <span
                        className={cn(
                          "text-xs block mt-0.5",
                          paymentMethod === pm.id ? "text-stone-200" : "text-stone-500"
                        )}
                      >
                        {pm.desc}
                      </span>
                    </div>
                    <div
                      className={cn(
                        "w-4 h-4 rounded-full border flex items-center justify-center shrink-0 ml-3",
                        paymentMethod === pm.id ? "border-white bg-white" : "border-stone-300"
                      )}
                    >
                      {paymentMethod === pm.id && <div className="w-2 h-2 rounded-full bg-[#1B4332]" />}
                    </div>
                  </label>
                ))}
              </div>
            </section>
          </div>

          {/* Kolom Kanan: Ringkasan Pesanan (5 cols) */}
          <div className="lg:col-span-5">
            <div
              className={`bg-white p-5 sm:p-7 space-y-5 sticky top-24 shadow-xs ${
                isArtisanal
                  ? "rounded-3xl border border-stone-200/80"
                  : "rounded-2xl border border-neutral-200"
              }`}
            >
              <h2
                className={`text-base font-bold pb-3 border-b border-stone-100 ${
                  isArtisanal ? "font-playfair text-[#1B4332]" : "font-jakarta text-neutral-900"
                }`}
              >
                Ringkasan Pembayaran
              </h2>

              {/* Items Mini List */}
              <div className="divide-y divide-stone-100 max-h-56 overflow-y-auto">
                {cart.map((item) => (
                  <div key={item.product.id} className="py-2.5 flex items-center justify-between text-xs">
                    <div className="flex-1 pr-3">
                      <span className="font-semibold text-stone-900 block truncate">
                        {item.quantity}x {item.product.name}
                      </span>
                      <span className="text-[11px] text-stone-400">
                        Rp {item.product.price.toLocaleString("id-ID")} / porsi
                      </span>
                    </div>
                    <span className="font-bold text-stone-900 shrink-0">
                      Rp {(item.product.price * item.quantity).toLocaleString("id-ID")}
                    </span>
                  </div>
                ))}
              </div>

              {/* Kalkulasi Biaya */}
              <div className="space-y-2.5 text-xs sm:text-sm pt-3 border-t border-stone-100">
                <div className="flex justify-between text-stone-500">
                  <span>Subtotal Menu</span>
                  <span className="font-semibold text-stone-900">
                    Rp {subtotal.toLocaleString("id-ID")}
                  </span>
                </div>
                <div className="flex justify-between text-stone-500">
                  <span>Ongkos Kirim</span>
                  <span className="font-semibold text-stone-900">
                    {shipping === 0 ? "GRATIS" : `Rp ${shipping.toLocaleString("id-ID")}`}
                  </span>
                </div>
                <div className="flex justify-between text-base font-bold text-stone-900 pt-2.5 border-t border-stone-100">
                  <span>Total Bayar</span>
                  <span className={isArtisanal ? "text-[#1B4332]" : "text-emerald-700"}>
                    Rp {total.toLocaleString("id-ID")}
                  </span>
                </div>
              </div>

              {/* Tombol Eksekusi Bayar */}
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full h-12 text-xs font-semibold flex items-center justify-center gap-2 transition-all disabled:opacity-50 shadow-md cursor-pointer active:scale-95 ${
                  isArtisanal
                    ? "rounded-full bg-[#1B4332] hover:bg-[#143225] text-white"
                    : "rounded-xl bg-neutral-900 hover:bg-black text-white"
                }`}
              >
                {isSubmitting ? (
                  <span>Menyiapkan Pesanan...</span>
                ) : (
                  <>
                    <span>Bayar Sekarang • Rp {total.toLocaleString("id-ID")}</span>
                    <ArrowRight strokeWidth={2} className="w-4 h-4" />
                  </>
                )}
              </button>

              <div className="text-xs text-stone-400 text-center flex items-center justify-center gap-1.5 pt-1">
                <ShieldCheck strokeWidth={1.75} className="w-4 h-4 text-emerald-600" />
                <span>Langsung dipacking &amp; dikirim fresh dari Dapur Gandaria</span>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
