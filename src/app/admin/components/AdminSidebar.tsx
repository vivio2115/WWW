"use client";

import Link from "next/link";
import {
  Settings,
  ShieldCheck,
  Users,
  Activity,
  FileText,
  Bell,
  BarChart4,
  LogOut,
  AlertTriangle
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface AdminSidebarProps {
  activeItem: string;
}

const menuItems = [
  { label: "Dashboard", icon: <Activity className="h-4 w-4" />, href: "/admin/dashboard" },
  { label: "Zgłoszenia", icon: <Bell className="h-4 w-4" />, href: "/admin/dashboard/zgloszenia", count: 12 },
  { label: "Użytkownicy", icon: <Users className="h-4 w-4" />, href: "/admin/dashboard/uzytkownicy" },
  { label: "Weryfikacja", icon: <ShieldCheck className="h-4 w-4" />, href: "/admin/dashboard/weryfikacja" },
  { label: "Raporty", icon: <FileText className="h-4 w-4" />, href: "/admin/dashboard/raporty" },
  { label: "Statystyki", icon: <BarChart4 className="h-4 w-4" />, href: "/admin/dashboard/statystyki" },
  { label: "Incydenty", icon: <AlertTriangle className="h-4 w-4" />, href: "/admin/dashboard/incydenty" },
];

export default function AdminSidebar({ activeItem }: AdminSidebarProps) {
  return (
    <aside className="lg:w-64 flex-shrink-0">
      <Card className="bg-zinc-900 border-zinc-800 sticky top-24">
        <CardHeader className="pb-3">
          <CardTitle className="text-xl text-white flex items-center gap-2">
            <Settings className="h-5 w-5 text-red-500" />
            Panel Admina
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <nav className="flex flex-col">
            {menuItems.map((item) => {
              const isActive = activeItem === item.label;
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className={`flex items-center justify-between px-4 py-3 text-sm transition-colors hover:bg-zinc-800 ${
                    isActive ? 'bg-zinc-800 border-l-2 border-red-500' : 'text-zinc-400'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    {item.icon}
                    <span>{item.label}</span>
                  </div>
                  {item.count && (
                    <Badge className="bg-red-500 hover:bg-red-600">
                      {item.count}
                    </Badge>
                  )}
                </Link>
              );
            })}

            <div className="px-4 py-6 border-t border-zinc-800">
              <Link href="/admin/login" className="flex items-center gap-2 text-zinc-400 hover:text-zinc-300 text-sm">
                <LogOut className="h-4 w-4" />
                <span>Wyloguj się</span>
              </Link>
            </div>
          </nav>
        </CardContent>
      </Card>
    </aside>
  );
}