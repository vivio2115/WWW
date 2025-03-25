import { Metadata } from "next";
import AdminSidebar from "../../components/AdminSidebar";
import AdminPanel from "../../AdminPanel";

export const metadata: Metadata = {
  title: "Weryfikacja Zgłoszeń | Panel Administratora",
  description: "Weryfikacja zgłoszeń oszustów w systemie Scamers",
};

export default function VerificationPage() {
  return (
    <div className="container px-4 md:px-6 py-10 max-w-7xl mx-auto">
      <div className="flex flex-col lg:flex-row gap-8">
        <AdminSidebar activeItem="Weryfikacja" />

        <main className="flex-1 space-y-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-white">Weryfikacja Zgłoszeń</h1>
            <p className="text-zinc-400 mt-1">
              Sprawdź i zweryfikuj oczekujące zgłoszenia oszustw
            </p>
          </div>

          <AdminPanel defaultTab="pending" />

          <div className="text-center text-zinc-500 text-xs py-6">
            © 2025 Scamers Admin Panel | Wersja 1.0.0
          </div>
        </main>
      </div>
    </div>
  );
}
