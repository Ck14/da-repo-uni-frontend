import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { InformationCircleIcon } from "@heroicons/react/24/solid";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Chimaltenango transparente",
  description: "Chimaltenango transparente",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <div className="relative min-h-screen bg-[url('/fondo.jpg')] bg-repeat bg-center bg-[length:300px_260px] flex flex-col items-center justify-center p-4 sm:p-8 overflow-hidden">

          <div className="relative z-10 w-full flex flex-col items-center">
            {children}
            <a
              href="/ayuda"
              className="fixed bottom-8 left-8 z-50 bg-[var(--accent)] text-white rounded-full shadow-2xl w-16 h-16 p-0 flex items-center justify-center text-2xl font-bold hover:bg-[var(--highlight)] transition-colors focus:outline-none focus:ring-4 focus:ring-[var(--highlight)]/50 active:scale-95"
              aria-label="Ayuda"
            >
              <InformationCircleIcon className="w-8 h-8" />
            </a>
            <footer className="mt-10 text-center text-[var(--paper)] text-sm opacity-80">
              Antigua Devs &copy; {new Date().getFullYear()}
            </footer>
          </div>
        </div>
      </body>
    </html>
  );
}
