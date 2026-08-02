import type { Metadata } from "next";
import { Cormorant_Garamond, Lora, Caveat, Inter, Parisienne } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-cormorant",
});

const lora = Lora({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-lora",
});

const caveat = Caveat({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-caveat",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
});

const parisienne = Parisienne({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-parisienne",
});

export const metadata: Metadata = {
  title: "Fooder.AI",
  description: "Your AI Chef. Smarter meals, better you.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" style={{ backgroundColor: "#F8F1E6" }}>
      <body className={`${cormorant.variable} ${lora.variable} ${caveat.variable} ${inter.variable} ${parisienne.variable}`} style={{ backgroundColor: "#F8F1E6" }}>
        {children}
      </body>
    </html>
  );
}
