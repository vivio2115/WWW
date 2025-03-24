"use client";

import { Metadata } from "next";
import { motion } from "framer-motion";
import { AlertTriangle, LockIcon, ShieldIcon, ArrowUpRightIcon, ClipboardCheckIcon, FileTextIcon } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

// export const metadata: Metadata = {
//   title: "Polityka Prywatności | Scamerzy",
//   description: "Nasza polityka prywatności - dowiedz się, jak przetwarzamy Twoje dane",
// };

export default function PrivacyPolicyPage() {
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
      id: "information",
      title: "Jakie informacje zbieramy",
      icon: <FileTextIcon className="h-5 w-5 text-red-500" />,
      content: (
        <>
          <p className="mb-4">
            Zbieramy informacje, które podajesz podczas korzystania z naszej platformy, w tym:
          </p>
          <ul className="list-disc pl-6 space-y-2 mb-4">
            <li>Imię i nazwisko (opcjonalnie)</li>
            <li>Adres e-mail</li>
            <li>Informacje o zgłaszanych przez Ciebie oszustwach</li>
            <li>Dane kontaktowe oszustów (numery telefonów, adresy e-mail, numery kont bankowych)</li>
          </ul>
          <p>
            Automatycznie zbieramy również informacje techniczne o Twoim urządzeniu i sposobie korzystania z naszej platformy,
            w tym adres IP, typ przeglądarki, odwiedzane strony oraz czas spędzony na witrynie.
          </p>
        </>
      )
    },
    {
      id: "usage",
      title: "Jak wykorzystujemy dane",
      icon: <ClipboardCheckIcon className="h-5 w-5 text-red-500" />,
      content: (
        <>
          <p className="mb-4">
            Wykorzystujemy zebrane informacje w następujących celach:
          </p>
          <ul className="list-disc pl-6 space-y-2 mb-4">
            <li>Udostępnianie i aktualizacja bazy danych oszustów</li>
            <li>Poprawa i rozwój naszej platformy</li>
            <li>Komunikacja z użytkownikami</li>
            <li>Zapewnienie bezpieczeństwa i ochrona przed nadużyciami</li>
            <li>Analiza trendów oszustw internetowych</li>
          </ul>
          <p>
            Nigdy nie sprzedajemy Twoich danych osobowych stronom trzecim. Dane wykorzystujemy wyłącznie w celu zapewnienia
            prawidłowego działania usługi i poprawy bezpieczeństwa użytkowników Internetu.
          </p>
        </>
      )
    },
    {
      id: "sharing",
      title: "Udostępnianie informacji",
      icon: <ArrowUpRightIcon className="h-5 w-5 text-red-500" />,
      content: (
        <>
          <p className="mb-4">
            Możemy udostępniać dane o oszustach:
          </p>
          <ul className="list-disc pl-6 space-y-2 mb-4">
            <li>Organom ścigania w przypadku żądania prawnego</li>
            <li>Partnerskim platformom zwalczającym oszustwa (po anonimizacji źródeł)</li>
            <li>Zaufanym usługodawcom technicznym, którzy pomagają nam w świadczeniu usług</li>
          </ul>
          <p className="mb-4">
            Wszystkie dane osobowe zgłaszających są chronione i nie są udostępniane publicznie. Dane zgłaszającego mogą zostać
            udostępnione wyłącznie organom ścigania w przypadku postępowania karnego za zgodą zgłaszającego.
          </p>
          <div className="p-4 bg-amber-500/10 border border-amber-500/20 rounded-md text-amber-500 flex gap-2 items-start mt-4">
            <AlertTriangle className="h-5 w-5 flex-shrink-0 mt-0.5" />
            <p className="text-sm">
              <strong>Uwaga:</strong> Dane oszustów są publicznie dostępne w naszej bazie danych, co jest niezbędne dla
              realizacji celu serwisu, czyli ochrony potencjalnych ofiar przed oszustwami.
            </p>
          </div>
        </>
      )
    },
    {
      id: "security",
      title: "Bezpieczeństwo danych",
      icon: <ShieldIcon className="h-5 w-5 text-red-500" />,
      content: (
        <>
          <p className="mb-4">
            Stosujemy odpowiednie środki techniczne i organizacyjne, aby chronić Twoje dane osobowe przed nieuprawnionym
            dostępem, utratą lub zniszczeniem:
          </p>
          <ul className="list-disc pl-6 space-y-2 mb-4">
            <li>Szyfrowanie danych w tranzycie (HTTPS)</li>
            <li>Bezpieczne serwery i regularne kopie zapasowe</li>
            <li>Ograniczony dostęp personelu do danych osobowych</li>
            <li>Regularne audyty bezpieczeństwa</li>
          </ul>
          <p>
            Pomimo naszych starań, żadna metoda transmisji przez Internet lub metoda elektronicznego przechowywania nie jest
            w 100% bezpieczna. Nie możemy zagwarantować absolutnego bezpieczeństwa danych.
          </p>
        </>
      )
    },
    {
      id: "rights",
      title: "Twoje prawa",
      icon: <LockIcon className="h-5 w-5 text-red-500" />,
      content: (
        <>
          <p className="mb-4">
            Zgodnie z przepisami o ochronie danych osobowych, masz prawo do:
          </p>
          <ul className="list-disc pl-6 space-y-2 mb-4">
            <li>Dostępu do swoich danych osobowych</li>
            <li>Sprostowania nieprawidłowych danych</li>
            <li>Usunięcia danych (prawo do bycia zapomnianym)</li>
            <li>Ograniczenia przetwarzania danych</li>
            <li>Przenoszenia danych</li>
            <li>Sprzeciwu wobec przetwarzania</li>
            <li>Niepodlegania zautomatyzowanym decyzjom, w tym profilowaniu</li>
          </ul>
          <p className="mb-4">
            Aby skorzystać z tych praw, skontaktuj się z nami przez formularz kontaktowy na naszej stronie lub wyślij e-mail
            na adres <span className="text-red-500 font-semibold">privacy@scamerzy.pl</span>.
          </p>
          <p>
            Masz również prawo do złożenia skargi do właściwego organu nadzorczego (Prezesa Urzędu Ochrony Danych Osobowych).
          </p>
        </>
      )
    },
    {
      id: "cookies",
      title: "Pliki cookies i śledzenie",
      icon: <FileTextIcon className="h-5 w-5 text-red-500" />,
      content: (
        <>
          <p className="mb-4">
            Używamy plików cookies i podobnych technologii, aby poprawić Twoje doświadczenia z korzystania z naszej witryny:
          </p>
          <ul className="list-disc pl-6 space-y-2 mb-4">
            <li><strong>Niezbędne cookies:</strong> Wymagane do działania podstawowych funkcji witryny</li>
            <li><strong>Preferencyjne cookies:</strong> Zapamiętujące Twoje preferencje (np. tryb ciemny/jasny)</li>
            <li><strong>Analityczne cookies:</strong> Pomagają nam zrozumieć, jak użytkownicy korzystają z witryny</li>
          </ul>
          <p className="mb-4">
            Większość przeglądarek pozwala kontrolować pliki cookies za pomocą ustawień. Możesz odrzucić pliki cookies,
            jednak może to spowodować, że niektóre funkcje witryny nie będą działać prawidłowo.
          </p>
        </>
      )
    },
    {
      id: "changes",
      title: "Zmiany w polityce prywatności",
      icon: <FileTextIcon className="h-5 w-5 text-red-500" />,
      content: (
        <>
          <p className="mb-4">
            Nasza Polityka Prywatności może ulec zmianie w związku z rozwojem platformy lub zmianami w przepisach prawa.
            Informacje o istotnych zmianach będą publikowane na naszej witrynie wraz z datą wejścia w życie.
          </p>
          <p className="mb-4">
            Zachęcamy do regularnego zapoznawania się z naszą Polityką Prywatności. Korzystanie z naszej witryny po
            wprowadzeniu zmian oznacza akceptację nowych warunków.
          </p>
          <div className="p-4 bg-zinc-800 border border-zinc-700 rounded-md text-zinc-300 flex gap-2 items-start mt-2">
            <p className="text-sm">
              <strong>Ostatnia aktualizacja:</strong> 24 marca 2025 r.
            </p>
          </div>
        </>
      )
    },
    {
      id: "contact",
      title: "Kontakt w sprawach prywatności",
      icon: <FileTextIcon className="h-5 w-5 text-red-500" />,
      content: (
        <>
          <p className="mb-4">
            Jeśli masz pytania lub wątpliwości dotyczące naszej Polityki Prywatności lub przetwarzania Twoich danych osobowych,
            skontaktuj się z nami:
          </p>
          <div className="p-4 bg-zinc-800 border border-zinc-700 rounded-md mb-4">
            <p className="mb-2"><strong className="text-white">Administrator danych:</strong> Scamerzy Sp. z o.o.</p>
            <p className="mb-2"><strong className="text-white">Adres:</strong> ul. Bezpieczna 42, 00-001 Warszawa</p>
            <p className="mb-2"><strong className="text-white">E-mail:</strong> <span className="text-red-500">privacy@scamerzy.pl</span></p>
            <p><strong className="text-white">Telefon:</strong> +48 123 456 789</p>
          </div>
          <p>
            Dołożymy wszelkich starań, aby odpowiedzieć na Twoje pytania i rozwiać wątpliwości jak najszybciej,
            nie później niż w ciągu 30 dni od otrzymania zapytania.
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
            <LockIcon className="h-8 w-8 text-red-500" />
          </div>
          <h1 className="text-4xl font-bold tracking-tight text-gradient-red">Polityka Prywatności</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Ochrona Twoich danych osobowych jest dla nas priorytetem. Dowiedz się, jakie informacje zbieramy i jak je wykorzystujemy.
          </p>
        </div>

        {/* Wprowadzenie */}
        <Card className="mb-10 border border-zinc-800 hover:border-zinc-700 transition-all duration-300 overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-600 to-red-500"></div>
          <CardHeader>
            <CardTitle className="flex items-center text-2xl">
              <ShieldIcon className="h-6 w-6 mr-2 text-red-500" />
              Zobowiązanie do ochrony Twoich danych
            </CardTitle>
            <CardDescription>
              Aktualizacja: 24 marca 2025 r.
            </CardDescription>
          </CardHeader>
          <CardContent className="text-zinc-300">
            <p className="mb-4">
              Niniejsza Polityka Prywatności opisuje, w jaki sposób zbieramy, wykorzystujemy i chronimy Twoje dane osobowe podczas
              korzystania z serwisu Scamerzy oraz powiązanych usług. Korzystając z naszych usług, akceptujesz praktyki opisane
              w tej polityce.
            </p>
            <p>
              Naszym celem jest transparentne informowanie o sposobach przetwarzania Twoich danych oraz zapewnienie Ci kontroli
              nad nimi zgodnie z obowiązującymi przepisami, w tym Rozporządzeniem o Ochronie Danych Osobowych (RODO).
            </p>
          </CardContent>
        </Card>

        {/* Sekcje polityki prywatności */}
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
