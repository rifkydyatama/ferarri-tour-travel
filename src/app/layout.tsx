import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Ferrari Jaya Group",
    template: "%s | Ferrari Jaya Group",
  },
  description: "Ferrari Jaya Group — layanan study tour & travel untuk sekolah.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body className="min-h-svh bg-white text-slate-900 antialiased">{children}</body>
    </html>
  );
}