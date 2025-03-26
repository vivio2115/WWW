import { Metadata } from "next";
import AdminSidebar from "../../components/AdminSidebar";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Search, 
  Shield, 
  UserCog, 
  User, 
  RefreshCw, 
  UserX, 
  Filter,
  MoreHorizontal,
  Edit,
  Trash2,
  Lock,
  CheckCircle
} from "lucide-react";
import CreateUserModal from "./CreateUserModal";
import ModalForm from "@/components/ModalForms";

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
    joinDate: "2024-01-10"
  },
  {
    id: "USR004",
    name: "Anna Nowak",
    email: "anna.nowak@example.com",
    role: "moderator",
    status: "active",
    lastLogin: "2025-03-24 09:20",
    joinDate: "2023-11-05"
  },
  {
    id: "USR005",
    name: "Piotr Wiśniewski",
    email: "piotr.wisniewski@example.com",
    role: "viewer",
    status: "inactive",
    lastLogin: "2025-02-10 11:30",
    joinDate: "2023-08-15"
  },
  {
    id: "USR006",
    name: "Magdalena Kaczmarek",
    email: "magdalena.kaczmarek@example.com",
    role: "user",
    status: "banned",
    lastLogin: "2025-01-15 16:45",
    joinDate: "2023-05-22"
  }
];

// Komponent dla statusu użytkownika
function UserStatusBadge({ status }: { status: string }) {
  switch (status) {
    case 'active':
      return (
        <Badge className="bg-green-600 text-white">Aktywny</Badge>
      );
    case 'inactive':
      return (
        <Badge variant="outline" className="border-zinc-500 text-zinc-400">Nieaktywny</Badge>
      );
    case 'banned':
      return (
        <Badge className="bg-red-600 text-white">Zablokowany</Badge>
      );
    default:
      return (
        <Badge variant="outline" className="border-zinc-700 text-zinc-400">Nieznany</Badge>
      );
  }
}

// Komponent dla roli użytkownika
function UserRoleBadge({ role }: { role: string }) {
  switch (role) {
    case 'admin':
      return (
        <Badge variant="outline" className="border-red-500 text-red-500 flex items-center gap-1">
          <Shield className="h-3 w-3" />
          Administrator
        </Badge>
      );
    case 'moderator':
      return (
        <Badge variant="outline" className="border-blue-500 text-blue-500 flex items-center gap-1">
          <UserCog className="h-3 w-3" />
          Moderator
        </Badge>
      );
    case 'viewer':
      return (
        <Badge variant="outline" className="border-purple-500 text-purple-500 flex items-center gap-1">
          <User className="h-3 w-3" />
          Obserwator
        </Badge>
      );
    case 'user':
      return (
        <Badge variant="outline" className="border-zinc-500 text-zinc-400 flex items-center gap-1">
          <User className="h-3 w-3" />
          Użytkownik
        </Badge>
      );
    default:
      return (
        <Badge variant="outline" className="border-zinc-700 text-zinc-400 flex items-center gap-1">
          <User className="h-3 w-3" />
          {role}
        </Badge>
      );
  }
}

