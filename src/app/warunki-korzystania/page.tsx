"use client";

import { Metadata } from "next";
import { motion } from "framer-motion";
import {
  BookOpen, AlertTriangle, ShieldIcon, Users, Scale,
  FileWarning, FileText, Gavel
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

// export const metadata: Metadata = {
//   title: "Warunki Korzystania z Serwisu | Scamerzy",
//   description: "Zapoznaj się z warunkami korzystania z serwisu Scamerzy",
// };

export default function TermsOfServicePage() {
  // Animacje dla framer-motion
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 }
    }
  };

  const sections = [
    {
      id: "acceptance",
      title: "Akceptacja warunków",
      icon: <BookOpen className="h-5 w-5 text-red-500" />,
      content: (
        <>
          <p className="mb-4">
            Korzystając z serwisu Scamerzy (zwanego dalej "Serwisem"), akceptujesz niniejsze Warunki Korzystania z Serwisu w całości.
            Jeśli nie zgadzasz się z którymkolwiek z tych warunków, nie możesz korzystać z Serwisu.
          </p>
          <p className="mb-4">
            Niniejsze Warunki Korzystania mogą zostać zmienione przez nas w dowolnym momencie. Zmiany wchodzą w życie natychmiast
            po ich opublikowaniu w Serwisie. Dalsze korzystanie z Serwisu po zmianach oznacza akceptację nowych warunków.
          </p>
          <p>
            Wszystkie informacje dotyczące przetwarzania danych osobowych znajdują się w
            <a href="/polityka-prywatnosci" className="text-red-500 hover:underline ml-1">Polityce Prywatności</a>.
          </p>
        </>
      )
    },
    {
      id: "services",
      title: "Opis usług",
      icon: <ShieldIcon className="h-5 w-5 text-red-500" />,
      content: (
        <>
          <p className="mb-4">
            Serwis Scamerzy jest platformą umożliwiającą:
          </p>
          <ul className="list-disc pl-6 space-y-2 mb-4">
            <li>Zgłaszanie potencjalnych oszustów internetowych</li>
            <li>Wyszukiwanie i weryfikację potencjalnych oszustów na podstawie danych kontaktowych</li>
            <li>Dostęp do bazy danych oszustów poprzez API (dla uprawnionych podmiotów)</li>
            <li>Edukację w zakresie rozpoznawania i unikania oszustw internetowych</li>
          </ul>
          <p>
            Serwis jest dostępny bezpłatnie dla wszystkich użytkowników. Niektóre zaawansowane funkcje, takie jak dostęp do API,
            mogą wymagać rejestracji lub mogą być dostępne na zasadach komercyjnych dla partnerów biznesowych.
          </p>
        </>
      )
    },
    {
      id: "user-responsibilities",
      title: "Obowiązki użytkownika",
      icon: <Users className="h-5 w-5 text-red-500" />,
      content: (
        <>
          <p className="mb-4">
            Korzystając z naszego Serwisu, zobowiązujesz się do:
          </p>
          <ul className="list-disc pl-6 space-y-2 mb-4">
            <li>Podawania prawdziwych i dokładnych informacji podczas zgłaszania oszustw</li>
            <li>Nienadużywania Serwisu do celów niezgodnych z jego przeznaczeniem</li>
            <li>Niestosowania automatycznych narzędzi do pobierania danych bez naszej zgody</li>
            <li>Nienaruszania praw innych użytkowników oraz osób trzecich</li>
            <li>Przestrzegania wszystkich obowiązujących przepisów prawa podczas korzystania z Serwisu</li>
            <li>Niezgłaszania osób lub podmiotów, które nie są oszustami, w celu zaszkodzenia ich reputacji</li>
          </ul>
          <div className="p-4 bg-amber-500/10 border border-amber-500/20 rounded-md text-amber-500 flex gap-2 items-start">
            <AlertTriangle className="h-5 w-5 flex-shrink-0 mt-0.5" />
            <p className="text-sm">
              <strong>UWAGA:</strong> Celowe zgłaszanie fałszywych informacji jest niezgodne z prawem i może skutkować
              odpowiedzialnością prawną oraz zablokowaniem dostępu do Serwisu.
            </p>
          </div>
        </>
      )
    },
    {
      id: "content-reports",
      title: "Zgłoszenia i zawartość",
      icon: <FileWarning className="h-5 w-5 text-red-500" />,
      content: (
        <>
          <p className="mb-4">
            Zgłaszając oszusta, oświadczasz, że:
          </p>
          <ul className="list-disc pl-6 space-y-2 mb-4">
            <li>Podane przez Ciebie informacje są zgodne z prawdą i oparte na faktach</li>
            <li>Posiadasz dowody na działania oszukańcze zgłaszanego podmiotu</li>
            <li>Zgłoszenie nie narusza praw osób trzecich</li>
          </ul>
          <p className="mb-4">
            Zastrzegamy sobie prawo do:
          </p>
          <ul className="list-disc pl-6 space-y-2 mb-4">
            <li>Moderowania wszystkich zgłoszeń przed ich publikacją</li>
            <li>Odrzucenia zgłoszeń, które nie spełniają naszych standardów</li>
            <li>Usunięcia zgłoszeń w przypadku otrzymania wiarygodnych informacji o ich nieprawidłowości</li>
            <li>Przekazania danych zgłaszającego organom ścigania w przypadku naruszeń prawa</li>
          </ul>
          <p>
            Udzielasz nam niewyłącznej, bezpłatnej licencji na wykorzystanie treści zgłoszeń w celu świadczenia usług Serwisu,
            w tym ich publikowania i udostępniania innym użytkownikom.
          </p>
        </>
      )
    },
    {
      id: "verification",
      title: "Weryfikacja zgłoszeń",
      icon: <Scale className="h-5 w-5 text-red-500" />,
      content: (
        <>
          <p className="mb-4">
            Dokładamy wszelkich starań, aby weryfikować otrzymywane zgłoszenia, jednak:
          </p>
          <ul className="list-disc pl-6 space-y-2 mb-4">
            <li>Nie możemy zagwarantować stuprocentowej dokładności wszystkich informacji w bazie danych</li>
            <li>Nasza weryfikacja opiera się na dostępnych nam danych i narzędziach</li>
            <li>Oznaczamy poziom wiarygodności każdego zgłoszenia na podstawie dostępnych dowodów</li>
          </ul>
          <p className="mb-4">
            Podejmując działania na podstawie informacji znalezionych w naszym Serwisie, należy kierować się własnym osądem
            i w miarę możliwości weryfikować informacje z wielu źródeł.
          </p>
          <div className="p-4 bg-amber-500/10 border border-amber-500/20 rounded-md text-amber-500 flex gap-2 items-start">
            <Gavel className="h-5 w-5 flex-shrink-0 mt-0.5" />
            <p className="text-sm">
              <strong>Pamiętaj:</strong> Serwis jest narzędziem pomocniczym w wykrywaniu oszustw, a nie ostatecznym wyrocznią.
              Zachęcamy do zgłaszania błędnych informacji przez formularz kontaktowy.
            </p>
          </div>
        </>
      )
    },
    {
      id: "liability",
      title: "Ograniczenie odpowiedzialności",
      icon: <Gavel className="h-5 w-5 text-red-500" />,
      content: (
        <>
          <p className="mb-4">
            Serwis Scamerzy jest dostarczany w stanie "takim, jaki jest" bez jakichkolwiek gwarancji, wyrażonych wprost lub dorozumianych,
            w tym między innymi dorozumianych gwarancji przydatności handlowej lub przydatności do określonego celu.
          </p>
          <p className="mb-4">
            W żadnym wypadku nie ponosimy odpowiedzialności za jakiekolwiek szkody bezpośrednie, pośrednie, przypadkowe, specjalne
            lub wynikowe (w tym utratę zysków, utratę danych lub przerwę w działalności) wynikające z korzystania lub niemożności
            korzystania z Serwisu, nawet jeśli zostaliśmy poinformowani o możliwości wystąpienia takich szkód.
          </p>
          <p>
            Nasza odpowiedzialność jest ograniczona do maksymalnego zakresu dozwolonego przez obowiązujące prawo.
          </p>
        </>
      )
    },
    {
      id: "intellectual-property",
      title: "Własność intelektualna",
      icon: <FileText className="h-5 w-5 text-red-500" />,
      content: (
        <>
          <p className="mb-4">
            Wszelkie prawa własności intelektualnej dotyczące Serwisu, w tym ale nie ograniczając się do oprogramowania,
            projektów, logo, treści, algorytmów i baz danych, należą do nas lub naszych licencjodawców.
          </p>
          <p className="mb-4">
            Użytkownicy nie mogą:
          </p>
          <ul className="list-disc pl-6 space-y-2 mb-4">
            <li>Kopiować, modyfikować lub dystrybuować materiałów z Serwisu bez naszej zgody</li>
            <li>Dekompilować, odtwarzać kodu źródłowego lub w inny sposób próbować uzyskać dostęp do kodu źródłowego Serwisu</li>
            <li>Usuwać, modyfikować lub ukrywać oznaczeń praw autorskich lub innych informacji o prawach własności w Serwisie</li>
          </ul>
          <p>
            Treści zgłoszeń pozostają własnością ich autorów, którzy udzielają nam licencji na ich wykorzystanie zgodnie
            z opisem w sekcji "Zgłoszenia i zawartość".
          </p>
        </>
      )
    },
    {
      id: "termination",
      title: "Zakończenie korzystania",
      icon: <FileText className="h-5 w-5 text-red-500" />,
      content: (
        <>
          <p className="mb-4">
            Zastrzegamy sobie prawo do, według własnego uznania i bez uprzedzenia:
          </p>
          <ul className="list-disc pl-6 space-y-2 mb-4">
            <li>Odmowy dostępu do Serwisu dowolnemu użytkownikowi</li>
            <li>Usunięcia lub zablokowania konta użytkownika</li>
            <li>Usunięcia lub zablokowania treści wygenerowanych przez użytkownika</li>
            <li>Zmiany, zawieszenia lub zamknięcia części lub całości Serwisu</li>
          </ul>
          <p>
            Powyższe działania mogą zostać podjęte szczególnie w przypadku naruszenia niniejszych Warunków Korzystania,
            naruszenia prawa lub naruszenia praw osób trzecich.
          </p>
        </>
      )
    },
    {
      id: "governing-law",
      title: "Prawo właściwe",
      icon: <Scale className="h-5 w-5 text-red-500" />,
      content: (
        <>
          <p className="mb-4">
            Niniejsze Warunki Korzystania podlegają prawu polskiemu i zgodnie z nim będą interpretowane.
          </p>
          <p className="mb-4">
            Wszelkie spory wynikające z lub związane z korzystaniem z Serwisu będą rozstrzygane przez sądy właściwe dla
            naszej siedziby, chyba że obowiązujące przepisy prawa stanowią inaczej.
          </p>
          <p>
            Jeśli jesteś konsumentem w rozumieniu obowiązujących przepisów, możesz skorzystać z pozasądowych sposobów
            rozpatrywania reklamacji i dochodzenia roszczeń zgodnie z przepisami prawa.
          </p>
        </>
      )
    },
    {
      id: "contact",
      title: "Kontakt",
      icon: <FileText className="h-5 w-5 text-red-500" />,
      content: (
        <>
          <p className="mb-4">
            W przypadku pytań lub wątpliwości dotyczących niniejszych Warunków Korzystania, prosimy o kontakt:
          </p>
          <div className="p-4 bg-zinc-800 border border-zinc-700 rounded-md mb-4">
            <p className="mb-2"><strong className="text-white">Scamerzy Sp. z o.o.</strong></p>
            <p className="mb-2"><strong className="text-white">Adres:</strong> ul. Bezpieczna 42, 00-001 Warszawa</p>
            <p className="mb-2"><strong className="text-white">E-mail:</strong> <span className="text-red-500">kontakt@scamerzy.pl</span></p>
            <p><strong className="text-white">Telefon:</strong> +48 123 456 789</p>
          </div>
          <p>
            Na wszystkie zapytania staramy się odpowiadać w ciągu 14 dni roboczych.
          </p>
        </>
      )
    }
  ];

  return (
    <div className="container py-12 animate-in fade-in duration-700">
      <div className="max-w-4xl mx-auto">
        {/* Nagłówek */}
        <div className="mb-12 space-y-4 text-center">
          <div className="inline-block p-3 rounded-full bg-red-500/10 mb-4">
            <Gavel className="h-8 w-8 text-red-500" />
          </div>
          <h1 className="text-4xl font-bold tracking-tight text-gradient-red">Warunki Korzystania z Serwisu</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Zapoznaj się z zasadami korzystania z naszej platformy. Twoje bezpieczeństwo i uczciwe zasady są dla nas priorytetem.
          </p>
        </div>

        {/* Wprowadzenie */}
        <Card className="mb-10 border border-zinc-800 hover:border-zinc-700 transition-all duration-300 overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-600 to-red-500"></div>
          <CardHeader>
            <CardTitle className="flex items-center text-2xl">
              <ShieldIcon className="h-6 w-6 mr-2 text-red-500" />
              Postanowienia ogólne
            </CardTitle>
            <CardDescription>
              Aktualizacja: 24 marca 2025 r.
            </CardDescription>
          </CardHeader>
          <CardContent className="text-zinc-300">
            <p className="mb-4">
              Niniejsze Warunki Korzystania z Serwisu określają zasady dostępu i korzystania z serwisu internetowego Scamerzy,
              dostępnego pod adresem <span className="text-red-500 font-semibold">https://scamerzy.pl</span>. Serwis jest platformą
              umożliwiającą zgłaszanie i weryfikację potencjalnych oszustów internetowych w celu zapobiegania oszustwom.
            </p>
            <p>
              Prosimy o uważne zapoznanie się z poniższymi warunkami przed rozpoczęciem korzystania z Serwisu. Korzystanie
              z Serwisu oznacza akceptację niniejszych Warunków Korzystania w całości.
            </p>
          </CardContent>
        </Card>

        {/* Sekcje warunków korzystania */}
        <motion.div
          className="space-y-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {sections.map((section, index) => (
            <motion.div
              key={section.id}
              variants={itemVariants}
              className="scroll-mt-20"
              id={section.id}
            >
              <Card className="border border-zinc-800 hover:border-zinc-700 transition-all duration-300 group overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-zinc-800 via-red-600 to-zinc-800 group-hover:via-red-500 transition-colors duration-300"></div>
                <CardHeader>
                  <CardTitle className="flex items-center text-xl">
                    <div className="p-2 rounded-md bg-red-500/10 mr-3 group-hover:bg-red-500/20 transition-colors duration-300">
                      {section.icon}
                    </div>
                    {section.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-zinc-300">
                  {section.content}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
