import { Metadata } from "next";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckIcon, XIcon, AlertCircleIcon } from "lucide-react";

export const metadata: Metadata = {
  title: "Status Serwerów | LegitCheck",
  description: "Sprawdź aktualny status naszych serwerów i usług",
};

// Dane symulujące status serwerów
const services = [
  { name: "Strona główna", status: "operational", uptime: "99.99%", lastUpdated: "24.03.2025 14:30" },
  { name: "API", status: "operational", uptime: "99.95%", lastUpdated: "24.03.2025 14:30" },
  { name: "Baza danych", status: "operational", uptime: "99.97%", lastUpdated: "24.03.2025 14:30" },
  { name: "System weryfikacji", status: "operational", uptime: "99.98%", lastUpdated: "24.03.2025 14:30" },
  { name: "System raportowania", status: "partial_outage", uptime: "98.5%", lastUpdated: "24.03.2025 12:15", message: "Możliwe opóźnienia w przetwarzaniu zgłoszeń" },
];

// Dane symulujące historyczne incydenty
const incidents = [
  { 
    date: "22.03.2025", 
    title: "Opóźnienia w systemie raportowania", 
    status: "investigating",
    updates: [
      { time: "12:15", message: "Zauważyliśmy opóźnienia w systemie raportowania. Badamy przyczynę." },
      { time: "13:30", message: "Zidentyfikowaliśmy problem z bazą danych. Pracujemy nad rozwiązaniem." }
    ]
  },
  {
    date: "15.03.2025",
    title: "Niedostępność API",
    status: "resolved",
    updates: [
      { time: "08:45", message: "API jest niedostępne. Badamy przyczynę." },
      { time: "09:30", message: "Zidentyfikowaliśmy problem z serwerem. Pracujemy nad naprawą." },
      { time: "10:15", message: "Problem został rozwiązany. API działa poprawnie." }
    ]
  }
];

export default function StatusPage() {
  return (
    <div className="container py-10 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Status Serwerów</h1>
        <p className="text-muted-foreground">
          Sprawdź aktualny status naszych systemów i usług.
        </p>
      </div>

      {/* Ogólny status */}
      <Card className="border-green-500 dark:border-green-700">
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center">
            <CheckIcon className="w-6 h-6 mr-2 text-green-500" />
            Wszystkie systemy działają poprawnie
          </CardTitle>
          <CardDescription>
            Ostatnia aktualizacja: 24.03.2025 14:30
          </CardDescription>
        </CardHeader>
      </Card>

      {/* Status poszczególnych serwisów */}
      <div className="space-y-2">
        <h2 className="text-xl font-semibold">Usługi</h2>
        <div className="grid gap-4 md:grid-cols-2">
          {services.map((service) => (
            <Card key={service.name} className="overflow-hidden transition-all hover:shadow-md">
              <CardHeader className="pb-2 flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="text-lg">{service.name}</CardTitle>
                  <CardDescription>
                    Uptime: {service.uptime}
                  </CardDescription>
                </div>
                <StatusBadge status={service.status} />
              </CardHeader>
              {service.message && (
                <CardContent className="pt-0 pb-3">
                  <p className="text-sm text-amber-600 dark:text-amber-400 flex items-center">
                    <AlertCircleIcon className="w-4 h-4 mr-1" />
                    {service.message}
                  </p>
                </CardContent>
              )}
            </Card>
          ))}
        </div>
      </div>

      {/* Historia incydentów */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Historia incydentów</h2>
        {incidents.map((incident, index) => (
          <Card key={index} className="overflow-hidden">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">{incident.title}</CardTitle>
                <IncidentStatusBadge status={incident.status} />
              </div>
              <CardDescription>{incident.date}</CardDescription>
            </CardHeader>
            <CardContent className="pt-0">
              <ul className="space-y-2 mt-2">
                {incident.updates.map((update, updateIndex) => (
                  <li key={updateIndex} className="text-sm border-l-2 border-gray-200 dark:border-gray-700 pl-3 py-1">
                    <span className="font-semibold">{update.time}</span> - {update.message}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

// Komponenty pomocnicze
function StatusBadge({ status }: { status: string }) {
  if (status === "operational") {
    return (
      <Badge className="bg-green-500 hover:bg-green-600">
        <CheckIcon className="w-3 h-3 mr-1" />
        Działa
      </Badge>
    );
  } else if (status === "partial_outage") {
    return (
      <Badge variant="outline" className="text-amber-600 border-amber-600 hover:bg-amber-100 dark:text-amber-400 dark:border-amber-400 dark:hover:bg-amber-900/20">
        <AlertCircleIcon className="w-3 h-3 mr-1" />
        Częściowa awaria
      </Badge>
    );
  } else {
    return (
      <Badge variant="destructive">
        <XIcon className="w-3 h-3 mr-1" />
        Nie działa
      </Badge>
    );
  }
}

function IncidentStatusBadge({ status }: { status: string }) {
  if (status === "resolved") {
    return (
      <Badge variant="outline" className="text-green-600 border-green-600 hover:bg-green-100 dark:text-green-400 dark:border-green-400 dark:hover:bg-green-900/20">
        Rozwiązany
      </Badge>
    );
  } else if (status === "investigating") {
    return (
      <Badge variant="outline" className="text-amber-600 border-amber-600 hover:bg-amber-100 dark:text-amber-400 dark:border-amber-400 dark:hover:bg-amber-900/20">
        W trakcie badania
      </Badge>
    );
  } else {
    return (
      <Badge variant="outline" className="text-red-600 border-red-600 hover:bg-red-100 dark:text-red-400 dark:border-red-400 dark:hover:bg-red-900/20">
        Krytyczny
      </Badge>
    );
  }
}