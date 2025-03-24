import { Metadata } from "next";
import Link from "next/link";
import { Shield, Home, Info, AlertCircle, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Strona Niedostępna | Scamerzy",
  description: "Ta strona jest obecnie niedostępna dla użytkowników.",
};

export default function BlockedPage() {
  return (
    <div className="flex min-h-[90vh] flex-col items-center justify-center px-4 text-center">
      <div className="relative mb-8 p-4 rounded-full bg-red-900/20">
        <Lock className="h-24 w-24 text-red-500" strokeWidth={1.5} />
      </div>
      
      <h1 className="mt-4 text-4xl font-bold tracking-tight text-white sm:text-5xl">
        Treść Niedostępna
      </h1>
      
      <p className="mt-4 text-lg text-zinc-400 max-w-lg">
        Ta strona jest obecnie niedostępna. Dostęp do tej zawartości wymaga specjalnych uprawnień 
        lub został tymczasowo wstrzymany.
      </p>
      
      <div className="mt-8 bg-zinc-900 border border-zinc-800 p-6 rounded-xl max-w-xl">
        <div className="flex items-start gap-3">
          <AlertCircle className="h-6 w-6 text-red-500 flex-shrink-0 mt-1" />
          <div className="text-left">
            <h2 className="text-lg font-semibold text-white mb-2">Możliwe przyczyny niedostępności:</h2>
            <ul className="list-disc pl-5 space-y-2 text-zinc-400">
              <li>Strona wymaga zalogowania lub wyższych uprawnień</li>
              <li>Zawartość jest w trakcie aktualizacji lub konserwacji</li>
              <li>Trwają prace techniczne nad tą sekcją serwisu</li>
              <li>Zawartość została tymczasowo wstrzymana</li>
              <li>Ta funkcjonalność zostanie udostępniona wkrótce</li>
            </ul>
          </div>
        </div>
      </div>
      
      <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
        <Button 
          asChild
          variant="default" 
          className="bg-red-600 hover:bg-red-700 text-white"
        >
          <Link href="/">
            <Home className="mr-2 h-4 w-4" />
            Powrót do strony głównej
          </Link>
        </Button>
        
        <Button 
          asChild
          variant="outline" 
          className="border-zinc-700 text-zinc-400 hover:text-white hover:bg-zinc-800"
        >
          <Link href="/kontakt">
            <Info className="mr-2 h-4 w-4" />
            Kontakt w sprawie dostępu
          </Link>
        </Button>
      </div>
      
      <div className="mt-16 border-t border-zinc-800 pt-8 text-zinc-400">
        <p className="text-sm">
          Potrzebujesz dostępu do tej zawartości?
          <Link href="/kontakt" className="text-red-500 hover:text-red-400 ml-1">
            Skontaktuj się z administracją serwisu
          </Link>.
        </p>
      </div>
    </div>
  );
}