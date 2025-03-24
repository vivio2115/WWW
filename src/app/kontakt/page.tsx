import { Metadata } from "next";
import ContactForm from "./ContactForm";
import { Mail, MapPin, Phone } from "lucide-react";

export const metadata: Metadata = {
  title: "Kontakt - Scamerzy",
  description: "Skontaktuj się z zespołem Scamerzy. Masz pytania, uwagi lub sugestie? Napisz do nas.",
};

export default function ContactPage() {
  return (
    <div className="container px-4 md:px-6 py-12">
      <div className="max-w-5xl mx-auto space-y-10">
        <div className="space-y-4 text-center">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-white">
            Kontakt z nami
          </h1>
          <p className="mx-auto max-w-[700px] text-zinc-400 md:text-lg">
            Masz pytania, uwagi lub sugestie? Skontaktuj się z naszym zespołem.
            Chętnie odpowiemy na wszystkie pytania.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          <div>
            <div className="bg-zinc-900 p-6 rounded-lg border border-zinc-800 shadow-sm">
              <h2 className="text-xl font-semibold mb-6 text-white">Napisz do nas</h2>
              <ContactForm />
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-zinc-900 p-6 rounded-lg border border-zinc-800 shadow-sm">
              <h2 className="text-xl font-semibold mb-4 text-white">Informacje kontaktowe</h2>

              <div className="space-y-4">
                <div className="flex items-start">
                  <Mail className="h-5 w-5 text-red-500 mt-1 mr-3 flex-shrink-0" />
                  <div>
                    <h3 className="font-medium text-white">Email</h3>
                    <p className="text-zinc-400">kontakt@scamerzy.pl</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <Phone className="h-5 w-5 text-red-500 mt-1 mr-3 flex-shrink-0" />
                  <div>
                    <h3 className="font-medium text-white">Telefon</h3>
                    <p className="text-zinc-400">+48 22 123 45 67</p>
                    <p className="text-xs text-zinc-500 mt-1">Pon-Pt: 9:00 - 17:00</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <MapPin className="h-5 w-5 text-red-500 mt-1 mr-3 flex-shrink-0" />
                  <div>
                    <h3 className="font-medium text-white">Adres</h3>
                    <p className="text-zinc-400">
                      Scamerzy<br />
                      ul. Bezpieczna 123<br />
                      00-001 Warszawa
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-zinc-800 p-6 rounded-lg border border-zinc-700">
              <h2 className="text-xl font-semibold mb-4 text-white">Najczęstsze powody kontaktu</h2>

              <ul className="space-y-2 text-zinc-300">
                <li className="flex items-start">
                  <span className="text-red-500 mr-2">•</span>
                  <span>Zgłoszenie błędu na stronie</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-500 mr-2">•</span>
                  <span>Prośba o usunięcie danych z bazy</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-500 mr-2">•</span>
                  <span>Propozycja współpracy</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-500 mr-2">•</span>
                  <span>Pytania dotyczące weryfikacji zgłoszeń</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-500 mr-2">•</span>
                  <span>Zgłoszenie nadużycia w serwisie</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
