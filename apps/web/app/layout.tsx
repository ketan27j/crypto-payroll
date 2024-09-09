import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "../providers";
import { AppbarClient } from "../components/AppbarClient";
import { Toaster } from "react-hot-toast";

const inter = Inter({ subsets:["latin"]});

export const metadata: Metadata = {
  title: "Whale Alert",
  description: "Whale Alert",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Providers>
      <body className={inter.className}>
        <div className="min-w-screen min-h-screen bg-[#ebe6e6]">
          < AppbarClient />
          <Toaster position="bottom-center" />
            {children}
        </div>
      </body>
      </Providers>
    </html>
  );
}
