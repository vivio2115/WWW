import { Metadata } from "next";
import AdminPanel from "../../AdminPanel";

export const metadata: Metadata = {
  title: "Zgłoszenia - Panel Administratora | Scamers",
  description: "Zarządzanie i weryfikacja zgłoszeń oszustów w systemie Scamers.",
};

export default function ReportsPage() {
  return (
    <div className="container px-4 md:px-6 py-10 max-w-7xl mx-auto">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white">Zgłoszenia</h1>
          <p className="text-zinc-400 mt-1">
            Zarządzaj zgłoszeniami oszustw i przeprowadzaj weryfikację.
          </p>
        </div>
        
        <AdminPanel />
      </div>
    </div>
  );
}