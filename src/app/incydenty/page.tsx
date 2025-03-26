import { Metadata } from "next";
import Link from "next/link";
import { 
  AlertTriangle, 
  Clock, 
  CheckCircle, 
  XCircle, 
  AlertCircle,
  Server,
  Info,
  ArrowUpRight
} from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Incydenty Systemu | Scamerzy",
  description: "Historia incydentów i problemów technicznych systemu Scamerzy.",
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
    affectedServices: ["API", "Weryfikacja scamerów", "System zgłoszeń"],
    description: "Występowały problemy z dostępnością API, co spowodowało opóźnienia w weryfikacji i przetwarzaniu zgłoszeń. Zespół techniczny zidentyfikował problem z bazą danych i zastosował rozwiązanie.",
    updates: [
      { timestamp: "24.03.2025 08:20", content: "Zidentyfikowano problemy z dostępnością API. Zespół techniczny został powiadomiony." },
      { timestamp: "24.03.2025 09:15", content: "Zidentyfikowano problem z bazą danych. Trwają prace nad rozwiązaniem." },
      { timestamp: "24.03.2025 10:30", content: "Problem został rozwiązany. Wszystkie systemy działają prawidłowo." }
    ]
  },
  {
    id: "INC-2025-03-20-002",
    title: "Opóźnienia w przetwarzaniu zgłoszeń",
    status: "resolved",
    severity: "moderate",
    startDate: "20.03.2025 14:30",
    endDate: "20.03.2025 16:45",
    affectedServices: ["System zgłoszeń", "Panel administratora"],
    description: "Wystąpiły opóźnienia w przetwarzaniu nowych zgłoszeń scamerów. Użytkownicy mogli doświadczać dłuższych czasów oczekiwania na potwierdzenie zgłoszenia.",
    updates: [
      { timestamp: "20.03.2025 14:45", content: "Zidentyfikowano opóźnienia w przetwarzaniu zgłoszeń. Zespół monitoruje sytuację." },
      { timestamp: "20.03.2025 15:30", content: "Zidentyfikowano problem z kolejką zadań. Trwa optymalizacja." },
      { timestamp: "20.03.2025 16:45", content: "Problem został rozwiązany. Zgłoszenia są przetwarzane normalnie." }
    ]
  },
  {
    id: "INC-2025-03-15-003",
    title: "Awaria bazy danych",
    status: "resolved",
    severity: "critical",
    startDate: "15.03.2025 02:10",
    endDate: "15.03.2025 05:30",
    affectedServices: ["Baza danych", "API", "Weryfikacja scamerów", "System zgłoszeń", "Panel administratora"],
    description: "Wystąpiła awaria bazy danych, co spowodowało czasową niedostępność większości funkcji systemu. Zespół techniczny przywrócił kopię zapasową i naprawił uszkodzone dane.",
    updates: [
      { timestamp: "15.03.2025 02:15", content: "Zidentyfikowano awarię bazy danych. Zespół techniczny pracuje nad rozwiązaniem." },
      { timestamp: "15.03.2025 03:00", content: "Trwa przywracanie kopii zapasowej bazy danych." },
      { timestamp: "15.03.2025 04:30", content: "Kopia zapasowa została przywrócona. Trwa weryfikacja integralności danych." },
      { timestamp: "15.03.2025 05:30", content: "Wszystkie systemy zostały przywrócone do pełnej funkcjonalności." }
    ]
  },
  {
    id: "INC-2025-03-10-004",
    title: "Problemy z rejestracją użytkowników",
    status: "resolved",
    severity: "moderate",
    startDate: "10.03.2025 11:20",
    endDate: "10.03.2025 12:45",
    affectedServices: ["System rejestracji", "Panel administratora"],
    description: "Niektórzy użytkownicy zgłaszali problemy z rejestracją nowych kont. Problem dotyczył walidacji adresów e-mail i został naprawiony.",
    updates: [
      { timestamp: "10.03.2025 11:30", content: "Zidentyfikowano problemy z rejestracją nowych użytkowników. Zespół techniczny analizuje problem." },
      { timestamp: "10.03.2025 12:15", content: "Znaleziono błąd w walidacji adresów e-mail. Wdrażane jest rozwiązanie." },
      { timestamp: "10.03.2025 12:45", content: "Problem został rozwiązany. Rejestracja użytkowników działa prawidłowo." }
    ]
  },
  {
    id: "INC-2025-03-01-005",
    title: "Planowane prace konserwacyjne",
    status: "planned",
    severity: "low",
    startDate: "01.03.2025 22:00",
    endDate: "02.03.2025 02:00",
    affectedServices: ["Wszystkie usługi"],
    description: "Planowane prace konserwacyjne związane z aktualizacją infrastruktury. W czasie prac system może być czasowo niedostępny.",
    updates: [
      { timestamp: "28.02.2025 12:00", content: "Ogłoszenie o planowanych pracach konserwacyjnych." },
      { timestamp: "01.03.2025 22:00", content: "Rozpoczęcie prac konserwacyjnych." },
      { timestamp: "02.03.2025 01:30", content: "Zakończenie prac konserwacyjnych przed planowanym terminem." },
      { timestamp: "02.03.2025 02:00", content: "Wszystkie systemy działają prawidłowo po aktualizacji." }
    ]
  }
];

