import { Metadata } from "next";
import AdminPanel from "./AdminPanel";
import { Settings, ShieldCheck } from "lucide-react";

export const metadata: Metadata = {
  title: "Panel Administratora - Scamerzy",
  description: "Panel administracyjny do weryfikacji zgłoszeń oszustów.",
};

export default function AdminPage() {
  return (
    <div className="container px-4 md:px-6 py-12">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="space-y-4">
          <div className="inline-flex justify-center items-center mx-auto mb-4">
            <div className="h-12 w-12 bg-red-600 rounded-full flex items-center justify-center">
              <Settings className="h-6 w-6 text-white" />
            </div>
          </div>
          <h1 className="text-3xl font-bold tracking-tighter text-white text-center">Panel Administratora</h1>
          <p className="text-zinc-400 md:text-lg max-w-2xl mx-auto text-center">
            Zarządzaj i weryfikuj zgłoszenia oszustów internetowych.
          </p>
        </div>

        <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-6 shadow-lg">
          <div className="mb-6 pb-6 border-b border-zinc-800 flex items-center gap-3">
            <ShieldCheck className="h-5 w-5 text-red-500" />
            <h2 className="text-xl font-medium text-white">Weryfikacja zgłoszeń</h2>
          </div>

          <AdminPanel />
        </div>
      </div>
    </div>
  );
}
