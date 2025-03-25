"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, AlertTriangle, Info } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

// Przykładowe dane oszustów (w prawdziwej aplikacji byłyby pobierane z API)
const VERIFIED_SCAMMERS = [
  {
    id: "SCM-2023-001",
    name: "Jan Kowalski",
    contactInfo: {
      phone: "500123456",
      email: "fake@scammer.com",
      bankAccount: "12 1234 5678 9012 3456 7890 1234",
    },
    verificationDate: "2023-06-15",
    verificationNote: "Potwierdzone oszustwo. Osoba wyłudza zaliczki za nieistniejące telefony oferowane na portalach sprzedażowych. Nigdy nie wysyła zakupionych przedmiotów. Potwierdzono 12 przypadków oszustwa na łączną kwotę około 15 000 zł.",
    scamType: "Fałszywe ogłoszenie sprzedaży",
  },
  {
    id: "SCM-2023-002",
    name: "SuperSklep24.pl",
    contactInfo: {
      email: "kontakt@supersklep24.pl",
      website: "https://supersklep24.pl",
      bankAccount: "11 9876 5432 1098 7654 3210 9876",
    },
    verificationDate: "2023-07-10",
    verificationNote: "Fałszywy sklep internetowy. Nigdy nie wysyła zamówionych produktów. Strona jest kopią legalnie działającego sklepu, z podmienionymi danymi kontaktowymi i numerem konta. Zidentyfikowano ponad 30 poszkodowanych na kwotę przekraczającą 40 000 zł.",
    scamType: "Fałszywy sklep internetowy",
  },
  {
    id: "SCM-2023-003",
    name: "Crypto Investments Pro",
    contactInfo: {
      email: "invest@cryptopro-invest.com",
      website: "https://crypto-investment-pro.com",
      socialMedia: "@crypto_invest_pro",
    },
    verificationDate: "2023-08-05",
    verificationNote: "Fałszywa platforma inwestycyjna. Obiecuje nierealistyczne zyski z inwestycji w kryptowaluty (300% w ciągu miesiąca). Po wpłacie środków, uniemożliwia ich wypłatę. Oszustwo działa na zasadzie piramidy finansowej.",
    scamType: "Fałszywa inwestycja",
  },
  {
    id: "SCM-2023-004",
    name: "Dream Travel Agency",
    contactInfo: {
      phone: "700345678",
      email: "booking@dreamtravel-agency.com",
      website: "https://dreamtravel-agency.net",
      bankAccount: "15 3333 4444 5555 6666 7777 8888",
    },
    verificationDate: "2023-09-20",
    verificationNote: "Fałszywe biuro podróży. Pobiera zaliczki za wakacje, które nigdy się nie odbywają. Poszkodowanych co najmniej 45 osób, głównie rodziny z dziećmi. Łączna kwota strat to około 230 000 zł.",
    scamType: "Oszustwo turystyczne",
  },
];

