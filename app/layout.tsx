import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "🔥TrailBlaze",
  description: "Discover your career with the power of AI",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (

    
    <html lang="en" data-theme="night">
      <body className={inter.className}>
      <Header />
        {children}
      <Footer />
      </body>
    </html>
  );
}
