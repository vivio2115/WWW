"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertTriangle, Search, Shield, ArrowRight, CheckCircle, AlertCircle } from "lucide-react";
import { useEffect, useState } from "react";

export default function HomePage() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <>
      {/* Hero Section */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-zinc-950 via-zinc-900 to-zinc-950 overflow-hidden">
        <div className="container px-4 md:px-6 relative">
          {/* Animated background elements */}
          <div className="absolute inset-0 overflow-hidden opacity-10 pointer-events-none">
            <div className="absolute top-0 left-10 w-72 h-72 bg-red-500 rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
            <div className="absolute top-0 right-10 w-72 h-72 bg-red-700 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"></div>
            <div className="absolute -bottom-8 left-20 w-72 h-72 bg-red-600 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000"></div>
          </div>

          <div className="flex flex-col items-center space-y-8 text-center relative z-10">
            <div
              className={`space-y-4 transition-all duration-1000 ${isLoaded ? "opacity-100 transform-none" : "opacity-0 translate-y-4"}`}
            >
              <div className="inline-flex mx-auto mb-4">
                <div className="relative h-14 w-14 bg-red-600 rounded-full overflow-hidden flex items-center justify-center">
                  <AlertCircle className="h-8 w-8 text-white" />
                </div>
              </div>
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl text-white leading-tight">
                Chroń siebie i innych przed{" "}
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-red-500 to-red-700">
                  internetowymi oszustami
                </span>
              </h1>
              <p className="mx-auto max-w-[700px] text-zinc-400 md:text-xl">
                Zgłaszaj oszustów, sprawdzaj podejrzane dane i pomagaj budować
                bezpieczniejszą przestrzeń internetową dla wszystkich.
              </p>
            </div>

            <div
              className={`flex flex-col sm:flex-row gap-4 mx-auto transition-all duration-1000 delay-300 ${isLoaded ? "opacity-100 transform-none" : "opacity-0 translate-y-4"}`}
            >
              <Button
                asChild
                size="lg"
                className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 transition-all duration-300 shadow-glow-red hover-lift px-8"
              >
                <Link href="/zglos" className="flex items-center gap-2">
                  <Shield size={18} />
                  Zgłoś oszusta
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-zinc-700 text-white hover:bg-zinc-800 transition-all duration-300 hover-lift"
              >
                <Link href="/lista-scamerow" className="flex items-center gap-2">
                  <Search size={18} />
                  Sprawdź bazę oszustów
                </Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Curvy divider */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-0 transform rotate-180">
          <svg className="relative block h-12 w-full" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" className="fill-zinc-950"></path>
          </svg>
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="py-12 bg-zinc-950 relative">
        <div className="container px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-4">
            <div className="flex items-center gap-3 justify-center">
              <div className="h-12 w-12 rounded-full bg-zinc-900 flex items-center justify-center">
                <Shield className="h-6 w-6 text-red-500" />
              </div>
              <div className="text-left">
                <h3 className="text-white font-medium">Bezpieczna weryfikacja</h3>
                <p className="text-zinc-400 text-sm">Sprawdź dane przed transakcją</p>
              </div>
            </div>
            <div className="flex items-center gap-3 justify-center">
              <div className="h-12 w-12 rounded-full bg-zinc-900 flex items-center justify-center">
                <CheckCircle className="h-6 w-6 text-red-500" />
              </div>
              <div className="text-left">
                <h3 className="text-white font-medium">Zweryfikowane zgłoszenia</h3>
                <p className="text-zinc-400 text-sm">Dane są weryfikowane przez zespół</p>
              </div>
            </div>
            <div className="flex items-center gap-3 justify-center">
              <div className="h-12 w-12 rounded-full bg-zinc-900 flex items-center justify-center">
                <AlertCircle className="h-6 w-6 text-red-500" />
              </div>
              <div className="text-left">
                <h3 className="text-white font-medium">Anonimowe zgłoszenia</h3>
                <p className="text-zinc-400 text-sm">Twoje dane pozostają prywatne</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 md:py-24 bg-zinc-950 relative">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-12">
            <span className="text-red-500 text-sm font-medium tracking-wider uppercase">Nasze funkcje</span>
            <h2 className="text-2xl md:text-3xl font-bold text-white mt-2 mb-4">
              Jak możemy Ci pomóc?
            </h2>
            <p className="text-zinc-400 max-w-2xl mx-auto">
              Nasza platforma oferuje różne narzędzia do ochrony przed internetowymi oszustami
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <Card className="bg-gradient-to-br from-zinc-900 to-zinc-950 border-zinc-800 shadow-xl hover:shadow-zinc-900/50 transition-all duration-300 h-full group overflow-hidden hover-lift">
              <CardHeader className="flex flex-col items-start gap-4 pb-2">
                <div className="p-3 rounded-xl bg-red-900/20 text-red-500 group-hover:bg-red-900/30 transition-colors duration-300">
                  <AlertCircle className="h-8 w-8" />
                </div>
                <div>
                  <CardTitle className="text-white group-hover:text-red-500 transition-colors duration-300">Zgłoś oszusta</CardTitle>
                  <CardDescription className="text-zinc-400">Pomóż chronić innych</CardDescription>
                </div>
              </CardHeader>
              <CardContent className="pt-4">
                <p className="text-sm text-zinc-400">
                  Łatwo i szybko zgłoś dane oszusta - numery telefonów, adresy e-mail,
                  numery kont bankowych czy profile w mediach społecznościowych.
                </p>
                <div className="mt-4">
                  <Link href="/zglos" className="text-red-500 text-sm font-medium inline-flex items-center hover:text-red-400 transition-colors group">
                    Zgłoś teraz
                    <ArrowRight className="ml-1 h-4 w-4 transform group-hover:translate-x-1 transition-transform duration-300" />
                  </Link>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-zinc-900 to-zinc-950 border-zinc-800 shadow-xl hover:shadow-zinc-900/50 transition-all duration-300 h-full group overflow-hidden hover-lift">
              <CardHeader className="flex flex-col items-start gap-4 pb-2">
                <div className="p-3 rounded-xl bg-blue-900/20 text-blue-500 group-hover:bg-blue-900/30 transition-colors duration-300">
                  <Search className="h-8 w-8" />
                </div>
                <div>
                  <CardTitle className="text-white group-hover:text-blue-500 transition-colors duration-300">Sprawdź przed transakcją</CardTitle>
                  <CardDescription className="text-zinc-400">Weryfikuj dane kontrahentów</CardDescription>
                </div>
              </CardHeader>
              <CardContent className="pt-4">
                <p className="text-sm text-zinc-400">
                  Sprawdź czy dane sprzedawcy lub kupującego nie figurują w naszej bazie.
                  Weryfikacja zajmuje kilka sekund, a może ochronić przed stratą.
                </p>
                <div className="mt-4">
                  <Link href="/lista-scamerow" className="text-blue-500 text-sm font-medium inline-flex items-center hover:text-blue-400 transition-colors group">
                    Sprawdź bazę
                    <ArrowRight className="ml-1 h-4 w-4 transform group-hover:translate-x-1 transition-transform duration-300" />
                  </Link>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-zinc-900 to-zinc-950 border-zinc-800 shadow-xl hover:shadow-zinc-900/50 transition-all duration-300 h-full group overflow-hidden hover-lift">
              <CardHeader className="flex flex-col items-start gap-4 pb-2">
                <div className="p-3 rounded-xl bg-amber-900/20 text-amber-500 group-hover:bg-amber-900/30 transition-colors duration-300">
                  <AlertTriangle className="h-8 w-8" />
                </div>
                <div>
                  <CardTitle className="text-white group-hover:text-amber-500 transition-colors duration-300">Poznaj aktualne zagrożenia</CardTitle>
                  <CardDescription className="text-zinc-400">Informacje o najnowszych oszustwach</CardDescription>
                </div>
              </CardHeader>
              <CardContent className="pt-4">
                <p className="text-sm text-zinc-400">
                  Bądź na bieżąco z najnowszymi metodami oszustów.
                  Wiedza to najlepsza ochrona przed cyberprzestępcami.
                </p>
                <div className="mt-4">
                  <Link href="/jak-to-dziala" className="text-amber-500 text-sm font-medium inline-flex items-center hover:text-amber-400 transition-colors group">
                    Dowiedz się więcej
                    <ArrowRight className="ml-1 h-4 w-4 transform group-hover:translate-x-1 transition-transform duration-300" />
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-zinc-950 to-zinc-900 overflow-hidden relative">
        {/* Background decor */}
        <div className="absolute inset-0 overflow-hidden opacity-20 pointer-events-none">
          <div className="absolute -top-24 right-0 w-96 h-96 bg-red-600 rounded-full mix-blend-multiply filter blur-3xl"></div>
          <div className="absolute -bottom-24 left-0 w-96 h-96 bg-red-800 rounded-full mix-blend-multiply filter blur-3xl"></div>
        </div>

        <div className="container px-4 md:px-6 relative z-10">
          <div className="max-w-3xl mx-auto bg-gradient-to-br from-zinc-900 to-zinc-950 border border-zinc-800 rounded-2xl p-8 md:p-12 shadow-2xl">
            <div className="flex flex-col items-center space-y-6 text-center">
              <span className="flex items-center justify-center w-16 h-16 rounded-full bg-red-600/20 text-red-500">
                <Shield className="h-8 w-8" />
              </span>
              <div className="space-y-4 max-w-3xl mx-auto">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl text-white">
                  Razem możemy więcej
                </h2>
                <p className="text-zinc-400 md:text-lg">
                  Pomóż nam budować największą w Polsce bazę danych oszustów.
                  Twoje zgłoszenie może uchronić wiele osób przed stratą.
                </p>
              </div>
              <div className="w-full max-w-md">
                <Button
                  asChild
                  size="lg"
                  className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 transition-all duration-300 shadow-glow-red hover-lift"
                >
                  <Link href="/zglos" className="flex items-center justify-center gap-2">
                    <Shield size={18} />
                    Zgłoś oszusta teraz
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 md:py-24 bg-zinc-950">
        <div className="container px-4 md:px-6">
          <div className="grid gap-8 md:grid-cols-3">
            <div className="text-center p-6 bg-gradient-to-br from-zinc-900 to-zinc-950 border border-zinc-800 rounded-xl hover:shadow-lg transition-all duration-300 hover-lift">
              <h3 className="text-4xl font-bold text-white mb-2 bg-clip-text text-transparent bg-gradient-to-r from-red-500 to-red-600">2,500+</h3>
              <p className="text-zinc-400">Zgłoszonych oszustów</p>
            </div>
            <div className="text-center p-6 bg-gradient-to-br from-zinc-900 to-zinc-950 border border-zinc-800 rounded-xl hover:shadow-lg transition-all duration-300 hover-lift">
              <h3 className="text-4xl font-bold text-white mb-2 bg-clip-text text-transparent bg-gradient-to-r from-red-500 to-red-600">15,000+</h3>
              <p className="text-zinc-400">Uratowanych złotych</p>
            </div>
            <div className="text-center p-6 bg-gradient-to-br from-zinc-900 to-zinc-950 border border-zinc-800 rounded-xl hover:shadow-lg transition-all duration-300 hover-lift">
              <h3 className="text-4xl font-bold text-white mb-2 bg-clip-text text-transparent bg-gradient-to-r from-red-500 to-red-600">500+</h3>
              <p className="text-zinc-400">Sprawdzeń dziennie</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
