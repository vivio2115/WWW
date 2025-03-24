"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search } from "lucide-react";
import { toast } from "sonner";

export default function ScammerSearch() {
  const [isSearching, setIsSearching] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("phone");

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!searchQuery.trim()) {
      toast.error("Wprowadź dane do wyszukania");
      return;
    }

    setIsSearching(true);

    try {
      // In a real application, this would query a database
      // For now, we'll just simulate a delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      toast.info(`Nie znaleziono oszustów dla zapytania: ${searchQuery}`);
    } catch (error) {
      toast.error("Wystąpił błąd podczas wyszukiwania");
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <Tabs defaultValue="phone" className="w-full" onValueChange={setActiveTab}>
      <TabsList className="grid grid-cols-4 md:w-[600px] mb-6 bg-zinc-800">
        <TabsTrigger value="phone" className="data-[state=active]:bg-zinc-700">Telefon</TabsTrigger>
        <TabsTrigger value="email" className="data-[state=active]:bg-zinc-700">E-mail</TabsTrigger>
        <TabsTrigger value="bank" className="data-[state=active]:bg-zinc-700">Konto bankowe</TabsTrigger>
        <TabsTrigger value="other" className="data-[state=active]:bg-zinc-700">Inne</TabsTrigger>
      </TabsList>

      <form onSubmit={handleSearch}>
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="flex-1">
            <TabsContent value="phone" className="mt-0">
              <Input
                type="tel"
                placeholder="Wprowadź numer telefonu (np. 500100200)"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-500"
              />
            </TabsContent>

            <TabsContent value="email" className="mt-0">
              <Input
                type="email"
                placeholder="Wprowadź adres e-mail"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-500"
              />
            </TabsContent>

            <TabsContent value="bank" className="mt-0">
              <Input
                type="text"
                placeholder="Wprowadź numer konta bankowego"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-500"
              />
            </TabsContent>

            <TabsContent value="other" className="mt-0">
              <Input
                type="text"
                placeholder="Wprowadź adres strony, profil w mediach społecznościowych itp."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-500"
              />
            </TabsContent>
          </div>

          <Button type="submit" disabled={isSearching} className="w-full sm:w-auto bg-red-600 hover:bg-red-700">
            {isSearching ? (
              "Wyszukiwanie..."
            ) : (
              <>
                <Search className="h-4 w-4 mr-2" />
                Sprawdź
              </>
            )}
          </Button>
        </div>
      </form>

      <div className="mt-4 text-sm text-zinc-500">
        <p>
          {activeTab === "phone" && "Wpisz numer telefonu bez kierunkowego i bez spacji."}
          {activeTab === "email" && "Wpisz pełny adres e-mail."}
          {activeTab === "bank" && "Wpisz numer konta (możesz pominąć spacje)."}
          {activeTab === "other" && "Wpisz adres strony, nazwę profilu lub inny identyfikator oszusta."}
        </p>
      </div>
    </Tabs>
  );
}
