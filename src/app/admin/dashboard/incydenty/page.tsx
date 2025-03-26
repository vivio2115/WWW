import { Metadata } from "next";
import AdminSidebar from "../../components/AdminSidebar";
import { AlertTriangle, Plus, Search, Filter, ChevronDown, Server, Clock, Edit, Trash2 } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const metadata: Metadata = {
  title: "Zarządzanie Incydentami | Panel Administratora Scamerzy",
  description: "Panel zarządzania incydentami i problemami technicznymi systemu.",
};

// Przykładowe dane incydentów
const incidents = [
  {
    id: "INC-2025-03-24-001",
    title: "Problemy z dostępnością API",
    status: "resolved",
    severity: "critical",
    startDate: "24.03.2025 08:15",
    endDate: "24.03.2025 10:30",
    affectedServices: ["API", "Weryfikacja", "System zgłoszeń"],
    description: "Występowały problemy z dostępnością API, co spowodowało opóźnienia w weryfikacji i przetwarzaniu zgłoszeń.",
    updates: 3,
    createdBy: "admin"
  },
  {
    id: "INC-2025-03-20-002",
    title: "Opóźnienia w przetwarzaniu zgłoszeń",
    status: "resolved",
    severity: "moderate",
    startDate: "20.03.2025 14:30",
    endDate: "20.03.2025 16:45",
    affectedServices: ["System zgłoszeń", "Panel administratora"],
    description: "Wystąpiły opóźnienia w przetwarzaniu nowych zgłoszeń scamerów.",
    updates: 3,
    createdBy: "moderator"
  },
  {
    id: "INC-2025-03-01-005",
    title: "Planowane prace konserwacyjne",
    status: "planned",
    severity: "low",
    startDate: "01.04.2025 22:00",
    endDate: "02.04.2025 02:00",
    affectedServices: ["Wszystkie usługi"],
    description: "Planowane prace konserwacyjne związane z aktualizacją infrastruktury.",
    updates: 1,
    createdBy: "admin"
  },
  {
    id: "INC-2025-03-28-006",
    title: "Problemy z wysyłką e-maili",
    status: "ongoing",
    severity: "high",
    startDate: "28.03.2025 09:45",
    endDate: "-",
    affectedServices: ["System powiadomień", "Rejestracja"],
    description: "Występują problemy z wysyłaniem wiadomości e-mail do użytkowników.",
    updates: 2,
    createdBy: "moderator"
  }
];

// Komponent pomocniczy dla statusu incydentu
function StatusBadge({ status }: { status: string }) {
  switch (status) {
    case 'ongoing':
      return (
        <Badge className="bg-amber-600 text-white">Trwający</Badge>
      );
    case 'resolved':
      return (
        <Badge className="bg-green-600 text-white">Rozwiązany</Badge>
      );
    case 'planned':
      return (
        <Badge className="bg-purple-600 text-white">Planowany</Badge>
      );
    default:
      return (
        <Badge className="bg-zinc-600 text-white">Nieznany</Badge>
      );
  }
}

// Komponent pomocniczy dla poziomu krytyczności
function SeverityBadge({ severity }: { severity: string }) {
  switch (severity) {
    case 'critical':
      return (
        <Badge variant="outline" className="border-red-500 text-red-500">Krytyczny</Badge>
      );
    case 'high':
      return (
        <Badge variant="outline" className="border-orange-500 text-orange-500">Wysoki</Badge>
      );
    case 'moderate':
      return (
        <Badge variant="outline" className="border-amber-500 text-amber-500">Umiarkowany</Badge>
      );
    case 'low':
      return (
        <Badge variant="outline" className="border-blue-500 text-blue-500">Niski</Badge>
      );
    default:
      return (
        <Badge variant="outline" className="border-zinc-500 text-zinc-500">Nieznany</Badge>
      );
  }
}

