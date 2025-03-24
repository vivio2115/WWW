"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

export function Navigation() {
  const pathname = usePathname();

  const navItems = [
    { name: "Strona główna", href: "/" },
    { name: "Zgłoś oszusta", href: "/zglos" },
    { name: "Lista oszustów", href: "/lista-scamerow" },
    { name: "Status", href: "/status" },
    { name: "API", href: "/api-docs" },
    { name: "Kontakt", href: "/kontakt" },
  ];

  return (
    <nav className="flex items-center space-x-1 lg:space-x-2 mx-auto">
      {navItems.map((item, index) => (
        <motion.div
          key={item.href}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 * index, duration: 0.5 }}
        >
          <Link
            href={item.href}
            className={cn(
              "px-3 py-2 text-sm font-medium rounded-md transition-all duration-300 relative hover:bg-zinc-800",
              pathname === item.href
                ? "text-white"
                : "text-zinc-400 hover:text-white"
            )}
          >
            {item.name}
            {pathname === item.href && (
              <motion.span
                className="absolute bottom-0 left-0 h-[2px] bg-red-600 w-full"
                layoutId="navbar-indicator"
                transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              />
            )}
          </Link>
        </motion.div>
      ))}
    </nav>
  );
}
