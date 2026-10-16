import type { Metadata } from "next";
import {
  Geist,
  Newsreader,
  Cormorant_Garamond,
} from "next/font/google";
import Header from "@/components/Header";
import "./globals.css";

const geist = Geist({
  variable: "--font-sans",
  subsets: ["latin"],
});

const newsreader = Newsreader({
  variable: "--font-serif",
  subsets: ["latin"],
  style: ["normal", "italic"],
});

const cormorant = Cormorant_Garamond({
  variable: "--font-monogram",
  subsets: ["latin"],
  weight: ["400", "500"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "Anna Arnett Photography",
  description:
    "Chicago-based portrait and editorial photography by Anna Arnett.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geist.variable} ${newsreader.variable} ${cormorant.variable}`}
    >
      <body>
        <Header />
        {children}
      </body>
    </html>
  );
}