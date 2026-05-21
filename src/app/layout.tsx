import "./globals.css";
import type { Metadata } from "next";
import { Suspense } from 'react';
import GalaxyWrapper from '@/components/GalaxyWrapper';
import { BuilderProvider } from '@/context/BuilderContext';
import BuilderSidebar from '@/components/BuilderSidebar';

export const metadata: Metadata = {
  title: "THE 1% CLUB 2026",
  description: "High-performance venture engineering execution layer.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body className="bg-transparent text-white selection:bg-white selection:text-black overflow-x-hidden relative min-h-screen">
        <BuilderProvider>
          {/* THE DEFINITIVE BACKGROUND LAYER - CONTAINS BLACK BASE AND STARS */}
          <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
             <Suspense fallback={null}>
               <GalaxyWrapper />
             </Suspense>
          </div>
          
          {/* THE INTERACTIVE CONTENT LAYER - MUST BE TRANSPARENT */}
          <div className="relative z-10 bg-transparent">
            {children}
          </div>

          <BuilderSidebar />
        </BuilderProvider>
      </body>
    </html>
  );
}