export default function UsersPage() {
  return (
    <div className="container px-4 md:px-6 py-10 max-w-7xl mx-auto">
      <div className="flex flex-col lg:flex-row gap-8">
        <AdminSidebar activeItem="Użytkownicy" />

        {/* Główna treść */}
        <main className="flex-1 space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-white">Użytkownicy</h1>
              <p className="text-zinc-400 mt-1">
                Zarządzaj użytkownikami systemu i ich uprawnieniami
              </p>
            </div>
            
            <div className="flex items-center gap-3">
              <CreateUserModal />
              
              <div className="relative w-full md:w-64">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-zinc-500" />
                <Input
                  placeholder="Szukaj użytkowników..."
                  className="pl-10 bg-zinc-800 border-zinc-700"
                />
              </div>
            </div>
          </div>
          
          {/* Karty statystyk */}
          <div className="grid gap-4 md:grid-cols-4">
            <Card className="bg-zinc-900 border-zinc-800">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-zinc-400 text-sm">Wszyscy użytkownicy</p>
                    <h3 className="text-2xl font-bold text-white mt-1">6</h3>
                  </div>
                  <div className="p-2 bg-zinc-800 rounded-md">
                    <User className="text-zinc-400 h-5 w-5" />
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-zinc-900 border-zinc-800">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-zinc-400 text-sm">Administratorzy</p>
                    <h3 className="text-2xl font-bold text-white mt-1">1</h3>
                  </div>
                  <div className="p-2 bg-zinc-800 rounded-md">
                    <Shield className="text-red-500 h-5 w-5" />
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-zinc-900 border-zinc-800">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-zinc-400 text-sm">Aktywni</p>
                    <h3 className="text-2xl font-bold text-white mt-1">4</h3>
                  </div>
                  <div className="p-2 bg-zinc-800 rounded-md">
                    <CheckCircle className="text-green-500 h-5 w-5" />
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-zinc-900 border-zinc-800">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-zinc-400 text-sm">Zablokowani</p>
                    <h3 className="text-2xl font-bold text-white mt-1">1</h3>
                  </div>
                  <div className="p-2 bg-zinc-800 rounded-md">
                    <UserX className="text-red-500 h-5 w-5" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Lista użytkowników */}
          <Card className="bg-zinc-900 border-zinc-800">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-xl text-white">Lista użytkowników</CardTitle>
                <Button variant="outline" className="border-zinc-700 text-zinc-400" size="sm">
                  <Filter className="h-4 w-4 mr-2" />
                  Filtruj
                </Button>
              </div>
              <CardDescription className="text-zinc-400">
                Łącznie: {MOCK_USERS.length} użytkowników w systemie
              </CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="border-b border-zinc-800">
                      <th className="px-4 py-3 text-xs font-medium text-zinc-400">ID</th>
                      <th className="px-4 py-3 text-xs font-medium text-zinc-400">Użytkownik</th>
                      <th className="px-4 py-3 text-xs font-medium text-zinc-400">Rola</th>
                      <th className="px-4 py-3 text-xs font-medium text-zinc-400">Status</th>
                      <th className="px-4 py-3 text-xs font-medium text-zinc-400">Ostatnie logowanie</th>
                      <th className="px-4 py-3 text-xs font-medium text-zinc-400 text-right">Akcje</th>
                    </tr>
                  </thead>
                  <tbody>
                    {MOCK_USERS.map((user) => (
                      <tr key={user.id} className="border-b border-zinc-800 hover:bg-zinc-800/50">
                        <td className="px-4 py-3 text-sm text-zinc-400">{user.id}</td>
                        <td className="px-4 py-3">
                          <div>
                            <div className="font-medium text-white">{user.name}</div>
                            <div className="text-xs text-zinc-500">{user.email}</div>
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <UserRoleBadge role={user.role} />
                        </td>
                        <td className="px-4 py-3">
                          <UserStatusBadge status={user.status} />
                        </td>
                        <td className="px-4 py-3 text-sm text-zinc-400">
                          <div>{user.lastLogin}</div>
                          <div className="text-xs text-zinc-500">Dołączył: {user.joinDate}</div>
                        </td>
                        <td className="px-4 py-3 text-right">
                          <div className="flex items-center justify-end gap-2">
                            {/* Modal edycji użytkownika */}
                            <ModalForm
                              triggerButton={
                                <Button variant="ghost" size="icon" className="h-8 w-8 text-zinc-400">
                                  <Edit className="h-4 w-4" />
                                </Button>
                              }
                              title={`Edytuj użytkownika - ${user.name}`}
                              confirmText="Zapisz zmiany"
                            >
                              <div className="grid gap-4">
                                <div className="grid gap-2">
                                  <label className="text-sm font-medium text-white">
                                    Nazwa użytkownika
                                  </label>
                                  <Input
                                    defaultValue={user.name}
                                    className="bg-zinc-800 border-zinc-700"
                                  />
                                </div>
                                
                                <div className="grid gap-2">
                                  <label className="text-sm font-medium text-white">
                                    Email
                                  </label>
                                  <Input
                                    defaultValue={user.email}
                                    className="bg-zinc-800 border-zinc-700"
                                  />
                                </div>
                                
                                <div className="grid gap-2">
                                  <label className="text-sm font-medium text-white">
                                    Rola
                                  </label>
                                  <select
                                    defaultValue={user.role}
                                    className="rounded-md px-3 py-2 bg-zinc-800 border-zinc-700 text-white"
                                  >
                                    <option value="admin">Administrator</option>
                                    <option value="moderator">Moderator</option>
                                    <option value="viewer">Obserwator</option>
                                    <option value="user">Użytkownik</option>
                                  </select>
                                </div>
                                
                                <div className="grid gap-2">
                                  <label className="text-sm font-medium text-white">
                                    Status
                                  </label>
                                  <select
                                    defaultValue={user.status}
                                    className="rounded-md px-3 py-2 bg-zinc-800 border-zinc-700 text-white"
                                  >
                                    <option value="active">Aktywny</option>
                                    <option value="inactive">Nieaktywny</option>
                                    <option value="banned">Zablokowany</option>
                                  </select>
                                </div>
                              </div>
                            </ModalForm>
                            
                            {/* Modal zmiany hasła */}
                            <ModalForm
                              triggerButton={
                                <Button variant="ghost" size="icon" className="h-8 w-8 text-zinc-400">
                                  <Lock className="h-4 w-4" />
                                </Button>
                              }
                              title="Zmiana hasła użytkownika"
                              description={`Zmień hasło dla konta: ${user.email}`}
                              confirmText="Zmień hasło"
                            >
                              <div className="grid gap-4">
                                <div className="grid gap-2">
                                  <label className="text-sm font-medium text-white">
                                    Nowe hasło
                                  </label>
                                  <Input
                                    type="password"
                                    placeholder="Wprowadź nowe hasło"
                                    className="bg-zinc-800 border-zinc-700"
                                  />
                                </div>
                                
                                <div className="grid gap-2">
                                  <label className="text-sm font-medium text-white">
                                    Powtórz hasło
                                  </label>
                                  <Input
                                    type="password"
                                    placeholder="Powtórz nowe hasło"
                                    className="bg-zinc-800 border-zinc-700"
                                  />
                                </div>
                                
                                <div className="flex items-center gap-2 text-amber-500 bg-amber-900/20 p-2 rounded-md">
                                  <RefreshCw className="h-4 w-4" />
                                  <p className="text-xs">
                                    Użytkownik będzie musiał zmienić hasło przy następnym logowaniu.
                                  </p>
                                </div>
                              </div>
                            </ModalForm>
                            
                            {/* Przycisk usuwania */}
                            <Button variant="ghost" size="icon" className="h-8 w-8 text-red-400 hover:text-red-300 hover:bg-red-900/20">
                              <Trash2 className="h-4 w-4" />
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
          
          {/* Stopka */}
          <div className="text-center text-zinc-500 text-xs py-6">
            © 2025 Scamerzy Admin Panel | Wersja 1.0.0
          </div>
        </main>
      </div>
    </div>
  );
}