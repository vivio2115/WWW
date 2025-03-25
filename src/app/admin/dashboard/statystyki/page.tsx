import { Metadata } from "next";
import AdminSidebar from "../../components/AdminSidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  BarChart,
  PieChart,
  TrendingUp,
  Users,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Calendar,
  RefreshCw
} from "lucide-react";

export const metadata: Metadata = {
  title: "Statystyki | Panel Administratora",
  description: "Statystyki i analityka systemu Scamers",
};

export default function StatisticsPage() {
  return (
    <div className="container px-4 md:px-6 py-10 max-w-7xl mx-auto">
      <div className="flex flex-col lg:flex-row gap-8">
        <AdminSidebar activeItem="Statystyki" />

        <main className="flex-1 space-y-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-white">Statystyki Systemu</h1>
              <p className="text-zinc-400 mt-1">
                Analityka i statystyki platformy Scamers
              </p>
            </div>
            <div className="flex items-center gap-2 text-zinc-400 text-sm">
              <RefreshCw className="h-4 w-4" />
              <span>Ostatnia aktualizacja: 24.03.2025, 15:45</span>
            </div>
          </div>

          {/* Karty statystyk */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {[
              {
                label: "Zgłoszenia łącznie",
                value: "1,234",
                trend: "+12% vs. zeszły miesiąc",
                trendUp: true,
                icon: <BarChart className="text-blue-500" />
              },
              {
                label: "Zweryfikowane",
                value: "873",
                trend: "+5.3% vs. zeszły miesiąc",
                trendUp: true,
                icon: <CheckCircle className="text-green-500" />
              },
              {
                label: "Odrzucone",
                value: "349",
                trend: "+2.1% vs. zeszły miesiąc",
                trendUp: true,
                icon: <XCircle className="text-red-500" />
              },
              {
                label: "Użytkownicy",
                value: "578",
                trend: "+8.7% vs. zeszły miesiąc",
                trendUp: true,
                icon: <Users className="text-purple-500" />
              },
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
                  <div className="flex items-center text-xs mt-1">
                    <TrendingUp className={`h-3 w-3 mr-1 ${stat.trendUp ? 'text-green-500' : 'text-red-500'}`} />
                    <span className={stat.trendUp ? 'text-green-500' : 'text-red-500'}>{stat.trend}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Wykresy statystyk */}
          <div className="grid gap-6 lg:grid-cols-2">
            {/* Wykres zgłoszeń */}
            <Card className="bg-zinc-900 border-zinc-800">
              <CardHeader className="pb-2">
                <CardTitle className="text-xl text-white flex items-center gap-2">
                  <BarChart className="h-5 w-5 text-blue-500" />
                  Zgłoszenia w czasie
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="p-4 aspect-[4/3] flex items-center justify-center bg-zinc-950 rounded-md">
                  <div className="text-center text-zinc-500">
                    <PieChart className="h-16 w-16 mx-auto mb-4 opacity-50" />
                    <p>Dane wizualizacji wykresu</p>
                    <p className="text-sm mt-2">W rzeczywistej implementacji tutaj byłby interaktywny wykres</p>
                  </div>
                </div>

                <div className="mt-4 flex gap-4 justify-center">
                  {[
                    { label: "Zgłoszone", value: 1234, color: "bg-blue-500" },
                    { label: "Zatwierdzone", value: 873, color: "bg-green-500" },
                    { label: "Odrzucone", value: 349, color: "bg-red-500" },
                    { label: "Oczekujące", value: 12, color: "bg-yellow-500" },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <div className={`w-3 h-3 rounded-full ${item.color}`}></div>
                      <div className="text-xs text-zinc-400">
                        <span className="font-medium">{item.label}:</span> {item.value}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Najczęstsze typy oszustw */}
            <Card className="bg-zinc-900 border-zinc-800">
              <CardHeader className="pb-2">
                <CardTitle className="text-xl text-white flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-amber-500" />
                  Najczęstsze typy oszustw
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="p-4 aspect-[4/3] flex items-center justify-center bg-zinc-950 rounded-md">
                  <div className="text-center text-zinc-500">
                    <PieChart className="h-16 w-16 mx-auto mb-4 opacity-50" />
                    <p>Dane wizualizacji wykresu</p>
                    <p className="text-sm mt-2">W rzeczywistej implementacji tutaj byłby interaktywny wykres</p>
                  </div>
                </div>

                <div className="mt-4 space-y-2">
                  {[
                    { type: "Fałszywe sklepy", percentage: 38, count: 472 },
                    { type: "Fałszywe ogłoszenia", percentage: 27, count: 336 },
                    { type: "Oszustwa inwestycyjne", percentage: 18, count: 218 },
                    { type: "Phishing", percentage: 11, count: 142 },
                    { type: "Inne", percentage: 6, count: 66 },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div className="w-full h-4 bg-zinc-800 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full ${
                            i === 0 ? "bg-red-500" :
                            i === 1 ? "bg-amber-500" :
                            i === 2 ? "bg-blue-500" :
                            i === 3 ? "bg-purple-500" : "bg-zinc-500"
                          }`}
                          style={{ width: `${item.percentage}%` }}
                        ></div>
                      </div>
                      <div className="text-xs text-zinc-400 whitespace-nowrap">
                        <span className="font-medium">{item.type}:</span> {item.percentage}% ({item.count})
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Kalendarz aktywności */}
          <Card className="bg-zinc-900 border-zinc-800">
            <CardHeader className="pb-2">
              <CardTitle className="text-xl text-white flex items-center gap-2">
                <Calendar className="h-5 w-5 text-green-500" />
                Aktywność w ostatnim tygodniu
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="text-zinc-400 text-xs border-b border-zinc-800">
                      <th className="text-left py-3 px-4 font-medium">DATA</th>
                      <th className="text-left py-3 px-4 font-medium">ZGŁOSZENIA</th>
                      <th className="text-left py-3 px-4 font-medium">WERYFIKACJE</th>
                      <th className="text-left py-3 px-4 font-medium">NOWI UŻYTKOWNICY</th>
                      <th className="text-left py-3 px-4 font-medium">BLOKADY</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { date: "24.03.2025 (dziś)", reports: 42, verifications: 38, newUsers: 15, blocks: 2 },
                      { date: "23.03.2025", reports: 37, verifications: 35, newUsers: 12, blocks: 1 },
                      { date: "22.03.2025", reports: 45, verifications: 40, newUsers: 18, blocks: 3 },
                      { date: "21.03.2025", reports: 33, verifications: 30, newUsers: 9, blocks: 0 },
                      { date: "20.03.2025", reports: 41, verifications: 37, newUsers: 14, blocks: 2 },
                      { date: "19.03.2025", reports: 38, verifications: 33, newUsers: 11, blocks: 1 },
                      { date: "18.03.2025", reports: 44, verifications: 39, newUsers: 16, blocks: 2 },
                    ].map((day, index) => (
                      <tr key={index} className="border-b border-zinc-800 hover:bg-zinc-800/50 transition-colors">
                        <td className="py-3 px-4 text-zinc-300 font-medium">{day.date}</td>
                        <td className="py-3 px-4">
                          <Badge className="bg-blue-500/20 text-blue-500">{day.reports}</Badge>
                        </td>
                        <td className="py-3 px-4">
                          <Badge className="bg-green-500/20 text-green-500">{day.verifications}</Badge>
                        </td>
                        <td className="py-3 px-4">
                          <Badge className="bg-purple-500/20 text-purple-500">{day.newUsers}</Badge>
                        </td>
                        <td className="py-3 px-4">
                          <Badge className="bg-red-500/20 text-red-500">{day.blocks}</Badge>
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
