import { Metadata } from "next";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckIcon, XIcon, AlertCircleIcon, ActivityIcon, ServerIcon, DatabaseIcon, ShieldIcon, FileTextIcon } from "lucide-react";

export const metadata: Metadata = {
  title: "Status Serwerów | LegitCheck",
  description: "Sprawdź aktualny status naszych serwerów i usług",
};

// Dane symulujące status serwerów
const services = [
  { 
    name: "Strona główna", 
    icon: <ActivityIcon className="w-5 h-5 text-green-500" />, 
    status: "operational", 
    uptime: "99.99%", 
    lastUpdated: "24.03.2025 14:30",
    response: "45ms",
  },
  { 
    name: "API", 
    icon: <ServerIcon className="w-5 h-5 text-green-500" />, 
    status: "operational", 
    uptime: "99.95%", 
    lastUpdated: "24.03.2025 14:30",
    response: "120ms",
  },
  { 
    name: "Baza danych", 
    icon: <DatabaseIcon className="w-5 h-5 text-green-500" />, 
    status: "operational", 
    uptime: "99.97%", 
    lastUpdated: "24.03.2025 14:30",
    response: "75ms",
  },
  { 
    name: "System weryfikacji", 
    icon: <ShieldIcon className="w-5 h-5 text-green-500" />, 
    status: "operational", 
    uptime: "99.98%", 
    lastUpdated: "24.03.2025 14:30",
    response: "95ms",
  },
  { 
    name: "System raportowania", 
    icon: <FileTextIcon className="w-5 h-5 text-amber-500" />, 
    status: "partial_outage", 
    uptime: "98.5%", 
    lastUpdated: "24.03.2025 12:15", 
    message: "Możliwe opóźnienia w przetwarzaniu zgłoszeń",
    response: "350ms",
  },
];

// Dane symulujące historyczne incydenty
const incidents = [
  { 
    date: "22.03.2025", 
    title: "Opóźnienia w systemie raportowania", 
    status: "investigating",
    icon: <FileTextIcon className="w-5 h-5 text-amber-500" />,
    updates: [
      { time: "12:15", message: "Zauważyliśmy opóźnienia w systemie raportowania. Badamy przyczynę." },
      { time: "13:30", message: "Zidentyfikowaliśmy problem z bazą danych. Pracujemy nad rozwiązaniem." }
    ]
  },
  {
    date: "15.03.2025",
    title: "Niedostępność API",
    status: "resolved",
    icon: <ServerIcon className="w-5 h-5 text-green-500" />,
    updates: [
      { time: "08:45", message: "API jest niedostępne. Badamy przyczynę." },
      { time: "09:30", message: "Zidentyfikowaliśmy problem z serwerem. Pracujemy nad naprawą." },
      { time: "10:15", message: "Problem został rozwiązany. API działa poprawnie." }
    ]
  }
];

