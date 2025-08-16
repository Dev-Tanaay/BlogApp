"use client";

import Header from "@/components/BlogHeader";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-[#090D1F] text-[#FFFFFF]">
        <Header />
        <main className="pt-24 px-6">{children}</main>
      </body>
    </html>
  );
}
