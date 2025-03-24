import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ShieldIcon, AlertTriangle, ArrowUpRight, BookOpen, Shield, Scale, Pen, Mail, Users, MonitorCog, ShieldAlert, List, Server } from "lucide-react";
import { CookieManager } from "@/components/CookieConsent";

export function Footer() {
  return (
    <footer className="border-t border-zinc-800 bg-black">
      <div className="container py-12">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
          {/* Logo i opis */}
          <div className="space-y-4 lg:col-span-1">
            <div className="flex items-center space-x-2">
              <div className="relative h-8 w-8 overflow-hidden">
              <div className="relative h-8 w-8 overflow-hidden flex items-center justify-center bg-red-600 rounded-full">
                <Shield className="h-5 w-5 text-white" />
              </div>
              </div>
              <span className="text-xl font-bold text-white">Scamerzy</span>
            </div>
            <p className="text-sm text-zinc-400">
              Naszą misją jest ochrona użytkowników internetu przed oszustami poprzez 
              gromadzenie i weryfikację danych o potencjalnych zagrożeniach.
            </p>
            <div className="mt-4 flex space-x-2">
              <Button 
                variant="outline" 
                size="sm" 
                className="hover-lift text-xs border-zinc-800 hover:border-zinc-700 text-zinc-400 hover:text-white hover:bg-zinc-900"
                asChild
              >
                <Link href="/kontakt" className="flex items-center gap-1 group">
                  <span className="inline-block w-0 group-hover:w-4 transition-all duration-300 overflow-hidden">
                    <Shield className="h-3 w-3" />
                  </span>
                  <span>Zgłoś Problem</span>
                </Link>
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                className="hover-lift text-xs border-zinc-800 hover:border-zinc-700 text-zinc-400 hover:text-white hover:bg-zinc-900"
                asChild
              >
                <Link href="/api-docs" className="flex items-center gap-1 group">
                  <span className="inline-block w-0 group-hover:w-4 transition-all duration-300 overflow-hidden">
                    <ArrowUpRight className="h-3 w-3" />
                  </span>
                  <span>API</span>
                </Link>
              </Button>
            </div>
          </div>

          {/* Nawigacja, Informacje, Dokumenty */}
          <div className="lg:col-span-2 grid grid-cols-2 gap-8 sm:grid-cols-3">
            <div className="space-y-3">
              <p className="text-sm font-semibold uppercase tracking-wider text-zinc-400 border-l-2 border-red-600 pl-3">
                Nawigacja
              </p>
              <ul className="space-y-1.5">
                <li>
                  <Link 
                    href="/" 
                    className="text-sm text-zinc-400 transition-colors flex items-center gap-1 group hover:text-red-500"
                  >
                  <span className="inline-block w-0 group-hover:w-3 transition-all duration-300 overflow-hidden">
                      <Shield className="h-3 w-3" />
                    </span>
                    Strona główna
                  </Link>
                </li>
                <li>
                  <Link 
                    href="/zglos" 
                    className="text-sm text-zinc-400 transition-colors flex items-center gap-1 group hover:text-red-500"
                  >
                  <span className="inline-block w-0 group-hover:w-3 transition-all duration-300 overflow-hidden">
                      <ShieldAlert className="h-3 w-3" />
                    </span>
                    Zgłoś scammera
                  </Link>
                </li>
                <li>
                  <Link 
                    href="/lista-scamerow" 
                    className="text-sm text-zinc-400 transition-colors flex items-center gap-1 group hover:text-red-500"
                  >
                  <span className="inline-block w-0 group-hover:w-3 transition-all duration-300 overflow-hidden">
                      <List className="h-3 w-3" />
                    </span>
                    Lista scamerów
                  </Link>
                </li>
                <li>
                  <Link 
                    href="/status" 
                    className="text-sm text-zinc-400 transition-colors flex items-center gap-1 group hover:text-red-500"
                  >
                  <span className="inline-block w-0 group-hover:w-3 transition-all duration-300 overflow-hidden">
                      <Server className="h-3 w-3" />
                    </span>
                    Status serwerów
                  </Link>
                </li>
              </ul>
            </div>
            <div className="space-y-3">
              <p className="text-sm font-semibold uppercase tracking-wider text-zinc-400 border-l-2 border-red-600 pl-3">
                Informacje
              </p>
              <ul className="space-y-1.5">
                <li>
                  <Link 
                    href="/blocked" 
                    className="text-sm text-zinc-400 transition-colors flex items-center gap-1 group hover:text-red-500"
                  >
                  <span className="inline-block w-0 group-hover:w-3 transition-all duration-300 overflow-hidden">
                      <MonitorCog className="h-3 w-3" />
                    </span>
                    Jak to działa
                  </Link>
                </li>
                <li>
                  <Link 
                    href="/zespol" 
                    className="text-sm text-zinc-400 transition-colors flex items-center gap-1 group hover:text-red-500"
                  >
                  <span className="inline-block w-0 group-hover:w-3 transition-all duration-300 overflow-hidden">
                      <Users className="h-3 w-3" />
                    </span>
                    Nasz zespół
                  </Link>
                </li>
                <li>
                  <Link 
                    href="/kontakt" 
                    className="text-sm text-zinc-400 transition-colors flex items-center gap-1 group hover:text-red-500"
                  >
                  <span className="inline-block w-0 group-hover:w-3 transition-all duration-300 overflow-hidden">
                      <Mail className="h-3 w-3" />
                    </span>
                    Kontakt
                  </Link>
                </li>
                <li>
                  <Link 
                    href="/blocked" 
                    className="text-sm text-zinc-400 transition-colors flex items-center gap-1 group hover:text-red-500"
                  >
                  <span className="inline-block w-0 group-hover:w-3 transition-all duration-300 overflow-hidden">
                      <Pen className="h-3 w-3" />
                    </span>
                    Blog
                  </Link>
                </li>
              </ul>
            </div>
            <div className="space-y-3">
              <p className="text-sm font-semibold uppercase tracking-wider text-zinc-400 border-l-2 border-red-600 pl-3">
                Dokumenty
              </p>
              <ul className="space-y-1.5">
                <li>
                  <Link 
                    href="/polityka-prywatnosci" 
                    className="text-sm text-zinc-400 transition-colors flex items-center gap-1 group hover:text-red-500"
                  >
                    <span className="inline-block w-0 group-hover:w-3 transition-all duration-300 overflow-hidden">
                      <BookOpen className="h-3 w-3" />
                    </span>
                    <span>Polityka prywatności</span>
                  </Link>
                </li>
                <li>
                  <Link
                    href="/warunki-korzystania"
                    className="text-sm text-zinc-400 transition-colors flex items-center gap-1 group hover:text-red-500"
                  >
                    <span className="inline-block w-0 group-hover:w-3 transition-all duration-300 overflow-hidden">
                      <Scale className="h-3 w-3" />
                    </span>
                    <span>Warunki korzystania</span>
                  </Link>
                </li>
              </ul>
              <div className="pt-3">
                <div className="relative overflow-hidden rounded-lg border border-red-800 bg-red-950/30 p-2">
                  <div className="absolute inset-0 bg-gradient-to-br from-red-900/20 to-red-700/10"></div>
                  <div className="relative flex items-start space-x-2">
                    <AlertTriangle className="h-4 w-4 text-red-500 flex-shrink-0 mt-0.5" />
                    <p className="text-xs text-zinc-400">
                      <span className="font-semibold text-red-400">Uwaga: </span>
                      Oszuści mogą podszywać się pod naszą stronę. Sprawdź zawsze adres URL.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Newsletter */}
          <div className="space-y-4 lg:col-span-1">
            <p className="text-sm font-semibold uppercase tracking-wider text-zinc-400 border-l-2 border-red-600 pl-3">
              Bądź na bieżąco
            </p>
            <p className="text-sm text-zinc-400">
              Zapisz się, aby otrzymywać najnowsze informacje o zagrożeniach 
              internetowych i aktualizacjach naszego serwisu.
            </p>
            <form className="mt-2 flex flex-col space-y-2 sm:flex-row sm:space-x-2 sm:space-y-0">
              <input
                type="email"
                placeholder="Twój adres e-mail"
                className="rounded-md border border-zinc-800 bg-zinc-950 px-3 py-2 text-sm focus:border-red-600 focus:outline-none focus:ring-1 focus:ring-red-600"
                required
              />
              <Button 
                type="submit" 
                className="bg-red-700 hover:bg-red-800 text-white transition-colors"
                size="sm"
              >
                Zapisz się
              </Button>
            </form>
          </div>
        </div>

        {/* Dolna część stopki */}
        <div className="mt-8 border-t border-zinc-800 pt-6">
          <div className="flex flex-col items-center justify-between sm:flex-row">
            <p className="text-xs text-zinc-500">
              &copy; {new Date().getFullYear()} Scamerzy. Wszystkie prawa zastrzeżone.
            </p>
            <div className="mt-3 flex items-center space-x-4 sm:mt-0">
              <Link 
                href="/polityka-prywatnosci" 
                className="text-xs text-zinc-500 hover:text-zinc-400 transition-colors"
              >
                Polityka Prywatności
              </Link>
              <Link 
                href="/warunki-korzystania" 
                className="text-xs text-zinc-500 hover:text-zinc-400 transition-colors"
              >
                Warunki Korzystania
              </Link>
              <CookieManager />
              <span className="text-xs text-zinc-500">v1.2.5</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}