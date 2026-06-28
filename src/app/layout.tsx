import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import Background from "@/components/Background";

export const metadata: Metadata = {
  title: "Portfolio | Dean Kwadwo Obeng Asante ",
  description: "Full-stack developer passionate about creating efficient and functional web applications and systems",
  icons: {
    icon: { url: '/yetron.ico', type: 'image/x-icon' },
    shortcut: { url: '/yetron.ico', type: 'image/x-icon' },
    apple: { url: '/yetron.png', type: 'image/png' },
  },
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Background />
        <main className="relative min-h-screen">
          {children}
        </main>
      </body>
    </html>
  );
}
