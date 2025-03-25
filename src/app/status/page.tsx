"use client";

import { useState, useEffect, AwaitedReactNode, JSXElementConstructor, Key, ReactElement, ReactNode, ReactPortal } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  CheckIcon, XIcon, AlertCircleIcon,
  ActivityIcon, ServerIcon, DatabaseIcon,
  ShieldIcon, FileTextIcon, GlobeIcon,
  ClockIcon, AlertTriangleIcon, InfoIcon,
  MonitorIcon, NetworkIcon, BellIcon
} from "lucide-react";

// Mapa ikon – używana, gdy z API nie przyjdzie ikona
const serviceIconMap: Record<string, JSX.Element> = {
  "Strona główna": <GlobeIcon className="w-5 h-5" />,
  "API": <ServerIcon className="w-5 h-5" />,
  "Baza danych": <DatabaseIcon className="w-5 h-5" />,
  "System weryfikacji": <ShieldIcon className="w-5 h-5" />,
  "System raportowania": <FileTextIcon className="w-5 h-5" />,
  "Panel administracyjny": <MonitorIcon className="w-5 h-5" />,
  "System zgłoszeń": <BellIcon className="w-5 h-5" />,
  "CDN": <NetworkIcon className="w-5 h-5" />,
};

// fallback dane – używane, gdy API jest offline
const fallbackServices = [
  {
    name: "Strona główna",
    icon: serviceIconMap["Strona główna"],
    status: "failed",
    uptime: "99.99%",
    lastUpdated: "24.03.2025 14:30",
    response: "45ms",
    loadTrend: [98, 97, 99, 98, 100, 99, 100, 99, 100, 99, 100],
  },
  {
    name: "API",
    icon: serviceIconMap["API"],
    status: "failed",
    uptime: "99.95%",
    lastUpdated: "24.03.2025 14:30",
    response: "120ms",
    loadTrend: [95, 96, 94, 97, 99, 98, 97, 96, 97, 98, 97],
  },
  {
    name: "Baza danych",
    icon: serviceIconMap["Baza danych"],
    status: "failed",
    uptime: "99.95%",
    lastUpdated: "24.03.2025 14:30",
    response: "120ms",
    loadTrend: [95, 96, 94, 97, 99, 98, 97, 96, 97, 98, 97],
  },
  {
    name: "System weryfikacji",
    icon: serviceIconMap["System weryfikacji"],
    status: "failed",
    uptime: "99.95%",
    lastUpdated: "24.03.2025 14:30",
    response: "120ms",
    loadTrend: [95, 96, 94, 97, 99, 98, 97, 96, 97, 98, 97],
  },
  {
    name: "System raportowania",
    icon: serviceIconMap["System raportowania"],
    status: "failed",
    uptime: "99.95%",
    lastUpdated: "24.03.2025 14:30",
    response: "120ms",
    loadTrend: [95, 96, 94, 97, 99, 98, 97, 96, 97, 98, 97],
    },
    {
      name: "Panel administracyjny",
      icon: serviceIconMap["Panel administracyjny"],
      status: "failed",
      uptime: "99.95%",
      lastUpdated: "24.03.2025 14:30",
      response: "120ms",
      loadTrend: [95, 96, 94, 97, 99, 98, 97, 96, 97, 98, 97],
      },
      {
        name: "System zgłoszeń",
        icon: serviceIconMap["System zgłoszeń"],
        status: "failed",
        uptime: "99.95%",
        lastUpdated: "24.03.2025 14:30",
        response: "120ms",
        loadTrend: [95, 96, 94, 97, 99, 98, 97, 96, 97, 98, 97],
        },
        {
          name: "CND",
          icon: serviceIconMap["CND"],
          status: "failed",
          uptime: "99.95%",
          lastUpdated: "24.03.2025 14:30",
          response: "120ms",
          loadTrend: [95, 96, 94, 97, 99, 98, 97, 96, 97, 98, 97],
          },
];

const fallbackIncidents = [
  {
    date: "22.03.2025",
    title: "Opóźnienia w systemie raportowania",
    status: "failed",
    icon: <FileTextIcon className="w-5 h-5 text-amber-500" />,
    updates: [
      { time: "12:15", message: "Zauważono opóźnienia, system offline." },
      { time: "13:30", message: "Brak połączenia z bazą danych." },
      { time: "14:45", message: "System nadal offline." }
    ]
  },
];

