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
           {/* Footer con correo de contacto */}
      <footer className="w-full max-w-4xl mt-8 text-center">
        <div className="flex flex-col items-center gap-2">
          <h4 className="text-[var(--paper)] text-lg font-semibold">Contacto:</h4>
          <a
            href="mailto:info@chimaltransparente.org"
            className="inline-flex items-center gap-2 text-[var(--paper)] hover:text-[var(--accent)] transition-colors text-lg font-medium underline decoration-dotted underline-offset-4"
          > 
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
              <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
            </svg>
            info@chimaltransparente.org
          </a>
        </div>
      </footer>
          </div>
        </div>
      </body>
    </html>
  );
}
