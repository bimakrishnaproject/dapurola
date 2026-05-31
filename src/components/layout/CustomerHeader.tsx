"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search, ShoppingBag, Heart, User, Menu } from "lucide-react";
import { useStore } from "@/store/useStore";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { href: "/", label: "Beranda" },
  { href: "/products", label: "Menu Kami" },
  { href: "/orders", label: "Lacak Pesanan" },
  { href: "/cara-pesan", label: "Cara Pesan" },
  { href: "/faq", label: "Tanya Jawab (FAQ)" },
];

export default function CustomerHeader() {
  const pathname = usePathname();
  const { cart, wishlist } = useStore();

  const cartItemsCount = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <header className="sticky top-0 z-40 w-full bg-background/80 backdrop-blur-md border-b border-border/40">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Mobile Menu */}
        <Sheet>
          <SheetTrigger className="lg:hidden" render={
            <Button variant="ghost" size="icon" className="-ml-2">
              <Menu className="h-5 w-5" />
            </Button>
          } />
          <SheetContent side="left" className="w-[85%] max-w-[320px] p-6">
            <SheetTitle className="text-left flex flex-col mb-6 border-b pb-4">
              <span className="font-heading text-2xl text-primary">Dapur Ola</span>
              <span className="text-xs font-medium text-muted-foreground tracking-wide mt-0.5">HAPPINESS IS HOMEMADE</span>
            </SheetTitle>
            <nav className="flex flex-col gap-6 mt-4">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "text-lg font-medium transition-colors hover:text-primary",
                    pathname === link.href ? "text-primary" : "text-muted-foreground"
                  )}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </SheetContent>
        </Sheet>

        {/* Logo */}
        <Link href="/" className="absolute left-1/2 -translate-x-1/2 lg:static lg:transform-none flex flex-col items-center lg:items-start justify-center">
          <span className="font-heading font-semibold text-2xl text-primary tracking-tight leading-none">
            Dapur Ola
          </span>
          <span className="text-[10px] font-medium text-muted-foreground tracking-widest mt-1">
            HAPPINESS IS HOMEMADE
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-8 absolute left-1/2 -translate-x-1/2">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary",
                pathname === link.href ? "text-primary" : "text-muted-foreground"
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-1 sm:gap-2">
          <Button variant="ghost" size="icon" className="hidden sm:inline-flex text-muted-foreground hover:text-primary" onClick={() => toast.info("Fitur Pencarian akan segera hadir!")}>
            <Search className="h-5 w-5" />
          </Button>
          <Link href="/wishlist">
            <Button variant="ghost" size="icon" className="relative text-muted-foreground hover:text-primary">
              <Heart className="h-5 w-5" />
              {wishlist.length > 0 && (
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-destructive rounded-full" />
              )}
            </Button>
          </Link>
          <Link href="/profile">
            <Button variant="ghost" size="icon" className="hidden sm:inline-flex text-muted-foreground hover:text-primary">
              <User className="h-5 w-5" />
            </Button>
          </Link>
          <Link href="/cart">
            <Button variant="ghost" size="icon" className="relative text-primary">
              <ShoppingBag className="h-5 w-5" />
              {cartItemsCount > 0 && (
                <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
                  {cartItemsCount}
                </span>
              )}
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
}
