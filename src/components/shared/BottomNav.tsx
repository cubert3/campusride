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
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 max-w-md mx-auto">
      <div className="flex">
        {tabs.map(({ href, label, icon: Icon }) => {
          const active = pathname === href;
          return (
            <Link key={href} href={href} className="flex-1 flex flex-col items-center py-3 gap-1">
              <Icon size={20} className={active ? "text-purple-600" : "text-gray-400"} />
              <span className={`text-xs ${active ? "text-purple-600 font-medium" : "text-gray-400"}`}>
                {label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}