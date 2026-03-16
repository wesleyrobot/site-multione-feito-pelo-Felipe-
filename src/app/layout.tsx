import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/ui/Navbar";
import Plasma from "@/components/Plasma";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "MultiOne - Portal de Implantação",
  description:
    "Plataforma de treinamento e implantação para o time MultiOne. Acesse vídeos, tire dúvidas e teste seu conhecimento.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        <div className="fixed inset-0 z-0">
          <Plasma
            color="#1d4ed8"
            speed={0.6}
            direction="forward"
            scale={1.1}
            opacity={0.8}
            mouseInteractive={true}
          />
        </div>
        <Navbar />
        <main className="relative z-10 min-h-screen pt-16">{children}</main>
      </body>
    </html>
  );
}
