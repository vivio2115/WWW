"use client";

import { useState } from "react";
import { Cookie, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

export function CookieManager() {
  const [open, setOpen] = useState(false);
  const [settings, setSettings] = useState({
    required: true, // zawsze włączone
    functional: true,
    analytics: true,
  });

  // Pobierz obecne ustawienia cookie przy otwarciu
  const handleOpenChange = (open: boolean) => {
    if (open) {
      const consentValue = localStorage.getItem("cookieConsent");
      if (consentValue === "all") {
        setSettings({
          required: true,
          functional: true,
          analytics: true,
        });
      } else if (consentValue === "required") {
        setSettings({
          required: true,
          functional: false,
          analytics: false,
        });
      }
    }
    setOpen(open);
  };

  const handleSave = () => {
    // Zapisz ustawienia w localStorage
    if (settings.functional || settings.analytics) {
      localStorage.setItem("cookieConsent", "all");
    } else {
      localStorage.setItem("cookieConsent", "required");
    }
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button 
          variant="ghost" 
          size="sm" 
          className="text-xs text-zinc-500 hover:text-zinc-400 transition-colors"
        >
          <Cookie className="w-3 h-3 mr-1.5" />
          Ustawienia plików cookie
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md border-zinc-800 bg-zinc-950">
        <DialogHeader>
          <DialogTitle className="flex items-center">
            <Cookie className="w-5 h-5 mr-2 text-red-500" />
            Ustawienia plików cookie
          </DialogTitle>
          <DialogDescription>
            Dostosuj ustawienia plików cookie w naszym serwisie.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-5">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="required" className="font-medium">
                  Wymagane
                </Label>
                <p className="text-xs text-zinc-500">
                  Niezbędne do działania strony. Nie można wyłączyć.
                </p>
              </div>
              <Switch
                id="required"
                checked={settings.required}
                disabled
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="functional" className="font-medium">
                  Funkcjonalne
                </Label>
                <p className="text-xs text-zinc-500">
                  Zapamiętują Twoje preferencje podczas korzystania z serwisu.
                </p>
              </div>
              <Switch
                id="functional"
                checked={settings.functional}
                onCheckedChange={(value) => setSettings({ ...settings, functional: value })}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="analytics" className="font-medium">
                  Analityczne
                </Label>
                <p className="text-xs text-zinc-500">
                  Pomagają nam zrozumieć, jak użytkownicy korzystają z serwisu.
                </p>
              </div>
              <Switch
                id="analytics"
                checked={settings.analytics}
                onCheckedChange={(value) => setSettings({ ...settings, analytics: value })}
              />
            </div>
          </div>
        </div>
        <DialogFooter className="sm:justify-between">
          <Button 
            variant="outline" 
            size="sm" 
            className="border-zinc-800 hover:bg-zinc-900 transition-colors"
            onClick={() => setOpen(false)}
          >
            Anuluj
          </Button>
          <Button 
            size="sm" 
            className="bg-red-600 hover:bg-red-700 transition-colors"
            onClick={handleSave}
          >
            Zapisz ustawienia
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}