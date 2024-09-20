import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
// import  "bootstrap/dist/css/bootstrap.min.css"
import { Providers } from "../providers";
import { AppbarClient } from "../components/AppbarClient";
import { Toaster } from "react-hot-toast";

const inter = Inter({ subsets:["latin"]});

export const metadata: Metadata = {
  title: "Crypto Payroll",
  description: "Crypto Payroll",
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
