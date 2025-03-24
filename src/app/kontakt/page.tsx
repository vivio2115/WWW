import { Metadata } from "next";
import ContactForm from "./ContactForm";
import { Mail, MapPin, Phone, Clock, ExternalLink, MessageSquare, Calendar, Users, AlertCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Kontakt - LegitCheck",
  description: "Skontaktuj się z zespołem LegitCheck. Masz pytania, uwagi lub sugestie? Napisz do nas lub zadzwoń.",
};

export default function ContactPage() {
  return (
    <div className="relative">
      {/* Dekoracyjne elementy tła */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-0 left-0 w-1/2 h-1/2 bg-red-500/5 rounded-full blur-3xl transform -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-red-500/5 rounded-full blur-3xl transform translate-x-1/2 translate-y-1/2"></div>
      </div>

      <div className="container px-4 md:px-6 py-12">
        <div className="max-w-6xl mx-auto space-y-12">
          {/* Nagłówek strony */}
          <div className="space-y-4 text-center">
            <div className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-red-600 mb-4">
              <MessageSquare className="h-5 w-5 text-white" />
            </div>
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl text-zinc-100">
              Kontakt z nami
            </h1>
            <p className="mx-auto max-w-[700px] text-zinc-400 md:text-lg">
              Masz pytania, uwagi lub sugestie? Skontaktuj się z naszym zespołem.
              Chętnie odpowiemy na wszystkie pytania.
            </p>
          </div>

          <div className="grid gap-10 lg:grid-cols-2">
            {/* Formularz kontaktowy */}
            <div className="rounded-xl overflow-hidden bg-zinc-900 border border-zinc-800 shadow-lg">
              <div className="p-6 sm:p-8">
                <h2 className="text-2xl font-semibold mb-6 text-white flex items-center gap-2">
                  <Mail className="h-5 w-5 text-red-500" />
                  Napisz do nas
                </h2>
                <ContactForm />
              </div>
            </div>

            {/* Informacje kontaktowe */}
            <div className="space-y-8">
              {/* Dane kontaktowe */}
              <div className="bg-zinc-900 rounded-xl border border-zinc-800 shadow-lg p-6 sm:p-8">
                <h2 className="text-2xl font-semibold mb-6 text-white flex items-center gap-2">
                  <Users className="h-5 w-5 text-red-500" />
                  Informacje kontaktowe
                </h2>

                <div className="space-y-6">
                  <div className="flex items-start">
                    <div className="mt-1 mr-4 h-10 w-10 flex-shrink-0 rounded-full bg-red-900/20 flex items-center justify-center">
                      <Mail className="h-5 w-5 text-red-500" />
                    </div>
                    <div>
                      <h3 className="font-medium text-zinc-100 mb-1">Email</h3>
                      <p className="text-zinc-400">
                        <Link href="mailto:kontakt@legitcheck.pl" className="hover:text-red-500 transition-colors">
                          kontakt@scamers.xyz
                        </Link>
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="mt-1 mr-4 h-10 w-10 flex-shrink-0 rounded-full bg-red-900/20 flex items-center justify-center">
                      <Phone className="h-5 w-5 text-red-500" />
                    </div>
                    <div>
                      <h3 className="font-medium text-zinc-100 mb-1">Telefon</h3>
                      <p className="text-zinc-400">
                        <Link href="tel:+48221234567" className="hover:text-red-500 transition-colors">
                          +48 22 123 45 67
                        </Link>
                      </p>
                      <div className="flex items-center mt-2 text-sm text-zinc-500">
                        <Clock className="h-4 w-4 mr-1" />
                        <span>Pon-Pt: 9:00 - 17:00</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="mt-1 mr-4 h-10 w-10 flex-shrink-0 rounded-full bg-red-900/20 flex items-center justify-center">
                      <MapPin className="h-5 w-5 text-red-500" />
                    </div>
                    <div>
                      <h3 className="font-medium text-zinc-100 mb-1">Adres</h3>
                      <p className="text-zinc-400">
                        Scamers<br />
                        ul. Złota 22<br />
                        00-001 Warszawa
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Mapa */}
              <div className="bg-zinc-900 rounded-xl border border-zinc-800 shadow-lg overflow-hidden">
                <div className="h-72 relative">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d156388.46656056798!2d20.92111271640625!3d52.233065000000005!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x471ecc669a869f01%3A0x72f0be2a88ead3fc!2sWarszawa!5e0!3m2!1spl!2spl!4v1711272390945!5m2!1spl!2spl"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="grayscale contrast-125 invert"
                  ></iframe>
                </div>
                <div className="p-4 text-center">
                  <Button variant="outline" size="sm" className="border-zinc-700 text-zinc-300 hover:text-red-500 hover:border-red-500">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    <Link href="https://maps.google.com/maps?q=Warszawa" target="_blank" rel="noopener noreferrer">
                      Pokaż większą mapę
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* FAQ - Najczęstsze powody kontaktu */}
          <div className="bg-zinc-900 rounded-xl border border-zinc-800 shadow-lg p-6 sm:p-8 mt-10">
            <h2 className="text-2xl font-semibold mb-6 text-white flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-red-500" />
              Najczęstsze powody kontaktu
            </h2>

            <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
              {[
                { icon: <AlertCircle className="h-5 w-5" />, text: "Zgłoszenie błędu na stronie" },
                { icon: <Users className="h-5 w-5" />, text: "Prośba o usunięcie danych z bazy" },
                { icon: <Calendar className="h-5 w-5" />, text: "Propozycja współpracy" },
                { icon: <MessageSquare className="h-5 w-5" />, text: "Pytania dotyczące weryfikacji zgłoszeń" },
                { icon: <AlertCircle className="h-5 w-5" />, text: "Zgłoszenie nadużycia w serwisie" },
                { icon: <ExternalLink className="h-5 w-5" />, text: "Integracja z zewnętrznym serwisem" },
              ].map((item, index) => (
                <div key={index} className="flex items-start p-4 rounded-lg bg-zinc-950 border border-zinc-800 hover:border-red-500/50 transition-colors group">
                  <div className="mr-3 h-8 w-8 rounded-full bg-red-900/20 flex items-center justify-center text-red-500 group-hover:bg-red-900/30 transition-colors">
                    {item.icon}
                  </div>
                  <span className="text-zinc-300">{item.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
