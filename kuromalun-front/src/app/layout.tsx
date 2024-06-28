import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import * as React from 'react'
import { ChakraProvider } from "@chakra-ui/react";
import Navigation from "@/components/Navigation";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "kuromalun",
  description: "立命館大学生向けのサークル掲示板WEBアプリ",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="relative">
      <body className={inter.className}>
        <ChakraProvider>
          <Navigation />
          <div className="h-12"></div>
          {children}
        </ChakraProvider>
      </body>
    </html>
  );
}
