"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@/components/email-entry/user-context";
import { EmailForm } from "@/components/email-entry/email-form";

export default function LandingPage() {
  const { email, isLoading } = useUser();
  const router = useRouter();

  useEffect(() => {
    // If user has email stored, redirect to dashboard
    if (!isLoading && email) {
      router.push("/dashboard");
    }
  }, [email, isLoading, router]);

  // Show loading state while checking localStorage
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-pulse text-muted-foreground">Loading...</div>
      </div>
    );
  }

  // Show email entry form if no email stored
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-4 bg-background">
      {/* Background pattern */}
      <div className="fixed inset-0 bg-black -z-10" />
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-teal-950/20 via-black to-black -z-10" />
      
      {/* Logo and title */}
      <div className="mb-8 text-center">
        <img 
          src="/FS-Logo-Final-02.png" 
          alt="Finite State" 
          className="h-20 mx-auto mb-6"
        />
        <h1 className="text-3xl font-bold text-foreground mb-2">Welcome to TARA Training!</h1>
        <p className="text-muted-foreground max-w-md">
          Master product security through hands-on learning with the TARA platform
        </p>
      </div>

      {/* Email form */}
      <EmailForm onSuccess={() => router.push("/dashboard")} />

      {/* Value proposition */}
      <div className="max-w-sm mx-auto text-left space-y-2 mt-8">
        <div className="flex items-start gap-3">
          <span className="text-teal-400 mt-0.5">✓</span>
          <span className="text-sm text-muted-foreground">Measure your <span className="text-foreground">knowledge improvement</span> with pre- and post-assessments</span>
        </div>
        <div className="flex items-start gap-3">
          <span className="text-teal-400 mt-0.5">✓</span>
          <span className="text-sm text-muted-foreground"><span className="text-foreground">13 hands-on modules</span> demonstrating real TARA workflows</span>
        </div>
        <div className="flex items-start gap-3">
          <span className="text-teal-400 mt-0.5">✓</span>
          <span className="text-sm text-muted-foreground">Learn <span className="text-foreground">product security terminology</span> and key insights</span>
        </div>
      </div>
    </main>
  );
}
