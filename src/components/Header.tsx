"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { MobileNav } from "./MobileNav";
import { Navigation } from "./Navigation";
import { Shield } from "lucide-react";

export function Header() {
  return (
    <header className="border-b border-zinc-800 bg-zinc-950/90 sticky top-0 z-50 backdrop-blur-sm">
      <div className="container flex h-16 items-center px-4 sm:px-8">
        <motion.div
          className="flex gap-2 items-center mr-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="relative h-8 w-8 overflow-hidden flex items-center justify-center bg-red-600 rounded-full">
            <Shield className="h-5 w-5 text-white" />
          </div>
          <Link href="/" className="text-xl font-bold text-white hover:text-red-500 transition-colors duration-300">
            Scamerzy
          </Link>
        </motion.div>
        <div className="hidden md:flex flex-1 justify-center">
          <Navigation />
        </div>
        <motion.div
          className="ml-auto flex items-center space-x-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="hidden md:block">
            <Button
              asChild
              variant="default"
              size="sm"
              className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 transition-all duration-300 shadow-md hover:shadow-lg"
            >
              <Link href="/zglos">Zgłoś Scammera</Link>
            </Button>
          </div>
          <MobileNav />
        </motion.div>
      </div>
    </header>
  );
}