// Komponent statusu incydentu
const IncidentStatus = ({ status }: { status: string }) => {
  switch (status) {
    case 'ongoing':
      return (
        <Badge className="bg-amber-600 text-white">
          <Clock className="w-3 h-3 mr-1" />
          Trwający
        </Badge>
      );
    case 'resolved':
      return (
        <Badge className="bg-green-600 text-white">
          <CheckCircle className="w-3 h-3 mr-1" />
          Rozwiązany
        </Badge>
      );
    case 'investigating':
      return (
        <Badge className="bg-blue-600 text-white">
          <AlertCircle className="w-3 h-3 mr-1" />
          Analizowany
        </Badge>
      );
    case 'planned':
      return (
        <Badge className="bg-purple-600 text-white">
          <Info className="w-3 h-3 mr-1" />
          Planowany
        </Badge>
      );
    default:
      return (
        <Badge className="bg-zinc-600 text-white">
          <AlertTriangle className="w-3 h-3 mr-1" />
          Nieznany
        </Badge>
      );
  }
};

// Komponent poziomu krytyczności
const SeverityBadge = ({ severity }: { severity: string }) => {
  switch (severity) {
    case 'critical':
      return (
        <Badge className="bg-red-600/20 text-red-500 border border-red-600/50">
          Krytyczny
        </Badge>
      );
    case 'high':
      return (
        <Badge className="bg-orange-600/20 text-orange-500 border border-orange-600/50">
          Wysoki
        </Badge>
      );
    case 'moderate':
      return (
        <Badge className="bg-amber-600/20 text-amber-500 border border-amber-600/50">
          Umiarkowany
        </Badge>
      );
    case 'low':
      return (
        <Badge className="bg-blue-600/20 text-blue-500 border border-blue-600/50">
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
};

export default function IncidentsPage() {
  return (
    <div className="container px-4 md:px-6 py-10 max-w-5xl mx-auto">
      <div className="space-y-2 text-center mb-10">
        <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
          Historia Incydentów
        </h1>
        <p className="text-zinc-400 max-w-2xl mx-auto">
          Przeglądaj historię incydentów i problemów technicznych w systemie Scamerzy. 
          Transparentnie informujemy o wszystkich zdarzeniach wpływających na dostępność serwisu.
        </p>
      </div>

      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-full bg-green-900/20">
            <Server className="h-5 w-5 text-green-500" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-white">Status Systemu</h2>
            <div className="flex items-center mt-1">
              <span className="relative flex h-3 w-3 mr-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
              </span>
              <span className="text-green-500 font-medium">Wszystkie systemy działają prawidłowo</span>
            </div>
          </div>
        </div>
        <Link href="/status" className="text-red-500 hover:text-red-400 flex items-center gap-1 text-sm">
          Szczegółowy status systemu
          <ArrowUpRight className="h-3 w-3" />
        </Link>
      </div>

      <div className="space-y-6">
        {incidents.map((incident) => (
          <Card key={incident.id} className="bg-zinc-900 border-zinc-800">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-white text-xl mb-1">
                    {incident.title}
                  </CardTitle>
                  <CardDescription className="text-zinc-400">
                    ID: {incident.id} | Data: {incident.startDate}
                  </CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <SeverityBadge severity={incident.severity} />
                  <IncidentStatus status={incident.status} />
                </div>
              </div>
            </CardHeader>
            <CardContent className="pb-3">
              <div className="bg-zinc-800/50 rounded-lg p-4 mb-4">
                <h3 className="text-sm font-medium text-zinc-300 mb-2">Usługi, których dotyczy:</h3>
                <div className="flex flex-wrap gap-2">
                  {incident.affectedServices.map((service, idx) => (
                    <Badge key={idx} variant="outline" className="border-zinc-700 text-zinc-400">
                      {service}
                    </Badge>
                  ))}
                </div>
              </div>
              
              <div className="mb-4">
                <h3 className="text-sm font-medium text-zinc-300 mb-2">Opis incydentu:</h3>
                <p className="text-zinc-400 text-sm">
                  {incident.description}
                </p>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-zinc-300 mb-2">Historia aktualizacji:</h3>
                <div className="space-y-3">
                  {incident.updates.map((update, idx) => (
                    <div key={idx} className="relative pl-6 pb-3 border-l border-zinc-800">
                      <div className="absolute left-0 -translate-x-1/2 w-2 h-2 rounded-full bg-zinc-700" />
                      <div className="text-xs text-zinc-500 mb-1">{update.timestamp}</div>
                      <p className="text-sm text-zinc-400">{update.content}</p>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
            <CardFooter className="pt-0 border-t border-zinc-800 flex justify-between items-center">
              <div className="flex items-center gap-2 text-xs text-zinc-500">
                <Clock className="h-3 w-3" />
                <span>
                  Czas rozwiązania: {incident.startDate} - {incident.endDate}
                </span>
              </div>
              
              {incident.status === 'resolved' && (
                <Badge className="bg-green-900/20 text-green-500 border border-green-900/30">
                  <CheckCircle className="w-3 h-3 mr-1" />
                  Rozwiązany
                </Badge>
              )}
            </CardFooter>
          </Card>
        ))}
      </div>
      
      <div className="mt-10 flex justify-center">
        <Button 
          asChild
          variant="outline" 
          className="border-zinc-700 text-zinc-400 hover:text-white hover:bg-zinc-800"
        >
          <Link href="/status">
            <Server className="mr-2 h-4 w-4" />
            Przejdź do monitoringu statusu
          </Link>
        </Button>
      </div>
    </div>
  );
}