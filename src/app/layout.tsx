import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import ChatWidget from "@/components/ChatWidget";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Summit Builders | Denver's Premier Construction Company",
  description:
    "Residential remodeling, commercial buildouts, and custom homes in Denver, CO. Licensed, insured, and trusted since 2003.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} font-sans antialiased`}>
        {children}
        <ChatWidget />
      </body>
    </html>
  );
}
