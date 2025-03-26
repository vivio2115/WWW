import { Metadata } from "next";
import Link from "next/link";
import { Shield, Home, Info, AlertCircle, UserX, Clock, Badge } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Dostęp Zablokowany | Scamerzy",
  description: "Twoje konto zostało tymczasowo zablokowane w systemie Scamerzy.",
};

export default function BannedLayout() {
  return (
    <div className="flex min-h-[90vh] flex-col items-center justify-center px-4 text-center">
      <div className="relative mb-8 p-4 rounded-full bg-red-900/20">
        <UserX className="h-24 w-24 text-red-500" strokeWidth={1.5} />
      </div>
      
      <h1 className="mt-4 text-4xl font-bold tracking-tight text-white sm:text-5xl">
        Konto Zablokowane
      </h1>
      
      <p className="mt-4 text-lg text-zinc-400 max-w-lg">
        Twoje konto zostało tymczasowo zablokowane w systemie. 
        Oznacza to, że nie możesz korzystać z pełnej funkcjonalności serwisu.
      </p>
      
      <Card className="mt-8 bg-zinc-900 border border-zinc-800 p-4 rounded-xl max-w-xl w-full">
        <CardHeader className="pb-2">
          <CardTitle className="text-xl text-white flex items-center gap-2">
            <Shield className="h-5 w-5 text-red-500" />
            Informacje o Blokadzie
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="bg-zinc-800/50 rounded-lg p-4 mb-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-zinc-400">Status:</span>
              <Badge className="bg-red-600 text-white px-3 py-1 rounded-full text-xs font-medium">
                Zablokowany
              </Badge>
            </div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-zinc-400">Data blokady:</span>
              <span className="text-white font-medium">24.03.2025</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-zinc-400">Przewidywane wygaśnięcie:</span>
              <div className="flex items-center text-amber-400">
                <Clock className="h-4 w-4 mr-1" />
                <span className="font-medium">30 dni</span>
              </div>
            </div>
          </div>
          
          <div className="flex items-start gap-3 text-left">
            <AlertCircle className="h-6 w-6 text-red-500 flex-shrink-0 mt-1" />
            <div>
              <h2 className="text-lg font-semibold text-white mb-2">Powód blokady:</h2>
              <p className="text-zinc-400">
                Naruszenie zasad korzystania z serwisu. Wykryliśmy aktywność, która jest niezgodna 
                z naszym regulaminem. W przypadku pytań lub wątpliwości, skontaktuj się z administracją.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card className="mt-6 bg-zinc-900 border border-zinc-800 p-4 rounded-xl max-w-xl w-full">
        <CardHeader className="pb-2">
          <CardTitle className="text-xl text-white flex items-center gap-2">
            <Info className="h-5 w-5 text-blue-500" />
            Co mogę zrobić?
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-4 text-left">
            <li className="flex items-start gap-2">
              <div className="bg-blue-900/30 p-1 rounded-full mt-0.5">
                <Shield className="h-4 w-4 text-blue-500" />
              </div>
              <div>
                <h3 className="font-medium text-white">Złóż odwołanie</h3>
                <p className="text-zinc-400 text-sm">Jeśli uważasz, że blokada jest pomyłką, możesz złożyć odwołanie do administracji.</p>
              </div>
            </li>
            <li className="flex items-start gap-2">
              <div className="bg-blue-900/30 p-1 rounded-full mt-0.5">
                <AlertCircle className="h-4 w-4 text-blue-500" />
              </div>
              <div>
                <h3 className="font-medium text-white">Zapoznaj się z regulaminem</h3>
                <p className="text-zinc-400 text-sm">Przeczytaj regulamin, aby zrozumieć, jakie działania są niedozwolone w serwisie.</p>
              </div>
            </li>
            <li className="flex items-start gap-2">
              <div className="bg-blue-900/30 p-1 rounded-full mt-0.5">
                <Clock className="h-4 w-4 text-blue-500" />
              </div>
              <div>
                <h3 className="font-medium text-white">Poczekaj na wygaśnięcie blokady</h3>
                <p className="text-zinc-400 text-sm">Niektóre blokady są tymczasowe i wygasną automatycznie po określonym czasie.</p>
              </div>
            </li>
          </ul>
        </CardContent>
      </Card>
      
      <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
        <Button 
          asChild
          variant="default" 
          className="bg-red-600 hover:bg-red-700 text-white"
        >
          <Link href="/kontakt">
            <Info className="mr-2 h-4 w-4" />
            Złóż odwołanie
          </Link>
        </Button>
        
        <Button 
          asChild
          variant="outline" 
          className="border-zinc-700 text-zinc-400 hover:text-white hover:bg-zinc-800"
        >
          <Link href="/">
            <Home className="mr-2 h-4 w-4" />
            Powrót do strony głównej
          </Link>
        </Button>
      </div>
      
      <div className="mt-16 border-t border-zinc-800 pt-8 text-zinc-400">
        <p className="text-sm">
          Potrzebujesz pomocy w sprawie blokady?
          <Link href="/kontakt" className="text-red-500 hover:text-red-400 ml-1">
            Skontaktuj się z administracją serwisu
          </Link>.
        </p>
      </div>
    </div>
  );
}