import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Fraunces } from "next/font/google";
import "./globals.css";
import { SiteHeaderClient } from "@/components/SiteHeaderClient";
import { SiteFooter } from "@/components/SiteFooter";
import { ChatWidget } from "@/components/ChatWidget";
import { WelcomeOfferPopup } from "@/components/WelcomeOfferPopup";

const sans = Plus_Jakarta_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const display = Fraunces({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Coastal Chiropractic SLO | San Luis Obispo",
  description:
    "Personalized chiropractic care in San Luis Obispo with corrective exercise, soft tissue therapy, and modern recovery tools.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${sans.variable} ${display.variable} h-full scroll-smooth`}>
      <body className={`min-h-full flex flex-col antialiased ${sans.className}`}>
        <SiteHeaderClient />
        <div className="flex-1">{children}</div>
        <SiteFooter />
        <WelcomeOfferPopup />
        <ChatWidget />
      </body>
    </html>
  );
}
