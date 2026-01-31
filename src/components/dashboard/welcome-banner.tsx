"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { modules } from "@/content/modules";

interface WelcomeBannerProps {
  email: string;
  currentModuleId?: string;
  hasAnyProgress?: boolean;
}

export function WelcomeBanner({
  email,
  currentModuleId,
  hasAnyProgress = false,
}: WelcomeBannerProps) {
  const displayName = email.split("@")[0];
  const currentModule = currentModuleId
    ? modules.find((m) => m.id === currentModuleId)
    : undefined;

  const buttonText = hasAnyProgress ? "Continue Learning" : "Start Here";
  const buttonHref = currentModuleId
    ? `/modules/${currentModuleId}`
    : "/assessment";

  return (
    <Card className="glass-card p-6 md:p-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-foreground">
            Welcome back, {displayName}!
          </h1>
          {currentModule ? (
            <p className="text-muted-foreground mt-1">
              Continue with:{" "}
              <span className="text-foreground">{currentModule.title}</span>
            </p>
          ) : (
            <p className="text-muted-foreground mt-1">
              Ready to master product security? Let&apos;s get started!
            </p>
          )}
        </div>
        <div className="flex gap-3">
          <Link href={buttonHref}>
            <Button className="bg-teal-500 hover:bg-teal-600 text-black font-semibold glow-teal">
              {buttonText}
            </Button>
          </Link>
        </div>
      </div>
    </Card>
  );
}
