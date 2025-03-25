import { Metadata } from "next";
import AdminSidebar from "../../components/AdminSidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, Shield, UserCog, User, RefreshCw, UserX } from "lucide-react";

export const metadata: Metadata = {
  title: "Użytkownicy | Panel Administratora",
  description: "Zarządzanie użytkownikami systemu Scamers",
};

// Przykładowi użytkownicy dla prezentacji
const MOCK_USERS = [
  {
    id: "USR001",
    name: "Admin Admin",
    email: "admin@scamers.xyz",
    role: "admin",
    status: "active",
    lastLogin: "2025-03-24 14:30",
    joinDate: "2023-01-15"
  },
  {
    id: "USR002",
    name: "Moderator Testowy",
    email: "moderator@scamers.xyz",
    role: "moderator",
    status: "active",
    lastLogin: "2025-03-23 10:15",
    joinDate: "2023-02-20"
  },
  {
    id: "USR003",
    name: "Jan Kowalski",
    email: "jan.kowalski@example.com",
    role: "user",
    status: "active",
    lastLogin: "2025-03-22 08:45",
    joinDate: "2023-03-05"
  },
  {
    id: "USR004",
    name: "Anna Nowak",
    email: "anna.nowak@example.com",
    role: "user",
    status: "inactive",
    lastLogin: "2025-02-15 16:20",
    joinDate: "2023-04-10"
  },
  {
    id: "USR005",
    name: "Piotr Wiśniewski",
    email: "p.wisniewski@example.com",
    role: "user",
    status: "blocked",
    lastLogin: "2025-01-10 11:40",
    joinDate: "2023-05-22"
  }
];

// Komponent do strony użytkowników
export default function UsersPage() {
  return (
    <div className="container px-4 md:px-6 py-10 max-w-7xl mx-auto">
      <div className="flex flex-col lg:flex-row gap-8">
        <AdminSidebar activeItem="Użytkownicy" />

        <main className="flex-1 space-y-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-white">Użytkownicy</h1>
            <p className="text-zinc-400 mt-1">
              Zarządzaj użytkownikami platformy Scamers
            </p>
          </div>

          {/* Wyszukiwarka i filtry */}
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="relative w-full md:w-1/3">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-zinc-500" />
              <Input
                placeholder="Szukaj użytkowników..."
                className="pl-10 bg-zinc-800 border-zinc-700 focus:border-red-500 focus:ring-red-500"
              />
            </div>
            <div className="flex gap-2 w-full md:w-auto">
              <Button variant="outline" size="sm" className="text-zinc-400 border-zinc-700">
                Wszystkie
              </Button>
              <Button variant="outline" size="sm" className="text-zinc-400 border-zinc-700">
                Administratorzy
              </Button>
              <Button variant="outline" size="sm" className="text-zinc-400 border-zinc-700">
                Użytkownicy
              </Button>
            </div>
          </div>

          {/* Lista użytkowników */}
          <Card className="bg-zinc-900 border-zinc-800">
            <CardHeader className="pb-2">
              <CardTitle className="text-xl text-white flex items-center gap-2">
                <User className="h-5 w-5 text-red-500" />
                Lista użytkowników
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="text-zinc-400 text-xs border-b border-zinc-800">
                      <th className="text-left py-3 px-4 font-medium">ID</th>
                      <th className="text-left py-3 px-4 font-medium">IMIĘ I NAZWISKO</th>
                      <th className="text-left py-3 px-4 font-medium">EMAIL</th>
                      <th className="text-left py-3 px-4 font-medium">ROLA</th>
                      <th className="text-left py-3 px-4 font-medium">STATUS</th>
                      <th className="text-left py-3 px-4 font-medium">OSTATNIE LOGOWANIE</th>
                      <th className="text-left py-3 px-4 font-medium">AKCJE</th>
                    </tr>
                  </thead>
                  <tbody>
                    {MOCK_USERS.map((user) => (
                      <tr key={user.id} className="border-b border-zinc-800 hover:bg-zinc-800/50 transition-colors">
                        <td className="py-3 px-4 text-zinc-300 text-sm">{user.id}</td>
                        <td className="py-3 px-4 text-white">{user.name}</td>
                        <td className="py-3 px-4 text-zinc-400 text-sm">{user.email}</td>
                        <td className="py-3 px-4">
                          {user.role === "admin" ? (
                            <Badge className="bg-red-500 hover:bg-red-600">
                              <Shield className="h-3 w-3 mr-1" /> Admin
                            </Badge>
                          ) : user.role === "moderator" ? (
                            <Badge className="bg-blue-500 hover:bg-blue-600">
                              <UserCog className="h-3 w-3 mr-1" /> Moderator
                            </Badge>
                          ) : (
                            <Badge className="bg-zinc-500 hover:bg-zinc-600">
                              <User className="h-3 w-3 mr-1" /> Użytkownik
                            </Badge>
                          )}
                        </td>
                        <td className="py-3 px-4">
                          {user.status === "active" ? (
                            <Badge className="bg-green-500/20 text-green-500">
                              Aktywny
                            </Badge>
                          ) : user.status === "inactive" ? (
                            <Badge className="bg-yellow-500/20 text-yellow-500">
                              Nieaktywny
                            </Badge>
                          ) : (
                            <Badge className="bg-red-500/20 text-red-500">
                              Zablokowany
                            </Badge>
                          )}
                        </td>
                        <td className="py-3 px-4 text-zinc-400 text-sm">{user.lastLogin}</td>
                        <td className="py-3 px-4">
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm" className="h-8 border-zinc-700 text-zinc-400 hover:text-white hover:bg-zinc-700">
                              <RefreshCw className="h-3 w-3 mr-1" /> Resetuj hasło
                            </Button>
                            {user.status !== "blocked" ? (
                              <Button size="sm" className="h-8 bg-red-600 hover:bg-red-700 text-white">
                                <UserX className="h-3 w-3 mr-1" /> Zablokuj
                              </Button>
                            ) : (
                              <Button size="sm" className="h-8 bg-green-600 hover:bg-green-700 text-white">
                                <User className="h-3 w-3 mr-1" /> Odblokuj
                              </Button>
                            )}
                          </div>
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
