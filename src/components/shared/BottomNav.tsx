"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Search, Plus, User, Map } from "lucide-react";

const tabs = [
  { href: "/home", label: "Home", icon: Home },
  { href: "/find", label: "Find", icon: Search },
  { href: "/offer", label: "Offer", icon: Plus },
  { href: "/map", label: "Map", icon: Map },
  { href: "/profile", label: "Profile", icon: User },
];

export default function BottomNav() {
  const pathname = usePathname();
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 mx-auto max-w-md border-t border-white/10 bg-black/90 backdrop-blur-xl">
      <div className="flex px-1">
        {tabs.map(({ href, label, icon: Icon }) => {
          const active = pathname === href;
          return (
            <Link key={href} href={href} className="flex flex-1 flex-col items-center gap-1 py-3">
              <span className={`rounded-2xl px-3 py-1 ${active ? "bg-white text-black" : "text-white/45"}`}>
                <Icon size={18} />
              </span>
              <span className={`text-[11px] ${active ? "font-bold text-white" : "text-white/45"}`}>
                {label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
