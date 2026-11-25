import { SITE_URL } from "./seo";

import type { Metadata } from "next";
import {
  Geist,
  Newsreader,
  Cormorant_Garamond,
} from "next/font/google";
import Link from "next/link";
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
  metadataBase: new URL(SITE_URL),

  title: {
    default:
      "Chicago Portrait & Headshot Photographer | Anna Arnett Photography",
    template: "%s | Anna Arnett Photography",
  },

  description:
    "Affordable portrait, senior, graduation, headshot and creative photography in Chicago. Warm, nostalgic images with an editorial approach.",

  applicationName: "Anna Arnett Photography",

  authors: [{ name: "Anna Arnett" }],

  creator: "Anna Arnett",

  publisher: "Anna Arnett Photography",

  robots: {
    index: true,
    follow: true,
  },

  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Anna Arnett Photography",
    title:
      "Chicago Portrait & Headshot Photographer | Anna Arnett Photography",
    description:
      "Warm, nostalgic portrait and editorial photography in Chicago. Available for seniors, graduation, headshots, couples and creative sessions.",
    images: [
      {
        url: "/photos/converse.jpg",
        alt: "Anna Arnett Photography",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Anna Arnett Photography",
    description:
      "Chicago portrait and editorial photography.",
    images: ["/photos/converse.jpg"],
  },
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

        <footer className="site-footer">
          <span>
            © {new Date().getFullYear()} Anna Arnett Photography
          </span>

          <span className="site-footer-location">
            CHICAGO · SELECT TRAVEL
          </span>

          <Link href="/privacy">
            Privacy Policy
          </Link>
        </footer>
      </body>
    </html>
  );
}
