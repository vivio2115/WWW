"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { Menu, X, Shield, AlertCircle, ArrowRight } from "lucide-react";

export function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const navItems = [
    { name: "Strona główna", href: "/" },
    { name: "Zgłoś scammera", href: "/zglos" },
    { name: "Lista scamerów", href: "/lista-scamerow" },
    { name: "Jak to działa", href: "/jak-to-dziala" },
    { name: "Kontakt", href: "/kontakt" },
  ];

  // Close mobile menu when route changes
  useEffect(() => {
    closeMenu();
  }, [pathname]);

  // Lock scrolling when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        onClick={toggleMenu}
        className="md:hidden text-white hover:bg-zinc-800"
        aria-label="Menu"
      >
        <Menu className="h-6 w-6" />
      </Button>

      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black/80 backdrop-blur-sm z-40 md:hidden transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={closeMenu}
        aria-hidden="true"
      />

      {/* Mobile menu */}
      <div
        className={`fixed top-0 right-0 h-full w-[300px] bg-zinc-950 border-l border-zinc-800 z-50 md:hidden transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
        aria-label="Mobile navigation"
      >
        <div className="flex flex-col h-full">
          <div className="flex justify-between items-center p-4 border-b border-zinc-800">
            <div className="flex items-center gap-2">
              <div className="relative h-7 w-7 bg-red-600 rounded-full overflow-hidden flex items-center justify-center">
                <AlertCircle className="h-4 w-4 text-white" />
              </div>
              <span className="font-bold text-lg text-white">Scamerzy</span>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={closeMenu}
              className="text-white hover:bg-zinc-800"
              aria-label="Zamknij menu"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>

          <nav className="flex-1 overflow-auto py-6 px-2">
            <ul className="space-y-1">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={closeMenu}
                    className={cn(
                      "flex items-center py-3 px-4 rounded-lg w-full text-sm font-medium transition-all duration-200",
                      pathname === item.href
                        ? "bg-zinc-800 text-white"
                        : "text-zinc-400 hover:text-white hover:bg-zinc-900"
                    )}
                  >
                    {pathname === item.href && (
                      <span className="w-1 h-5 bg-red-600 rounded-full mr-3"></span>
                    )}
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="p-4 border-t border-zinc-800">
            <p className="text-zinc-400 text-sm mb-4">
              Zauważyłeś oszustwo? Pomóż innym i zgłoś scammera, aby uchronić innych.
            </p>
            <Button
              asChild
              className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 group"
            >
              <Link href="/zglos" className="flex items-center justify-center gap-2" onClick={closeMenu}>
                <Shield className="h-4 w-4" />
                <span>Zgłoś Scammera</span>
                <ArrowRight className="h-4 w-4 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all duration-300" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
