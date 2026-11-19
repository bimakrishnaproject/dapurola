import type { Metadata } from "next";
import { Space_Grotesk, Space_Mono, Inter, Cinzel, Plus_Jakarta_Sans, Playfair_Display } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";
// import RoleSwitcher from "@/components/shared/RoleSwitcher";
// import ClientConceptSwitcher from "@/components/shared/ClientConceptSwitcher";
import "./globals.css";

const cinzelBrand = Cinzel({
  variable: "--font-cinzel",
  subsets: ["latin"],
});

const playfairDisplay = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
});

const brutalistSans = Space_Grotesk({
  variable: "--font-heading",
  subsets: ["latin"],
});

const monoSpec = Space_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "700"],
});

const sansBody = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Dapur Ola — Artisanal Patisserie & Bakery Jakarta",
  description: "Bolu gulung lembut, brownies fudgy premium, dan donat kampung menul. Dipanggang fresh setiap pagi.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="id"
      className={`${cinzelBrand.variable} ${playfairDisplay.variable} ${plusJakartaSans.variable} ${brutalistSans.variable} ${monoSpec.variable} ${sansBody.variable} h-full antialiased selection:bg-[#00A65E] selection:text-white`}
    >
      <body className="min-h-full flex flex-col font-sans bg-[#FAFBF9] text-[#073524] antialiased">
        {children}
        {/* Switcher mengambang di-hide sesuai request agar tidak menumpuk dengan bar keranjang & tombol produk */}
        {/* <RoleSwitcher /> */}
        {/* <ClientConceptSwitcher /> */}
        <Toaster position="bottom-right" richColors />
      </body>
    </html>
  );
}
