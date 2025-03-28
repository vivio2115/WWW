"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { CheckCircle, XCircle, Edit, Search, Filter, AlertTriangle, Eye } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { ScamReport, StatusIndicator, ReportStatus } from "@/types/admin";

// Mock data do przykładu
const MOCK_REPORTS: ScamReport[] = [
  {
    id: "RPT-2023-001",
    scammerData: {
      name: "Jan Kowalski",
      phoneNumber: "500123456",
      email: "fake@scammer.com",
      bankAccount: "12 1234 5678 9012 3456 7890 1234",
      socialMedia: "@fake_scammer",
    },
    description: "Oszust sprzedający nieistniejące telefony na OLX. Pobiera zaliczki i znika.",
    proof: "screenshots/proof1.jpg",
    reportedBy: "anonymous",
    date: "2023-05-15",
    status: "pending",
    verificationNote: "",
  },
  {
    id: "RPT-2023-002",
    scammerData: {
      name: "Anna Nowak",
      phoneNumber: "600789012",
      email: "scam@fakeshop.pl",
      bankAccount: "11 9876 5432 1098 7654 3210 9876",
      socialMedia: "@fake_shop_deals",
    },
    description: "Fake shop sprzedający podrobione ubrania marek premium. Towary nigdy nie docierają.",
    proof: "screenshots/proof2.jpg",
    reportedBy: "jan.kowalski@example.com",
    date: "2023-06-10",
    status: "approved",
    verificationNote: "Potwierdzone oszustwo. Sklep nie istnieje, a dane kontaktowe są fikcyjne. Potwierdzono 15 poszkodowanych na kwotę ponad 25 000 zł.",
    verifiedBy: "admin",
    verificationDate: "2023-06-15",
  },
  {
    id: "RPT-2023-003",
    scammerData: {
      name: "Unknown",
      phoneNumber: "700345678",
      email: "crypto@investment.scam",
      bankAccount: "10 1111 2222 3333 4444 5555 6666",
      socialMedia: "@crypto_millionaire",
    },
    description: "Oszustwo inwestycyjne kryptowalutowe. Obiecuje 300% zwrotu w miesiąc.",
    proof: "screenshots/proof3.jpg",
    reportedBy: "ofiara@example.com",
    date: "2023-07-20",
    status: "rejected",
    verificationNote: "Brak wystarczających dowodów na oszustwo. Zgłaszający nie dostarczył konkretnych przykładów ani dowodów potwierdzających oszustwo.",
    verifiedBy: "admin",
    verificationDate: "2023-07-22",
  },
  {
    id: "RPT-2023-004",
    scammerData: {
      name: "Sklep XYZ",
      phoneNumber: "800234567",
      email: "contact@xyz-nonexistent.pl",
      bankAccount: "14 5555 6666 7777 8888 9999 0000",
      socialMedia: "@xyz_shop_deals",
    },
    description: "Fałszywy sklep internetowy z elektroniką. Nigdy nie wysyła zamówionych produktów.",
    proof: "screenshots/proof4.jpg",
    reportedBy: "another@example.com",
    date: "2023-08-05",
    status: "pending",
    verificationNote: "",
  },
  {
    id: "RPT-2023-005",
    scammerData: {
      name: "Travel Agency Scam",
      phoneNumber: "900876543",
      email: "booking@faketravels.com",
      bankAccount: "15 3333 4444 5555 6666 7777 8888",
      socialMedia: "@dream_travels_agency",
    },
    description: "Fałszywe biuro podróży. Pobiera zaliczki za wakacje, które nie istnieją.",
    proof: "screenshots/proof5.jpg",
    reportedBy: "family@example.com",
    date: "2023-09-15",
    status: "pending",
    verificationNote: "",
  },
];

