import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, Code, Database, Megaphone, Phone, Github, Twitter, Linkedin } from "lucide-react";

export const metadata: Metadata = {
  title: "Nasz Zespół | LegitCheck",
  description: "Poznaj zespół odpowiedzialny za rozwój i utrzymanie LegitCheck",
};

// Dane symulujące członków zespołu
const teamMembers = [
  {
    name: "Jan Kowalski",
    role: "Założyciel & CEO",
    description: "Odpowiedzialny za całokształt projektu i jego rozwój.",
    avatar: "https://i.pravatar.cc/300?img=1",
    icon: <Shield className="h-8 w-8 text-primary" />,
    socials: [
      { type: "github", url: "https://github.com" },
      { type: "twitter", url: "https://twitter.com" },
      { type: "linkedin", url: "https://linkedin.com" },
    ],
  },
  {
    name: "Anna Nowak",
    role: "Lead Developer",
    description: "Prowadzi rozwój techniczny platformy i nadzoruje implementację nowych funkcji.",
    avatar: "https://i.pravatar.cc/300?img=5",
    icon: <Code className="h-8 w-8 text-primary" />,
    socials: [
      { type: "github", url: "https://github.com" },
      { type: "linkedin", url: "https://linkedin.com" },
    ],
  },
  {
    name: "Piotr Wiśniewski",
    role: "Backend Developer",
    description: "Odpowiada za serwer, bazę danych i wydajność systemu.",
    avatar: "https://i.pravatar.cc/300?img=3",
    icon: <Database className="h-8 w-8 text-primary" />,
    socials: [
      { type: "github", url: "https://github.com" },
    ],
  },
  {
    name: "Magdalena Jabłońska",
    role: "Community Manager",
    description: "Dba o społeczność i komunikację z użytkownikami.",
    avatar: "https://i.pravatar.cc/300?img=4",
    icon: <Megaphone className="h-8 w-8 text-primary" />,
    socials: [
      { type: "twitter", url: "https://twitter.com" },
      { type: "linkedin", url: "https://linkedin.com" },
    ],
  },
  {
    name: "Krzysztof Zieliński",
    role: "Support Specialist",
    description: "Pierwsza linia wsparcia dla użytkowników platformy.",
    avatar: "https://i.pravatar.cc/300?img=8",
    icon: <Phone className="h-8 w-8 text-primary" />,
    socials: [
      { type: "linkedin", url: "https://linkedin.com" },
    ],
  },
];

export default function TeamPage() {
  return (
    <div className="container py-10 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="space-y-2 text-center max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold tracking-tight">Nasz Zespół</h1>
        <p className="text-muted-foreground">
          Poznaj ludzi, którzy stoją za projektem LegitCheck i codziennie pracują nad bezpieczeństwem zakupów online.
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 mt-8">
        {teamMembers.map((member, index) => (
          <TeamMemberCard key={index} member={member} index={index} />
        ))}
      </div>

      <div className="bg-muted rounded-lg p-6 mt-12">
        <div className="text-center max-w-2xl mx-auto space-y-4">
          <h2 className="text-2xl font-bold">Dołącz do Nas</h2>
          <p>
            Jesteśmy zawsze otwarci na nowe talenty, które chcą przyczynić się do zwiększenia bezpieczeństwa w sieci.
            Jeśli jesteś zainteresowany/a współpracą, sprawdź dostępne pozycje lub skontaktuj się z nami.
          </p>
          <Link 
            href="/kontakt"
            className="inline-block mt-2 px-6 py-2 rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
          >
            Skontaktuj się z nami
          </Link>
        </div>
      </div>
    </div>
  );
}

// Komponent karty członka zespołu
function TeamMemberCard({ member, index }: { member: any, index: number }) {
  return (
    <Card className="overflow-hidden transition-all hover:shadow-md group animate-in fade-in slide-in-from-bottom-4" style={{ animationDelay: `${index * 100}ms` }}>
      <CardHeader className="pb-0">
        <div className="flex items-center space-x-4">
          <div className="relative h-16 w-16 rounded-full overflow-hidden border-2 border-primary">
            <Image
              src={member.avatar}
              alt={member.name}
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-300"
            />
          </div>
          <div>
            <CardTitle>{member.name}</CardTitle>
            <CardDescription className="flex items-center">
              {member.icon}
              <span className="ml-2">{member.role}</span>
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-4">
        <p className="text-sm text-muted-foreground mb-4">{member.description}</p>
        <div className="flex space-x-2 mt-auto">
          {member.socials.map((social: any, idx: number) => (
            <Link 
              key={idx} 
              href={social.url} 
              className="text-muted-foreground hover:text-primary transition-colors" 
              target="_blank" 
              rel="noopener noreferrer"
            >
              {social.type === "github" && <Github className="h-5 w-5" />}
              {social.type === "twitter" && <Twitter className="h-5 w-5" />}
              {social.type === "linkedin" && <Linkedin className="h-5 w-5" />}
              <span className="sr-only">{social.type}</span>
            </Link>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}