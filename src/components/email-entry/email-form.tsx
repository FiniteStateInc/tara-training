"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useUser } from "./user-context";

interface EmailFormProps {
  onSuccess?: () => void;
}

export function EmailForm({ onSuccess }: EmailFormProps) {
  const { setEmail } = useUser();
  const [inputEmail, setInputEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(inputEmail)) {
      setError("Please enter a valid email address");
      return;
    }

    setIsSubmitting(true);

    try {
      // Save email to context (and localStorage)
      setEmail(inputEmail);
      onSuccess?.();
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="w-full max-w-md glass-card py-0">
      <CardHeader className="text-center px-6 pt-6">
        <CardTitle className="text-2xl font-bold">Sign In</CardTitle>
        <CardDescription className="text-muted-foreground">
          Enter your email to save your progress. You can pick up where you left
          off on any device.
        </CardDescription>
      </CardHeader>
      <CardContent className="px-6 pb-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email address</Label>
            <Input
              id="email"
              type="email"
              placeholder="you@example.com"
              value={inputEmail}
              onChange={(e) => setInputEmail(e.target.value)}
              className="bg-background/50"
              disabled={isSubmitting}
              autoFocus
            />
            {error && <p className="text-sm text-destructive">{error}</p>}
          </div>
          <Button
            type="submit"
            className="w-full bg-teal-500 hover:bg-teal-600 text-black font-semibold"
            disabled={isSubmitting || !inputEmail}
          >
            {isSubmitting ? "Starting..." : "Start Learning"}
          </Button>
        </form>
        <p className="mt-4 text-xs text-muted-foreground text-center">
          Your email is only used to save your progress. No account creation
          required.
        </p>
      </CardContent>
    </Card>
  );
}
