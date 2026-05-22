import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Jichu Chen | AI Video Creator",
  description: "Jichu Chen personal portfolio homepage.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" className="h-full antialiased">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
