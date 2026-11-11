import type { Metadata } from "next";
import { CartProvider } from "@/context/CartContext";
import "./globals.css";

export const metadata: Metadata = {
  title: "STELLO | Style that speaks",
  description: "Luxury apparel, outerwear, knitwear and heavyweight essentials.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col bg-[#111111] text-[#F3EDE2]">
        <CartProvider>{children}</CartProvider>
      </body>
    </html>
  );
}
