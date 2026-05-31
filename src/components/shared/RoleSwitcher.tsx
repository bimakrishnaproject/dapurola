"use client";

import { useStore } from "@/store/useStore";
import { useRouter, usePathname } from "next/navigation";
import { ArrowLeftRight, ShieldAlert, User } from "lucide-react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export default function RoleSwitcher() {
  const { role, setRole } = useStore();
  const router = useRouter();
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const toggleRole = () => {
    const newRole = role === "customer" ? "admin" : "customer";
    setRole(newRole);
    
    // Auto redirect
    if (newRole === "admin") {
      router.push("/admin");
    } else {
      router.push("/");
    }
  };

  // Don't render role switcher over admin sidebar for now if it gets messy, but a fixed bottom right button is fine.
  return (
    <div className="fixed bottom-4 right-4 z-50">
      <button
        onClick={toggleRole}
        className={cn(
          "flex items-center gap-2 px-4 py-3 rounded-full shadow-lg transition-all duration-300 hover:-translate-y-1 text-sm font-medium",
          role === "admin" 
            ? "bg-slate-900 text-white hover:bg-slate-800" 
            : "bg-primary text-primary-foreground hover:bg-brand-secondary"
        )}
      >
        <ArrowLeftRight className="w-4 h-4" />
        {role === "admin" ? (
          <span className="flex items-center gap-1.5"><ShieldAlert className="w-4 h-4"/> Admin Mode</span>
        ) : (
          <span className="flex items-center gap-1.5"><User className="w-4 h-4"/> Customer Mode</span>
        )}
      </button>
    </div>
  );
}
