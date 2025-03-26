"use client";

import { useState } from "react";
import { Plus, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import ModalForm from "@/components/ModalForms";

interface CreateUserFormData {
  username: string;
  email: string;
  password: string;
  role: string;
}

export default function CreateUserModal() {
  const [formData, setFormData] = useState<CreateUserFormData>({
    username: "",
    email: "",
    password: "",
    role: "moderator",
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    
    // Tutaj logika wysyłania danych do API
    console.log("Tworzenie użytkownika:", formData);
    
    // Symulacja opóźnienia API
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setIsLoading(false);
    
    // Reset formularza
    setFormData({
      username: "",
      email: "",
      password: "",
      role: "moderator",
    });
  };

  return (
    <ModalForm
      triggerButton={
        <Button className="bg-red-600 hover:bg-red-700">
          <Plus className="h-4 w-4 mr-2" />
          Dodaj użytkownika
        </Button>
      }
      title="Utwórz nowego użytkownika"
      description="Wprowadź dane nowego użytkownika systemu."
      confirmText="Utwórz użytkownika"
      onConfirm={handleSubmit}
      isLoading={isLoading}
    >
      <div className="grid gap-4">
        <div className="flex justify-center mb-2">
          <div className="p-3 bg-zinc-800 rounded-full">
            <User className="h-12 w-12 text-red-500" />
          </div>
        </div>
        
        <div className="grid gap-2">
          <label htmlFor="username" className="text-sm font-medium text-white">
            Nazwa użytkownika
          </label>
          <Input
            id="username"
            name="username"
            value={formData.username}
            onChange={handleInputChange}
            placeholder="np. jan_kowalski"
            className="bg-zinc-800 border-zinc-700"
            required
          />
        </div>
        
        <div className="grid gap-2">
          <label htmlFor="email" className="text-sm font-medium text-white">
            Email
          </label>
          <Input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="np. jan.kowalski@example.com"
            className="bg-zinc-800 border-zinc-700"
            required
          />
        </div>
        
        <div className="grid gap-2">
          <label htmlFor="password" className="text-sm font-medium text-white">
            Hasło
          </label>
          <Input
            id="password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleInputChange}
            placeholder="Minimum 8 znaków"
            className="bg-zinc-800 border-zinc-700"
            required
          />
          <p className="text-xs text-zinc-500">Hasło musi zawierać min. 8 znaków, w tym cyfrę i znak specjalny.</p>
        </div>
        
        <div className="grid gap-2">
          <label htmlFor="role" className="text-sm font-medium text-white">
            Rola
          </label>
          <select
            id="role"
            name="role"
            value={formData.role}
            onChange={handleInputChange}
            className="rounded-md px-3 py-2 bg-zinc-800 border-zinc-700 text-white"
            required
          >
            <option value="admin">Administrator</option>
            <option value="moderator">Moderator</option>
            <option value="viewer">Obserwator</option>
          </select>
          <p className="text-xs text-zinc-500">
            Administrator: pełne uprawnienia | Moderator: weryfikacja zgłoszeń | Obserwator: tylko podgląd
          </p>
        </div>
      </div>
    </ModalForm>
  );
}