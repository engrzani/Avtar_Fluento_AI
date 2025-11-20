import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Providers from "@/components/Providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Fluento AI - Learn Spanish with AI",
  description: "Master Spanish conversation with our AI-powered learning platform featuring real-time chat, speech recognition, and personalized lessons.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers session={undefined}>
          {children}
        </Providers>
      </body>
    </html>
  );
}
