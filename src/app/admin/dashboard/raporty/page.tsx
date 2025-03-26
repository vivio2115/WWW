import { Metadata } from "next";
import AdminSidebar from "../../components/AdminSidebar";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  AlertTriangle, 
  AlertOctagon, 
  Ban, 
  ShieldX, 
  FileText, 
  Search,
  Filter,
  MoreHorizontal,
  ExternalLink,
  FileBarChart,
  HelpCircle,
  Clock
} from "lucide-react";
import ReportModal from "./ReportModal";
import ModalForm from "@/components/ModalForms";

export const metadata: Metadata = {
  title: "Raporty | Panel Administratora",
  description: "Raporty i blokady systemu Scamerzy",
};

// Przykładowe dane raportów
const MOCK_REPORTS = [
  {
    id: "RPT-2025-03-24-001",
    title: "Wykryto nową grupę scamerów",
    type: "activity",
    severity: "high",
    status: "open",
    createdAt: "24.03.2025 08:30",
    createdBy: "Admin Admin",
    assignedTo: "Moderator Testowy"
  },
  {
    id: "RPT-2025-03-20-002",
    title: "Podejrzana aktywność z adresu IP 192.168.1.1",
    type: "incident",
    severity: "medium",
    status: "in-progress",
    createdAt: "20.03.2025 14:15",
    createdBy: "System",
    assignedTo: "Admin Admin"
  },
  {
    id: "RPT-2025-03-15-003",
    title: "Raport o podatności w API",
    type: "vulnerability",
    severity: "critical",
    status: "resolved",
    createdAt: "15.03.2025 09:20",
    createdBy: "Jan Kowalski",
    assignedTo: "Admin Admin",
    resolvedAt: "16.03.2025 12:30"
  },
  {
    id: "RPT-2025-03-10-004",
    title: "Fałszywe zgłoszenia od użytkownika test123",
    type: "abuse",
    severity: "low",
    status: "closed",
    createdAt: "10.03.2025 11:45",
    createdBy: "Moderator Testowy",
    assignedTo: "Admin Admin",
    resolvedAt: "11.03.2025 10:15"
  },
  {
    id: "RPT-2025-03-05-005",
    title: "Atak DDoS na infrastrukturę",
    type: "incident",
    severity: "critical",
    status: "resolved",
    createdAt: "05.03.2025 02:30",
    createdBy: "System Alert",
    assignedTo: "Admin Admin",
    resolvedAt: "05.03.2025 06:45"
  }
];

// Komponent dla statusu raportu
function ReportStatusBadge({ status }: { status: string }) {
  switch (status) {
    case 'open':
      return (
        <Badge className="bg-blue-600 text-white">Otwarty</Badge>
      );
    case 'in-progress':
      return (
        <Badge className="bg-amber-600 text-white">W trakcie</Badge>
      );
    case 'resolved':
      return (
        <Badge className="bg-green-600 text-white">Rozwiązany</Badge>
      );
    case 'closed':
      return (
        <Badge variant="outline" className="border-zinc-500 text-zinc-400">Zamknięty</Badge>
      );
    default:
      return (
        <Badge variant="outline" className="border-zinc-700 text-zinc-400">Nieznany</Badge>
      );
  }
}

// Komponent dla priorytetu raportu
function SeverityBadge({ severity }: { severity: string }) {
  switch (severity) {
    case 'critical':
      return (
        <Badge className="bg-red-600/20 text-red-500 border border-red-600/50">
          <AlertOctagon className="h-3 w-3 mr-1" />
          Krytyczny
        </Badge>
      );
    case 'high':
      return (
        <Badge className="bg-orange-600/20 text-orange-500 border border-orange-600/50">
          <AlertTriangle className="h-3 w-3 mr-1" />
          Wysoki
        </Badge>
      );
    case 'medium':
      return (
        <Badge className="bg-amber-600/20 text-amber-500 border border-amber-600/50">
          <AlertTriangle className="h-3 w-3 mr-1" />
          Średni
        </Badge>
      );
    case 'low':
      return (
        <Badge className="bg-blue-600/20 text-blue-500 border border-blue-600/50">
          <HelpCircle className="h-3 w-3 mr-1" />
          Niski
        </Badge>
      );
    default:
      return (
        <Badge className="bg-zinc-600/20 text-zinc-400 border border-zinc-600/50">
          Nieznany
        </Badge>
      );
  }
}

