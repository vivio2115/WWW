"use client";

import Link from "next/link";
import Image from "next/image";
import { Shield, ExternalLink, Settings } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-zinc-800 py-12 mt-auto bg-zinc-950">
      <div className="container px-4 sm:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex gap-2 items-center mb-4">
              <div className="relative h-6 w-6 overflow-hidden flex items-center justify-center">
                <Image
                  src="/images/scamerzy-logo.png"
                  alt="Scamerzy Logo"
                  width={24}
                  height={24}
                  className="object-contain"
                />
              </div>
              <span className="text-lg font-bold text-white">Scamerzy</span>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Platforma do zgłaszania i weryfikacji oszustów internetowych.
              Pomagamy chronić innych przed oszustwami i tworzymy bezpieczniejszą przestrzeń online.
            </p>
          </div>

          <div>
            <h3 className="font-medium mb-4 text-white border-l-2 border-red-600 pl-3">Przydatne linki</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/api-docs" className="text-muted-foreground hover:text-red-500 transition-colors flex items-center gap-1 group">
                  <span className="inline-block w-0 group-hover:w-2 transition-all duration-300 overflow-hidden">
                    <Shield className="h-3 w-3 text-red-500" />
                  </span>
                  <span>Użyj naszego API</span>
                </Link>
              </li>
              <li>
                <Link href="/kontakt" className="text-muted-foreground hover:text-red-500 transition-colors flex items-center gap-1 group">
                  <span className="inline-block w-0 group-hover:w-2 transition-all duration-300 overflow-hidden">
                    <Shield className="h-3 w-3 text-red-500" />
                  </span>
                  <span>Kontakt</span>
                </Link>
              </li>
              <li>
                <Link href="/polityka-prywatnosci" className="text-muted-foreground hover:text-red-500 transition-colors flex items-center gap-1 group">
                  <span className="inline-block w-0 group-hover:w-2 transition-all duration-300 overflow-hidden">
                    <Shield className="h-3 w-3 text-red-500" />
                  </span>
                  <span>Polityka prywatności</span>
                </Link>
              </li>
              <li>
                <Link href="/admin" className="text-muted-foreground hover:text-red-500 transition-colors flex items-center gap-1 group">
                  <span className="inline-block w-0 group-hover:w-2 transition-all duration-300 overflow-hidden">
                    <Settings className="h-3 w-3 text-red-500" />
                  </span>
                  <span>Panel Administracyjny</span>
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-medium mb-4 text-white border-l-2 border-red-600 pl-3">Zgłoś oszustwo</h3>
            <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
              Padłeś ofiarą oszustwa? Pomóż innym uniknąć tego samego losu.
              Twoje zgłoszenie może ochronić wiele osób.
            </p>
            <Link
              href="/zglos"
              className="text-sm font-medium text-red-500 inline-flex items-center hover:text-red-400 transition-colors group"
            >
              Zgłoś scammera
              <span className="ml-1 transform group-hover:translate-x-1 transition-transform duration-300">
                <ExternalLink className="h-3 w-3" />
              </span>
            </Link>
          </div>
        </div>

        <div className="border-t border-zinc-800 mt-10 pt-8 text-center text-xs text-zinc-500">
          <p className="mb-2">© {currentYear} Scamerzy. Wszystkie prawa zastrzeżone.</p>
          <p>
            Korzystając z tej strony, zgadzasz się z naszą
            <Link href="/polityka-prywatnosci" className="text-zinc-400 hover:text-red-500 transition-colors mx-1">
              Polityką Prywatności
            </Link>
            i
            <Link href="/warunki-korzystania" className="text-zinc-400 hover:text-red-500 transition-colors ml-1">
              Warunkami Korzystania
            </Link>.
          </p>
        </div>
      </div>
    </footer>
  );
}
