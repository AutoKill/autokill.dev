import { Analytics } from "@vercel/analytics/react";
import "../styles/tailwind.css";
import { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import Navbar from "@/components/navbar";

export const metadata: Metadata = {
  title: "Hey, I'm AutoKill",
  description: "A software engineer from Belgrade, Serbia.",
};

export const viewport: Viewport = {
  themeColor: "#f87171",
};

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.className}>
      <body>
        <div className="mx-auto max-w-3xl px-5">
          <Navbar />
          {children}

          <div className="py-4 mb-2"></div>

          <Analytics />
        </div>
      </body>
    </html>
  );
}
