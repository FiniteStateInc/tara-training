"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface WelcomeBannerProps {
  email: string;
  currentModule?: string;
  currentTask?: string;
}

export function WelcomeBanner({ email, currentModule, currentTask }: WelcomeBannerProps) {
  const displayName = email.split("@")[0];
  const hasProgress = currentModule && currentTask;

  return (
    <Card className="glass-card p-6 md:p-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-foreground">
            Welcome back, {displayName}!
          </h1>
          {hasProgress ? (
            <p className="text-muted-foreground mt-1">
              Continue learning: <span className="text-foreground">{currentModule}</span> - {currentTask}
            </p>
          ) : (
            <p className="text-muted-foreground mt-1">
              Ready to master product security? Let&apos;s get started!
            </p>
          )}
        </div>
        <div className="flex gap-3">
          <Link href="/assessment">
            <Button className="bg-teal-500 hover:bg-teal-600 text-black font-semibold glow-teal">
              {hasProgress ? "Continue" : "Start Here"}
            </Button>
          </Link>
        </div>
      </div>
    </Card>
  );
}
