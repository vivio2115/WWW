import { Metadata } from "next";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Code, Send, Webhook, Shield, Bot, CheckCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = {
  title: "Użyj naszego API - Scamerzy",
  description: "Integracja API Scamerzy z botem Discord, aby automatycznie weryfikować i zapisywać legitchecki.",
};

export default function ApiDocsPage() {
  return (
    <div className="container px-4 md:px-6 py-12">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="space-y-4 text-center">
          <div className="inline-flex justify-center items-center mx-auto mb-4">
            <div className="h-12 w-12 bg-indigo-600 rounded-full flex items-center justify-center">
              <Code className="h-6 w-6 text-white" />
            </div>
          </div>
          <h1 className="text-3xl font-bold tracking-tighter text-white">Użyj naszego API</h1>
          <p className="text-zinc-400 md:text-lg max-w-2xl mx-auto">
            Integruj API Scamerzy z Twoim botem Discord, aby automatycznie weryfikować i zapisywać legitchecki.
          </p>
        </div>

        <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-8 shadow-lg">
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="mb-6 bg-zinc-800 p-1">
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

            <TabsContent value="overview" className="space-y-6">
              <div>
                <h2 className="text-xl font-medium text-white mb-3 flex items-center gap-2">
                  <Shield className="h-5 w-5 text-indigo-500" />
                  Czym jest API Scamerzy?
                </h2>
                <p className="text-zinc-400 leading-relaxed">
                  API Scamerzy umożliwia zintegrowanie naszej bazy danych oszustów z zewnętrznymi aplikacjami i serwisami.
                  Dzięki temu możesz automatycznie sprawdzać, czy dana osoba znajduje się w naszej bazie danych, oraz dodawać
                  nowe zgłoszenia bez konieczności korzystania z interfejsu webowego.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                <div className="bg-zinc-950 p-5 rounded-lg border border-zinc-800">
                  <div className="flex items-center gap-3 mb-3">
                    <Bot className="h-5 w-5 text-indigo-500" />
                    <h3 className="font-medium text-white">Integracja z Discordem</h3>
                  </div>
                  <p className="text-zinc-400 text-sm">
                    Podłącz swojego bota Discord do naszego API, aby umożliwić użytkownikom sprawdzanie i zgłaszanie
                    oszustów bezpośrednio na serwerze Discord.
                  </p>
                </div>

                <div className="bg-zinc-950 p-5 rounded-lg border border-zinc-800">
                  <div className="flex items-center gap-3 mb-3">
                    <Send className="h-5 w-5 text-indigo-500" />
                    <h3 className="font-medium text-white">Automatyczne zgłoszenia</h3>
                  </div>
                  <p className="text-zinc-400 text-sm">
                    Automatyzuj proces zgłaszania oszustów poprzez integrację API z istniejącymi systemami
                    lub formularzami na Twojej stronie.
                  </p>
                </div>
              </div>

              <div className="mt-8">
                <h2 className="text-xl font-medium text-white mb-4">Zaczynamy</h2>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-indigo-900/30 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-xs font-bold text-indigo-500">1</span>
                    </div>
                    <p className="text-zinc-400">
                      <span className="text-white font-medium">Uzyskaj klucz API</span> - Skontaktuj się z nami, aby otrzymać
                      klucz API dający dostęp do naszej platformy.
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-indigo-900/30 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-xs font-bold text-indigo-500">2</span>
                    </div>
                    <p className="text-zinc-400">
                      <span className="text-white font-medium">Skonfiguruj Twojego bota</span> - Dostosuj przykładowy kod dla swojego bota Discord,
                      aby korzystać z naszego API.
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-indigo-900/30 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-xs font-bold text-indigo-500">3</span>
                    </div>
                    <p className="text-zinc-400">
                      <span className="text-white font-medium">Korzystaj z legitchecków</span> - Twoi użytkownicy mogą teraz sprawdzać i zgłaszać
                      oszustów bezpośrednio na Discordzie.
                    </p>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="discord" className="space-y-6">
              <div>
                <h2 className="text-xl font-medium text-white mb-3 flex items-center gap-2">
                  <Bot className="h-5 w-5 text-indigo-500" />
                  Integracja z botem Discord
                </h2>
                <p className="text-zinc-400 leading-relaxed mb-6">
                  Nasze API umożliwia łatwą integrację z botami Discord, co pozwala na sprawdzanie danych bezpośrednio
                  na serwerze oraz automatyczne zapisywanie wyników legitchecków.
                </p>
              </div>

              <div className="bg-zinc-950 p-6 rounded-lg border border-zinc-800 overflow-x-auto">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm font-medium text-white">Przykładowy kod integracji (JavaScript)</span>
                  <Badge variant="outline" className="text-indigo-400 border-indigo-900 bg-indigo-950/40">
                    discord.js v14+
                  </Badge>
                </div>
                <pre className="text-sm text-zinc-300 font-mono whitespace-pre overflow-x-auto p-4 bg-black/50 rounded-md">
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
              </div>

              <div className="mt-6">
                <h3 className="text-lg font-medium text-white mb-3">Konfiguracja komend slash</h3>
                <div className="bg-zinc-950 p-6 rounded-lg border border-zinc-800 overflow-x-auto">
                  <pre className="text-sm text-zinc-300 font-mono whitespace-pre overflow-x-auto p-4 bg-black/50 rounded-md">
{`// Rejestracja komend slash
const { REST, Routes } = require('discord.js');

const commands = [
  {
    name: 'legitcheck',
    description: 'Sprawdź czy dane należą do oszusta',
    options: [
      {
        name: 'dane',
        type: 3, // STRING
        description: 'Numer telefonu, email, konto bankowe lub nazwa użytkownika',
        required: true
      }
    ]
  },
  {
    name: 'zglos',
    description: 'Zgłoś oszusta do bazy danych',
    options: [
      {
        name: 'dane',
        type: 3,
        description: 'Dane oszusta (np. telefon, email, konto)',
        required: true
      },
      {
        name: 'opis',
        type: 3,
        description: 'Krótki opis oszustwa',
        required: true
      }
    ]
  }
];

const rest = new REST({ version: '10' }).setToken('TWÓJ_TOKEN_DISCORD');

(async () => {
  try {
    console.log('Rejestrowanie komend slash...');
    await rest.put(
      Routes.applicationCommands(CLIENT_ID),
      { body: commands },
    );
    console.log('Pomyślnie zarejestrowano komendy slash');
  } catch (error) {
    console.error(error);
  }
})();`}
                  </pre>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="endpoints" className="space-y-6">
              <div>
                <h2 className="text-xl font-medium text-white mb-3 flex items-center gap-2">
                  <Webhook className="h-5 w-5 text-indigo-500" />
                  Dostępne endpointy API
                </h2>
                <p className="text-zinc-400 leading-relaxed mb-6">
                  Poniżej znajduje się lista dostępnych endpointów API, które możesz wykorzystać do integracji
                  z naszą bazą danych oszustów.
                </p>
              </div>

              <div className="space-y-5">
                <div className="border border-zinc-800 rounded-lg overflow-hidden">
                  <div className="flex items-center gap-2 bg-zinc-950 p-3 border-b border-zinc-800">
                    <Badge className="bg-green-600">GET</Badge>
                    <span className="text-white font-mono text-sm">/v1/check</span>
                  </div>
                  <div className="p-4 bg-zinc-900">
                    <p className="text-zinc-400 mb-3">Sprawdza czy podane dane znajdują się w bazie oszustów.</p>
                    <div className="space-y-3">
                      <div>
                        <h4 className="text-sm font-medium text-white mb-1">Parametry zapytania:</h4>
                        <ul className="text-sm text-zinc-400 space-y-1">
                          <li><span className="text-indigo-400 font-mono">query</span> - dane do sprawdzenia (telefon, email, konto bankowe)</li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-white mb-1">Odpowiedź:</h4>
                        <div className="text-sm text-zinc-300 font-mono bg-black/30 p-2 rounded-md">
                          {`{ "found": boolean, "reports_count": number, "last_report_date": string, "description": string }`}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="border border-zinc-800 rounded-lg overflow-hidden">
                  <div className="flex items-center gap-2 bg-zinc-950 p-3 border-b border-zinc-800">
                    <Badge className="bg-blue-600">POST</Badge>
                    <span className="text-white font-mono text-sm">/v1/report</span>
                  </div>
                  <div className="p-4 bg-zinc-900">
                    <p className="text-zinc-400 mb-3">Dodaje nowe zgłoszenie oszusta do bazy danych.</p>
                    <div className="space-y-3">
                      <div>
                        <h4 className="text-sm font-medium text-white mb-1">Body (JSON):</h4>
                        <ul className="text-sm text-zinc-400 space-y-1">
                          <li><span className="text-indigo-400 font-mono">scammer_data</span> - obiekt z danymi oszusta (telefon, email, konto, itd.)</li>
                          <li><span className="text-indigo-400 font-mono">description</span> - opis oszustwa</li>
                          <li><span className="text-indigo-400 font-mono">reported_by</span> - identyfikator zgłaszającego (opcjonalnie)</li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-white mb-1">Odpowiedź:</h4>
                        <div className="text-sm text-zinc-300 font-mono bg-black/30 p-2 rounded-md">
                          {`{ "success": boolean, "report_id": string, "status": "pending" }`}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="border border-zinc-800 rounded-lg overflow-hidden">
                  <div className="flex items-center gap-2 bg-zinc-950 p-3 border-b border-zinc-800">
                    <Badge className="bg-blue-600">POST</Badge>
                    <span className="text-white font-mono text-sm">/v1/legitcheck</span>
                  </div>
                  <div className="p-4 bg-zinc-900">
                    <p className="text-zinc-400 mb-3">Zapisuje wynik legitchecka i związane z nim dane.</p>
                    <div className="space-y-3">
                      <div>
                        <h4 className="text-sm font-medium text-white mb-1">Body (JSON):</h4>
                        <ul className="text-sm text-zinc-400 space-y-1">
                          <li><span className="text-indigo-400 font-mono">query</span> - sprawdzane dane</li>
                          <li><span className="text-indigo-400 font-mono">result</span> - wynik sprawdzenia ('scammer' lub 'legitimate')</li>
                          <li><span className="text-indigo-400 font-mono">discord_user_id</span> - ID użytkownika Discord (opcjonalnie)</li>
                          <li><span className="text-indigo-400 font-mono">discord_server_id</span> - ID serwera Discord (opcjonalnie)</li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-white mb-1">Odpowiedź:</h4>
                        <div className="text-sm text-zinc-300 font-mono bg-black/30 p-2 rounded-md">
                          {`{ "success": boolean, "legitcheck_id": string }`}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="examples" className="space-y-6">
              <div>
                <h2 className="text-xl font-medium text-white mb-3 flex items-center gap-2">
                  <Code className="h-5 w-5 text-indigo-500" />
                  Przykłady użycia API
                </h2>
                <p className="text-zinc-400 leading-relaxed mb-6">
                  Poniżej znajdują się przykłady wykorzystania naszego API w różnych językach programowania.
                </p>
              </div>

              <div className="space-y-6">
                <div className="bg-zinc-950 rounded-lg border border-zinc-800 overflow-hidden">
                  <div className="flex items-center justify-between bg-zinc-900 p-3 border-b border-zinc-800">
                    <span className="text-white font-medium">Sprawdzanie danych (Python)</span>
                    <Badge className="bg-indigo-900/40 text-indigo-400 border-indigo-800">Python</Badge>
                  </div>
                  <div className="p-4">
                    <pre className="text-sm text-zinc-300 font-mono whitespace-pre overflow-x-auto p-4 bg-black/50 rounded-md">
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
                  </div>
                </div>

                <div className="bg-zinc-950 rounded-lg border border-zinc-800 overflow-hidden">
                  <div className="flex items-center justify-between bg-zinc-900 p-3 border-b border-zinc-800">
                    <span className="text-white font-medium">Zgłaszanie oszusta (Node.js)</span>
                    <Badge className="bg-indigo-900/40 text-indigo-400 border-indigo-800">Node.js</Badge>
                  </div>
                  <div className="p-4">
                    <pre className="text-sm text-zinc-300 font-mono whitespace-pre overflow-x-auto p-4 bg-black/50 rounded-md">
{`const axios = require('axios');

const API_KEY = 'TWÓJ_KLUCZ_API';
const API_BASE_URL = 'https://api.scamerzy.pl/v1';

async function reportScammer(scammerData, description, reportedBy = 'anonymous') {
  try {
    const response = await axios.post(
      \`\${API_BASE_URL}/report\`,
      {
        scammer_data: scammerData,
        description,
        reported_by: reportedBy
      },
      {
        headers: {
          'X-API-Key': API_KEY,
          'Content-Type': 'application/json'
        }
      }
    );

    console.log('Zgłoszenie wysłane pomyślnie!');
    console.log(\`ID zgłoszenia: \${response.data.report_id}\`);
    console.log(\`Status: \${response.data.status}\`);

    return response.data;
  } catch (error) {
    console.error('Błąd podczas zgłaszania:', error.response?.data || error.message);
    throw error;
  }
}

// Przykład użycia
reportScammer(
  {
    name: 'Jan Kowalski',
    phoneNumber: '500123456',
    email: 'fake@scammer.com',
    bankAccount: '12 1234 5678 9012 3456 7890 1234'
  },
  'Oszust sprzedający nieistniejące telefony. Pobiera zaliczki i znika.',
  'jan.nowak@example.com'
);`}
                    </pre>
                  </div>
                </div>
              </div>

              <div className="bg-indigo-900/10 border border-indigo-900/30 rounded-lg p-6 mt-8">
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
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
