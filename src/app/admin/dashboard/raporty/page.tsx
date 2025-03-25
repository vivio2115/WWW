import { Metadata } from "next";
import AdminSidebar from "../../components/AdminSidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertTriangle, AlertOctagon, Ban, ShieldX } from "lucide-react";

export const metadata: Metadata = {
  title: "Raporty | Panel Administratora",
  description: "Raporty i blokady systemu Scamers",
};

export default function ReportsPage() {
  return (
    <div className="container px-4 md:px-6 py-10 max-w-7xl mx-auto">
      <div className="flex flex-col lg:flex-row gap-8">
        <AdminSidebar activeItem="Raporty" />

        <main className="flex-1 space-y-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-white">Raporty i Blokady</h1>
            <p className="text-zinc-400 mt-1">
              Zarządzaj zablokowanymi IP i zgłoszeniami abuse
            </p>
          </div>

          {/* Komunikat o zablokowanym dostępie */}
          <Card className="bg-zinc-900 border-zinc-800">
            <CardHeader className="pb-2">
              <CardTitle className="text-xl text-white flex items-center gap-2">
                <Ban className="h-5 w-5 text-red-500" />
                Komunikat dla zablokowanych użytkowników
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-red-950/30 border border-red-900/50 rounded-lg p-8 text-center space-y-6">
                <div className="flex justify-center">
                  <ShieldX className="h-12 w-12 text-red-500" />
                </div>
                <h2 className="text-2xl font-bold text-white">Dostęp Zablokowany</h2>
                <div className="max-w-lg mx-auto space-y-4 text-zinc-300">
                  <p>
                    Twój dostęp do platformy Scamers został ograniczony z powodu podejrzanej aktywności.
                  </p>
                  <p>
                    Jeśli uważasz, że to pomyłka, skontaktuj się z naszym zespołem wsparcia pod adresem{" "}
                    <a href="mailto:support@scamers.xyz" className="text-red-400 hover:text-red-300 underline">
                      support@scamers.xyz
                    </a>
                  </p>
                </div>
                <div className="pt-4">
                  <p className="text-zinc-500 text-sm">ID Blokady: #BL-2023-0542 | IP: 198.51.100.XXX</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Lista blokad */}
          <Card className="bg-zinc-900 border-zinc-800">
            <CardHeader className="pb-2">
              <CardTitle className="text-xl text-white flex items-center gap-2">
                <AlertOctagon className="h-5 w-5 text-red-500" />
                Aktywne blokady
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="text-zinc-400 text-xs border-b border-zinc-800">
                      <th className="text-left py-3 px-4 font-medium">ID BLOKADY</th>
                      <th className="text-left py-3 px-4 font-medium">IP</th>
                      <th className="text-left py-3 px-4 font-medium">POWÓD</th>
                      <th className="text-left py-3 px-4 font-medium">DATA</th>
                      <th className="text-left py-3 px-4 font-medium">AKCJE</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { id: "BL-2023-0542", ip: "198.51.100.XXX", reason: "Wielokrotne próby ataku", date: "2025-03-20 14:30" },
                      { id: "BL-2023-0541", ip: "203.0.113.XXX", reason: "Spam zgłoszeń", date: "2025-03-15 10:15" },
                      { id: "BL-2023-0540", ip: "192.0.2.XXX", reason: "Próba włamania", date: "2025-03-10 08:45" },
                    ].map((block, index) => (
                      <tr key={index} className="border-b border-zinc-800 hover:bg-zinc-800/50 transition-colors">
                        <td className="py-3 px-4 text-zinc-300 text-sm">{block.id}</td>
                        <td className="py-3 px-4 text-white">{block.ip}</td>
                        <td className="py-3 px-4 text-zinc-400">{block.reason}</td>
                        <td className="py-3 px-4 text-zinc-400 text-sm">{block.date}</td>
                        <td className="py-3 px-4">
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm" className="h-8 border-zinc-700 text-zinc-400 hover:text-white hover:bg-zinc-700">
                              Szczegóły
                            </Button>
                            <Button size="sm" className="h-8 bg-green-600 hover:bg-green-700 text-white">
                              Odblokuj
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          {/* Zgłoszenia abuse */}
          <Card className="bg-zinc-900 border-zinc-800">
            <CardHeader className="pb-2">
              <CardTitle className="text-xl text-white flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-amber-500" />
                Raporty bezpieczeństwa
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="text-zinc-400 text-xs border-b border-zinc-800">
                      <th className="text-left py-3 px-4 font-medium">ID</th>
                      <th className="text-left py-3 px-4 font-medium">TYP</th>
                      <th className="text-left py-3 px-4 font-medium">OPIS</th>
                      <th className="text-left py-3 px-4 font-medium">DATA</th>
                      <th className="text-left py-3 px-4 font-medium">STATUS</th>
                      <th className="text-left py-3 px-4 font-medium">AKCJE</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { id: "SEC-2023-0123", type: "Phishing", description: "Próba wyłudzenia danych logowania", date: "2025-03-22 09:30", status: "Nowe" },
                      { id: "SEC-2023-0122", type: "DDoS", description: "Atak na serwer", date: "2025-03-18 16:45", status: "W trakcie" },
                      { id: "SEC-2023-0121", type: "Spam", description: "Wysyłanie masowych zapytań do API", date: "2025-03-15 11:20", status: "Zakończone" },
                    ].map((report, index) => (
                      <tr key={index} className="border-b border-zinc-800 hover:bg-zinc-800/50 transition-colors">
                        <td className="py-3 px-4 text-zinc-300 text-sm">{report.id}</td>
                        <td className="py-3 px-4 text-white">{report.type}</td>
                        <td className="py-3 px-4 text-zinc-400">{report.description}</td>
                        <td className="py-3 px-4 text-zinc-400 text-sm">{report.date}</td>
                        <td className="py-3 px-4">
                          <span className={`inline-block px-2 py-1 rounded-full text-xs ${
                            report.status === "Nowe"
                              ? "bg-red-500/20 text-red-500"
                              : report.status === "W trakcie"
                                ? "bg-amber-500/20 text-amber-500"
                                : "bg-green-500/20 text-green-500"
                          }`}>
                            {report.status}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <Button variant="outline" size="sm" className="h-8 border-zinc-700 text-zinc-400 hover:text-white hover:bg-zinc-700">
                            Szczegóły
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          <div className="text-center text-zinc-500 text-xs py-6">
            © 2025 Scamers Admin Panel | Wersja 1.0.0
          </div>
        </main>
      </div>
    </div>
  );
}
