"use client";

import { useStore } from "@/store/useStore";
import { useRouter, usePathname } from "next/navigation";
import { ArrowLeftRight, Shield, User } from "lucide-react";
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

    if (newRole === "admin") {
      router.push("/admin");
    } else {
      router.push("/");
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <button
        onClick={toggleRole}
        className={cn(
          "flex items-center gap-2 px-3.5 py-2 border font-mono text-[10px] uppercase tracking-widest transition-colors shadow-lg cursor-pointer",
          role === "admin"
            ? "bg-white text-[#073524] border-2 border-[#00A65E] hover:bg-[#EAF5EF] shadow-md"
            : "bg-white text-[#073524] border border-[#00A65E]/40 hover:bg-[#EAF4EE] shadow-sm"
        )}
      >
        <ArrowLeftRight strokeWidth={1.25} className="w-3.5 h-3.5" />
        {role === "admin" ? (
          <span className="flex items-center gap-1 font-bold">
            <Shield strokeWidth={1.5} className="w-3 h-3 text-emerald-600" />
            MODE DAPUR (ADMIN)
          </span>
        ) : (
          <span className="flex items-center gap-1 font-bold">
            <User strokeWidth={1.5} className="w-3 h-3" />
            MODE PEMBELI
          </span>
        )}
      </button>
    </div>
  );
}
