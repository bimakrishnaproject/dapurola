import type { Metadata } from "next";
import { Poppins, Inter } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";
import RoleSwitcher from "@/components/shared/RoleSwitcher";
import "./globals.css";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Dapur Ola | Homemade Bakery",
  description: "Bolu Gulung, Brownies, Dessert Box, dan Hampers. Dibikin fresh setelah dipesan.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="id"
      className={`${poppins.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans">
        {children}
        <RoleSwitcher />
        <Toaster position="top-center" richColors />
      </body>
    </html>
  );
}