export default function IncidentsPage() {
  return (
    <div className="container px-4 md:px-6 py-10 max-w-7xl mx-auto">
      <div className="flex flex-col lg:flex-row gap-8">
        <AdminSidebar activeItem="Incydenty" />

        {/* Główna treść */}
        <main className="flex-1 space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-white">Zarządzanie Incydentami</h1>
              <p className="text-zinc-400 mt-1">
                Zarządzaj incydentami, aktualizacjami i problemami technicznymi systemu
              </p>
            </div>
            
            <div className="flex items-center gap-3">
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="bg-red-600 hover:bg-red-700">
                    <Plus className="h-4 w-4 mr-2" />
                    Nowy incydent
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[550px] bg-zinc-900 border-zinc-800">
                  <DialogHeader>
                    <DialogTitle className="text-xl text-white">Dodaj nowy incydent</DialogTitle>
                    <DialogDescription className="text-zinc-400">
                      Wprowadź informacje o nowym incydencie lub problemie technicznym.
                    </DialogDescription>
                  </DialogHeader>
                  
                  <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                      <label htmlFor="title" className="text-sm font-medium text-white">
                        Tytuł incydentu
                      </label>
                      <Input
                        id="title"
                        placeholder="Np. Problemy z dostępnością API"
                        className="bg-zinc-800 border-zinc-700"
                      />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="grid gap-2">
                        <label htmlFor="severity" className="text-sm font-medium text-white">
                          Krytyczność
                        </label>
                        <select 
                          id="severity" 
                          className="rounded-md px-3 py-2 bg-zinc-800 border-zinc-700 text-white"
                        >
                          <option value="low">Niska</option>
                          <option value="moderate">Umiarkowana</option>
                          <option value="high">Wysoka</option>
                          <option value="critical">Krytyczna</option>
                        </select>
                      </div>
                      
                      <div className="grid gap-2">
                        <label htmlFor="status" className="text-sm font-medium text-white">
                          Status
                        </label>
                        <select 
                          id="status" 
                          className="rounded-md px-3 py-2 bg-zinc-800 border-zinc-700 text-white"
                        >
                          <option value="planned">Planowany</option>
                          <option value="ongoing">Trwający</option>
                          <option value="resolved">Rozwiązany</option>
                        </select>
                      </div>
                    </div>
                    
                    <div className="grid gap-2">
                      <label htmlFor="description" className="text-sm font-medium text-white">
                        Opis incydentu
                      </label>
                      <textarea
                        id="description"
                        rows={3}
                        placeholder="Szczegółowy opis incydentu..."
                        className="rounded-md px-3 py-2 bg-zinc-800 border-zinc-700 text-white resize-none"
                      />
                    </div>
                    
                    <div className="grid gap-2">
                      <label htmlFor="affected" className="text-sm font-medium text-white">
                        Dotknięte usługi
                      </label>
                      <Input
                        id="affected"
                        placeholder="Np. API, System weryfikacji, Panel admin"
                        className="bg-zinc-800 border-zinc-700"
                      />
                      <p className="text-xs text-zinc-500">Oddziel usługi przecinkami</p>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="grid gap-2">
                        <label htmlFor="startDate" className="text-sm font-medium text-white">
                          Data rozpoczęcia
                        </label>
                        <Input
                          id="startDate"
                          type="datetime-local"
                          className="bg-zinc-800 border-zinc-700"
                        />
                      </div>
                      
                      <div className="grid gap-2">
                        <label htmlFor="endDate" className="text-sm font-medium text-white">
                          Data zakończenia
                        </label>
                        <Input
                          id="endDate"
                          type="datetime-local"
                          className="bg-zinc-800 border-zinc-700"
                        />
                        <p className="text-xs text-zinc-500">Opcjonalne dla trwających incydentów</p>
                      </div>
                    </div>
                  </div>
                  
                  <DialogFooter>
                    <Button className="bg-zinc-800 hover:bg-zinc-700 text-zinc-300">
                      Anuluj
                    </Button>
                    <Button className="bg-red-600 hover:bg-red-700">
                      Dodaj incydent
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
              
              <div className="relative w-full md:w-64">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-zinc-500" />
                <Input
                  placeholder="Szukaj incydentów..."
                  className="pl-10 bg-zinc-800 border-zinc-700"
                />
              </div>
            </div>
          </div>
          
          {/* Filtry i zakładki */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <Tabs defaultValue="all" className="w-full">
              <TabsList className="bg-zinc-800 border border-zinc-700">
                <TabsTrigger value="all" className="data-[state=active]:bg-zinc-700">Wszystkie</TabsTrigger>
                <TabsTrigger value="ongoing" className="data-[state=active]:bg-zinc-700">Trwające</TabsTrigger>
                <TabsTrigger value="planned" className="data-[state=active]:bg-zinc-700">Planowane</TabsTrigger>
                <TabsTrigger value="resolved" className="data-[state=active]:bg-zinc-700">Rozwiązane</TabsTrigger>
              </TabsList>
              
              <div className="mt-4 flex items-center justify-between">
                <div className="text-sm text-zinc-400">
                  Wyświetlanie <span className="font-medium text-white">{incidents.length}</span> incydentów
                </div>
                
                <Button variant="outline" className="border-zinc-700 text-zinc-400">
                  <Filter className="h-4 w-4 mr-2" />
                  Filtry
                  <ChevronDown className="h-3 w-3 ml-2" />
                </Button>
              </div>
              
              <TabsContent value="all" className="mt-4">
                <Card className="bg-zinc-900 border-zinc-800">
                  <CardContent className="p-0">
                    <div className="overflow-x-auto">
                      <table className="w-full text-left">
                        <thead>
                          <tr className="border-b border-zinc-800">
                            <th className="px-4 py-3 text-xs font-medium text-zinc-400">ID</th>
                            <th className="px-4 py-3 text-xs font-medium text-zinc-400">Tytuł</th>
                            <th className="px-4 py-3 text-xs font-medium text-zinc-400">Status</th>
                            <th className="px-4 py-3 text-xs font-medium text-zinc-400">Krytyczność</th>
                            <th className="px-4 py-3 text-xs font-medium text-zinc-400">Data</th>
                            <th className="px-4 py-3 text-xs font-medium text-zinc-400 text-right">Akcje</th>
                          </tr>
                        </thead>
                        <tbody>
                          {incidents.map((incident) => (
                            <tr key={incident.id} className="border-b border-zinc-800 hover:bg-zinc-800/50">
                              <td className="px-4 py-3 text-sm text-zinc-400">{incident.id}</td>
                              <td className="px-4 py-3">
                                <div>
                                  <div className="font-medium text-white">{incident.title}</div>
                                  <div className="text-xs text-zinc-500 mt-1">{incident.description.substring(0, 60)}...</div>
                                </div>
                              </td>
                              <td className="px-4 py-3">
                                <StatusBadge status={incident.status} />
                              </td>
                              <td className="px-4 py-3">
                                <SeverityBadge severity={incident.severity} />
                              </td>
                              <td className="px-4 py-3 text-sm text-zinc-400">
                                <div>{incident.startDate}</div>
                                {incident.endDate !== "-" && (
                                  <div className="text-xs text-zinc-500">Do: {incident.endDate}</div>
                                )}
                              </td>
                              <td className="px-4 py-3 text-right">
                                <div className="flex items-center justify-end gap-2">
                                  <Button variant="ghost" size="icon" className="h-8 w-8 text-zinc-400">
                                    <Edit className="h-4 w-4" />
                                  </Button>
                                  <Button variant="ghost" size="icon" className="h-8 w-8 text-zinc-400">
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
              </TabsContent>
              
              <TabsContent value="ongoing" className="mt-4">
                <Card className="bg-zinc-900 border-zinc-800">
                  <CardContent className="p-6 text-center">
                    <div className="flex flex-col items-center justify-center">
                      <Clock className="h-12 w-12 text-amber-500 mb-4" />
                      <h3 className="text-xl font-medium text-white">Aktywne incydenty</h3>
                      <p className="text-zinc-400 mt-2 max-w-md">
                        Obecnie jest 1 aktywny incydent w systemie. Możesz dodać aktualizacje lub zmienić jego status.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="planned" className="mt-4">
                <Card className="bg-zinc-900 border-zinc-800">
                  <CardContent className="p-6 text-center">
                    <div className="flex flex-col items-center justify-center">
                      <Clock className="h-12 w-12 text-purple-500 mb-4" />
                      <h3 className="text-xl font-medium text-white">Planowane incydenty</h3>
                      <p className="text-zinc-400 mt-2 max-w-md">
                        Zaplanowane prace konserwacyjne i inne działania, które mogą wpływać na działanie systemu.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="resolved" className="mt-4">
                <Card className="bg-zinc-900 border-zinc-800">
                  <CardContent className="p-6 text-center">
                    <div className="flex flex-col items-center justify-center">
                      <Server className="h-12 w-12 text-green-500 mb-4" />
                      <h3 className="text-xl font-medium text-white">Rozwiązane incydenty</h3>
                      <p className="text-zinc-400 mt-2 max-w-md">
                        Historia rozwiązanych incydentów i problemów. Możesz przeglądać szczegóły i statystyki.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
          
          {/* Karta statystyk */}
          <Card className="bg-zinc-900 border-zinc-800">
            <CardHeader className="pb-3">
              <CardTitle className="text-xl text-white flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-amber-500" />
                Podsumowanie Incydentów
              </CardTitle>
              <CardDescription className="text-zinc-400">
                Statystyki incydentów za ostatnie 30 dni
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-zinc-800/50 rounded-lg p-4 text-center">
                  <div className="text-3xl font-bold text-white">4</div>
                  <div className="text-xs text-zinc-400 mt-1">Łącznie incydentów</div>
                </div>
                <div className="bg-zinc-800/50 rounded-lg p-4 text-center">
                  <div className="text-3xl font-bold text-white">1</div>
                  <div className="text-xs text-zinc-400 mt-1">Aktywne</div>
                </div>
                <div className="bg-zinc-800/50 rounded-lg p-4 text-center">
                  <div className="text-3xl font-bold text-white">99.8%</div>
                  <div className="text-xs text-zinc-400 mt-1">Dostępność systemu</div>
                </div>
                <div className="bg-zinc-800/50 rounded-lg p-4 text-center">
                  <div className="text-3xl font-bold text-white">2h 15m</div>
                  <div className="text-xs text-zinc-400 mt-1">Śr. czas rozwiązania</div>
                </div>
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