export function VerifiedScammers() {
  const [selectedScammer, setSelectedScammer] = useState<any>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  const handleShowDetails = (scammer: any) => {
    setSelectedScammer(scammer);
    setIsDetailsOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold text-white">Zweryfikowani oszuści</h2>
        <Badge className="bg-green-600 hover:bg-green-700">
          <CheckCircle className="h-3 w-3 mr-1" /> Zweryfikowane
        </Badge>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {VERIFIED_SCAMMERS.map((scammer) => (
          <Card 
            key={scammer.id} 
            className="bg-zinc-900 border-zinc-800 hover:border-red-800 cursor-pointer transition-colors"
            onClick={() => handleShowDetails(scammer)}
          >
            <CardContent className="p-4">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-medium text-white">{scammer.name}</h3>
                <Badge className="bg-zinc-800 text-zinc-400 text-xs">
                  {scammer.scamType}
                </Badge>
              </div>
              <div className="space-y-1 text-sm text-zinc-400">
                {scammer.contactInfo.phone && (
                  <div className="flex items-center gap-2">
                    <span className="text-zinc-500">Tel:</span>
                    <span>{scammer.contactInfo.phone}</span>
                  </div>
                )}
                {scammer.contactInfo.email && (
                  <div className="flex items-center gap-2">
                    <span className="text-zinc-500">Email:</span>
                    <span>{scammer.contactInfo.email}</span>
                  </div>
                )}
                {scammer.contactInfo.website && (
                  <div className="flex items-center gap-2">
                    <span className="text-zinc-500">Strona:</span>
                    <span>{scammer.contactInfo.website}</span>
                  </div>
                )}
              </div>
              <div className="flex justify-between items-center mt-3 text-xs text-zinc-500">
                <div className="flex items-center">
                  <Info className="h-3 w-3 mr-1" />
                  <span>Kliknij, aby zobaczyć więcej</span>
                </div>
                <div>Zweryfikowano: {scammer.verificationDate}</div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
        <DialogContent className="bg-zinc-900 border-zinc-800 text-white max-w-3xl">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold flex items-center gap-2">
              <span>{selectedScammer?.name}</span>
              <Badge className="ml-2 bg-green-600 text-xs">
                <CheckCircle className="h-3 w-3 mr-1" /> Zweryfikowane
              </Badge>
            </DialogTitle>
            <DialogDescription className="text-zinc-400">
              Zweryfikowane oszustwo | ID: {selectedScammer?.id}
            </DialogDescription>
          </DialogHeader>

          {selectedScammer && (
            <div className="space-y-6 pt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-medium text-zinc-500 mb-1">Typ oszustwa</h3>
                    <Badge className="bg-zinc-800 text-zinc-300">
                      {selectedScammer.scamType}
                    </Badge>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium text-zinc-500 mb-1">Data weryfikacji</h3>
                    <p className="text-zinc-300">{selectedScammer.verificationDate}</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-medium text-zinc-500 mb-1">Dane kontaktowe oszusta</h3>
                    <div className="space-y-2">
                      {selectedScammer.contactInfo.phone && (
                        <div className="flex items-center gap-2">
                          <span className="text-zinc-500 w-24">Telefon:</span>
                          <span className="text-zinc-300">{selectedScammer.contactInfo.phone}</span>
                        </div>
                      )}
                      {selectedScammer.contactInfo.email && (
                        <div className="flex items-center gap-2">
                          <span className="text-zinc-500 w-24">Email:</span>
                          <span className="text-zinc-300">{selectedScammer.contactInfo.email}</span>
                        </div>
                      )}
                      {selectedScammer.contactInfo.website && (
                        <div className="flex items-center gap-2">
                          <span className="text-zinc-500 w-24">Strona:</span>
                          <span className="text-zinc-300">{selectedScammer.contactInfo.website}</span>
                        </div>
                      )}
                      {selectedScammer.contactInfo.bankAccount && (
                        <div className="flex items-center gap-2">
                          <span className="text-zinc-500 w-24">Nr konta:</span>
                          <span className="text-zinc-300 text-xs font-mono">{selectedScammer.contactInfo.bankAccount}</span>
                        </div>
                      )}
                      {selectedScammer.contactInfo.socialMedia && (
                        <div className="flex items-center gap-2">
                          <span className="text-zinc-500 w-24">Social media:</span>
                          <span className="text-zinc-300">{selectedScammer.contactInfo.socialMedia}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="text-sm font-medium text-zinc-500">Informacje o weryfikacji</h3>
                  <AlertTriangle className="h-4 w-4 text-amber-500" />
                </div>
                <div className="bg-zinc-950 p-4 rounded border border-zinc-800">
                  <p className="text-zinc-300">{selectedScammer.verificationNote}</p>
                </div>
              </div>

              <div className="bg-red-950/30 border border-red-900/50 rounded p-4 text-sm text-zinc-300">
                <p className="flex items-start gap-2">
                  <AlertTriangle className="h-4 w-4 text-red-500 mt-0.5 flex-shrink-0" />
                  <span>
                    Jeśli otrzymałeś wiadomość od tej osoby/firmy lub rozpoznajesz te dane kontaktowe,
                    zachowaj szczególną ostrożność. W przypadku, gdy padłeś ofiarą tego oszustwa,
                    zgłoś sprawę na policję oraz skontaktuj się z bankiem, aby zgłosić podejrzane transakcje.
                  </span>
                </p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}