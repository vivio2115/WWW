import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, Code, Database, Megaphone, Phone, Github, Twitter, Linkedin, Mail, ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = {
  title: "Nasz Zespół | Scamers",
  description: "Poznaj zespół odpowiedzialny za rozwój i utrzymanie serwisu LegitCheck",
};

// Dane zespołu z nowymi awatarami i szczegółami
const teamMembers = [
  {
    name: "xxyz__",
    role: "Założyciel & CEO",
    description: "Odpowiedzialny za całokształt projektu i jego rozwój strategiczny.",
    avatar: "./images/xxyz.png",
    icon: <Shield className="h-8 w-8 text-red-500" />,
    skills: ["Zarządzanie", "Bezpieczeństwo", "Strategia"],
    socials: [
      { type: "github", url: "https://github.com", icon: <Github className="h-5 w-5" /> },
      { type: "mail", url: "mailto:jan@legitcheck.pl", icon: <Mail className="h-5 w-5" /> },
    ],
  },
  {
    name: "vi_vio",
    role: "Lead Developer",
    description: "Prowadzi rozwój techniczny platformy i nadzoruje implementację nowych funkcji.",
    avatar: "./images/vivio.png",
    icon: <Code className="h-8 w-8 text-red-500" />,
    skills: ["React", "Node.js", "TypeScript", "Cybersecurity", "Go"],
    socials: [
      { type: "github", url: "https://github.com", icon: <Github className="h-5 w-5" /> },
      { type: "mail", url: "mailto:anna@legitcheck.pl", icon: <Mail className="h-5 w-5" /> },
    ],
  }
];

export default function TeamPage() {
  return (
    <div className="container py-12 space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Nagłówek sekcji */}
      <div className="space-y-4 text-center max-w-3xl mx-auto">
        <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-red-600 mb-4">
          <Shield className="h-6 w-6 text-white" />
        </div>
        <h1 className="text-4xl font-bold tracking-tight">Nasz Zespół</h1>
        <p className="text-muted-foreground text-lg">
          Poznaj ludzi, którzy stoją za projektem Scamers i codziennie pracują nad bezpieczeństwem zakupów online.
        </p>
      </div>

      {/* Sekcja z kartami zespołu */}
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 mt-12">
        {teamMembers.map((member, index) => (
          <TeamMemberCard key={index} member={member} index={index} />
        ))}
      </div>

      {/* Sekcja rekrutacyjna */}
      <div className="relative overflow-hidden rounded-lg bg-zinc-900 p-8 mt-16">
        <div className="absolute inset-0 bg-gradient-to-br from-red-500 to-transparent opacity-30"></div>
        <div className="relative z-10 text-center max-w-2xl mx-auto space-y-5">
          <h2 className="text-3xl font-bold text-white">Dołącz do Naszego Zespołu</h2>
          <p className="text-zinc-300">
            Jesteśmy zawsze otwarci na nowe talenty, które chcą przyczynić się do zwiększenia bezpieczeństwa w sieci.
            Szukamy pasjonatów technologii i bezpieczeństwa cyfrowego, którzy podzielają nasze wartości.
          </p>
          <Link
            href="/kontakt"
            className="inline-block mt-4 px-6 py-3 rounded-md bg-red-600 text-white hover:bg-red-700 transition-colors font-medium"
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
    <Card className="overflow-hidden transition-all hover:shadow-lg hover:border-red-500/50 group animate-in fade-in slide-in-from-bottom-4 bg-zinc-950 border-zinc-800"
          style={{ animationDelay: `${index * 150}ms` }}>
      <CardHeader className="pb-0">
        <div className="flex gap-4">
          <div className="relative h-20 w-20 rounded-xl overflow-hidden border-2 border-red-500/50 shadow-md shadow-red-500/10">
            <Image
              src={member.avatar}
              alt={member.name}
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-500"
            />
          </div>
          <div className="space-y-1.5">
            <CardTitle className="text-xl text-white group-hover:text-red-500 transition-colors">
              {member.name}
            </CardTitle>
            <CardDescription className="flex items-center gap-2 text-zinc-400">
              {member.icon}
              <span>{member.role}</span>
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-6 space-y-4">
        <p className="text-zinc-400 text-sm">{member.description}</p>

        {/* Umiejętności */}
        <div className="flex flex-wrap gap-2">
          {member.skills.map((skill: string, idx: number) => (
            <Badge key={idx} variant="outline" className="bg-zinc-900 text-zinc-300 border-zinc-700 text-xs">
              {skill}
            </Badge>
          ))}
        </div>

        {/* Social Media */}
        <div className="flex space-x-3 pt-3 border-t border-zinc-800">
          {member.socials.map((social: any, idx: number) => (
            <Link
              key={idx}
              href={social.url}
              className="text-zinc-500 hover:text-red-500 transition-colors"
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${social.type} profil ${member.name}`}
            >
              {social.icon}
            </Link>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
