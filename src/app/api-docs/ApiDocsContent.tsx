"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Code, Send, Webhook, Shield, Bot, CheckCircle, Copy, ClipboardCheck } from "lucide-react";

export function ApiDocsContent() {
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  const copyToClipboard = (codeId: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCode(codeId);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  return (
    <motion.div
      className="container px-4 md:px-6 py-12"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <div className="max-w-4xl mx-auto space-y-10">
        <motion.div className="space-y-4 text-center" variants={itemVariants}>
          <div className="inline-flex justify-center items-center mx-auto mb-4">
            <div className="h-16 w-16 bg-indigo-600 rounded-full flex items-center justify-center shadow-lg">
              <Code className="h-8 w-8 text-white" />
            </div>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tighter text-white">Użyj naszego API</h1>
          <p className="text-zinc-400 md:text-lg max-w-2xl mx-auto">
            Integruj API Scamerzy z Twoim botem Discord, aby automatycznie weryfikować i zapisywać legitchecki.
            Nasze API umożliwia łatwą integrację z różnymi systemami.
          </p>
        </motion.div>

        <motion.div
          className="bg-gradient-to-br from-zinc-900 to-zinc-950 border border-zinc-800 rounded-lg p-8 shadow-lg"
          variants={itemVariants}
        >
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="mb-6 bg-zinc-800 p-1 inline-flex w-full justify-start overflow-x-auto">
              <TabsTrigger value="overview" className="data-[state=active]:bg-zinc-700">
                Przegląd
              </TabsTrigger>
              <TabsTrigger value="discord" className="data-[state=active]:bg-zinc-700">
                Integracja z Discord
              </TabsTrigger>
              <TabsTrigger value="endpoints" className="data-[state=active]:bg-zinc-700">
                Endpointy API
              </TabsTrigger>
              <TabsTrigger value="examples" className="data-[state=active]:bg-zinc-700">
                Przykłady
              </TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-8">
              <div>
                <h2 className="text-xl font-medium text-white mb-3 flex items-center gap-2">
                  <Shield className="h-5 w-5 text-indigo-500" />
                  Czym jest API Scamerzy?
                </h2>
                <p className="text-zinc-300 leading-relaxed">
                  API Scamerzy umożliwia zintegrowanie naszej bazy danych oszustów z zewnętrznymi aplikacjami i serwisami.
                  Dzięki temu możesz automatycznie sprawdzać, czy dana osoba znajduje się w naszej bazie danych, oraz dodawać
                  nowe zgłoszenia bez konieczności korzystania z interfejsu webowego.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                <Card className="bg-zinc-950 border-zinc-800 hover-lift transition-all duration-300">
                  <CardHeader>
                    <div className="flex items-center gap-3 mb-3">
                      <div className="p-2 rounded-lg bg-indigo-900/20">
                        <Bot className="h-5 w-5 text-indigo-500" />
                      </div>
                      <CardTitle className="text-lg">Integracja z Discordem</CardTitle>
                    </div>
                    <CardDescription className="text-zinc-400">
                      Podłącz swojego bota Discord do naszego API, aby umożliwić użytkownikom sprawdzanie i zgłaszanie
                      oszustów bezpośrednio na serwerze Discord.
                    </CardDescription>
                  </CardHeader>
                </Card>

                <Card className="bg-zinc-950 border-zinc-800 hover-lift transition-all duration-300">
                  <CardHeader>
                    <div className="flex items-center gap-3 mb-3">
                      <div className="p-2 rounded-lg bg-indigo-900/20">
                        <Send className="h-5 w-5 text-indigo-500" />
                      </div>
                      <CardTitle className="text-lg">Automatyczne zgłoszenia</CardTitle>
                    </div>
                    <CardDescription className="text-zinc-400">
                      Automatyzuj proces zgłaszania oszustów poprzez integrację API z istniejącymi systemami
                      lub formularzami na Twojej stronie.
                    </CardDescription>
                  </CardHeader>
                </Card>
              </div>

              <div className="mt-8">
                <h2 className="text-xl font-medium text-white mb-4">Zaczynamy</h2>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 bg-indigo-900/30 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-sm font-bold text-indigo-400">1</span>
                    </div>
                    <div>
                      <h3 className="text-white font-medium mb-1">Uzyskaj klucz API</h3>
                      <p className="text-zinc-400">
                        Skontaktuj się z nami, aby otrzymać klucz API dający dostęp do naszej platformy.
                        Klucz jest wymagany do autoryzacji wszystkich żądań.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 bg-indigo-900/30 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-sm font-bold text-indigo-400">2</span>
                    </div>
                    <div>
                      <h3 className="text-white font-medium mb-1">Skonfiguruj integrację</h3>
                      <p className="text-zinc-400">
                        Dostosuj przykładowy kod dla swojego serwisu lub bota Discord, aby korzystać z naszego API.
                        Możesz użyć podanych przykładów jako podstawy do własnej implementacji.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 bg-indigo-900/30 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-sm font-bold text-indigo-400">3</span>
                    </div>
                    <div>
                      <h3 className="text-white font-medium mb-1">Korzystaj z funkcji legitcheck</h3>
                      <p className="text-zinc-400">
                        Twoi użytkownicy mogą teraz sprawdzać i zgłaszać oszustów bezpośrednio z Twojego serwisu.
                        System automatycznie zapisuje wszystkie legitchecki.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="discord" className="space-y-8">
              <div>
                <h2 className="text-xl font-medium text-white mb-3 flex items-center gap-2">
                  <Bot className="h-5 w-5 text-indigo-500" />
                  Integracja z botem Discord
                </h2>
                <p className="text-zinc-300 leading-relaxed mb-6">
                  Nasze API umożliwia łatwą integrację z botami Discord, co pozwala na sprawdzanie danych bezpośrednio
                  na serwerze oraz automatyczne zapisywanie wyników legitchecków.
                </p>
              </div>

              <div className="relative bg-zinc-950 rounded-lg border border-zinc-800 overflow-hidden">
                <div className="flex items-center justify-between p-4 border-b border-zinc-800">
                  <span className="text-sm font-medium text-white">Przykładowy kod integracji (JavaScript)</span>
                  <Badge variant="outline" className="text-indigo-400 border-indigo-900 bg-indigo-950/40">
                    discord.js v14+
                  </Badge>
                </div>
                <div className="relative">
                  <pre className="text-sm text-zinc-300 font-mono whitespace-pre overflow-x-auto p-4 bg-black/50 rounded-md max-h-[400px]">
{`const { Client, GatewayIntentBits, EmbedBuilder } = require('discord.js');
const axios = require('axios');

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ]
});

// Konfiguracja API
const API_KEY = 'TWÓJ_KLUCZ_API';
const API_BASE_URL = 'https://api.scamerzy.pl/v1';

client.once('ready', () => {
  console.log(\`Bot zalogowany jako \${client.user.tag}!\`);
});

client.on('interactionCreate', async interaction => {
  if (!interaction.isCommand()) return;

  const { commandName } = interaction;

  if (commandName === 'legitcheck') {
    const data = interaction.options.getString('dane');

    if (!data) {
      await interaction.reply('Podaj dane do sprawdzenia (numer telefonu, email, konto bankowe)');
      return;
    }

    await interaction.deferReply();

    try {
      const response = await axios.get(\`\${API_BASE_URL}/check\`, {
        params: { query: data },
        headers: { 'X-API-Key': API_KEY }
      });

      const result = response.data;

      const embed = new EmbedBuilder()
        .setTitle('LegitCheck - Wynik wyszukiwania')
        .setColor(result.found ? '#FF0000' : '#00FF00')
        .addFields(
          { name: 'Sprawdzane dane', value: data, inline: false },
          { name: 'Status', value: result.found ? '⚠️ SCAMER ZNALEZIONY' : '✅ Nie znaleziono w bazie', inline: false }
        )
        .setTimestamp()
        .setFooter({ text: 'Scamerzy API' });

      if (result.found) {
        embed.addFields(
          { name: 'Liczba zgłoszeń', value: \`\${result.reports_count}\`, inline: true },
          { name: 'Ostatnie zgłoszenie', value: result.last_report_date, inline: true }
        );
        if (result.description) {
          embed.addFields({ name: 'Opis', value: result.description, inline: false });
        }
      }

      // Automatycznie zapisz wynik legitchecka
      await axios.post(\`\${API_BASE_URL}/legitcheck\`, {
        query: data,
        result: result.found ? 'scammer' : 'legitimate',
        discord_user_id: interaction.user.id,
        discord_server_id: interaction.guild.id
      }, {
        headers: { 'X-API-Key': API_KEY }
      });

      await interaction.editReply({ embeds: [embed] });
    } catch (error) {
      console.error('Błąd przy sprawdzaniu danych:', error);
      await interaction.editReply('Wystąpił błąd podczas sprawdzania danych. Spróbuj ponownie później.');
    }
  }
});

client.login('TWÓJ_TOKEN_DISCORD');`}
                  </pre>
                  <button
                    onClick={() => copyToClipboard('discord-code', `const { Client, GatewayIntentBits, EmbedBuilder } = require('discord.js');
const axios = require('axios');

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ]
});

// Konfiguracja API
const API_KEY = 'TWÓJ_KLUCZ_API';
const API_BASE_URL = 'https://api.scamerzy.pl/v1';

client.once('ready', () => {
  console.log(\`Bot zalogowany jako \${client.user.tag}!\`);
});

client.on('interactionCreate', async interaction => {
  if (!interaction.isCommand()) return;

  const { commandName } = interaction;

  if (commandName === 'legitcheck') {
    const data = interaction.options.getString('dane');

    if (!data) {
      await interaction.reply('Podaj dane do sprawdzenia (numer telefonu, email, konto bankowe)');
      return;
    }

    await interaction.deferReply();

    try {
      const response = await axios.get(\`\${API_BASE_URL}/check\`, {
        params: { query: data },
        headers: { 'X-API-Key': API_KEY }
      });

      const result = response.data;

      const embed = new EmbedBuilder()
        .setTitle('LegitCheck - Wynik wyszukiwania')
        .setColor(result.found ? '#FF0000' : '#00FF00')
        .addFields(
          { name: 'Sprawdzane dane', value: data, inline: false },
          { name: 'Status', value: result.found ? '⚠️ SCAMER ZNALEZIONY' : '✅ Nie znaleziono w bazie', inline: false }
        )
        .setTimestamp()
        .setFooter({ text: 'Scamerzy API' });

      if (result.found) {
        embed.addFields(
          { name: 'Liczba zgłoszeń', value: \`\${result.reports_count}\`, inline: true },
          { name: 'Ostatnie zgłoszenie', value: result.last_report_date, inline: true }
        );
        if (result.description) {
          embed.addFields({ name: 'Opis', value: result.description, inline: false });
        }
      }

      // Automatycznie zapisz wynik legitchecka
      await axios.post(\`\${API_BASE_URL}/legitcheck\`, {
        query: data,
        result: result.found ? 'scammer' : 'legitimate',
        discord_user_id: interaction.user.id,
        discord_server_id: interaction.guild.id
      }, {
        headers: { 'X-API-Key': API_KEY }
      });

      await interaction.editReply({ embeds: [embed] });
    } catch (error) {
      console.error('Błąd przy sprawdzaniu danych:', error);
      await interaction.editReply('Wystąpił błąd podczas sprawdzania danych. Spróbuj ponownie później.');
    }
  }
});

client.login('TWÓJ_TOKEN_DISCORD');`)}
                    className="absolute top-4 right-4 p-2 rounded-md bg-zinc-800 hover:bg-zinc-700 transition-colors"
                    title="Kopiuj do schowka"
                  >
                    {copiedCode === 'discord-code' ? <ClipboardCheck className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4 text-zinc-400" />}
                  </button>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="endpoints" className="space-y-8">
              <div>
                <h2 className="text-xl font-medium text-white mb-3 flex items-center gap-2">
                  <Webhook className="h-5 w-5 text-indigo-500" />
                  Dostępne endpointy API
                </h2>
                <p className="text-zinc-300 leading-relaxed mb-6">
                  Poniżej znajduje się lista dostępnych endpointów API, które możesz wykorzystać do integracji
                  z naszą bazą danych oszustów.
                </p>
              </div>

              <div className="space-y-5">
                <Card className="bg-zinc-950 border-zinc-800 overflow-hidden">
                  <div className="flex items-center gap-2 bg-zinc-900 p-3 border-b border-zinc-800">
                    <Badge className="bg-green-600 hover:bg-green-700">GET</Badge>
                    <span className="text-white font-mono text-sm">/v1/check</span>
                  </div>
                  <CardContent className="p-4">
                    <p className="text-zinc-300 mb-3">Sprawdza czy podane dane znajdują się w bazie oszustów.</p>
                    <div className="space-y-4">
                      <div>
                        <h4 className="text-sm font-medium text-white mb-2">Parametry zapytania:</h4>
                        <div className="bg-zinc-900 rounded-lg p-3">
                          <div className="flex items-start gap-3">
                            <Badge variant="outline" className="text-indigo-400 border-indigo-900 bg-indigo-950/40 whitespace-nowrap mt-0.5">param</Badge>
                            <div>
                              <span className="text-indigo-400 font-mono">query</span>
                              <p className="text-sm text-zinc-400 mt-0.5">Dane do sprawdzenia (telefon, email, konto bankowe)</p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-white mb-2">Odpowiedź:</h4>
                        <div className="bg-zinc-900 rounded-lg p-3">
                          <pre className="text-sm text-zinc-300 font-mono overflow-x-auto">
{`{
  "found": boolean,
  "reports_count": number,
  "last_report_date": string,
  "description": string
}`}
                          </pre>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-zinc-950 border-zinc-800 overflow-hidden">
                  <div className="flex items-center gap-2 bg-zinc-900 p-3 border-b border-zinc-800">
                    <Badge className="bg-blue-600 hover:bg-blue-700">POST</Badge>
                    <span className="text-white font-mono text-sm">/v1/report</span>
                  </div>
                  <CardContent className="p-4">
                    <p className="text-zinc-300 mb-3">Dodaje nowe zgłoszenie oszusta do bazy danych.</p>
                    <div className="space-y-4">
                      <div>
                        <h4 className="text-sm font-medium text-white mb-2">Body (JSON):</h4>
                        <div className="bg-zinc-900 rounded-lg p-3 space-y-3">
                          <div className="flex items-start gap-3">
                            <Badge variant="outline" className="text-indigo-400 border-indigo-900 bg-indigo-950/40 whitespace-nowrap mt-0.5">required</Badge>
                            <div>
                              <span className="text-indigo-400 font-mono">scammer_data</span>
                              <p className="text-sm text-zinc-400 mt-0.5">Obiekt z danymi oszusta (telefon, email, konto, itd.)</p>
                            </div>
                          </div>
                          <div className="flex items-start gap-3">
                            <Badge variant="outline" className="text-indigo-400 border-indigo-900 bg-indigo-950/40 whitespace-nowrap mt-0.5">required</Badge>
                            <div>
                              <span className="text-indigo-400 font-mono">description</span>
                              <p className="text-sm text-zinc-400 mt-0.5">Opis oszustwa</p>
                            </div>
                          </div>
                          <div className="flex items-start gap-3">
                            <Badge variant="outline" className="text-zinc-500 border-zinc-700 bg-zinc-800/40 whitespace-nowrap mt-0.5">optional</Badge>
                            <div>
                              <span className="text-indigo-400 font-mono">reported_by</span>
                              <p className="text-sm text-zinc-400 mt-0.5">Identyfikator zgłaszającego</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="examples" className="space-y-8">
              <div>
                <h2 className="text-xl font-medium text-white mb-3 flex items-center gap-2">
                  <Code className="h-5 w-5 text-indigo-500" />
                  Przykłady użycia API
                </h2>
                <p className="text-zinc-300 leading-relaxed mb-6">
                  Poniżej znajdują się przykłady wykorzystania naszego API w różnych językach programowania.
                </p>
              </div>

              <div className="space-y-6">
                <Card className="bg-zinc-950 border-zinc-800 overflow-hidden">
                  <div className="flex items-center justify-between p-4 border-b border-zinc-800">
                    <span className="text-white font-medium">Sprawdzanie danych (Python)</span>
                    <Badge className="bg-indigo-900/40 text-indigo-400 border-indigo-800">Python</Badge>
                  </div>
                  <div className="relative">
                    <pre className="text-sm text-zinc-300 font-mono whitespace-pre overflow-x-auto p-4 bg-black/50 rounded-md max-h-[300px]">
{`import requests

API_KEY = "TWÓJ_KLUCZ_API"
API_BASE_URL = "https://api.scamerzy.pl/v1"

def check_scammer(query):
    headers = {
        "X-API-Key": API_KEY
    }

    response = requests.get(
        f"{API_BASE_URL}/check",
        params={"query": query},
        headers=headers
    )

    if response.status_code == 200:
        data = response.json()
        if data["found"]:
            print(f"OSTRZEŻENIE: Znaleziono oszusta!")
            print(f"Liczba zgłoszeń: {data['reports_count']}")
            print(f"Ostatnie zgłoszenie: {data['last_report_date']}")
            print(f"Opis: {data.get('description', 'Brak opisu')}")
        else:
            print("Nie znaleziono w bazie oszustów.")
    else:
        print(f"Błąd: {response.status_code}")
        print(response.text)

# Przykład użycia
check_scammer("500123456")  # Sprawdzenie numeru telefonu
check_scammer("fake@scammer.com")  # Sprawdzenie adresu email`}
                    </pre>
                    <button
                      onClick={() => copyToClipboard('python-code', `import requests

API_KEY = "TWÓJ_KLUCZ_API"
API_BASE_URL = "https://api.scamerzy.pl/v1"

def check_scammer(query):
    headers = {
        "X-API-Key": API_KEY
    }

    response = requests.get(
        f"{API_BASE_URL}/check",
        params={"query": query},
        headers=headers
    )

    if response.status_code == 200:
        data = response.json()
        if data["found"]:
            print(f"OSTRZEŻENIE: Znaleziono oszusta!")
            print(f"Liczba zgłoszeń: {data['reports_count']}")
            print(f"Ostatnie zgłoszenie: {data['last_report_date']}")
            print(f"Opis: {data.get('description', 'Brak opisu')}")
        else:
            print("Nie znaleziono w bazie oszustów.")
    else:
        print(f"Błąd: {response.status_code}")
        print(response.text)

# Przykład użycia
check_scammer("500123456")  # Sprawdzenie numeru telefonu
check_scammer("fake@scammer.com")  # Sprawdzenie adresu email`)}
                      className="absolute top-4 right-4 p-2 rounded-md bg-zinc-800 hover:bg-zinc-700 transition-colors"
                      title="Kopiuj do schowka"
                    >
                      {copiedCode === 'python-code' ? <ClipboardCheck className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4 text-zinc-400" />}
                    </button>
                  </div>
                </Card>
              </div>

              <Card className="bg-indigo-900/10 border border-indigo-900/30 rounded-lg overflow-hidden mt-8">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="bg-indigo-900/30 p-2 rounded-full">
                      <CheckCircle className="h-5 w-5 text-indigo-400" />
                    </div>
                    <div>
                      <h3 className="text-white font-medium mb-2">Potrzebujesz więcej pomocy?</h3>
                      <p className="text-zinc-400 text-sm">
                        Jeśli potrzebujesz dodatkowej pomocy przy integracji naszego API,
                        skontaktuj się z nami przez formularz kontaktowy. Nasz zespół techniczny pomoże
                        Ci zintegrować API z Twoim botem lub aplikacją.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </motion.div>
  );
}
