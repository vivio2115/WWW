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
import { motion } from "framer-motion";
import { AlertTriangle, CheckCircle } from "lucide-react";

const formSchema = z.object({
  scammerData: z.object({
    phone: z.string().optional(),
    email: z.string().email().optional(),
    bankAccount: z.string().optional(),
    website: z.string().url().optional(),
    socialMedia: z.string().optional(),
    discordId: z.string().optional(),
    discordUsername: z.string().optional(),
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
    reporterDiscord: z.string().optional(),
    reporterPhone: z.string().optional(),
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

export function ScamReportForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [success, setSuccess] = useState(false);

  const totalSteps = 3;

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      scammerData: {
        phone: "",
        email: "",
        bankAccount: "",
        website: "",
        socialMedia: "",
        discordId: "",
        discordUsername: "",
      },
      incidentDetails: {
        scamDescription: "",
        scamType: "",
        scamDate: "",
        scamAmount: "",
      },
      contactInfo: {
        reporterEmail: "",
        reporterDiscord: "",
        reporterPhone: "",
        additionalNotes: "",
      },
    },
    mode: "onChange"
  });

  async function onSubmit(data: FormValues) {
    setIsSubmitting(true);
    try {
      // In a real application, we would send this data to a server
      console.log(data);

      // Simulate a server delay
      await new Promise(resolve => setTimeout(resolve, 1500));

      setSuccess(true);
      toast.success("Dziękujemy za zgłoszenie. Nasz zespół zajmie się weryfikacją danych.");
    } catch (error) {
      toast.error("Wystąpił błąd podczas wysyłania zgłoszenia. Spróbuj ponownie później.");
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  }

  const nextStep = async () => {
    let canContinue = false;

    if (currentStep === 0) {
      const scammerDataResult = await form.trigger("scammerData", { shouldFocus: true });
      canContinue = scammerDataResult;
    } else if (currentStep === 1) {
      const incidentDetailsResult = await form.trigger("incidentDetails", { shouldFocus: true });
      canContinue = incidentDetailsResult;
    } else {
      canContinue = true;
    }

    if (canContinue) {
      setCurrentStep(prev => Math.min(prev + 1, totalSteps - 1));
    }
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 0));
  };

  if (success) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="text-center py-12"
      >
        <div className="inline-flex mx-auto mb-6 h-20 w-20 items-center justify-center rounded-full bg-green-600/20">
          <CheckCircle className="h-10 w-10 text-green-500" />
        </div>
        <h2 className="text-2xl font-bold text-white mb-4">Zgłoszenie zostało wysłane</h2>
        <p className="text-zinc-400 max-w-md mx-auto mb-8">
          Dziękujemy za zgłoszenie. Nasz zespół zajmie się weryfikacją danych.
          O statusie zgłoszenia poinformujemy Cię na podany adres e-mail.
        </p>
        <Button
          onClick={() => {
            setSuccess(false);
            form.reset();
            setCurrentStep(0);
          }}
          className="bg-zinc-800 hover:bg-zinc-700"
        >
          Zgłoś kolejnego oszusta
        </Button>
      </motion.div>
    );
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {/* Progress indicator */}
        <div className="flex justify-between mb-8">
          {[...Array(totalSteps)].map((_, index) => (
            <div key={index} className="flex flex-col items-center gap-1 flex-1">
              <div className="w-full flex items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${currentStep >= index ? 'bg-red-600 text-white' : 'bg-zinc-800 text-zinc-500'}`}
                >
                  {index + 1}
                </div>
                {index < totalSteps - 1 && (
                  <div className={`h-1 flex-1 ${currentStep > index ? 'bg-red-600' : 'bg-zinc-800'} transition-colors`}></div>
                )}
              </div>
              <span className="text-xs text-zinc-500 hidden md:block">
                {index === 0 ? 'Dane oszusta' : index === 1 ? 'Opis oszustwa' : 'Twoje dane'}
              </span>
            </div>
          ))}
        </div>

        {/* Step 1: Scammer Data */}
        {currentStep === 0 && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            <h2 className="text-xl font-semibold mb-4 text-white">Dane oszusta</h2>

            <div className="grid gap-6 sm:grid-cols-2">
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

            <div className="grid gap-6 sm:grid-cols-2">
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

            <div className="grid gap-6 sm:grid-cols-2">
              <FormField
                control={form.control}
                name="scammerData.discordId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white">ID Discord</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="np. 123456789012345678"
                        {...field}
                        className="bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-500"
                      />
                    </FormControl>
                    <FormDescription className="text-zinc-500">
                      Podaj ID użytkownika Discord
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="scammerData.discordUsername"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white">Nazwa użytkownika Discord</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="np. oszust#1234"
                        {...field}
                        className="bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-500"
                      />
                    </FormControl>
                    <FormDescription className="text-zinc-500">
                      Podaj nazwę użytkownika Discord
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

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

            {Object.keys(form.formState.errors.scammerData || {}).length > 0 && (
              <Card className="p-3 border-red-900 bg-red-950/50 text-red-200">
                <div className="flex items-center gap-2 text-sm">
                  <AlertTriangle className="h-4 w-4 text-red-300" />
                  <p>Przynajmniej jeden sposób kontaktu z oszustem musi być podany</p>
                </div>
              </Card>
            )}
          </motion.div>
        )}

        {/* Step 2: Incident Details */}
        {currentStep === 1 && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            <h2 className="text-xl font-semibold mb-4 text-white">Szczegóły oszustwa</h2>

            <div className="grid gap-6 sm:grid-cols-2">
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
          </motion.div>
        )}

        {/* Step 3: Contact Information */}
        {currentStep === 2 && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            <h2 className="text-xl font-semibold mb-4 text-white">Dane kontaktowe (opcjonalnie)</h2>
            <p className="text-zinc-400 text-sm mb-6">
              Twoje dane nie będą nigdzie publikowane. Wykorzystamy je jedynie w celu kontaktu
              w sprawie zgłoszenia lub przekazania informacji o weryfikacji.
            </p>

            <div className="grid gap-6 sm:grid-cols-2">
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

              <FormField
                control={form.control}
                name="contactInfo.reporterDiscord"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white">Twoja nazwa użytkownika Discord</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="np. jankowalski#1234"
                        {...field}
                        className="bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-500"
                      />
                    </FormControl>
                    <FormDescription className="text-zinc-500">
                      Podaj swoją nazwę użytkownika Discord, jeśli preferujesz kontakt przez Discord
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="contactInfo.reporterPhone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">Twój numer telefonu</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="np. 500100200"
                      {...field}
                      className="bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-500"
                    />
                  </FormControl>
                  <FormDescription className="text-zinc-500">
                    Podaj swój numer telefonu, jeśli preferujesz kontakt telefoniczny
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

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
          </motion.div>
        )}

        <div className="flex justify-between pt-4">
          {currentStep > 0 ? (
            <Button
              type="button"
              variant="outline"
              onClick={prevStep}
              className="border-zinc-700 text-white hover:bg-zinc-800"
            >
              Wstecz
            </Button>
          ) : <div />}

          {currentStep < totalSteps - 1 ? (
            <Button type="button" onClick={nextStep} className="bg-red-600 hover:bg-red-700">
              Dalej
            </Button>
          ) : (
            <Button type="submit" disabled={isSubmitting} className="bg-red-600 hover:bg-red-700">
              {isSubmitting ? "Wysyłanie..." : "Wyślij zgłoszenie"}
            </Button>
          )}
        </div>
      </form>
    </Form>
  );
}
