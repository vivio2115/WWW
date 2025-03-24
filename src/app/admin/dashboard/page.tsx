import { Metadata } from "next";
import Link from "next/link";
import {
  Settings,
  ShieldCheck,
  Users,
  Activity,
  FileText,
  Bell,
  AlertTriangle,
  BarChart4,
  LogOut,
  Search
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";

export const metadata: Metadata = {
  title: "Dashboard Administratora | Scamers",
  description: "Panel administracyjny do zarządzania systemem LegitCheck.",
};

export default function AdminDashboardPage() {
  // W rzeczywistym systemie sprawdzalibyśmy uprawnienia użytkownika
  // i pobieralibyśmy dane z API

  return (
    <div className="container px-4 md:px-6 py-10 max-w-7xl mx-auto">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Boczne menu */}
        <aside className="lg:w-64 flex-shrink-0">
          <Card className="bg-zinc-900 border-zinc-800 sticky top-24">
            <CardHeader className="pb-3">
              <CardTitle className="text-xl text-white flex items-center gap-2">
                <Settings className="h-5 w-5 text-red-500" />
                Panel Admina
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <nav className="flex flex-col">
                {[
                  { label: "Dashboard", icon: <Activity className="h-4 w-4" />, active: true },
                  { label: "Zgłoszenia", icon: <Bell className="h-4 w-4" />, count: 12 },
                  { label: "Użytkownicy", icon: <Users className="h-4 w-4" /> },
                  { label: "Weryfikacja", icon: <ShieldCheck className="h-4 w-4" /> },
                  { label: "Raporty", icon: <FileText className="h-4 w-4" /> },
                  { label: "Statystyki", icon: <BarChart4 className="h-4 w-4" /> },
                ].map((item, index) => (
                  <Link
                    key={index}
                    href={`/admin/dashboard${item.active ? '' : `/${item.label.toLowerCase()}`}`}
                    className={`flex items-center justify-between px-4 py-3 text-sm transition-colors hover:bg-zinc-800 ${item.active ? 'bg-zinc-800 border-l-2 border-red-500' : 'text-zinc-400'}`}
                  >
                    <div className="flex items-center gap-3">
                      {item.icon}
                      <span>{item.label}</span>
                    </div>
                    {item.count && (
                      <Badge className="bg-red-500 hover:bg-red-600">
                        {item.count}
                      </Badge>
                    )}
                  </Link>
                ))}

                <div className="px-4 py-6 border-t border-zinc-800">
                  <Link href="/" className="flex items-center gap-2 text-zinc-400 hover:text-zinc-300 text-sm">
                    <LogOut className="h-4 w-4" />
                    <span>Wyloguj się</span>
                  </Link>
                </div>
              </nav>
            </CardContent>
          </Card>
        </aside>

        {/* Główna treść */}
        <main className="flex-1 space-y-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-white">Dashboard</h1>
              <p className="text-zinc-400 mt-1">
                Witaj, Admin! Przegląd systemu na dzień 24.03.2025
              </p>
            </div>
            <div className="relative w-full md:w-64">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-zinc-500" />
              <Input
                placeholder="Szukaj..."
                className="pl-10 bg-zinc-800 border-zinc-700"
              />
            </div>
          </div>

          {/* Karty statystyk */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {[
              { label: "Zgłoszenia łącznie", value: "1,234", trend: "+12% vs. last month", icon: <FileText className="text-green-500" /> },
              { label: "Zweryfikowane", value: "873", trend: "+5.3% vs. last month", icon: <ShieldCheck className="text-green-500" /> },
              { label: "Do weryfikacji", value: "12", trend: "-3% vs. last month", icon: <AlertTriangle className="text-amber-500" /> },
              { label: "Odrzucone", value: "349", trend: "+2.1% vs. last month", icon: <Users className="text-red-500" /> },
            ].map((stat, index) => (
              <Card key={index} className="bg-zinc-900 border-zinc-800 shadow-sm">
                <CardHeader className="pb-2 flex flex-row items-center justify-between">
                  <CardTitle className="text-zinc-400 text-sm font-medium">
                    {stat.label}
                  </CardTitle>
                  <div className="p-1 bg-zinc-800 rounded-md">
                    {stat.icon}
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-white">{stat.value}</div>
                  <p className="text-xs text-zinc-500 mt-1">{stat.trend}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Zgłoszenia oczekujące */}
          <Card className="bg-zinc-900 border-zinc-800">
            <CardHeader className="pb-2">
              <CardTitle className="text-xl text-white flex items-center gap-2">
                <Bell className="h-5 w-5 text-red-500" />
                Oczekujące zgłoszenia
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="text-zinc-400 text-xs border-b border-zinc-800">
                      <th className="text-left py-3 px-4 font-medium">ID</th>
                      <th className="text-left py-3 px-4 font-medium">OSOBA/FIRMA</th>
                      <th className="text-left py-3 px-4 font-medium">DATA</th>
                      <th className="text-left py-3 px-4 font-medium">ZGŁASZAJĄCY</th>
                      <th className="text-left py-3 px-4 font-medium">AKCJE</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { id: "RPT-2023-001", name: "Jan Kowalski", date: "24.03.2025", reporter: "anonymous" },
                      { id: "RPT-2023-002", name: "MegaShop24", date: "23.03.2025", reporter: "jan.nowak@example.com" },
                      { id: "RPT-2023-003", name: "FakeSklep.pl", date: "22.03.2025", reporter: "anonymous" },
                      { id: "RPT-2023-004", name: "Crypto Master Investments", date: "21.03.2025", reporter: "ofiara@example.com" },
                      { id: "RPT-2023-005", name: "Anna Nowak", date: "20.03.2025", reporter: "anonymous" },
                    ].map((report, index) => (
                      <tr key={index} className="border-b border-zinc-800 hover:bg-zinc-800/50 transition-colors">
                        <td className="py-3 px-4 text-zinc-300 text-sm">{report.id}</td>
                        <td className="py-3 px-4 text-white">{report.name}</td>
                        <td className="py-3 px-4 text-zinc-400 text-sm">{report.date}</td>
                        <td className="py-3 px-4 text-zinc-400 text-sm">{report.reporter}</td>
                        <td className="py-3 px-4">
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm" className="h-8 border-zinc-700 text-zinc-400 hover:text-white hover:bg-zinc-700">
                              Sprawdź
                            </Button>
                            <Button size="sm" className="h-8 bg-red-600 hover:bg-red-700 text-white">
                              Zweryfikuj
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="flex justify-center mt-6">
                <Button variant="outline" className="border-zinc-700 text-zinc-400 hover:text-white hover:bg-zinc-700">
                  Pokaż wszystkie zgłoszenia
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Stopka */}
          <div className="text-center text-zinc-500 text-xs py-6">
            © 2025 Scamers Admin Panel | Wersja 1.0.0
          </div>
        </main>
      </div>
    </div>
  );
}
