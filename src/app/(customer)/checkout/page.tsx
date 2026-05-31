"use client";

import { useStore } from "@/store/useStore";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Check, ShieldCheck, CreditCard, Banknote, MapPin, Calendar as CalendarIcon, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

const DELIVERY_OPTIONS = ["Instant Delivery", "Same Day", "Scheduled Delivery", "Pickup"];
const PAYMENT_METHODS = ["QRIS", "Bank Transfer", "Virtual Account", "GoPay", "OVO", "Dana", "Credit Card"];

export default function CheckoutPage() {
  const router = useRouter();
  const { cart, user, placeOrder } = useStore();
  const [mounted, setMounted] = useState(false);

  // Form State
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [deliveryOption, setDeliveryOption] = useState("Scheduled Delivery");
  const [deliveryDate, setDeliveryDate] = useState("");
  const [deliveryTimeSlot, setDeliveryTimeSlot] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("QRIS");
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

  const subtotal = cart.reduce((total, item) => total + (item.product.price * item.quantity), 0);
  const shipping = deliveryOption === "Pickup" ? 0 : 25000;
  const total = subtotal + shipping;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    try {
      const order = placeOrder({
        customerId: user?.id || `GUEST-${Date.now()}`,
        customerName: name,
        customerPhone: phone,
        address,
        items: cart,
        total,
        deliveryOption,
        deliveryDate: deliveryDate || new Date().toISOString().split("T")[0],
        deliveryTimeSlot: deliveryTimeSlot || "Segera",
        paymentMethod,
      });

      // Show toast
      toast.success("Yeay! Pesananmu Udah Masuk 🎉", {
        description: `Order ID: ${order.id}. Silakan tunggu konfirmasi admin.`,
      });
      
      // We can also simulate a notification for the admin if we want, 
      // but since they share localstorage, the admin will see it anyway on reload.

      router.push(`/orders`);
    } catch (error) {
      toast.error("Terjadi kesalahan saat memproses pesanan.");
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-heading font-semibold text-brand-primary mb-8">Checkout</h1>
      
      <form onSubmit={handleSubmit} className="flex flex-col lg:flex-row gap-8 lg:gap-12">
        {/* Left Column: Form Details */}
        <div className="flex-1 space-y-8">
          {/* Customer Info */}
          <section className="pb-8 border-b border-brand-beige/60">
            <h2 className="text-xl font-heading font-semibold text-brand-primary mb-6 flex items-center gap-2">
              <span className="w-8 h-8 rounded-full bg-brand-light flex items-center justify-center text-sm">1</span>
              Info Pemesan
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1.5">Nama Lengkap</label>
                <Input required value={name} onChange={e => setName(e.target.value)} className="h-12 rounded-xl" placeholder="Contoh: Alika Putri" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1.5">Nomor WhatsApp</label>
                <Input required type="tel" value={phone} onChange={e => setPhone(e.target.value)} className="h-12 rounded-xl" placeholder="Contoh: 081234567890" />
              </div>
            </div>
          </section>

          {/* Delivery Info */}
          <section className="pb-8 border-b border-brand-beige/60">
            <h2 className="text-xl font-heading font-semibold text-brand-primary mb-6 flex items-center gap-2">
              <span className="w-8 h-8 rounded-full bg-brand-light flex items-center justify-center text-sm">2</span>
              Pengiriman
            </h2>
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-3">
                {DELIVERY_OPTIONS.map((opt) => (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => setDeliveryOption(opt)}
                    className={cn(
                      "p-4 rounded-xl border text-sm font-medium text-left transition-all",
                      deliveryOption === opt 
                        ? "border-brand-primary bg-brand-light text-brand-primary" 
                        : "border-border hover:border-brand-primary/50 text-foreground"
                    )}
                  >
                    {opt}
                  </button>
                ))}
              </div>

              {deliveryOption !== "Pickup" && (
                <div>
                  <label className="block text-sm font-medium mb-1.5">Alamat Lengkap</label>
                  <textarea 
                    required
                    value={address}
                    onChange={e => setAddress(e.target.value)}
                    className="w-full rounded-xl border border-border bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 h-24 resize-none" 
                    placeholder="Contoh: Jl. Mawar Merah No. 12, RT 01/RW 02..."
                  />
                </div>
              )}

              {deliveryOption === "Scheduled Delivery" && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1.5">Tanggal Pengiriman</label>
                    <div className="relative">
                      <CalendarIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
                      <Input required type="date" value={deliveryDate} onChange={e => setDeliveryDate(e.target.value)} className="h-12 rounded-xl pl-10" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1.5">Waktu Pengiriman</label>
                    <div className="relative">
                      <Clock className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
                      <select required value={deliveryTimeSlot} onChange={e => setDeliveryTimeSlot(e.target.value)} className="w-full h-12 rounded-xl border border-border bg-background pl-10 pr-4 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 appearance-none">
                        <option value="" disabled>Pilih Jam</option>
                        <option value="Pagi (09:00 - 12:00)">Pagi (09:00 - 12:00)</option>
                        <option value="Siang (12:00 - 15:00)">Siang (12:00 - 15:00)</option>
                        <option value="Sore (15:00 - 18:00)">Sore (15:00 - 18:00)</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </section>

          {/* Payment Method */}
          <section className="pb-8 border-b border-brand-beige/60 last:border-0 last:pb-0">
            <h2 className="text-xl font-heading font-semibold text-brand-primary mb-6 flex items-center gap-2">
              <span className="w-8 h-8 rounded-full bg-brand-light flex items-center justify-center text-sm">3</span>
              Metode Pembayaran
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {PAYMENT_METHODS.map((opt) => (
                <button
                  key={opt}
                  type="button"
                  onClick={() => setPaymentMethod(opt)}
                  className={cn(
                    "p-4 rounded-xl border text-sm font-medium flex flex-col items-center justify-center gap-2 transition-all",
                    paymentMethod === opt 
                      ? "border-brand-primary bg-brand-light text-brand-primary" 
                      : "border-border hover:border-brand-primary/50 text-foreground"
                  )}
                >
                  <CreditCard className="w-5 h-5" />
                  <span>{opt}</span>
                </button>
              ))}
            </div>
          </section>
        </div>

        {/* Right Column: Order Summary */}
        <div className="w-full lg:w-[400px]">
          <div className="p-5 md:p-6 sticky top-24 border border-brand-beige shadow-sm bg-white md:bg-brand-light/10 rounded-2xl">
            <h2 className="text-xl font-heading font-semibold text-brand-primary mb-6">Ringkasan Pesanan</h2>
            
            <div className="space-y-4 mb-6 max-h-[300px] overflow-y-auto pr-2">
              {cart.map(item => (
                <div key={item.product.id} className="flex gap-4">
                  <div className="relative w-16 h-16 rounded-xl overflow-hidden bg-white shrink-0 border border-brand-beige">
                    <Image src={item.product.image} alt={item.product.name} fill className="object-cover" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-sm line-clamp-2">{item.product.name}</h4>
                    <p className="text-xs text-muted-foreground mt-1">{item.quantity} x Rp {item.product.price.toLocaleString("id-ID")}</p>
                  </div>
                  <div className="font-semibold text-sm">
                    Rp {(item.product.price * item.quantity).toLocaleString("id-ID")}
                  </div>
                </div>
              ))}
            </div>

            <Separator className="my-6 bg-brand-beige" />

            <div className="space-y-4 mb-6 text-sm">
              <div className="flex justify-between text-muted-foreground">
                <span>Subtotal ({cart.length} item)</span>
                <span>Rp {subtotal.toLocaleString("id-ID")}</span>
              </div>
              <div className="flex justify-between text-muted-foreground">
                <span>Ongkos Kirim</span>
                <span>{shipping === 0 ? "Gratis" : `Rp ${shipping.toLocaleString("id-ID")}`}</span>
              </div>
            </div>

            <Separator className="my-6 bg-brand-beige" />

            <div className="flex justify-between items-end mb-8">
              <span className="font-heading font-semibold text-lg">Total Pembayaran</span>
              <span className="font-heading font-bold text-2xl text-brand-primary">
                Rp {total.toLocaleString("id-ID")}
              </span>
            </div>

            <Button 
              type="submit" 
              size="lg" 
              className="w-full rounded-full h-14 text-lg bg-brand-primary hover:bg-brand-secondary"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Memproses..." : "Bayar Sekarang"}
            </Button>

            <p className="flex items-center justify-center gap-2 text-xs text-muted-foreground mt-4">
              <ShieldCheck className="w-4 h-4 text-brand-primary" />
              Pembayaran dijamin aman 100%
            </p>
          </div>
        </div>
      </form>
    </div>
  );
}
