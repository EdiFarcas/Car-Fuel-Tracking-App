import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ClientNavbar from "../components/ClientNavbar";
import Providers from "./providers";
import Footer from "../components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "FuelTrack",
  description: "Track your car's fuel and mileage easily.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // This script will set the correct theme class on <html> before hydration
  const setThemeScript = `
    (function() {
      try {
        var theme = localStorage.getItem('theme');
        if (theme === 'dark' || (!theme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
          document.documentElement.classList.add('dark');
        } else {
          document.documentElement.classList.remove('dark');
        }
      } catch (e) {}
    })();
  `;
  return (
    <html lang="en">
      <head>
        <script dangerouslySetInnerHTML={{ __html: setThemeScript }} />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>
          <header className="w-full px-6 py-4 border-b border-[var(--border)] bg-[var(--muted)]/80 backdrop-blur-md shadow-lg rounded-b-xl z-30 sticky top-0">
            <ClientNavbar />
          </header>
          <div className="min-h-screen flex flex-col">
            <div className="h-4" /> {/* Spacer between navbar and content */}
            {children}
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
}
