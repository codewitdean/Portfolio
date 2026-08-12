import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import Background from "@/components/Background";
import { Analytics } from "@vercel/analytics/next";

export const metadata: Metadata = {
  title: "Portfolio | Dean Kwadwo Obeng Asante ",
  description: "Full-stack developer passionate about creating efficient and functional web applications and systems",
  icons: {
    icon: { url: '/favicon.ico', type: 'image/x-icon' },
    shortcut: { url: '/favicon.ico', type: 'image/x-icon' },
    apple: { url: '/cwd.png', type: 'image/png' },
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
        <Analytics />
      </body>
    </html>
  );
}
