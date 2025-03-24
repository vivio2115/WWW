import { Metadata } from "next";
import ScammersList from "./ScammersList";
import ScammerSearch from "./ScammerSearch";

export const metadata: Metadata = {
  title: "Lista Scamerów - Scamerzy",
  description: "Sprawdź bazę zgłoszonych oszustów internetowych. Weryfikuj dane przed transakcją, aby uchronić się przed oszustwem.",
};

export default function ScamListPage() {
  return (
    <div className="container px-4 md:px-6 py-12">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold tracking-tighter text-white">Lista zgłoszonych oszustów</h1>
          <p className="text-zinc-400 md:text-lg max-w-[800px] mx-auto">
            Sprawdź czy dane sprzedawcy, kupującego lub partnera biznesowego nie figurują w naszej bazie.
            Weryfikacja zajmuje kilka sekund i może uchronić Cię przed stratą.
          </p>
        </div>

        <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4 text-white">Wyszukaj oszusta</h2>
          <ScammerSearch />
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-6 text-white">Ostatnio zgłoszeni oszuści</h2>
          <ScammersList />
        </div>
      </div>
    </div>
  );
}