export default function StatusPage() {
  const allOperational = services.every(service => service.status === "operational");
  
  return (
    <div className="container py-10 space-y-8">
      <div className="space-y-2 animate-in fade-in slide-in-from-bottom-4 duration-700">
        <h1 className="text-4xl font-bold tracking-tight text-gradient-red">Status Serwerów</h1>
        <p className="text-muted-foreground">
          Sprawdź aktualny status naszych systemów i usług w czasie rzeczywistym.
        </p>
      </div>

      {/* Ogólny status */}
      <Card className={`overflow-hidden transition-all duration-500 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-200 border-2 ${allOperational ? 'border-green-500 dark:border-green-700' : 'border-amber-500 dark:border-amber-700'}`}>
        <div className={`absolute top-0 left-0 w-full h-1 ${allOperational ? 'bg-green-500' : 'bg-amber-500'}`}></div>
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center">
            {allOperational ? (
              <>
                <CheckIcon className="w-6 h-6 mr-2 text-green-500" />
                <span className="bg-gradient-to-r from-green-500 to-emerald-600 bg-clip-text text-transparent">
                  Wszystkie systemy działają poprawnie
                </span>
              </>
            ) : (
              <>
                <AlertCircleIcon className="w-6 h-6 mr-2 text-amber-500" />
                <span className="bg-gradient-to-r from-amber-500 to-amber-600 bg-clip-text text-transparent">
                  Niektóre systemy mogą doświadczać problemów
                </span>
              </>
            )}
          </CardTitle>
          <CardDescription>
            Ostatnia aktualizacja: 24.03.2025 14:30
          </CardDescription>
        </CardHeader>
      </Card>

      {/* Status poszczególnych serwisów */}
      <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300">
        <h2 className="text-2xl font-semibold">Usługi</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 mb-6">
          {services.map((service, index) => (
            <Card 
              key={service.name} 
              className="overflow-hidden transition-all hover:shadow-lg hover:-translate-y-1 duration-300 group"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <div 
                className={`absolute top-0 left-0 w-full h-1 ${
                  service.status === "operational" 
                    ? "bg-green-500" 
                    : service.status === "partial_outage" 
                      ? "bg-amber-500" 
                      : "bg-red-500"
                }`}
              ></div>
              <CardHeader className="pb-2 flex flex-row items-center justify-between">
                <div className="flex items-center">
                  <div className="mr-3 opacity-80 group-hover:opacity-100 transition-opacity">
                    {service.icon}
                  </div>
                  <div>
                    <CardTitle className="text-lg">{service.name}</CardTitle>
                    <CardDescription className="flex items-center gap-2">
                      <span>Uptime: {service.uptime}</span>
                      <span className="inline-block w-1 h-1 rounded-full bg-zinc-500"></span>
                      <span>Czas odpowiedzi: {service.response}</span>
                    </CardDescription>
                  </div>
                </div>
                <StatusBadge status={service.status} />
              </CardHeader>
              {service.message && (
                <CardContent className="pt-0 pb-3">
                  <p className="text-sm text-amber-600 dark:text-amber-400 flex items-center">
                    <AlertCircleIcon className="w-4 h-4 mr-1 flex-shrink-0" />
                    <span>{service.message}</span>
                  </p>
                </CardContent>
              )}
            </Card>
          ))}
        </div>
        
        {/* Podsumowanie dostępności */}
        <Card className="overflow-hidden border border-zinc-800 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-500">
          <CardHeader className="pb-2">
            <CardTitle className="text-xl">Dostępność systemów (30 dni)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="w-full h-14 relative rounded-md overflow-hidden bg-zinc-900 mb-6">
              <div 
                className="absolute top-0 left-0 h-full bg-gradient-to-r from-green-600 to-green-500" 
                style={{ width: "99.7%" }}
              ></div>
              <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
                <span className="text-white font-medium text-sm">99.7% dostępności</span>
              </div>
            </div>
            <div className="grid grid-cols-4 gap-2 text-center text-sm">
              <div>
                <div className="font-semibold text-2xl text-green-500">99.99%</div>
                <div className="text-muted-foreground">Strona</div>
              </div>
              <div>
                <div className="font-semibold text-2xl text-green-500">99.95%</div>
                <div className="text-muted-foreground">API</div>
              </div>
              <div>
                <div className="font-semibold text-2xl text-green-500">99.97%</div>
                <div className="text-muted-foreground">Baza danych</div>
              </div>
              <div>
                <div className="font-semibold text-2xl text-amber-500">98.5%</div>
                <div className="text-muted-foreground">Raporty</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Historia incydentów */}
      <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-400">
        <h2 className="text-2xl font-semibold">Historia incydentów</h2>
        {incidents.map((incident, index) => (
          <Card 
            key={index} 
            className="overflow-hidden border border-zinc-800 hover:border-zinc-700 transition-colors duration-300"
            style={{ animationDelay: `${(index + 5) * 150}ms` }}
          >
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {incident.icon}
                  <CardTitle className="text-lg">{incident.title}</CardTitle>
                </div>
                <IncidentStatusBadge status={incident.status} />
              </div>
              <CardDescription>{incident.date}</CardDescription>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="relative pl-6 before:absolute before:left-2 before:top-0 before:w-0.5 before:h-full before:bg-zinc-700">
                <ul className="space-y-4 mt-3">
                  {incident.updates.map((update, updateIndex) => (
                    <li 
                      key={updateIndex} 
                      className="relative text-sm pl-6 pb-4"
                    >
                      <div className="absolute left-[-6px] top-1.5 w-3 h-3 rounded-full bg-zinc-800 border border-zinc-600"></div>
                      <div className="font-semibold text-white mb-1">{update.time}</div>
                      <div className="text-zinc-400">{update.message}</div>
                    </li>
                  ))}
                </ul>
              </div>
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
      <Badge className="bg-green-500/10 text-green-500 hover:bg-green-500/20 border border-green-500/20 shadow-sm">
        <CheckIcon className="w-3 h-3 mr-1" />
        Działa
      </Badge>
    );
  } else if (status === "partial_outage") {
    return (
      <Badge variant="outline" className="bg-amber-500/10 text-amber-500 border-amber-500/20 hover:bg-amber-500/20 shadow-sm">
        <AlertCircleIcon className="w-3 h-3 mr-1" />
        Częściowa awaria
      </Badge>
    );
  } else {
    return (
      <Badge variant="outline" className="bg-red-500/10 text-red-500 border-red-500/20 hover:bg-red-500/20 shadow-sm">
        <XIcon className="w-3 h-3 mr-1" />
        Nie działa
      </Badge>
    );
  }
}

function IncidentStatusBadge({ status }: { status: string }) {
  if (status === "resolved") {
    return (
      <Badge variant="outline" className="bg-green-500/10 text-green-500 border-green-500/20 hover:bg-green-500/20 shadow-sm">
        <CheckIcon className="w-3 h-3 mr-1" />
        Rozwiązany
      </Badge>
    );
  } else if (status === "investigating") {
    return (
      <Badge variant="outline" className="bg-amber-500/10 text-amber-500 border-amber-500/20 hover:bg-amber-500/20 shadow-sm">
        <AlertCircleIcon className="w-3 h-3 mr-1" />
        W trakcie badania
      </Badge>
    );
  } else {
    return (
      <Badge variant="outline" className="bg-red-500/10 text-red-500 border-red-500/20 hover:bg-red-500/20 shadow-sm">
        <XIcon className="w-3 h-3 mr-1" />
        Krytyczny
      </Badge>
    );
  }
}