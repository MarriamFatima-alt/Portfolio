import type { Metadata } from "next";
import { Space_Grotesk, Inter, JetBrains_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";

// TODO: once your custom domain (or confirmed vercel.app URL) is final,
// set this to the exact live URL — it's used to build absolute URLs for
// the social-share preview image below.
const siteUrl = "https://marriamfatima.vercel.app";

const display = Space_Grotesk({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-display",
});

const body = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-body",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Marriam Fatima — AI/ML Engineer",
  description:
    "Portfolio of Marriam Fatima: AI/ML Engineer, educator, and founder of MK AI HUB, building NLP, chatbot, and automation projects.",
  openGraph: {
    title: "Marriam Fatima — AI/ML Engineer",
    description:
      "Portfolio of Marriam Fatima: AI/ML Engineer, educator, and founder of MK AI HUB, building NLP, chatbot, and automation projects.",
    url: siteUrl,
    siteName: "Marriam Fatima",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Marriam Fatima — AI/ML Engineer",
    description:
      "Portfolio of Marriam Fatima: AI/ML Engineer, educator, and founder of MK AI HUB.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable} ${mono.variable}`}>
      <body className="font-body antialiased">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
