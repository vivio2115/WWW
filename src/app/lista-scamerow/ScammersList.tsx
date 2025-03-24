"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Phone,
  Mail,
  CreditCard,
  User2,
  Calendar,
  AlertTriangle,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Facebook,
  Info
} from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";

// Przykładowe dane, to byłyby pobierane z API w prawdziwej aplikacji
const MOCK_SCAMMERS = Array(50).fill(null).map((_, index) => ({
  id: `SCAM-${1000 + index}`,
  name: index % 3 === 0 ? `Oszust ${index + 1}` : index % 5 === 0 ? `Sklep XYZ${index}` : `Jan Kowalski${index}`,
  contactInfo: {
    phone: index % 3 === 0 ? `+48 ${500000 + index}` : null,
    email: index % 2 === 0 ? `scammer${index}@example.com` : null,
    bankAccount: index % 4 === 0 ? `PL ${61 + index} 1090 ${1000 + index} ${1000 + index} ${1000 + index} ${1000 + index}` : null,
    socialMedia: index % 7 === 0 ? `@scammer${index}` : null,
  },
  description: `Oszust internetowy prowadzący działalność związaną z ${index % 3 === 0 ? "sprzedażą podrobionych ubrań" : index % 4 === 0 ? "fejkową loterią" : "wyłudzaniem przedpłat za nieistniejące produkty"}. Zgłoszony ${1 + (index % 5)} razy w naszej bazie.`,
  reportDate: new Date(Date.now() - (index * 86400000)).toISOString().split('T')[0],
  reportCount: 1 + (index % 5),
  categoryType: index % 3 === 0 ? "individual" : "shop",
  scamType: index % 4 === 0 ? "fake-product" : index % 5 === 0 ? "advance-fee" : "phishing",
}));

// Typy oszustw
const scamTypes = {
  "fake-product": { label: "Fałszywe produkty", color: "bg-red-500/10 text-red-500" },
  "advance-fee": { label: "Wyłudzanie przedpłat", color: "bg-orange-500/10 text-orange-500" },
  "phishing": { label: "Phishing", color: "bg-yellow-500/10 text-yellow-500" },
  "investment": { label: "Fałszywe inwestycje", color: "bg-blue-500/10 text-blue-500" },
  "other": { label: "Inne", color: "bg-zinc-500/10 text-zinc-500" }
};

