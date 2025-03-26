import { Metadata } from "next";
import AdminSidebar from "../../components/AdminSidebar";
import AdminPanel from "../../AdminPanel";

export const metadata: Metadata = {
  title: "Zgłoszenia | Panel Administratora",
  description: "Zarządzanie zgłoszeniami oszustów w systemie Scamers",
};

export default function ReportsPage() {
  return (
    <div className="container px-4 md:px-6 py-10 max-w-7xl mx-auto">
      <div className="flex flex-col lg:flex-row gap-8">
        <AdminSidebar activeItem="Zgłoszenia" />

        <main className="flex-1 space-y-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-white">Zgłoszenia</h1>
            <p className="text-zinc-400 mt-1">
              Przeglądaj i zarządzaj wszystkimi zgłoszeniami w systemie
            </p>
          </div>

          <AdminPanel defaultTab="all" />

          <div className="text-center text-zinc-500 text-xs py-6">
            © 2025 Scamers Admin Panel | Wersja 1.0.0
          </div>
        </main>
      </div>
    </div>
  );
}
