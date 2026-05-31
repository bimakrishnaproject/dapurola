"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { Search, ShoppingBag, Heart, User, Menu, X } from "lucide-react";
import { useStore } from "@/store/useStore";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { href: "/products", label: "Menu Kami" },
  { href: "/orders", label: "Lacak Pesanan" },
];

export default function CustomerHeader() {
  const pathname = usePathname();
  const router = useRouter();
  const { cart, wishlist } = useStore();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const cartItemsCount = cart.reduce((total, item) => total + item.quantity, 0);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/products?q=${encodeURIComponent(searchQuery.trim())}`);
      setIsSearchOpen(false);
      setSearchQuery("");
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-background/80 backdrop-blur-md border-b border-border/40 relative">
      {isSearchOpen && (
        <div className="absolute inset-0 z-50 bg-background/95 backdrop-blur-md flex items-center px-4 md:px-8 shadow-sm">
          <form onSubmit={handleSearch} className="flex-1 flex items-center gap-2 max-w-3xl mx-auto h-full">
            <Search className="h-5 w-5 text-muted-foreground shrink-0" />
            <input 
              type="text" 
              placeholder="Cari bolu, brownies, hampers..." 
              className="flex-1 bg-transparent border-none outline-none text-base sm:text-lg px-2 h-full placeholder:text-muted-foreground/60"
              autoFocus
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Button type="button" variant="ghost" size="icon" className="shrink-0" onClick={() => setIsSearchOpen(false)}>
              <X className="h-5 w-5" />
            </Button>
          </form>
        </div>
      )}
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
              <span className="font-heading text-2xl text-primary">DAPUR OLA</span>
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
            DAPUR OLA
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
          <Button variant="ghost" size="icon" className="hidden sm:inline-flex text-muted-foreground hover:text-primary" onClick={() => setIsSearchOpen(true)}>
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
