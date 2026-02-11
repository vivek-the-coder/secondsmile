import type { Metadata } from "next";
import { Inter, Fredoka, Luckiest_Guy } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const fredoka = Fredoka({
  subsets: ["latin"],
  variable: "--font-fredoka",
  weight: ["300", "400", "500", "600", "700"],
});

const luckiestGuy = Luckiest_Guy({
  subsets: ["latin"],
  variable: "--font-luckiest-guy",
  weight: "400",
});

export const metadata: Metadata = {
  title: "ToyStore | Premium Toy Marketplace",
  description: "Buy, rent, and sell high-quality toys with ease.",
};

import { Navbar } from "@/components/navbar";
import { AuthProvider } from "@/contexts/auth-context";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${fredoka.variable} ${luckiestGuy.variable} font-body antialiased`}>
        <AuthProvider>
          <Navbar />
          <main>{children}</main>
        </AuthProvider>
      </body>
    </html>
  );
}
