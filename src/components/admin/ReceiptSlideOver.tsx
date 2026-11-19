"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Printer, Check, Phone, MapPin, Clock, Truck } from "lucide-react";
import { Order } from "@/store/types";
import { format } from "date-fns";
import { id as localeId } from "date-fns/locale";

interface ReceiptSlideOverProps {
  order: Order | null;
  onClose: () => void;
  onAdvanceStatus?: (order: Order) => void;
}

export default function ReceiptSlideOver({
  order,
  onClose,
  onAdvanceStatus,
}: ReceiptSlideOverProps) {
  if (!order) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex justify-end">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/50 backdrop-blur-xs"
        />

        {/* Drawer Container (Clean White Thermal Receipt) */}
        <motion.div
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "100%" }}
          transition={{ type: "spring", stiffness: 350, damping: 35 }}
          className="relative w-full max-w-md bg-white border-l border-neutral-200 text-[#073524] h-full flex flex-col justify-between shadow-2xl z-10 overflow-hidden"
        >
          {/* Drawer Header */}
          <div className="p-4 sm:p-5 border-b border-neutral-200 flex items-center justify-between bg-[#FAFBF9]">
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs uppercase tracking-wider text-[#00A65E] font-bold">
                STRUK DAPUR //
              </span>
              <span className="font-mono text-sm font-bold text-[#073524]">
                #{order.id}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handlePrint}
                className="h-9 px-3 bg-white border border-neutral-300 hover:bg-neutral-50 text-[#073524] font-mono text-xs uppercase font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
                title="Cetak struk thermal"
              >
                <Printer strokeWidth={1.5} className="w-3.5 h-3.5 text-[#00A65E]" />
                <span>Cetak</span>
              </button>
              <button
                onClick={onClose}
                className="p-2 border border-neutral-200 hover:bg-neutral-100 text-[#073524] transition-colors cursor-pointer"
                aria-label="Tutup"
              >
                <X strokeWidth={1.5} className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Struk Content (Printable Layout) */}
          <div className="flex-1 overflow-y-auto p-6 font-mono text-xs space-y-4 bg-white" id="printable-receipt">
            {/* Header Brand */}
            <div className="text-center pb-4 border-b border-dashed border-neutral-300">
              <h1 className="font-cinzel text-xl font-bold tracking-widest text-[#073524]">
                DAPUR OLA
              </h1>
              <p className="text-[10px] uppercase tracking-widest text-[#00A65E] font-bold">
                HAPPINESS IS HOMEMADE
              </p>
              <p className="text-[10px] text-[#5A7E6D] mt-1">
                Gandaria, Jakarta Selatan • 0812-3456-7890
              </p>
            </div>

            {/* Order Meta */}
            <div className="space-y-1 py-1 border-b border-dashed border-neutral-300 text-[11px]">
              <div className="flex justify-between">
                <span className="text-[#5A7E6D]">No. Order:</span>
                <span className="font-bold text-[#073524]">#{order.id}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#5A7E6D]">Waktu:</span>
                <span>
                  {format(new Date(order.createdAt), "dd/MM/yyyy HH:mm", { locale: localeId })} WIB
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#5A7E6D]">Pelanggan:</span>
                <span className="font-bold">{order.customerName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#5A7E6D]">Telepon:</span>
                <span>{order.customerPhone}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#5A7E6D]">Pengiriman:</span>
                <span className="font-bold text-[#00A65E]">{order.deliveryOption}</span>
              </div>
              <div className="pt-1">
                <span className="text-[#5A7E6D] block">Alamat Antar:</span>
                <p className="text-[11px] leading-relaxed text-[#073524] mt-0.5">
                  {order.address}
                </p>
              </div>
            </div>

            {/* Items Table */}
            <div className="space-y-2 py-2 border-b border-dashed border-neutral-300">
              <div className="flex justify-between text-[10px] text-[#5A7E6D] uppercase font-bold">
                <span>ITEM MENU</span>
                <span>TOTAL</span>
              </div>
              {order.items.map((item, idx) => (
                <div key={idx} className="space-y-0.5">
                  <div className="flex justify-between items-start text-xs">
                    <span className="font-bold text-[#073524]">
                      {item.quantity}x {item.product.name}
                    </span>
                    <span className="font-bold">
                      Rp {(item.product.price * item.quantity).toLocaleString("id-ID")}
                    </span>
                  </div>
                  {item.notes && (
                    <p className="text-[10px] text-amber-800 italic pl-4">
                      * Catatan: {item.notes}
                    </p>
                  )}
                </div>
              ))}
            </div>

            {/* Financial Summary */}
            <div className="space-y-1.5 py-1 text-xs">
              <div className="flex justify-between text-[#5A7E6D]">
                <span>Subtotal Menu:</span>
                <span>
                  Rp {order.items.reduce((sum, i) => sum + i.product.price * i.quantity, 0).toLocaleString("id-ID")}
                </span>
              </div>
              <div className="flex justify-between text-sm font-bold pt-2 border-t border-neutral-300 text-[#073524]">
                <span>TOTAL PEMBAYARAN:</span>
                <span>Rp {order.total.toLocaleString("id-ID")}</span>
              </div>
              <div className="flex justify-between text-[11px] text-[#5A7E6D]">
                <span>Metode Bayar:</span>
                <span className="font-bold text-[#073524]">{order.paymentMethod}</span>
              </div>
            </div>

            {/* Footer QR / Greeting */}
            <div className="text-center pt-4 border-t border-dashed border-neutral-300 text-[10px] text-[#5A7E6D] space-y-1">
              <p className="font-bold text-[#073524]">HAPPINESS IS HOMEMADE</p>
              <p>Terima kasih sudah jajan di Dapur Ola!</p>
              <p className="text-[9px]">Simpan struk ini sebagai bukti pembayaran resmi.</p>
            </div>
          </div>

          {/* Action Footer */}
          <div className="p-4 border-t border-neutral-200 bg-[#FAFBF9] flex items-center gap-2">
            {onAdvanceStatus && (
              <button
                onClick={() => {
                  onAdvanceStatus(order);
                  onClose();
                }}
                className="flex-1 h-11 bg-[#00A65E] hover:bg-[#008F50] text-white font-mono text-xs uppercase font-bold flex items-center justify-center gap-2 shadow-xs cursor-pointer"
              >
                <Check strokeWidth={2} className="w-4 h-4" />
                <span>
                  {order.status === "Pesanan Masuk"
                    ? "Mulai Masak Pesanan"
                    : order.status === "Lagi Dimasak"
                    ? "Tandai Siap Kirim"
                    : "Selesaikan Pesanan"}
                </span>
              </button>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
