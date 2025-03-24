import { Metadata } from "next";
import ScamReportForm from "./ScamReportForm";
import { AlertCircle, ShieldAlert, ShieldCheck } from "lucide-react";

export const metadata: Metadata = {
  title: "Zgłoś Scammera - Scamerzy",
  description: "Zgłoś oszusta internetowego i pomóż innym uniknąć oszustwa. Twoje zgłoszenie jest anonimowe i pomaga chronić innych.",
};

export default function ReportPage() {
  return (
    <div className="container px-4 md:px-6 py-12">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="space-y-4 text-center">
          <div className="inline-flex justify-center items-center mx-auto mb-4">
            <div className="h-12 w-12 bg-red-600 rounded-full flex items-center justify-center">
              <ShieldAlert className="h-6 w-6 text-white" />
            </div>
          </div>
          <h1 className="text-3xl font-bold tracking-tighter text-white">Zgłoś oszusta</h1>
          <p className="text-zinc-400 md:text-lg max-w-2xl mx-auto">
            Wypełnij poniższy formularz, aby zgłosić oszusta. Twoje zgłoszenie pomoże chronić innych przed potencjalnymi stratami.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3">
            <div className="p-6 md:p-8 border border-zinc-800 rounded-lg bg-zinc-900 shadow-sm">
              <ScamReportForm />
            </div>
          </div>

          <div className="space-y-6 lg:col-span-1">
            <div className="p-5 border border-zinc-800 rounded-lg bg-zinc-900 text-sm">
              <h3 className="font-medium text-lg mb-4 text-white flex items-center gap-2">
                <ShieldCheck className="h-5 w-5 text-red-500" />
                Ważne informacje
              </h3>
              <ul className="space-y-3">
                <li className="flex gap-2 text-zinc-400">
                  <span className="flex-shrink-0 mt-1 w-1.5 h-1.5 rounded-full bg-red-500"></span>
                  <span>Wszystkie zgłoszenia są weryfikowane przez nasz zespół przed publikacją</span>
                </li>
                <li className="flex gap-2 text-zinc-400">
                  <span className="flex-shrink-0 mt-1 w-1.5 h-1.5 rounded-full bg-red-500"></span>
                  <span>Podanie jak największej liczby szczegółów pomoże nam w weryfikacji</span>
                </li>
                <li className="flex gap-2 text-zinc-400">
                  <span className="flex-shrink-0 mt-1 w-1.5 h-1.5 rounded-full bg-red-500"></span>
                  <span>Twoje dane osobowe są chronione i nie będą udostępniane publicznie</span>
                </li>
                <li className="flex gap-2 text-zinc-400">
                  <span className="flex-shrink-0 mt-1 w-1.5 h-1.5 rounded-full bg-red-500"></span>
                  <span>Zgłoszenia zawierające nieprawdziwe informacje nie będą publikowane</span>
                </li>
              </ul>
            </div>

            <div className="p-5 border border-red-900/20 bg-red-900/10 rounded-lg text-sm">
              <div className="flex gap-3 items-start">
                <AlertCircle className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-medium text-white mb-1">Zachowaj ostrożność</h4>
                  <p className="text-zinc-400">
                    Upewnij się, że posiadasz dowody na oszustwo przed dokonaniem zgłoszenia. Fałszywe zgłoszenia mogą być szkodliwe.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
