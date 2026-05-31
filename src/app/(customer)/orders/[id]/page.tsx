"use client";

import { useStore } from "@/store/useStore";
import { useParams, notFound } from "next/navigation";
import Image from "next/image";
import { format } from "date-fns";
import { id as idLocale } from "date-fns/locale";
import { CheckCircle2, Circle, Clock, ChefHat, Truck, Home, MapPin, Phone, User } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const STATUS_STEPS = [
  "Menunggu Pembayaran",
  "Sudah Dibayar",
  "Dikonfirmasi",
  "Lagi Dibikin 🥰",
  "Siap Dikirim 🚚",
  "Dalam Perjalanan",
  "Selesai 🎉"
];

const STATUS_ICONS: Record<string, React.ReactNode> = {
  "Menunggu Pembayaran": <Clock className="w-5 h-5" />,
  "Sudah Dibayar": <CheckCircle2 className="w-5 h-5" />,
  "Dikonfirmasi": <CheckCircle2 className="w-5 h-5" />,
  "Lagi Dibikin 🥰": <ChefHat className="w-5 h-5" />,
  "Siap Dikirim 🚚": <PackageIcon className="w-5 h-5" />,
  "Dalam Perjalanan": <Truck className="w-5 h-5" />,
  "Selesai 🎉": <Home className="w-5 h-5" />,
  "Dibatalkan": <Clock className="w-5 h-5" /> // fallback
};

function PackageIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"/><path d="m3.3 7 8.7 5 8.7-5"/><path d="M12 22V12"/></svg>
  )
}

export default function OrderDetailPage() {
  const { id } = useParams() as { id: string };
  const { orders } = useStore();

  const order = orders.find(o => o.id === id);

  if (!order) {
    return notFound();
  }

  const currentStepIndex = STATUS_STEPS.indexOf(order.status);
  const isCancelled = order.status === "Dibatalkan";

  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-3xl font-heading font-semibold text-brand-primary mb-2">Detail Pesanan</h1>
        <p className="text-muted-foreground">Order ID: {order.id}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Tracker & Items */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Tracker */}
          <Card className="p-6 sm:p-8 border-transparent shadow-sm bg-white rounded-3xl">
            <h2 className="text-xl font-heading font-semibold text-brand-primary mb-8">Status Pesanan</h2>
            
            {isCancelled ? (
              <div className="bg-red-50 text-red-600 p-4 rounded-xl border border-red-100 font-medium">
                Pesanan Dibatalkan
              </div>
            ) : (
              <div className="space-y-6 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-brand-beige">
                {STATUS_STEPS.map((step, index) => {
                  const isCompleted = index < currentStepIndex;
                  const isCurrent = index === currentStepIndex;
                  const isFuture = index > currentStepIndex;

                  return (
                    <div key={step} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                      <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-white bg-brand-light shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10"
                           style={{ backgroundColor: isCompleted || isCurrent ? '#2F6B52' : '#F5EFE6', color: isCompleted || isCurrent ? '#fff' : '#6B7280' }}>
                        {STATUS_ICONS[step]}
                      </div>
                      <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-white p-4 rounded-2xl border border-brand-beige shadow-sm">
                        <div className="flex items-center justify-between space-x-2 mb-1">
                          <div className={`font-bold text-sm ${isCurrent ? 'text-brand-primary' : isFuture ? 'text-muted-foreground' : 'text-foreground'}`}>{step}</div>
                        </div>
                        {isCurrent && <div className="text-xs text-brand-secondary">Status saat ini</div>}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </Card>

          {/* Order Items */}
          <Card className="p-6 sm:p-8 border-transparent shadow-sm bg-white rounded-3xl">
            <h2 className="text-xl font-heading font-semibold text-brand-primary mb-6">Barang Belanjaan</h2>
            <div className="space-y-6">
              {order.items.map(item => (
                <div key={item.product.id} className="flex gap-4">
                  <div className="relative w-20 h-20 rounded-xl overflow-hidden bg-brand-cream border border-brand-beige shrink-0">
                    <Image src={item.product.image} alt={item.product.name} fill className="object-cover" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-heading font-medium text-foreground">{item.product.name}</h3>
                    <p className="text-sm text-muted-foreground mt-1">{item.quantity} x Rp {item.product.price.toLocaleString("id-ID")}</p>
                    {item.notes && <p className="text-xs mt-2 bg-brand-light/50 p-2 rounded-lg text-muted-foreground">Catatan: {item.notes}</p>}
                  </div>
                  <div className="font-semibold text-brand-primary">
                    Rp {(item.product.price * item.quantity).toLocaleString("id-ID")}
                  </div>
                </div>
              ))}
            </div>

            <Separator className="my-6 bg-brand-beige" />

            <div className="space-y-3 text-sm">
              <div className="flex justify-between text-muted-foreground">
                <span>Subtotal Barang</span>
                <span>Rp {(order.total - (order.deliveryOption === "Pickup" ? 0 : 25000)).toLocaleString("id-ID")}</span>
              </div>
              <div className="flex justify-between text-muted-foreground">
                <span>Ongkos Kirim</span>
                <span>{order.deliveryOption === "Pickup" ? "Gratis" : "Rp 25.000"}</span>
              </div>
              <div className="flex justify-between font-bold text-lg text-brand-primary pt-3 border-t border-brand-beige">
                <span>Total Belanja</span>
                <span>Rp {order.total.toLocaleString("id-ID")}</span>
              </div>
            </div>
          </Card>
        </div>

        {/* Right Column: Info */}
        <div className="space-y-6">
          <Card className="p-6 border-transparent shadow-sm bg-brand-cream/30 rounded-3xl">
            <h3 className="font-heading font-semibold text-brand-primary mb-4 flex items-center gap-2">
              <MapPin className="w-5 h-5" /> Info Pengiriman
            </h3>
            <div className="space-y-4 text-sm">
              <div>
                <p className="text-muted-foreground mb-1">Metode</p>
                <p className="font-medium text-foreground">{order.deliveryOption}</p>
              </div>
              <div>
                <p className="text-muted-foreground mb-1">Jadwal</p>
                <p className="font-medium text-foreground">{format(new Date(order.deliveryDate), "dd MMMM yyyy", { locale: idLocale })} - {order.deliveryTimeSlot}</p>
              </div>
              {order.deliveryOption !== "Pickup" && (
                <div>
                  <p className="text-muted-foreground mb-1">Alamat</p>
                  <p className="font-medium text-foreground">{order.address}</p>
                </div>
              )}
            </div>
          </Card>

          <Card className="p-6 border-transparent shadow-sm bg-brand-cream/30 rounded-3xl">
            <h3 className="font-heading font-semibold text-brand-primary mb-4 flex items-center gap-2">
              <User className="w-5 h-5" /> Info Pemesan
            </h3>
            <div className="space-y-4 text-sm">
              <div>
                <p className="text-muted-foreground mb-1">Nama</p>
                <p className="font-medium text-foreground">{order.customerName}</p>
              </div>
              <div>
                <p className="text-muted-foreground mb-1">Nomor HP</p>
                <p className="font-medium text-foreground">{order.customerPhone}</p>
              </div>
            </div>
          </Card>
        </div>

      </div>
    </div>
  );
}