export default function StatusPage() {
  const [services, setServices] = useState<any[]>([]);
  const [incidents, setIncidents] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);
  const [lastRefresh, setLastRefresh] = useState<Date | null>(null);
  const [ping, setPing] = useState<number | null>(null);
  const [refreshCountdown, setRefreshCountdown] = useState(60);

  // Funkcja pobierająca dane z API
  const fetchData = async () => {
    let servicesOk = false, incidentsOk = false;
    const startTime = Date.now();

    try {
      const resServices = await fetch("http://localhost:8080/api/v1/services", {
        headers: {
          "x-api-key": "SCAMER.12lQiRgtyAWDZoBsUzhpihQZRmHpO8KuZvcuhulUv8ZMr5IlWJG9RZOjVl583dwZ"
        }
      });
      if (resServices.ok) {
        const data = await resServices.json();
        // Upewnij się, że każda usługa ma ikonę – jeśli nie, pobierz z mapy
        const servicesWithIcon = data.map((service: any) => ({
          ...service,
          icon: service.icon || serviceIconMap[service.name] || <GlobeIcon className="w-5 h-5" />
        }));
        setServices(servicesWithIcon);
        servicesOk = true;
        // Pobierz ping z nagłówka API (o ile API go zwraca) lub zastosuj pomiar czasu
        const apiPing = resServices.headers.get("x-ping");
        setPing(apiPing ? Number(apiPing) : (Date.now() - startTime));
      } else {
        console.error("Błąd pobierania usług: ", resServices.status);
      }
    } catch (error) {
      console.error("Błąd pobierania usług:", error);
    }

    try {
      const resIncidents = await fetch("http://localhost:8080/api/v1/incidents", {
        headers: {
          "x-api-key": "SCAMER.12lQiRgtyAWDZoBsUzhpihQZRmHpO8KuZvcuhulUv8ZMr5IlWJG9RZOjVl583dwZ"
        }
      });
      if (resIncidents.ok) {
        const data = await resIncidents.json();
        setIncidents(data);
        incidentsOk = true;
      } else {
        console.error("Błąd pobierania incydentów: ", resIncidents.status);
      }
    } catch (error) {
      console.error("Błąd pobierania incydentów:", error);
    }

    if (!servicesOk || !incidentsOk) {
      setLoadError(true);
      setServices(fallbackServices);
      setIncidents(fallbackIncidents);
    }

    setLastRefresh(new Date());
    setIsLoading(false);
    setRefreshCountdown(60);
  };
  // Co 60 sekund odświeżanie danych
  useEffect(() => {
    fetchData();
    const fetchInterval = setInterval(fetchData, 60000);
    return () => clearInterval(fetchInterval);
  }, []);

  // Licznik odświeżania (co sekundę dekrementowany)
  useEffect(() => {
    const countdownInterval = setInterval(() => {
      setRefreshCountdown(prev => (prev > 0 ? prev - 1 : 60));
    }, 1000);
    return () => clearInterval(countdownInterval);
  }, []);

  if (isLoading) {
    return (
      <div className="container py-12 max-w-7xl mx-auto flex flex-col items-center justify-center h-screen">
        <ActivityIcon className="h-12 w-12 animate-spin text-white mb-4" />
        <p className="text-white text-xl">Ładowanie danych…</p>
      </div>
    );
  }

  // Mapowanie status na kolory – jawnie zdefiniowane klasy Tailwind
  const getStatusColor = (status: string) => {
    if (status === "operational") return "green";
    if (status === "partial_outage") return "amber";
    return "red";
  };

  // Komponent karty serwisu – wyświetla ikonę, loadTrend, uptime itd.
  function ServiceCard({ service, index }: { service: any; index: number }) {
    const statusColor = getStatusColor(service.status);
    const borderHoverClass =
      statusColor === "green"
        ? "hover:border-green-500/50"
        : statusColor === "amber"
        ? "hover:border-amber-500/50"
        : "hover:border-red-500/50";
    const bgColorClass =
      statusColor === "green"
        ? "bg-green-500"
        : statusColor === "amber"
        ? "bg-amber-500"
        : "bg-red-500";

    const sparklinePoints = () => {
      const height = 30;
      const width = 100;
      const points = service.loadTrend;
      const max = Math.max(...points);
      const min = Math.min(...points);
      const range = max - min || 1;
      const normalizedPoints = points
        .map((point: number, i: number) => {
          const x = (i / (points.length - 1)) * width;
          const y = height - ((point - min) / range) * height;
          return `${x},${y}`;
        })
        .join(" ");
      return (
        <svg width="100" height="30" className="overflow-visible">
          <polyline
            points={normalizedPoints}
            fill="none"
            stroke={
              statusColor === "green"
                ? "rgb(34, 197, 94)"
                : statusColor === "amber"
                ? "rgb(245, 158, 11)"
                : "rgb(239, 68, 68)"
            }
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    };

    return (
      <Card
        className={`overflow-hidden transition-all group bg-zinc-900 border border-zinc-800 ${borderHoverClass}`}
        style={{ animationDelay: `${index * 50}ms` }}
      >
        <div className={`absolute top-0 left-0 w-full h-1 ${bgColorClass}`}></div>
        <CardHeader className="py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className={`p-1.5 rounded-md bg-${statusColor}-900/20 text-${statusColor}-500`}>
                {service.icon}
              </div>
              <CardTitle className="text-base text-white">{service.name}</CardTitle>
            </div>
            <StatusBadge status={service.status} />
          </div>
        </CardHeader>
        <CardContent className="pt-0 pb-4 space-y-4">
          <div className="grid grid-cols-3 gap-2 text-center text-xs bg-zinc-950 rounded-md p-2 border border-zinc-800">
            <div>
              <div className="text-zinc-500 mb-1">Uptime</div>
              <div className={`font-medium text-${statusColor}-500`}>{service.uptime}</div>
            </div>
            <div>
              <div className="text-zinc-500 mb-1">Odpowiedź</div>
              <div className="font-medium text-zinc-300">{service.response}</div>
            </div>
            <div>
              <div className="text-zinc-500 mb-1">Ostatnio</div>
              <div className="font-medium text-zinc-300">{service.lastUpdated.split(' ')[1]}</div>
            </div>
          </div>
          <div className="flex flex-col space-y-1">
            <div className="text-xs text-zinc-500 mb-1">Trend obciążenia (24h)</div>
            <div className="bg-zinc-950 rounded-md p-2 border border-zinc-800">{sparklinePoints()}</div>
          </div>
          {service.message && (
            <div className="text-xs text-amber-500 flex items-start gap-2 bg-amber-900/20 p-2 rounded-md border border-amber-800/30">
              <AlertTriangleIcon className="w-4 h-4 flex-shrink-0 mt-0.5" />
              <span>{service.message}</span>
            </div>
          )}
        </CardContent>
      </Card>
    );
  }

  function StatusBadge({ status }: { status: string }) {
    if (status === "operational") {
      return (
        <Badge className="bg-green-500/10 text-green-500 hover:bg-green-500/20 border border-green-500/20 shadow-sm">
          <CheckIcon className="w-3 h-3 mr-1" /> Działa
        </Badge>
      );
    } else if (status === "partial_outage") {
      return (
        <Badge variant="outline" className="bg-amber-500/10 text-amber-500 border-amber-500/20 hover:bg-amber-500/20 shadow-sm">
          <AlertCircleIcon className="w-3 h-3 mr-1" /> Częściowa awaria
        </Badge>
      );
    } else {
      return (
        <Badge variant="outline" className="bg-red-500/10 text-red-500 border-red-500/20 hover:bg-red-500/20 shadow-sm">
          <XIcon className="w-3 h-3 mr-1" /> Nie działa
        </Badge>
      );
    }
  }

  function IncidentStatusBadge({ status }: { status: string }) {
    if (status === "resolved") {
      return (
        <Badge variant="outline" className="bg-green-500/10 text-green-500 border-green-500/20 hover:bg-green-500/20 shadow-sm">
          <CheckIcon className="w-3 h-3 mr-1" /> Rozwiązany
        </Badge>
      );
    } else if (status === "investigating") {
      return (
        <Badge variant="outline" className="bg-amber-500/10 text-amber-500 border-amber-500/20 hover:bg-amber-500/20 shadow-sm">
          <AlertCircleIcon className="w-3 h-3 mr-1" /> W trakcie badania
        </Badge>
      );
    } else {
      return (
        <Badge variant="outline" className="bg-red-500/10 text-red-500 border-red-500/20 hover:bg-red-500/20 shadow-sm">
          <XIcon className="w-3 h-3 mr-1" /> Krytyczny
        </Badge>
      );
    }
  }

  function CalendarBadge({ date }: { date: string }) {
    return (
      <Badge variant="outline" className="bg-zinc-900 border-zinc-700 text-zinc-400 font-normal">
        <ClockIcon className="w-3 h-3 mr-1" /> {date}
      </Badge>
    );
  }

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" });
  };

  return (
    <div className="container py-12 max-w-7xl mx-auto space-y-10">
      {/* Nagłówek strony */}
      <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-700">
        <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-red-600 mb-4">
          <ActivityIcon className="h-6 w-6 text-white" />
        </div>
        <h1 className="text-4xl font-bold tracking-tight text-white">Status systemów</h1>
        <p className="text-zinc-400 max-w-3xl">
          {loadError
            ? "Dane nie są aktualnie dostępne – wygląda na to, że cała platforma ma problem."
            : "Sprawdź aktualny status naszych systemów i usług w czasie rzeczywistym."}
        </p>
        <div className="text-sm text-zinc-500 flex items-center gap-4">
          <ClockIcon className="w-4 h-4" />
          <span>Ostatnia aktualizacja: {lastRefresh ? formatTime(lastRefresh) : "n/d"}</span>
          {ping !== null && <span>| Ping: {ping} ms</span>}
          <span>| Odświeżenie za: {refreshCountdown} sek.</span>
        </div>
      </div>

      {/* Ogólny status
      <Card className={`overflow-hidden transition-all animate-in fade-in slide-in-from-bottom-4 duration-700 delay-200 border-2 ${services.every(s => s.status === "operational") ? 'border-green-500/50 dark:border-green-700/50 bg-green-500/5' : 'border-amber-500/50 dark:border-amber-700/50 bg-amber-500/5'}`}>
        <div className={`absolute top-0 left-0 w-full h-1 ${services.every(s => s.status === "operational") ? 'bg-green-500' : 'bg-amber-500'}`}></div>
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center text-2xl">
              {services.every(s => s.status === "operational") ? (
                <>
                  <CheckIcon className="w-6 h-6 mr-2 text-green-500" />
                  <span className="text-green-500">Wszystkie systemy działają poprawnie</span>
                </>
              ) : (
                <>
                  <AlertCircleIcon className="w-6 h-6 mr-2 text-amber-500" />
                  <span className="text-amber-500">Niektóre systemy doświadczają problemów</span>
                </>
              )}
            </CardTitle>
            <div className="flex items-center text-sm text-zinc-500">
              <ClockIcon className="w-4 h-4 mr-2" />
              Ostatnia aktualizacja: 24.03.2025 14:30
            </div>
          </div>
          <CardDescription className="text-zinc-500 mt-2 flex items-center">
            <InfoIcon className="w-4 h-4 mr-2" />
            Status monitorowany jest w czasie rzeczywistym.
          </CardDescription>
        </CardHeader>
      </Card> */}

      {/* Status poszczególnych usług */}
      <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold text-white">Status usług</h2>
          <Badge variant="outline" className="bg-zinc-900 text-zinc-400 border-zinc-700 hover:bg-zinc-800">
            <ClockIcon className="w-3 h-3 mr-1" /> Live
          </Badge>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {services.map((service, index) => (
            <ServiceCard key={service.name} service={service} index={index} />
          ))}
        </div>

        {/* Podsumowanie dostępności */}
        <Card className="overflow-hidden border border-zinc-800 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-500 bg-zinc-900">
          <CardHeader className="pb-2">
            <CardTitle className="text-xl text-white">Dostępność systemów (30 dni)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="w-full h-16 relative rounded-md overflow-hidden bg-zinc-950 mb-6">
              <div className="absolute top-0 left-0 h-full bg-gradient-to-r from-green-600/90 to-green-500/90" style={{ width: "99.7%" }}>
                <div className="absolute inset-0 bg-grid-white/5 [mask-image:linear-gradient(0deg,#fff,rgba(255,255,255,0.6))]"></div>
              </div>
              <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
                <span className="text-white font-medium text-sm">99.7% dostępności</span>
              </div>
            </div>
            <div className="grid grid-cols-4 gap-4 text-center text-sm">
              {services.slice(0, 4).map(service => (
                <div key={service.name} className="bg-zinc-950 rounded-lg p-3 border border-zinc-800">
                  <div className={`font-semibold text-xl ${service.status === 'operational' ? 'text-green-500' : 'text-amber-500'}`}>
                    {service.uptime}
                  </div>
                  <div className="text-zinc-500 truncate text-xs">{service.name}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Historia incydentów */}
      <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-400">
        <h2 className="text-2xl font-semibold text-white">Historia incydentów</h2>
        <div className="space-y-4">
          {incidents.map((incident, index) => (
            <Card key={index} className="overflow-hidden border border-zinc-800 hover:border-zinc-700 transition-colors duration-300 bg-zinc-900" style={{ animationDelay: `${(index + 5) * 150}ms` }}>
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {incident.icon}
                    <CardTitle className="text-xl text-white">{incident.title}</CardTitle>
                  </div>
                  <IncidentStatusBadge status={incident.status} />
                </div>
                <CardDescription className="flex items-center gap-2 text-zinc-500">
                  <CalendarBadge date={incident.date} />
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="relative pl-6 before:absolute before:left-2 before:top-0 before:w-0.5 before:h-full before:bg-zinc-700">
                  <ul className="space-y-4 mt-3">
                    {incident.updates.map((update: { time: string | number | bigint | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<AwaitedReactNode> | null | undefined; message: string | number | bigint | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<AwaitedReactNode> | null | undefined; }, updateIndex: Key | null | undefined) => (
                      <li key={updateIndex} className="relative text-sm pl-6 pb-4">
                        <div className="absolute left-[-6px] top-1.5 w-3 h-3 rounded-full bg-zinc-800 border border-zinc-600"></div>
                        <div className="font-medium text-zinc-300 mb-1">{update.time}</div>
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
    </div>
  );
}