import { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Panel Administratora - Scamers",
  description: "Panel administracyjny do weryfikacji zgłoszeń oszustów.",
};

export default function AdminPage() {
  // W rzeczywistości tutaj byłaby logika sprawdzająca czy użytkownik jest zalogowany
  // Przekierowanie do strony logowania
  redirect("/admin/login");

  return null;
}
