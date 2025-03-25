import { Metadata } from "next";
import AdminSidebar from "../components/AdminSidebar";
import {
  Activity,
  FileText,
  Bell,
  AlertTriangle,
  Search
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import AdminPanel from "../AdminPanel";

export const metadata: Metadata = {
  title: "Dashboard Administratora | Scamers",
  description: "Panel administracyjny do zarządzania systemem LegitCheck.",
};

export default function AdminDashboardPage() {
  return (
    <div className="container px-4 md:px-6 py-10 max-w-7xl mx-auto">
      <div className="flex flex-col lg:flex-row gap-8">
        <AdminSidebar activeItem="Dashboard" />

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
              { label: "Zweryfikowane", value: "873", trend: "+5.3% vs. last month", icon: <Activity className="text-green-500" /> },
              { label: "Do weryfikacji", value: "12", trend: "-3% vs. last month", icon: <AlertTriangle className="text-amber-500" /> },
              { label: "Odrzucone", value: "349", trend: "+2.1% vs. last month", icon: <Bell className="text-red-500" /> },
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
              <AdminPanel defaultTab="pending" />
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
