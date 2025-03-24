"use client";

import { motion } from "framer-motion";
import { Shield } from "lucide-react";
import { ScamReportForm } from "./ScamReportForm";

export default function ReportPage() {
  return (
    <div className="container px-4 md:px-6 py-12">
      <motion.div
        className="max-w-4xl mx-auto"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="text-center mb-10">
          <div className="inline-flex justify-center items-center mx-auto mb-4">
            <div className="h-16 w-16 bg-red-600 rounded-full flex items-center justify-center shadow-lg">
              <Shield className="h-8 w-8 text-white" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-white mb-3">Zgłoś oszusta</h1>
          <p className="text-zinc-400 max-w-2xl mx-auto">
            Twoje zgłoszenie pomoże innym uniknąć oszustwa. Wszystkie dane są weryfikowane
            przez nasz zespół przed dodaniem do bazy.
          </p>
        </div>

        <div className="bg-gradient-to-br from-zinc-900 to-zinc-950 border border-zinc-800 rounded-lg p-6 md:p-8 shadow-lg">
          <ScamReportForm />
        </div>
      </motion.div>
    </div>
  );
}
