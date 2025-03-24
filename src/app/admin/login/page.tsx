import { Metadata } from "next";
import LoginForm from "./LoginForm";
import { Shield, Lock } from "lucide-react";

export const metadata: Metadata = {
  title: "Logowanie do Panelu Administratora | Scamers",
  description: "Bezpieczne logowanie do panelu administracyjnego LegitCheck.",
};

export default function AdminLoginPage() {
  return (
    <div className="flex min-h-[calc(100vh-200px)] items-center justify-center py-12">
      <div className="w-full max-w-md space-y-8 mx-4">
        <div className="text-center space-y-6">
          <div className="mx-auto h-16 w-16 rounded-full bg-red-600/10 p-3 flex items-center justify-center">
            <Shield className="h-10 w-10 text-red-600" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-white">
            Panel Administratora
          </h1>
          <p className="text-sm text-zinc-400">
            Zaloguj się, aby uzyskać dostęp do panelu administracyjnego.
            Tylko autoryzowani użytkownicy mogą zarządzać systemem.
          </p>
        </div>

        <div className="mt-8 bg-zinc-900 border border-zinc-800 rounded-xl shadow-md overflow-hidden">
          <div className="p-6">
            <div className="flex items-center gap-2 mb-6 pb-4 border-b border-zinc-800">
              <Lock className="h-5 w-5 text-red-500" />
              <h2 className="text-xl font-semibold text-white">Logowanie</h2>
            </div>
            <LoginForm />
          </div>
        </div>

        <p className="text-center text-sm text-zinc-500 mt-8">
          W razie problemów z logowaniem skontaktuj się z administratorem systemu:
          <a href="mailto:admin@legitcheck.pl" className="text-red-500 hover:text-red-400 ml-1">
            admin@scamers.xyz
          </a>
        </p>
      </div>
    </div>
  );
}