const statusColors: Record<ReportStatus, StatusIndicator> = {
  pending: {
    bg: "bg-yellow-500/10",
    text: "text-yellow-500",
    label: "Oczekujące",
    icon: <AlertTriangle className="h-3 w-3" />,
  },
  approved: {
    bg: "bg-green-500/10",
    text: "text-green-500",
    label: "Zatwierdzone",
    icon: <CheckCircle className="h-3 w-3" />,
  },
  rejected: {
    bg: "bg-red-500/10",
    text: "text-red-500",
    label: "Odrzucone",
    icon: <XCircle className="h-3 w-3" />,
  },
};

interface AdminPanelProps {
  defaultTab?: "all" | "pending" | "approved" | "rejected";
}

export default function AdminPanel({ defaultTab = "pending" }: AdminPanelProps) {
  const [reports, setReports] = useState<ScamReport[]>(MOCK_REPORTS);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedReport, setSelectedReport] = useState<ScamReport | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [verificationNote, setVerificationNote] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);

  // Filtrowanie zgłoszeń według statusu i wyszukiwania
  const getFilteredReports = (status: string): ScamReport[] => {
    return reports.filter((report) => {
      const matchesSearch =
        searchTerm === "" ||
        Object.values(report.scammerData).some(
          (value) => typeof value === "string" && value.toLowerCase().includes(searchTerm.toLowerCase())
        ) ||
        report.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        report.id.toLowerCase().includes(searchTerm.toLowerCase());

      if (status === "all") return matchesSearch;
      return report.status === status && matchesSearch;
    });
  };

  const handleApprove = (reportId: string) => {
    if (!verificationNote || verificationNote.trim() === "") {
      alert("Proszę dodać opis weryfikacji przed zatwierdzeniem zgłoszenia");
      return;
    }

    const currentDate = new Date().toISOString().split('T')[0];

    setReports(
      reports.map((report) =>
        report.id === reportId
          ? {
              ...report,
              status: "approved",
              verificationNote: verificationNote,
              verifiedBy: "admin", // W rzeczywistej aplikacji byłby to aktualnie zalogowany użytkownik
              verificationDate: currentDate
            }
          : report
      )
    );
    setIsVerifying(false);
    setIsDetailsOpen(false);
    setVerificationNote("");
  };

  const handleReject = (reportId: string) => {
    if (!verificationNote || verificationNote.trim() === "") {
      alert("Proszę dodać powód odrzucenia zgłoszenia");
      return;
    }

    const currentDate = new Date().toISOString().split('T')[0];

    setReports(
      reports.map((report) =>
        report.id === reportId
          ? {
              ...report,
              status: "rejected",
              verificationNote: verificationNote,
              verifiedBy: "admin", // W rzeczywistej aplikacji byłby to aktualnie zalogowany użytkownik
              verificationDate: currentDate
            }
          : report
      )
    );
    setIsVerifying(false);
    setIsDetailsOpen(false);
    setVerificationNote("");
  };

  const handleViewDetails = (report: ScamReport) => {
    setSelectedReport(report);
    setVerificationNote(report.verificationNote || "");
    setIsVerifying(false);
    setIsDetailsOpen(true);
  };

  const handleStartVerification = () => {
    setIsVerifying(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="relative w-full md:w-1/3">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-zinc-500" />
          <Input
            placeholder="Szukaj zgłoszeń..."
            className="pl-10 bg-zinc-800 border-zinc-700 focus:border-red-500 focus:ring-red-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2 w-full md:w-auto">
          <Button variant="outline" size="sm" className="text-zinc-400 border-zinc-700">
            <Filter className="h-4 w-4 mr-2" /> Filtry
          </Button>
          <Button size="sm" className="bg-red-600 hover:bg-red-700">
            Eksportuj dane
          </Button>
        </div>
      </div>

      <Tabs defaultValue={defaultTab} className="w-full">
        <TabsList className="mb-6 bg-zinc-800 p-1">
          <TabsTrigger value="all" className="data-[state=active]:bg-zinc-700">
            Wszystkie ({getFilteredReports("all").length})
          </TabsTrigger>
          <TabsTrigger value="pending" className="data-[state=active]:bg-zinc-700">
            Oczekujące ({getFilteredReports("pending").length})
          </TabsTrigger>
          <TabsTrigger value="approved" className="data-[state=active]:bg-zinc-700">
            Zatwierdzone ({getFilteredReports("approved").length})
          </TabsTrigger>
          <TabsTrigger value="rejected" className="data-[state=active]:bg-zinc-700">
            Odrzucone ({getFilteredReports("rejected").length})
          </TabsTrigger>
        </TabsList>

        {["all", "pending", "approved", "rejected"].map((status) => (
          <TabsContent key={status} value={status} className="space-y-4">
            {getFilteredReports(status).length === 0 ? (
              <div className="text-center py-12 text-zinc-500">
                Brak zgłoszeń do wyświetlenia
              </div>
            ) : (
              <div className="grid gap-4">
                {getFilteredReports(status).map((report) => (
                  <Card key={report.id} className="bg-zinc-950 border-zinc-800 overflow-hidden">
                    <CardContent className="p-0">
                      <div className="p-4 flex flex-col md:flex-row md:items-center gap-4 justify-between">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <Badge
                              className={`${statusColors[report.status].bg} ${
                                statusColors[report.status].text
                              } flex items-center gap-1`}
                            >
                              {statusColors[report.status].icon}
                              {statusColors[report.status].label}
                            </Badge>
                            <span className="text-xs text-zinc-500">{report.id}</span>
                          </div>
                          <h3 className="font-medium text-white truncate">{report.scammerData.name}</h3>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-2">
                            <div className="flex items-center gap-2 text-sm text-zinc-400">
                              <span className="font-medium text-zinc-500">Telefon:</span>
                              {report.scammerData.phoneNumber}
                            </div>
                            <div className="flex items-center gap-2 text-sm text-zinc-400">
                              <span className="font-medium text-zinc-500">Email:</span>
                              {report.scammerData.email}
                            </div>
                          </div>
                          <p className="text-zinc-400 text-sm mt-2 line-clamp-2">{report.description}</p>
                        </div>
                        <div className="flex flex-wrap md:flex-nowrap gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            className="border-zinc-700 hover:bg-zinc-800"
                            onClick={() => handleViewDetails(report)}
                          >
                            <Eye className="h-4 w-4 mr-2" /> Szczegóły
                          </Button>
                          {report.status === "pending" && (
                            <>
                              <Button
                                variant="outline"
                                size="sm"
                                className="border-green-700 text-green-500 hover:bg-green-900/20 hover:border-green-600"
                                onClick={() => {
                                  handleViewDetails(report);
                                  handleStartVerification();
                                }}
                              >
                                <CheckCircle className="h-4 w-4 mr-2" /> Weryfikuj
                              </Button>
                            </>
                          )}
                          {report.status !== "pending" && (
                            <Button
                              variant="outline"
                              size="sm"
                              className="border-zinc-700 hover:bg-zinc-800"
                            >
                              <Edit className="h-4 w-4 mr-2" /> Edytuj
                            </Button>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>
        ))}
      </Tabs>

      <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
        <DialogContent className="bg-zinc-900 border-zinc-800 text-white max-w-3xl">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold flex items-center gap-2">
              Szczegóły zgłoszenia
              <span className="text-sm font-normal text-zinc-400">{selectedReport?.id}</span>
            </DialogTitle>
            <DialogDescription className="text-zinc-400">
              {isVerifying
                ? "Weryfikacja zgłoszenia - dodaj opis weryfikacji przed podjęciem decyzji"
                : "Pełne informacje o zgłoszonym oszuście."}
            </DialogDescription>
          </DialogHeader>

          {selectedReport && (
            <div className="space-y-6 pt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-medium text-zinc-500 mb-1">Status zgłoszenia</h3>
                    <Badge
                      className={`${statusColors[selectedReport.status].bg} ${
                        statusColors[selectedReport.status].text
                      } flex items-center gap-1`}
                    >
                      {statusColors[selectedReport.status].icon}
                      {statusColors[selectedReport.status].label}
                    </Badge>

                    {selectedReport.verificationDate && (
                      <p className="text-zinc-500 text-xs mt-1">
                        Zweryfikowano: {selectedReport.verificationDate} przez {selectedReport.verifiedBy}
                      </p>
                    )}
                  </div>

                  <div>
                    <h3 className="text-sm font-medium text-zinc-500 mb-1">Dane zgłaszającego</h3>
                    <p className="text-zinc-300">{selectedReport.reportedBy}</p>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium text-zinc-500 mb-1">Data zgłoszenia</h3>
                    <p className="text-zinc-300">{selectedReport.date}</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-medium text-zinc-500 mb-1">Dane oszusta</h3>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <span className="text-zinc-500 w-24">Imię i nazwisko:</span>
                        <span className="text-zinc-300">{selectedReport.scammerData.name}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-zinc-500 w-24">Telefon:</span>
                        <span className="text-zinc-300">{selectedReport.scammerData.phoneNumber}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-zinc-500 w-24">Email:</span>
                        <span className="text-zinc-300">{selectedReport.scammerData.email}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-zinc-500 w-24">Nr konta:</span>
                        <span className="text-zinc-300 text-xs font-mono">{selectedReport.scammerData.bankAccount}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-zinc-500 w-24">Social media:</span>
                        <span className="text-zinc-300">{selectedReport.scammerData.socialMedia}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium text-zinc-500 mb-2">Opis oszustwa ze zgłoszenia</h3>
                <p className="text-zinc-300 bg-zinc-950 p-3 rounded border border-zinc-800">
                  {selectedReport.description}
                </p>
              </div>

              {/* Sekcja weryfikacji i notatek administratora */}
              {((selectedReport.status !== "pending" && selectedReport.verificationNote) || isVerifying) && (
                <div>
                  <h3 className="text-sm font-medium text-zinc-500 mb-2">
                    {isVerifying ? "Dodaj opis weryfikacji:" : "Opis weryfikacji:"}
                  </h3>
                  {isVerifying ? (
                    <Textarea
                      placeholder="Wprowadź opis weryfikacji lub powód odrzucenia..."
                      className="bg-zinc-950 border-zinc-800 text-zinc-300 min-h-[120px]"
                      value={verificationNote}
                      onChange={(e) => setVerificationNote(e.target.value)}
                    />
                  ) : (
                    <p className="text-zinc-300 bg-zinc-950 p-3 rounded border border-zinc-800">
                      {selectedReport.verificationNote}
                    </p>
                  )}
                </div>
              )}

              <div className="flex justify-between gap-4 pt-4">
                {isVerifying ? (
                  <>
                    <Button
                      variant="outline"
                      className="border-red-700 text-red-500 hover:bg-red-900/20 hover:border-red-600 flex-1"
                      onClick={() => handleReject(selectedReport.id)}
                    >
                      <XCircle className="h-4 w-4 mr-2" /> Odrzuć zgłoszenie
                    </Button>
                    <Button
                      className="bg-green-600 hover:bg-green-700 flex-1"
                      onClick={() => handleApprove(selectedReport.id)}
                    >
                      <CheckCircle className="h-4 w-4 mr-2" /> Zatwierdź zgłoszenie
                    </Button>
                  </>
                ) : selectedReport.status === "pending" ? (
                  <>
                    <Button
                      variant="outline"
                      className="border-zinc-700 hover:bg-zinc-800 w-1/2"
                      onClick={() => setIsDetailsOpen(false)}
                    >
                      Zamknij
                    </Button>
                    <Button
                      className="bg-red-600 hover:bg-red-700 w-1/2"
                      onClick={handleStartVerification}
                    >
                      Rozpocznij weryfikację
                    </Button>
                  </>
                ) : (
                  <Button
                    variant="outline"
                    className="border-zinc-700 hover:bg-zinc-800 w-full"
                    onClick={() => setIsDetailsOpen(false)}
                  >
                    Zamknij
                  </Button>
                )}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
