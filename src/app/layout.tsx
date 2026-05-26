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
  themeColor: "#050505",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-black font-sans" suppressHydrationWarning>
        <AppProvider>
          <main className="phone-surface mx-auto min-h-screen max-w-md overflow-hidden pb-20 text-white shadow-2xl">
            {children}
          </main>
          <BottomNav />
        </AppProvider>
      </body>
    </html>
  );
}
