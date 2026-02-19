"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useActionState } from "react";
import { login, type LoginResult } from "@/app/src/auth/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ThemeToggle } from "@/components/theme-toggle";
import { ArrowLeft, Lock, Loader2 } from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();
  const [state, formAction, isPending] = useActionState(
    async (_prev: LoginResult, formData: FormData): Promise<LoginResult> => {
      const result = await login(formData);
      return result ?? null;
    },
    null
  );

  const [emailValue, setEmailValue] = useState("");

  useEffect(() => {
    if (state && "redirect" in state && state.redirect) {
      router.push(state.redirect);
      return;
    }
    if (state && "error" in state && state.email !== undefined) {
      setEmailValue(state.email);
    }
  }, [state, router]);

  return (
    <div className="min-h-screen bg-background">
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>
      <div className="container mx-auto px-4 py-8 flex flex-col items-center justify-center min-h-screen">
        <div className="absolute top-4 left-4">
          <Button variant="ghost" asChild>
            <Link href="/" className="inline-flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </Link>
          </Button>
        </div>

        <Card className="w-full max-w-md shadow-lg">
          <CardHeader className="space-y-1 text-center pb-2">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-primary-foreground mb-2">
              <Lock className="h-6 w-6" />
            </div>
            <h1 className="text-xl font-semibold text-foreground">
              Admin Login
            </h1>
            <p className="text-sm text-muted-foreground">
              Sign in to manage students and content
            </p>
          </CardHeader>
          <CardContent>
            <form action={formAction} className="space-y-4">
              {state && "error" in state && state.error && (
                <p className="text-sm text-destructive text-center bg-destructive/10 border border-destructive/20 rounded-md py-2">
                  {state.error}
                </p>
              )}
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="admin@kademix.com"
                  autoComplete="email"
                  required
                  disabled={isPending}
                  className="h-10"
                  value={emailValue}
                  onChange={(e) => setEmailValue(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  disabled={isPending}
                  className="h-10"
                />
              </div>
              <Button type="submit" className="w-full" disabled={isPending}>
                {isPending ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Signing in...
                  </>
                ) : (
                  "Sign in"
                )}
              </Button>
            </form>
            <p className="text-center text-sm text-muted-foreground mt-4">
              <Link href="/" className="text-primary hover:underline">
                Return to Kademix
              </Link>
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
