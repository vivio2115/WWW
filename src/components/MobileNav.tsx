"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X, Check, Shield, Search, Users, BarChart, Phone, Code } from "lucide-react";
import { cn } from "@/lib/utils";

export function MobileNav() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  const toggleOpen = () => setOpen(!open);
  const closeNav = () => setOpen(false);

  const navItems = [
    { name: "Strona główna", href: "/", icon: <Check className="h-5 w-5" /> },
    { name: "Zgłoś oszusta", href: "/zglos", icon: <Shield className="h-5 w-5" /> },
    { name: "Lista oszustów", href: "/lista-scamerow", icon: <Search className="h-5 w-5" /> },
    { name: "Status", href: "/status", icon: <BarChart className="h-5 w-5" /> },
    { name: "API", href: "/api-docs", icon: <Code className="h-5 w-5" /> },
    { name: "Kontakt", href: "/kontakt", icon: <Phone className="h-5 w-5" /> },
  ];

  return (
    <div className="md:hidden">
      <button
        onClick={toggleOpen}
        className="flex h-10 w-10 items-center justify-center rounded-md border border-zinc-700 bg-zinc-800 text-white"
        aria-label="Toggle Menu"
      >
        {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 top-16 z-50 bg-zinc-950 p-6"
          >
            <div className="flex flex-col space-y-3 mt-4">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={closeNav}
                  className={cn(
                    "flex items-center space-x-3 rounded-md px-4 py-3 transition-all",
                    pathname === item.href
                      ? "bg-zinc-800 text-white"
                      : "text-zinc-400 hover:bg-zinc-900 hover:text-white"
                  )}
                >
                  <span className={pathname === item.href ? "text-red-500" : "text-zinc-400"}>
                    {item.icon}
                  </span>
                  <span>{item.name}</span>
                  {pathname === item.href && (
                    <span className="ml-auto">
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="h-2 w-2 rounded-full bg-red-500"
                      />
                    </span>
                  )}
                </Link>
              ))}
            </div>

            <div className="mt-8 border-t border-zinc-800 pt-8">
              <Link
                href="/zglos"
                onClick={closeNav}
                className="flex w-full items-center justify-center rounded-md bg-gradient-to-r from-red-600 to-red-700 px-4 py-3 font-medium text-white shadow-md transition-all hover:from-red-700 hover:to-red-800"
              >
                <Shield className="mr-2 h-5 w-5" />
                Zgłoś Scammera
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
