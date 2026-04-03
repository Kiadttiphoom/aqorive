import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "AQORIVE — Creative Studio",
  description:
    "AQORIVE is a premium creative studio specializing in brand identity, digital experiences, and motion design.",
  keywords: ["creative studio", "brand identity", "motion design", "AQORIVE"],
  openGraph: {
    title: "AQORIVE — Creative Studio",
    description: "Premium creative studio for brands that demand excellence.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={outfit.variable}>
      <body>{children}</body>
    </html>
  );
}

