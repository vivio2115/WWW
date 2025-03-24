"use client";

import { useEffect } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ScrollToTop } from "@/components/ScrollToTop";

export default function ClientBody({
  children,
}: {
  children: React.ReactNode;
}) {
  // Remove any extension-added classes during hydration
  useEffect(() => {
    // This runs only on the client after hydration
    document.body.className = "antialiased bg-black";

    // Add smooth scrolling behavior to the whole document
    document.documentElement.style.scrollBehavior = "smooth";
  }, []);

  return (
    <body className="antialiased min-h-screen flex flex-col bg-black" suppressHydrationWarning>
      <Header />
      <main className="flex-1">
        {children}
      </main>
      <Footer />
      <ScrollToTop />
    </body>
  );
}
