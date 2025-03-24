import { Metadata } from "next";
import { Shield, Search, ClipboardCheck, UserCheck } from "lucide-react";

export const metadata: Metadata = {
  title: "Jak to działa - Scamerzy",
  description: "Dowiedz się, jak działa serwis Scamerzy. Proces zgłaszania, weryfikacji i sprawdzania oszustów internetowych.",
};

export default function HowItWorksPage() {
  return (
    <div className="container px-4 md:px-6 py-12">
      <div className="max-w-4xl mx-auto space-y-12">
        <div className="space-y-4 text-center">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-white">
            Jak działa Scamerzy
          </h1>
          <p className="mx-auto max-w-[700px] text-zinc-400 md:text-xl">
            Nasza misja to ochrona Polaków przed internetowymi oszustami.
            Dowiedz się, jak działa nasz serwis i jak możesz z niego korzystać.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          <div className="flex flex-col items-center text-center p-6 bg-zinc-900 rounded-lg border border-zinc-800 shadow-sm">
            <div className="rounded-full bg-red-900 p-3 mb-4">
              <Shield className="h-6 w-6 text-red-500" />
            </div>
            <h2 className="text-xl font-semibold mb-2 text-white">1. Zgłaszanie oszustów</h2>
            <p className="text-zinc-400">
              Każdy użytkownik może zgłosić oszusta poprzez
              wypełnienie formularza zgłoszeniowego. Im więcej
              szczegółów podasz, tym lepiej dla weryfikacji.
            </p>
          </div>

          <div className="flex flex-col items-center text-center p-6 bg-zinc-900 rounded-lg border border-zinc-800 shadow-sm">
            <div className="rounded-full bg-amber-900 p-3 mb-4">
              <ClipboardCheck className="h-6 w-6 text-amber-500" />
            </div>
            <h2 className="text-xl font-semibold mb-2 text-white">2. Weryfikacja zgłoszeń</h2>
            <p className="text-zinc-400">
              Nasz zespół weryfikuje każde zgłoszenie, sprawdzając
              jego wiarygodność. Dbamy o to, aby w bazie znajdowały
              się tylko potwierdzone przypadki oszustw.
            </p>
          </div>

          <div className="flex flex-col items-center text-center p-6 bg-zinc-900 rounded-lg border border-zinc-800 shadow-sm">
            <div className="rounded-full bg-green-900 p-3 mb-4">
              <UserCheck className="h-6 w-6 text-green-500" />
            </div>
            <h2 className="text-xl font-semibold mb-2 text-white">3. Publikacja danych</h2>
            <p className="text-zinc-400">
              Zweryfikowane zgłoszenia trafiają do naszej bazy
              danych. Publikujemy dane kontaktowe oszustów oraz
              informacje o sposobie działania.
            </p>
          </div>

          <div className="flex flex-col items-center text-center p-6 bg-zinc-900 rounded-lg border border-zinc-800 shadow-sm">
            <div className="rounded-full bg-blue-900 p-3 mb-4">
              <Search className="h-6 w-6 text-blue-500" />
            </div>
            <h2 className="text-xl font-semibold mb-2 text-white">4. Wyszukiwanie oszustów</h2>
            <p className="text-zinc-400">
              Użytkownicy mogą sprawdzać dane kontrahentów przed
              dokonaniem transakcji. Weryfikacja jest szybka i
              prosta, a może uchronić przed stratą.
            </p>
          </div>
        </div>

        <div className="bg-zinc-900 p-6 border border-zinc-800 rounded-lg">
          <h2 className="text-xl font-semibold mb-4 text-white">Często zadawane pytania</h2>

          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-white">Czy moje zgłoszenie jest anonimowe?</h3>
              <p className="text-zinc-400 mt-1">
                Tak, zgłoszenia są anonimowe. Twoje dane osobowe nie są publikowane ani udostępniane osobom trzecim.
                Podanie adresu e-mail jest opcjonalne i służy wyłącznie do kontaktu w sprawie weryfikacji zgłoszenia.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-white">Jak długo trwa weryfikacja zgłoszenia?</h3>
              <p className="text-zinc-400 mt-1">
                Weryfikacja zazwyczaj trwa od 1 do 3 dni roboczych. W przypadku skomplikowanych zgłoszeń
                lub konieczności zebrania dodatkowych informacji, proces może potrwać dłużej.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-white">Co zrobić, jeśli znalazłem swoje dane w bazie?</h3>
              <p className="text-zinc-400 mt-1">
                Jeśli uważasz, że Twoje dane zostały umieszczone w bazie niesłusznie, skontaktuj się z nami
                przez formularz kontaktowy. Po weryfikacji Twojego zgłoszenia, dane mogą zostać usunięte.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-white">Czy korzystanie z serwisu jest bezpłatne?</h3>
              <p className="text-zinc-400 mt-1">
                Tak, korzystanie z serwisu jest całkowicie bezpłatne. Zarówno zgłaszanie oszustów,
                jak i sprawdzanie danych w bazie nie wiąże się z żadnymi opłatami.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-zinc-800 p-6 rounded-lg border border-zinc-700">
          <div className="flex flex-col md:flex-row md:items-center gap-4">
            <div className="flex-shrink-0">
              <Shield className="h-12 w-12 text-red-500" />
            </div>
            <div>
              <h2 className="text-xl font-semibold mb-1 text-white">Chroń siebie i innych</h2>
              <p className="text-zinc-300">
                Korzystając z naszego serwisu, przyczyniasz się do budowania bezpieczniejszej przestrzeni
                internetowej. Zgłaszaj oszustów i sprawdzaj podejrzane dane przed transakcją.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
