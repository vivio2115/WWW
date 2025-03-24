"use client";

import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";
import { AlertTriangle } from "lucide-react";
import Image from "next/image";

const formSchema = z.object({
  scammerData: z.object({
    phone: z.string().optional(),
    email: z.string().email().optional(),
    bankAccount: z.string().optional(),
    website: z.string().url().optional(),
    socialMedia: z.string().optional(),
  }).refine(data => {
    // At least one field must be filled
    return Object.values(data).some(val => val && val.trim() !== "");
  }, {
    message: "Przynajmniej jeden sposób kontaktu z oszustem musi być podany",
  }),
  incidentDetails: z.object({
    scamDescription: z.string()
      .min(20, "Opis musi zawierać przynajmniej 20 znaków")
      .max(1000, "Opis nie może być dłuższy niż 1000 znaków"),
    scamType: z.string().min(1, "Wybierz rodzaj oszustwa"),
    scamDate: z.string().min(1, "Data jest wymagana"),
    scamAmount: z.string().optional(),
  }),
  contactInfo: z.object({
    reporterEmail: z.string().email("Wprowadź poprawny adres e-mail").optional(),
    additionalNotes: z.string().max(500, "Dodatkowe informacje nie mogą być dłuższe niż 500 znaków").optional(),
  }),
});

type FormValues = z.infer<typeof formSchema>;

const scamTypes = [
  "Fałszywe ogłoszenie sprzedaży",
  "Oszustwo przy zakupie",
  "Fałszywa inwestycja",
  "Wyłudzenie danych osobowych",
  "Oszustwo na portalu randkowym",
  "Fałszywa loteria/konkurs",
  "Oszustwo bankowe/finansowe",
  "Phishing",
  "Inne",
];

export default function ScamReportForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      scammerData: {
        phone: "",
        email: "",
        bankAccount: "",
        website: "",
        socialMedia: "",
      },
      incidentDetails: {
        scamDescription: "",
        scamType: "",
        scamDate: "",
        scamAmount: "",
      },
      contactInfo: {
        reporterEmail: "",
        additionalNotes: "",
      },
    },
  });

  async function onSubmit(data: FormValues) {
    setIsSubmitting(true);
    try {
      // In a real application, we would send this data to a server
      console.log(data);

      // Simulate a server delay
      await new Promise(resolve => setTimeout(resolve, 1500));

      toast.success("Dziękujemy za zgłoszenie. Nasz zespół zajmie się weryfikacją danych.");
      form.reset();
    } catch (error) {
      toast.error("Wystąpił błąd podczas wysyłania zgłoszenia. Spróbuj ponownie później.");
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div>
          <h2 className="text-xl font-semibold mb-4 text-white flex items-center gap-2">
            <Image src="/images/logo.png" alt="Logo" width={24} height={24} className="h-6 w-6" />
            Dane oszusta
          </h2>

          <div className="grid gap-4 sm:grid-cols-2">
            <FormField
              control={form.control}
              name="scammerData.phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">Numer telefonu</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="np. 500100200"
                      {...field}
                      className="bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-500"
                    />
                  </FormControl>
                  <FormDescription className="text-zinc-500">
                    Podaj numer telefonu oszusta
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="scammerData.email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">Adres e-mail</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="np. oszust@example.com"
                      {...field}
                      className="bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-500"
                    />
                  </FormControl>
                  <FormDescription className="text-zinc-500">
                    Podaj adres e-mail oszusta
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2 mt-4">
            <FormField
              control={form.control}
              name="scammerData.bankAccount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">Numer konta bankowego</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="np. 1234 5678 9012 3456"
                      {...field}
                      className="bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-500"
                    />
                  </FormControl>
                  <FormDescription className="text-zinc-500">
                    Podaj numer konta używany przez oszusta
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="scammerData.website"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">Strona internetowa</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="np. https://oszustow.net"
                      {...field}
                      className="bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-500"
                    />
                  </FormControl>
                  <FormDescription className="text-zinc-500">
                    Podaj adres strony oszusta
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="mt-4">
            <FormField
              control={form.control}
              name="scammerData.socialMedia"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">Profile w mediach społecznościowych</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="np. facebook.com/oszust123, @oszust_insta"
                      {...field}
                      className="bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-500"
                    />
                  </FormControl>
                  <FormDescription className="text-zinc-500">
                    Podaj linki do profili oszusta w mediach społecznościowych
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {Object.keys(form.formState.errors.scammerData || {}).length > 0 && (
            <Card className="mt-4 p-3 border-red-900 bg-red-950 text-red-200">
              <div className="flex items-center gap-2 text-sm">
                <AlertTriangle className="h-4 w-4 text-red-300" />
                <p>Przynajmniej jeden sposób kontaktu z oszustem musi być podany</p>
              </div>
            </Card>
          )}
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4 text-white">Szczegóły oszustwa</h2>

          <div className="grid gap-4 sm:grid-cols-2">
            <FormField
              control={form.control}
              name="incidentDetails.scamType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">Rodzaj oszustwa</FormLabel>
                  <FormControl>
                    <select
                      className="flex h-10 w-full rounded-md border border-zinc-700 bg-zinc-800 px-3 py-2 text-sm text-white ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-zinc-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      {...field}
                    >
                      <option value="" className="bg-zinc-900">Wybierz rodzaj oszustwa</option>
                      {scamTypes.map(type => (
                        <option key={type} value={type} className="bg-zinc-900">
                          {type}
                        </option>
                      ))}
                    </select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="incidentDetails.scamDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">Data oszustwa</FormLabel>
                  <FormControl>
                    <Input
                      type="date"
                      {...field}
                      className="bg-zinc-800 border-zinc-700 text-white"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="mt-4">
            <FormField
              control={form.control}
              name="incidentDetails.scamAmount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">Kwota oszustwa (opcjonalnie)</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="np. 1000 zł"
                      {...field}
                      className="bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-500"
                    />
                  </FormControl>
                  <FormDescription className="text-zinc-500">
                    Podaj kwotę, jeśli doszło do straty finansowej
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="mt-4">
            <FormField
              control={form.control}
              name="incidentDetails.scamDescription"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">Opis oszustwa</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Opisz dokładnie jak doszło do oszustwa, na czym polegało, jakie były okoliczności..."
                      className="min-h-32 bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-500"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription className="text-zinc-500">
                    Podaj jak najwięcej szczegółów, które pomogą nam w weryfikacji zgłoszenia
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4 text-white">Dane kontaktowe (opcjonalnie)</h2>

          <div className="grid gap-4 sm:grid-cols-2">
            <FormField
              control={form.control}
              name="contactInfo.reporterEmail"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">Twój adres e-mail</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="np. jan.kowalski@example.com"
                      {...field}
                      className="bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-500"
                    />
                  </FormControl>
                  <FormDescription className="text-zinc-500">
                    Podaj swój adres e-mail, jeśli chcesz otrzymać informację o statusie zgłoszenia
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="mt-4">
            <FormField
              control={form.control}
              name="contactInfo.additionalNotes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">Dodatkowe informacje</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Dodatkowe informacje, które mogą być pomocne w weryfikacji zgłoszenia..."
                      {...field}
                      className="bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-500"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <div className="flex justify-end">
          <Button type="submit" disabled={isSubmitting} className="bg-red-600 hover:bg-red-700">
            {isSubmitting ? "Wysyłanie..." : "Wyślij zgłoszenie"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
