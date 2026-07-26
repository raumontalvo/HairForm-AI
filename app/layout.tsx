import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import ToastContainer from "@/components/toast/ToastContainer";
import { HairSessionProvider } from "@/context/HairSessionContext";
import { ToastProvider } from "@/context/ToastContext";

import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "HairForm AI | Professional Hair Education",
  description:
    "AI-powered color formulation, haircut geometry, and professional education for hairstylists.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <ToastProvider>
          <HairSessionProvider>
            {children}
            <ToastContainer />
          </HairSessionProvider>
        </ToastProvider>
      </body>
    </html>
  );
}