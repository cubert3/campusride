import type { Metadata, Viewport } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import { AppProvider } from "@/context/AppContext";
import BottomNav from "@/components/shared/BottomNav";

const geist = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "CampusRide",
  description: "Student carpool network",
  manifest: "/manifest.json",
  appleWebApp: { capable: true, statusBarStyle: "default", title: "CampusRide" },
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={geist.variable}>
      <body className="min-h-screen bg-gray-50 font-sans" suppressHydrationWarning>
        <AppProvider>
          <main className="max-w-md mx-auto bg-white min-h-screen pb-20">
            {children}
          </main>
          <BottomNav />
        </AppProvider>
      </body>
    </html>
  );
}