export default function ScammersList() {
  const [scammers, setScammers] = useState(MOCK_SCAMMERS);
  const [filteredScammers, setFilteredScammers] = useState(MOCK_SCAMMERS);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedScammer, setSelectedScammer] = useState<any>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [filters, setFilters] = useState({
    category: "all", // "all", "individual", "shop"
    scamType: "all", // "all", "fake-product", "advance-fee", etc.
    timeRange: "all", // "all", "week", "month", "year"
  });

  // Liczba elementów na stronę
  const itemsPerPage = 10;

  // Całkowita liczba stron
  const totalPages = Math.ceil(filteredScammers.length / itemsPerPage);

  // Filtry i wyszukiwanie
  useEffect(() => {
    let results = scammers;

    // Filtrowanie według kategorii
    if (filters.category !== "all") {
      results = results.filter(scammer => scammer.categoryType === filters.category);
    }

    // Filtrowanie według typu oszustwa
    if (filters.scamType !== "all") {
      results = results.filter(scammer => scammer.scamType === filters.scamType);
    }

    // Filtrowanie według czasu
    if (filters.timeRange !== "all") {
      const now = new Date();
      const filterDate = new Date();

      switch (filters.timeRange) {
        case "week":
          filterDate.setDate(now.getDate() - 7);
          break;
        case "month":
          filterDate.setMonth(now.getMonth() - 1);
          break;
        case "year":
          filterDate.setFullYear(now.getFullYear() - 1);
          break;
      }

      results = results.filter(scammer => {
        const reportDate = new Date(scammer.reportDate);
        return reportDate >= filterDate;
      });
    }

    // Wyszukiwanie
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      results = results.filter(scammer => {
        return (
          (scammer.name && scammer.name.toLowerCase().includes(query)) ||
          (scammer.contactInfo.phone && scammer.contactInfo.phone.includes(query)) ||
          (scammer.contactInfo.email && scammer.contactInfo.email.toLowerCase().includes(query)) ||
          (scammer.contactInfo.bankAccount && scammer.contactInfo.bankAccount.includes(query)) ||
          (scammer.contactInfo.socialMedia && scammer.contactInfo.socialMedia.toLowerCase().includes(query)) ||
          scammer.description.toLowerCase().includes(query)
        );
      });
    }

    setFilteredScammers(results);
    setCurrentPage(1); // Reset do pierwszej strony po zmianie filtrów
  }, [scammers, searchQuery, filters]);

  // Pobranie scammerów dla bieżącej strony
  const getCurrentPageScammers = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = Math.min(startIndex + itemsPerPage, filteredScammers.length);
    return filteredScammers.slice(startIndex, endIndex);
  };

  // Obsługa paginacji
  const goToPage = (page: number) => {
    if (page < 1) page = 1;
    if (page > totalPages) page = totalPages;
    setCurrentPage(page);
  };

  const showScammerDetails = (scammer: any) => {
    setSelectedScammer(scammer);
    setIsDetailsOpen(true);
  };

  // Renderowanie znacznika typu oszustwa
  const renderScamType = (type: string) => {
    const scamType = scamTypes[type as keyof typeof scamTypes] || scamTypes.other;
    return (
      <Badge className={`${scamType.color} py-1`}>
        {scamType.label}
      </Badge>
    );
  };

  return (
    <div className="space-y-6">
      {/* Filtry */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="col-span-1 md:col-span-2">
          <select
            className="w-full bg-zinc-800 border-zinc-700 rounded-md text-white p-2 focus:ring-red-500 focus:border-red-500"
            onChange={(e) => setFilters({...filters, category: e.target.value})}
            value={filters.category}
          >
            <option value="all">Wszystkie kategorie</option>
            <option value="individual">Osoby prywatne</option>
            <option value="shop">Sklepy / Firmy</option>
          </select>
        </div>
        <div>
          <select
            className="w-full bg-zinc-800 border-zinc-700 rounded-md text-white p-2 focus:ring-red-500 focus:border-red-500"
            onChange={(e) => setFilters({...filters, scamType: e.target.value})}
            value={filters.scamType}
          >
            <option value="all">Wszystkie typy oszustw</option>
            <option value="fake-product">Fałszywe produkty</option>
            <option value="advance-fee">Wyłudzanie przedpłat</option>
            <option value="phishing">Phishing</option>
            <option value="investment">Fałszywe inwestycje</option>
            <option value="other">Inne</option>
          </select>
        </div>
        <div>
          <select
            className="w-full bg-zinc-800 border-zinc-700 rounded-md text-white p-2 focus:ring-red-500 focus:border-red-500"
            onChange={(e) => setFilters({...filters, timeRange: e.target.value})}
            value={filters.timeRange}
          >
            <option value="all">Wszystkie daty</option>
            <option value="week">Ostatni tydzień</option>
            <option value="month">Ostatni miesiąc</option>
            <option value="year">Ostatni rok</option>
          </select>
        </div>
      </div>

      {/* Lista scammerów */}
      <div className="space-y-4">
        {filteredScammers.length === 0 ? (
          <div className="text-center py-12 text-zinc-500">
            Nie znaleziono żadnych oszustów spełniających kryteria wyszukiwania.
          </div>
        ) : (
          <>
            {getCurrentPageScammers().map((scammer) => (
              <Card key={scammer.id} className="bg-zinc-900 border-zinc-800 overflow-hidden hover:bg-zinc-850 transition-colors">
                <CardContent className="p-4">
                  <div className="flex flex-col md:flex-row gap-4 justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        {renderScamType(scammer.scamType)}
                        <span className="text-xs text-zinc-500">ID: {scammer.id}</span>
                      </div>
                      <h3 className="font-semibold text-white mb-2">{scammer.name}</h3>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {scammer.contactInfo.phone && (
                          <div className="flex items-center gap-2 text-sm">
                            <Phone className="h-4 w-4 text-zinc-400" />
                            <span className="text-zinc-300">{scammer.contactInfo.phone}</span>
                          </div>
                        )}
                        {scammer.contactInfo.email && (
                          <div className="flex items-center gap-2 text-sm">
                            <Mail className="h-4 w-4 text-zinc-400" />
                            <span className="text-zinc-300 truncate">{scammer.contactInfo.email}</span>
                          </div>
                        )}
                        {scammer.contactInfo.bankAccount && (
                          <div className="flex items-center gap-2 text-sm">
                            <CreditCard className="h-4 w-4 text-zinc-400" />
                            <span className="text-zinc-300 font-mono text-xs truncate">{scammer.contactInfo.bankAccount}</span>
                          </div>
                        )}
                        {scammer.contactInfo.socialMedia && (
                          <div className="flex items-center gap-2 text-sm">
                            <Facebook className="h-4 w-4 text-zinc-400" />
                            <span className="text-zinc-300">{scammer.contactInfo.socialMedia}</span>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="flex flex-col md:items-end gap-2">
                      <div className="flex items-center gap-1 text-sm text-zinc-400">
                        <Calendar className="h-4 w-4" />
                        <span>Zgłoszony: {scammer.reportDate}</span>
                      </div>
                      <div className="flex items-center gap-1 text-sm text-zinc-400">
                        <AlertTriangle className="h-4 w-4 text-red-500" />
                        <span>Liczba zgłoszeń: <strong className="text-red-500">{scammer.reportCount}</strong></span>
                      </div>
                      <Button
                        variant="outline"
                        className="mt-2 border-zinc-700 hover:bg-zinc-800 text-sm"
                        onClick={() => showScammerDetails(scammer)}
                      >
                        <Info className="h-4 w-4 mr-1" /> Szczegóły oszustwa
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </>
        )}
      </div>

      {/* Paginacja */}
      {filteredScammers.length > 0 && (
        <div className="flex items-center justify-between pt-4 border-t border-zinc-800">
          <div className="text-sm text-zinc-500">
            Wyświetlanie {Math.min(filteredScammers.length, (currentPage - 1) * itemsPerPage + 1)}-{Math.min(currentPage * itemsPerPage, filteredScammers.length)} z {filteredScammers.length} wyników
          </div>
          <div className="flex items-center gap-1">
            <Button
              variant="outline"
              size="icon"
              className="w-8 h-8 border-zinc-700 hover:bg-zinc-800"
              onClick={() => goToPage(1)}
              disabled={currentPage === 1}
            >
              <ChevronsLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="w-8 h-8 border-zinc-700 hover:bg-zinc-800"
              onClick={() => goToPage(currentPage - 1)}
              disabled={currentPage === 1}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>

            <div className="text-sm text-zinc-400 px-3">
              Strona {currentPage} z {totalPages}
            </div>

            <Button
              variant="outline"
              size="icon"
              className="w-8 h-8 border-zinc-700 hover:bg-zinc-800"
              onClick={() => goToPage(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="w-8 h-8 border-zinc-700 hover:bg-zinc-800"
              onClick={() => goToPage(totalPages)}
              disabled={currentPage === totalPages}
            >
              <ChevronsRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}

      {/* Modal ze szczegółami scammera */}
      <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
        <DialogContent className="bg-zinc-900 border-zinc-800 text-white">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              Szczegóły oszustwa
              <Badge className="ml-2 bg-red-600">{selectedScammer?.id}</Badge>
            </DialogTitle>
            <DialogDescription className="text-zinc-400">
              Pełne informacje o zgłoszonym oszuście.
            </DialogDescription>
          </DialogHeader>

          {selectedScammer && (
            <div className="space-y-4 mt-4">
              <div className="flex items-center gap-2">
                <User2 className="h-5 w-5 text-zinc-400" />
                <h3 className="text-lg font-semibold text-white">{selectedScammer.name}</h3>
                {renderScamType(selectedScammer.scamType)}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-zinc-800/50 p-4 rounded-lg border border-zinc-700">
                {selectedScammer.contactInfo.phone && (
                  <div className="space-y-1">
                    <div className="text-xs text-zinc-500">Numer telefonu</div>
                    <div className="text-zinc-200 flex items-center gap-2">
                      <Phone className="h-4 w-4 text-zinc-400" />
                      {selectedScammer.contactInfo.phone}
                    </div>
                  </div>
                )}
                {selectedScammer.contactInfo.email && (
                  <div className="space-y-1">
                    <div className="text-xs text-zinc-500">Adres e-mail</div>
                    <div className="text-zinc-200 flex items-center gap-2">
                      <Mail className="h-4 w-4 text-zinc-400" />
                      {selectedScammer.contactInfo.email}
                    </div>
                  </div>
                )}
                {selectedScammer.contactInfo.bankAccount && (
                  <div className="space-y-1">
                    <div className="text-xs text-zinc-500">Numer konta</div>
                    <div className="text-zinc-200 flex items-center gap-2">
                      <CreditCard className="h-4 w-4 text-zinc-400" />
                      <span className="font-mono text-xs">{selectedScammer.contactInfo.bankAccount}</span>
                    </div>
                  </div>
                )}
                {selectedScammer.contactInfo.socialMedia && (
                  <div className="space-y-1">
                    <div className="text-xs text-zinc-500">Media społecznościowe</div>
                    <div className="text-zinc-200 flex items-center gap-2">
                      <Facebook className="h-4 w-4 text-zinc-400" />
                      {selectedScammer.contactInfo.socialMedia}
                    </div>
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <div className="text-sm font-medium text-zinc-400">Opis oszustwa</div>
                <div className="p-3 rounded-lg bg-zinc-950 border border-zinc-800 text-zinc-300">
                  {selectedScammer.description}
                </div>
              </div>

              <div className="flex items-center justify-between text-sm text-zinc-400 pt-2 mt-2 border-t border-zinc-800">
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  Zgłoszony: {selectedScammer.reportDate}
                </div>
                <Badge className="bg-red-900/50 text-red-400 flex items-center gap-1">
                  <AlertTriangle className="h-3 w-3" />
                  Zgłoszenia: {selectedScammer.reportCount}
                </Badge>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
