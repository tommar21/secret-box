import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Providers } from "@/components/providers";
import { Toaster } from "@/components/ui/sonner";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://mysecretbox.vercel.app"),
  title: {
    default: "SecretBox - Secure Environment Variables",
    template: "%s | SecretBox",
  },
  description:
    "Centralize all your environment variables in one secure place. End-to-end encrypted.",
  openGraph: {
    title: "SecretBox - Secure Environment Variables",
    description:
      "Centralize all your environment variables in one secure place. End-to-end encrypted.",
    url: "https://mysecretbox.vercel.app",
    siteName: "SecretBox",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "SecretBox - Secure Environment Variables",
    description:
      "Centralize all your environment variables in one secure place. End-to-end encrypted.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>{children}</Providers>
        <Toaster />
      </body>
    </html>
  );
}
