import Link from "next/link";
import { AlertTriangle, Home, ArrowLeft, Search } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex min-h-[80vh] flex-col items-center justify-center px-4 text-center">
      <div className="animate-bounce mb-6">
        <div className="relative">
          <AlertTriangle className="h-24 w-24 text-red-500" strokeWidth={1.5} />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-3xl font-bold text-white">
            404
          </div>
        </div>
      </div>

      <h1 className="mt-8 text-4xl font-bold tracking-tight text-white sm:text-5xl">
        Strona nie została znaleziona
      </h1>

      <p className="mt-4 text-lg text-zinc-400 max-w-md">
        Niestety, strona której szukasz nie istnieje lub została usunięta.
        Sprawdź czy adres URL jest poprawny.
      </p>

      <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
        <Button
          asChild
          variant="default"
          className="bg-red-600 hover:bg-red-700 text-white"
        >
          <Link href="/">
            <Home className="mr-2 h-4 w-4" />
            Strona główna
          </Link>
        </Button>

        <Button
          asChild
          variant="outline"
          className="border-zinc-700 text-zinc-400 hover:text-white hover:bg-zinc-800"
        >
          <Link href="javascript:history.back()">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Wróć
          </Link>
        </Button>
      </div>

      <div className="mt-16 border-t border-zinc-800 pt-8 text-zinc-400">
        <p className="text-sm">
          Masz problem z odnalezieniem informacji?
          <Link href="/kontakt" className="text-red-500 hover:text-red-400 ml-1">
            Skontaktuj się z nami
          </Link>
        </p>
      </div>
    </div>
  );
}
