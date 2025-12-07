import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/ui/navbar";
import Footer from "@/components/ui/footer";
import { SocketProvider } from "@/contexts/SocketContext";
import { AccesibilityProvider } from "@/contexts/AccesibilityContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Obywatel prawa",
  description: "Strona do sledzenia zmian prawnych",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SocketProvider>
      <html lang="pl">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col min-h-screen`}
        >
          <Navbar />
          <main>{children}</main>
          <Footer />
        </body>
      </html>
      <AccesibilityProvider>
        <html lang="pl">
          <body
            className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col min-h-screen`}
          >
            <Navbar />
            <main>{children}</main>
            <Footer />
          </AccesibilityProvider>
        </SocketProvider>
      </body>
    </html>
  );
}
