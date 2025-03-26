"use client";

import { useState } from "react";
import { FileText, Plus, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import ModalForm from "@/components/ModalForms";

interface ReportFormData {
  title: string;
  type: string;
  description: string;
  severity: string;
  assignedTo: string;
}

export default function ReportModal() {
  const [formData, setFormData] = useState<ReportFormData>({
    title: "",
    type: "incident",
    description: "",
    severity: "medium",
    assignedTo: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    
    // Tutaj logika wysyłania danych do API
    console.log("Tworzenie raportu:", formData);
    
    // Symulacja opóźnienia API
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setIsLoading(false);
    
    // Reset formularza
    setFormData({
      title: "",
      type: "incident",
      description: "",
      severity: "medium",
      assignedTo: "",
    });
  };

  return (
    <ModalForm
      triggerButton={
        <Button className="bg-red-600 hover:bg-red-700">
          <Plus className="h-4 w-4 mr-2" />
          Nowy raport
        </Button>
      }
      title="Utwórz nowy raport"
      description="Wprowadź informacje o zdarzeniu lub incydencie."
      confirmText="Utwórz raport"
      onConfirm={handleSubmit}
      isLoading={isLoading}
    >
      <div className="grid gap-4">
        <div className="flex justify-center mb-2">
          <div className="p-3 bg-zinc-800 rounded-full">
            <FileText className="h-12 w-12 text-red-500" />
          </div>
        </div>
        
        <div className="grid gap-2">
          <label htmlFor="title" className="text-sm font-medium text-white">
            Tytuł raportu
          </label>
          <Input
            id="title"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            placeholder="np. Wykryto nową grupę scamerów"
            className="bg-zinc-800 border-zinc-700"
            required
          />
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="grid gap-2">
            <label htmlFor="type" className="text-sm font-medium text-white">
              Typ raportu
            </label>
            <select
              id="type"
              name="type"
              value={formData.type}
              onChange={handleInputChange}
              className="rounded-md px-3 py-2 bg-zinc-800 border-zinc-700 text-white"
              required
            >
              <option value="incident">Incydent</option>
              <option value="threat">Zagrożenie</option>
              <option value="vulnerability">Podatność</option>
              <option value="activity">Aktywność scamerów</option>
              <option value="other">Inny</option>
            </select>
          </div>
          
          <div className="grid gap-2">
            <label htmlFor="severity" className="text-sm font-medium text-white">
              Priorytet
            </label>
            <select
              id="severity"
              name="severity"
              value={formData.severity}
              onChange={handleInputChange}
              className="rounded-md px-3 py-2 bg-zinc-800 border-zinc-700 text-white"
              required
            >
              <option value="low">Niski</option>
              <option value="medium">Średni</option>
              <option value="high">Wysoki</option>
              <option value="critical">Krytyczny</option>
            </select>
          </div>
        </div>
        
        <div className="grid gap-2">
          <label htmlFor="description" className="text-sm font-medium text-white">
            Opis
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            rows={4}
            placeholder="Szczegółowy opis zdarzenia lub incydentu..."
            className="rounded-md px-3 py-2 bg-zinc-800 border-zinc-700 text-white resize-none"
            required
          />
        </div>
        
        <div className="grid gap-2">
          <label htmlFor="assignedTo" className="text-sm font-medium text-white">
            Przypisz do
          </label>
          <Input
            id="assignedTo"
            name="assignedTo"
            value={formData.assignedTo}
            onChange={handleInputChange}
            placeholder="np. moderator@scamerzy.xyz"
            className="bg-zinc-800 border-zinc-700"
          />
          <p className="text-xs text-zinc-500">Opcjonalne - pozostaw puste, aby przypisać do ogólnej kolejki</p>
        </div>
        
        {formData.severity === "critical" && (
          <div className="flex items-start gap-2 p-3 rounded-md bg-red-900/20 text-red-400">
            <AlertTriangle className="h-5 w-5 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="text-sm font-medium">Uwaga: Raport o priorytecie krytycznym</h4>
              <p className="text-xs mt-1">
                Raporty o priorytecie krytycznym są natychmiast przekazywane do wszystkich administratorów systemu i wymagają
                pilnego działania. Upewnij się, że incydent wymaga takiego priorytetu.
              </p>
            </div>
          </div>
        )}
      </div>
    </ModalForm>
  );
}