export default function ReportsPage() {
  return (
    <div className="container px-4 md:px-6 py-10 max-w-7xl mx-auto">
      <div className="flex flex-col lg:flex-row gap-8">
        <AdminSidebar activeItem="Raporty" />

        <main className="flex-1 space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-white">Raporty i Blokady</h1>
              <p className="text-zinc-400 mt-1">
                Zarządzaj raportami, incydentami i zgłoszonymi problemami
              </p>
            </div>
            
            <div className="flex items-center gap-3">
              <ReportModal />
              
              <div className="relative w-full md:w-64">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-zinc-500" />
                <Input
                  placeholder="Szukaj raportów..."
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
                    <p className="text-zinc-400 text-sm">Wszystkie raporty</p>
                    <h3 className="text-2xl font-bold text-white mt-1">{MOCK_REPORTS.length}</h3>
                  </div>
                  <div className="p-2 bg-zinc-800 rounded-md">
                    <FileText className="text-zinc-400 h-5 w-5" />
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-zinc-900 border-zinc-800">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-zinc-400 text-sm">Otwarte</p>
                    <h3 className="text-2xl font-bold text-white mt-1">2</h3>
                  </div>
                  <div className="p-2 bg-zinc-800 rounded-md">
                    <AlertTriangle className="text-amber-500 h-5 w-5" />
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-zinc-900 border-zinc-800">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-zinc-400 text-sm">Rozwiązane</p>
                    <h3 className="text-2xl font-bold text-white mt-1">3</h3>
                  </div>
                  <div className="p-2 bg-zinc-800 rounded-md">
                    <FileBarChart className="text-green-500 h-5 w-5" />
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-zinc-900 border-zinc-800">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-zinc-400 text-sm">Krytyczne</p>
                    <h3 className="text-2xl font-bold text-white mt-1">2</h3>
                  </div>
                  <div className="p-2 bg-zinc-800 rounded-md">
                    <AlertOctagon className="text-red-500 h-5 w-5" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Komunikat o zablokowanym dostępie */}
          <Card className="bg-zinc-900 border-zinc-800">
            <CardHeader className="pb-2">
              <CardTitle className="text-xl text-white flex items-center gap-2">
                <Ban className="h-5 w-5 text-red-500" />
                Zablokowane Adresy IP
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-zinc-800/50 p-4 rounded-lg mb-4">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex items-center gap-2">
                    <ShieldX className="h-5 w-5 text-red-500" />
                    <span className="text-white font-medium">5 adresów IP jest obecnie zablokowanych</span>
                  </div>
                  
                  <ModalForm
                    triggerButton={
                      <Button variant="outline" className="border-zinc-700 text-zinc-400">
                        Zarządzaj blokadami
                      </Button>
                    }
                    title="Zarządzanie zablokowanymi adresami IP"
                    confirmText="Zapisz zmiany"
                  >
                    <div className="grid gap-4">
                      <div className="flex justify-between items-center">
                        <h3 className="text-white font-medium">Lista zablokowanych adresów IP</h3>
                        <Button variant="outline" size="sm" className="border-zinc-700 text-zinc-400">
                          <Ban className="h-3 w-3 mr-1" />
                          Dodaj blokadę
                        </Button>
                      </div>
                      
                      <div className="overflow-y-auto max-h-[300px] bg-zinc-800/50 rounded-md">
                        <table className="w-full text-left">
                          <thead className="border-b border-zinc-700">
                            <tr>
                              <th className="px-3 py-2 text-xs font-medium text-zinc-400">Adres IP</th>
                              <th className="px-3 py-2 text-xs font-medium text-zinc-400">Data blokady</th>
                              <th className="px-3 py-2 text-xs font-medium text-zinc-400">Powód</th>
                              <th className="px-3 py-2 text-xs font-medium text-zinc-400">Akcje</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr className="border-b border-zinc-700">
                              <td className="px-3 py-2 text-white">192.168.1.1</td>
                              <td className="px-3 py-2 text-sm text-zinc-400">24.03.2025 10:15</td>
                              <td className="px-3 py-2 text-sm text-zinc-400">Podejrzana aktywność</td>
                              <td className="px-3 py-2">
                                <Button variant="ghost" size="sm" className="text-red-400 h-8 px-2">
                                  Usuń
                                </Button>
                              </td>
                            </tr>
                            <tr className="border-b border-zinc-700">
                              <td className="px-3 py-2 text-white">10.0.0.25</td>
                              <td className="px-3 py-2 text-sm text-zinc-400">20.03.2025 14:30</td>
                              <td className="px-3 py-2 text-sm text-zinc-400">Atak bruteforce</td>
                              <td className="px-3 py-2">
                                <Button variant="ghost" size="sm" className="text-red-400 h-8 px-2">
                                  Usuń
                                </Button>
                              </td>
                            </tr>
                            <tr className="border-b border-zinc-700">
                              <td className="px-3 py-2 text-white">172.16.0.100</td>
                              <td className="px-3 py-2 text-sm text-zinc-400">15.03.2025 08:20</td>
                              <td className="px-3 py-2 text-sm text-zinc-400">Zasoby do scamowania</td>
                              <td className="px-3 py-2">
                                <Button variant="ghost" size="sm" className="text-red-400 h-8 px-2">
                                  Usuń
                                </Button>
                              </td>
                            </tr>
                            <tr className="border-b border-zinc-700">
                              <td className="px-3 py-2 text-white">8.8.8.8</td>
                              <td className="px-3 py-2 text-sm text-zinc-400">10.03.2025 16:45</td>
                              <td className="px-3 py-2 text-sm text-zinc-400">Automatyczne zgłoszenia</td>
                              <td className="px-3 py-2">
                                <Button variant="ghost" size="sm" className="text-red-400 h-8 px-2">
                                  Usuń
                                </Button>
                              </td>
                            </tr>
                            <tr>
                              <td className="px-3 py-2 text-white">1.1.1.1</td>
                              <td className="px-3 py-2 text-sm text-zinc-400">05.03.2025 12:10</td>
                              <td className="px-3 py-2 text-sm text-zinc-400">Próba obejścia zabezpieczeń</td>
                              <td className="px-3 py-2">
                                <Button variant="ghost" size="sm" className="text-red-400 h-8 px-2">
                                  Usuń
                                </Button>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </ModalForm>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Lista raportów */}
          <Card className="bg-zinc-900 border-zinc-800">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-xl text-white">Lista raportów</CardTitle>
                <Button variant="outline" className="border-zinc-700 text-zinc-400" size="sm">
                  <Filter className="h-4 w-4 mr-2" />
                  Filtruj
                </Button>
              </div>
              <CardDescription className="text-zinc-400">
                Łącznie: {MOCK_REPORTS.length} raportów w systemie
              </CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="border-b border-zinc-800">
                      <th className="px-4 py-3 text-xs font-medium text-zinc-400">ID</th>
                      <th className="px-4 py-3 text-xs font-medium text-zinc-400">Raport</th>
                      <th className="px-4 py-3 text-xs font-medium text-zinc-400">Priorytet</th>
                      <th className="px-4 py-3 text-xs font-medium text-zinc-400">Status</th>
                      <th className="px-4 py-3 text-xs font-medium text-zinc-400">Utworzony</th>
                      <th className="px-4 py-3 text-xs font-medium text-zinc-400 text-right">Akcje</th>
                    </tr>
                  </thead>
                  <tbody>
                    {MOCK_REPORTS.map((report) => (
                      <tr key={report.id} className="border-b border-zinc-800 hover:bg-zinc-800/50">
                        <td className="px-4 py-3 text-sm text-zinc-400">{report.id}</td>
                        <td className="px-4 py-3">
                          <div>
                            <div className="font-medium text-white">{report.title}</div>
                            <div className="text-xs text-zinc-500 mt-1">Przypisany do: {report.assignedTo}</div>
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <SeverityBadge severity={report.severity} />
                        </td>
                        <td className="px-4 py-3">
                          <ReportStatusBadge status={report.status} />
                        </td>
                        <td className="px-4 py-3 text-sm text-zinc-400">
                          <div>{report.createdAt}</div>
                          <div className="text-xs text-zinc-500">przez: {report.createdBy}</div>
                        </td>
                        <td className="px-4 py-3 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <ModalForm
                              triggerButton={
                                <Button variant="ghost" size="icon" className="h-8 w-8 text-zinc-400">
                                  <ExternalLink className="h-4 w-4" />
                                </Button>
                              }
                              title={`Szczegóły raportu - ${report.id}`}
                              confirmText="Zamknij"
                            >
                              <div className="grid gap-4">
                                <div className="bg-zinc-800/50 rounded-lg p-4">
                                  <h3 className="font-medium text-white text-lg mb-1">{report.title}</h3>
                                  <div className="flex items-center gap-2 text-sm text-zinc-400 mb-3">
                                    <Clock className="h-4 w-4" />
                                    <span>{report.createdAt} przez {report.createdBy}</span>
                                  </div>
                                  <div className="flex flex-wrap gap-2 mb-3">
                                    <SeverityBadge severity={report.severity} />
                                    <ReportStatusBadge status={report.status} />
                                    <Badge variant="outline" className="border-zinc-700 text-zinc-400">
                                      {report.type}
                                    </Badge>
                                  </div>
                                  <p className="text-zinc-400 text-sm">
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, nisl eget ultricies 
                                    tincidunt, nisl nunc aliquam nisl, eget ultricies nisl nunc eget nisl. Nullam auctor, nisl eget ultricies.
                                  </p>
                                </div>
                                
                                <div className="grid gap-2">
                                  <label className="text-sm font-medium text-white">
                                    Dodaj aktualizację
                                  </label>
                                  <textarea
                                    rows={3}
                                    placeholder="Wpisz aktualizację lub komentarz..."
                                    className="rounded-md px-3 py-2 bg-zinc-800 border-zinc-700 text-white resize-none"
                                  />
                                </div>
                                
                                <div className="grid gap-2">
                                  <label className="text-sm font-medium text-white">
                                    Zmień status
                                  </label>
                                  <select
                                    defaultValue={report.status}
                                    className="rounded-md px-3 py-2 bg-zinc-800 border-zinc-700 text-white"
                                  >
                                    <option value="open">Otwarty</option>
                                    <option value="in-progress">W trakcie</option>
                                    <option value="resolved">Rozwiązany</option>
                                    <option value="closed">Zamknięty</option>
                                  </select>
                                </div>
                              </div>
                            </ModalForm>
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