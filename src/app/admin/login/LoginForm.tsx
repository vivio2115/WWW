"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2, LogIn, AlertCircle } from "lucide-react";
import { toast } from "sonner";

const loginSchema = z.object({
  username: z.string().min(1, "Login jest wymagany"),
  password: z.string().min(1, "Hasło jest wymagane"),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function LoginForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  async function onSubmit(data: LoginFormValues) {
    setIsLoading(true);
    setError("");

    try {
      // W rzeczywistej aplikacji, tutaj byłoby wywołanie API do weryfikacji danych logowania
      // Symulacja opóźnienia serwera
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Symulacja sprawdzania logowania (w prawdziwej aplikacji to byłoby API)
      // Tylko w celach demonstracyjnych używamy prostego logowania
      // W rzeczywistym systemie nigdy nie hardcode'uj loginu i hasła w kodzie!
      if (data.username === "admin" && data.password === "admin1234") {
        // Symulacja sukcesu
        toast.success("Logowanie udane!");

        // Przekierowanie do panelu admina
        // W prawdziwym systemie tutaj byłoby ustawienie tokenu JWT/cookies itp.
        router.push("/admin/dashboard");
      } else {
        setError("Nieprawidłowa nazwa użytkownika lub hasło");
      }
    } catch (error) {
      console.error(error);
      setError("Wystąpił błąd podczas logowania. Spróbuj ponownie później.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {error && (
          <div className="bg-red-950/40 text-red-400 p-3 rounded-md border border-red-900/50 flex items-start gap-2">
            <AlertCircle className="h-5 w-5 mt-0.5 flex-shrink-0" />
            <p className="text-sm">{error}</p>
          </div>
        )}

        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-zinc-300">Login</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="Twój login"
                  autoComplete="username"
                  disabled={isLoading}
                  className="bg-zinc-950 border-zinc-800 text-zinc-100 placeholder:text-zinc-600 focus:border-red-500"
                />
              </FormControl>
              <FormMessage className="text-red-500" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-zinc-300">Hasło</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="password"
                  placeholder="••••••••"
                  autoComplete="current-password"
                  disabled={isLoading}
                  className="bg-zinc-950 border-zinc-800 text-zinc-100 placeholder:text-zinc-600 focus:border-red-500"
                />
              </FormControl>
              <FormMessage className="text-red-500" />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          disabled={isLoading}
          className="w-full bg-red-600 hover:bg-red-700 text-white transition-colors"
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Logowanie...
            </>
          ) : (
            <>
              <LogIn className="mr-2 h-4 w-4" />
              Zaloguj się
            </>
          )}
        </Button>
      </form>
    </Form>
  );
}
