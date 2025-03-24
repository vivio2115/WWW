"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Info, AlertCircle } from "lucide-react";

// This would come from a database in a real application
const SCAMMERS_DATA = [
  {
    id: "1",
    scamType: "Fałszywe ogłoszenie sprzedaży",
    reportDate: "2023-12-10",
    contacts: {
      phone: "500100200",
      email: "fake.seller@scam-mail.com",
      bankAccount: "12 3456 7890 1234 5678 9012 3456",
    },
    description: "Wystawił ogłoszenie sprzedaży telefonu iPhone 13 Pro na popularnym portalu ogłoszeniowym. Po wpłacie pieniędzy nie wysłał towaru i zablokował kontakt z kupującym.",
    verified: true,
    reportCount: 7,
  },
  {
    id: "2",
    scamType: "Oszustwo przy zakupie",
    reportDate: "2024-01-15",
    contacts: {
      phone: "600200300",
      email: "buyer123@fakemail.pl",
    },
    description: "Udawał zainteresowanie zakupem roweru. Prosił o wysyłkę za pobraniem, następnie nie odebrał przesyłki. Sprzedający poniósł koszty wysyłki i zwrotu.",
    verified: true,
    reportCount: 3,
  },
  {
    id: "3",
    scamType: "Fałszywa inwestycja",
    reportDate: "2024-02-20",
    contacts: {
      email: "invest.secure@finance-trust.net",
      website: "crypto-invest-pl.net",
    },
    description: "Prowadzi stronę oferującą inwestycje w kryptowaluty z gwarantowanym zyskiem 15% miesięcznie. Po wpłacie pieniędzy nie można ich wypłacić, a kontakt z serwisem jest niemożliwy.",
    verified: true,
    reportCount: 15,
  },
  {
    id: "4",
    scamType: "Phishing",
    reportDate: "2024-03-05",
    contacts: {
      email: "support@allegro-secure.co",
      website: "allegro-secure-payment.co",
    },
    description: "Wysyła e-maile podszywające się pod serwis Allegro z informacją o problemie z płatnością. Link w e-mailu prowadzi do fałszywej strony wyłudzającej dane logowania i dane karty.",
    verified: true,
    reportCount: 23,
  },
  {
    id: "5",
    scamType: "Oszustwo na portalu randkowym",
    reportDate: "2024-03-12",
    contacts: {
      phone: "700300400",
      socialMedia: "@johny.american.soldier",
    },
    description: "Na portalu randkowym podszywa się pod amerykańskiego żołnierza. Nawiązuje bliskie relacje, a następnie prosi o pomoc finansową na rzekomy powrót do Polski. Po otrzymaniu pieniędzy zrywa kontakt.",
    verified: false,
    reportCount: 1,
  },
];

export default function ScammersList() {
  return (
    <div>
      <Table className="border border-zinc-800">
        <TableHeader className="bg-zinc-900">
          <TableRow className="border-zinc-800 hover:bg-zinc-800">
            <TableHead className="text-zinc-300">Typ oszustwa</TableHead>
            <TableHead className="text-zinc-300">Data zgłoszenia</TableHead>
            <TableHead className="text-zinc-300">Dane kontaktowe</TableHead>
            <TableHead className="text-right text-zinc-300">Liczba zgłoszeń</TableHead>
            <TableHead className="text-right text-zinc-300">Szczegóły</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {SCAMMERS_DATA.map((scammer) => (
            <TableRow key={scammer.id} className="border-zinc-800 hover:bg-zinc-800">
              <TableCell className="font-medium text-white">
                <div className="flex flex-col">
                  {scammer.scamType}
                  {scammer.verified && (
                    <Badge variant="destructive" className="w-fit mt-1 bg-red-900 text-red-100 hover:bg-red-800">
                      Zweryfikowany
                    </Badge>
                  )}
                </div>
              </TableCell>
              <TableCell className="text-zinc-300">{formatDate(scammer.reportDate)}</TableCell>
              <TableCell>
                <div className="text-sm space-y-1 text-zinc-400">
                  {scammer.contacts.phone && (
                    <p><span className="font-medium text-zinc-300">Tel:</span> {scammer.contacts.phone}</p>
                  )}
                  {scammer.contacts.email && (
                    <p><span className="font-medium text-zinc-300">Email:</span> {scammer.contacts.email}</p>
                  )}
                  {scammer.contacts.bankAccount && (
                    <p><span className="font-medium text-zinc-300">Konto:</span> {scammer.contacts.bankAccount}</p>
                  )}
                  {scammer.contacts.website && (
                    <p><span className="font-medium text-zinc-300">WWW:</span> {scammer.contacts.website}</p>
                  )}
                  {scammer.contacts.socialMedia && (
                    <p><span className="font-medium text-zinc-300">Social:</span> {scammer.contacts.socialMedia}</p>
                  )}
                </div>
              </TableCell>
              <TableCell className="text-right">
                <span className="font-semibold text-white">{scammer.reportCount}</span>
              </TableCell>
              <TableCell className="text-right">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="ghost" size="icon" className="text-zinc-300 hover:text-white hover:bg-zinc-800">
                      <Info className="h-4 w-4" />
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="bg-zinc-900 border-zinc-800">
                    <DialogHeader>
                      <DialogTitle className="flex items-center gap-2 text-white">
                        <AlertCircle className="h-5 w-5 text-red-500" />
                        {scammer.scamType}
                      </DialogTitle>
                      <DialogDescription className="text-zinc-400">
                        Zgłoszony {formatDate(scammer.reportDate)} • {scammer.reportCount} {getReportLabel(scammer.reportCount)}
                      </DialogDescription>
                    </DialogHeader>

                    <div className="space-y-4">
                      <div>
                        <h3 className="font-medium mb-1 text-white">Dane oszusta:</h3>
                        <div className="text-sm space-y-1 text-zinc-400">
                          {scammer.contacts.phone && (
                            <p><span className="font-medium text-zinc-300">Telefon:</span> {scammer.contacts.phone}</p>
                          )}
                          {scammer.contacts.email && (
                            <p><span className="font-medium text-zinc-300">E-mail:</span> {scammer.contacts.email}</p>
                          )}
                          {scammer.contacts.bankAccount && (
                            <p><span className="font-medium text-zinc-300">Konto bankowe:</span> {scammer.contacts.bankAccount}</p>
                          )}
                          {scammer.contacts.website && (
                            <p><span className="font-medium text-zinc-300">Strona WWW:</span> {scammer.contacts.website}</p>
                          )}
                          {scammer.contacts.socialMedia && (
                            <p><span className="font-medium text-zinc-300">Media społecznościowe:</span> {scammer.contacts.socialMedia}</p>
                          )}
                        </div>
                      </div>

                      <div>
                        <h3 className="font-medium mb-1 text-white">Opis oszustwa:</h3>
                        <p className="text-sm text-zinc-400">{scammer.description}</p>
                      </div>

                      <div className="bg-zinc-800 p-3 rounded-md text-sm">
                        <p className="text-zinc-400">
                          Pamiętaj, aby zawsze weryfikować dane kontrahentów przed dokonaniem transakcji.
                          Jeśli posiadasz więcej informacji o tym oszuście, zgłoś je poprzez formularz zgłoszeniowy.
                        </p>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

// Helper function to format dates
function formatDate(dateString: string) {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('pl-PL', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  }).format(date);
}

// Helper function to get the right label for the number of reports
function getReportLabel(count: number) {
  if (count === 1) return "zgłoszenie";
  if (count >= 2 && count <= 4) return "zgłoszenia";
  return "zgłoszeń";
}
