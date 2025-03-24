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
import { toast } from "sonner";

const formSchema = z.object({
  name: z.string().min(2, "Imię musi zawierać przynajmniej 2 znaki").max(50),
  email: z.string().email("Wprowadź poprawny adres e-mail"),
  subject: z.string().min(5, "Temat musi zawierać przynajmniej 5 znaków").max(100),
  message: z.string()
    .min(10, "Wiadomość musi zawierać przynajmniej 10 znaków")
    .max(1000, "Wiadomość nie może być dłuższa niż 1000 znaków"),
});

type FormValues = z.infer<typeof formSchema>;

export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  async function onSubmit(data: FormValues) {
    setIsSubmitting(true);

    try {
      // In a real application, this would send the form data to a server
      console.log(data);

      // Simulate a server delay
      await new Promise(resolve => setTimeout(resolve, 1500));

      toast.success("Dziękujemy za wiadomość. Odpowiemy najszybciej jak to możliwe.");
      form.reset();
    } catch (error) {
      toast.error("Wystąpił błąd podczas wysyłania formularza. Spróbuj ponownie później.");
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid gap-4 sm:grid-cols-2">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white">Imię i nazwisko</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Jan Kowalski"
                    {...field}
                    className="bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-500"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white">Adres e-mail</FormLabel>
                <FormControl>
                  <Input
                    placeholder="jan.kowalski@example.com"
                    {...field}
                    className="bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-500"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="subject"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-white">Temat</FormLabel>
              <FormControl>
                <Input
                  placeholder="Temat wiadomości"
                  {...field}
                  className="bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-500"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-white">Wiadomość</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Treść wiadomości..."
                  className="min-h-32 bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-500"
                  {...field}
                />
              </FormControl>
              <FormDescription className="text-zinc-500">
                Opisz dokładnie, w czym możemy Ci pomóc
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end">
          <Button type="submit" disabled={isSubmitting} className="bg-red-600 hover:bg-red-700">
            {isSubmitting ? "Wysyłanie..." : "Wyślij wiadomość"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
