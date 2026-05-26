import type { Metadata, Viewport } from "next";
import "./globals.css";
import { AppProvider } from "@/context/AppContext";
import BottomNav from "@/components/shared/BottomNav";

export const metadata: Metadata = {
  title: "CampusRide",
  description: "Student carpool network",
  manifest: "/manifest.json",
  appleWebApp: { capable: true, statusBarStyle: "default", title: "CampusRide" },
};

export const viewport: Viewport = {
  themeColor: "#f8fafc",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-slate-100 font-sans" suppressHydrationWarning>
        <AppProvider>
          <main className="mx-auto min-h-screen max-w-md bg-slate-50 pb-20 text-slate-950 shadow-xl">
            {children}
          </main>
          <BottomNav />
        </AppProvider>
      </body>
    </html>
  );
}
