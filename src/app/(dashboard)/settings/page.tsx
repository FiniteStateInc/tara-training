"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useUser } from "@/components/email-entry/user-context";
import { AlertTriangle } from "lucide-react";

export default function SettingsPage() {
  const { email, clearEmail } = useUser();
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [isClearing, setIsClearing] = useState(false);
  const [clearError, setClearError] = useState<string | null>(null);

  const handleClearProgress = async () => {
    if (!email) return;
    setIsClearing(true);
    setClearError(null);

    try {
      const response = await fetch("/api/admin/clear-user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        throw new Error("Failed to clear progress");
      }

      setIsConfirmOpen(false);
      window.location.reload();
    } catch (error) {
      console.error("Failed to clear progress:", error);
      setClearError("Failed to clear progress. Please try again.");
    } finally {
      setIsClearing(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Settings</h1>
        <p className="text-muted-foreground mt-1">
          Manage your account and preferences
        </p>
      </div>

      {/* Account section */}
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="text-lg">Account</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-foreground">Email</p>
              <p className="text-sm text-muted-foreground">{email}</p>
            </div>
            <Button variant="outline" size="sm" onClick={clearEmail}>
              Switch Account
            </Button>
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-foreground">Clear Progress</p>
              <p className="text-sm text-muted-foreground">
                Reset all your learning progress
              </p>
            </div>
            <Button
              variant="destructive"
              size="sm"
              onClick={() => setIsConfirmOpen(true)}
              disabled={!email}
            >
              Clear Progress
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Assessment section */}
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="text-lg">Assessments</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-foreground">
                Retake Pre-Assessment
              </p>
              <p className="text-sm text-muted-foreground">
                Take the knowledge assessment again
              </p>
            </div>
            <Button variant="outline" size="sm" asChild>
              <a href="/assessment/pre">Retake</a>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* About section */}
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="text-lg">About</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <p className="text-sm font-medium text-foreground">
              TARA Training Platform
            </p>
            <p className="text-sm text-muted-foreground">
              Learn product security through hands-on practice with the TARA
              threat analysis platform.
            </p>
          </div>

          <Separator />

          <div className="text-xs text-muted-foreground">
            <p>Version 1.0.0</p>
            <p className="mt-1">
              Built by Chris Connelly from Finite State
            </p>
            <p className="mt-1">
              Powered by Next.js 15, Tailwind CSS, and shadcn/ui
            </p>
          </div>
        </CardContent>
      </Card>

      {isConfirmOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
          <div className="w-full max-w-md rounded-lg border border-border bg-background p-6 shadow-lg">
            <div className="flex items-start gap-3">
              <div className="rounded-full bg-destructive/10 p-2 text-destructive">
                <AlertTriangle className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-foreground">
                  Clear all progress?
                </h3>
                <p className="text-sm text-muted-foreground mt-1">
                  This will permanently delete your module progress and
                  assessment results for {email}. This action cannot be undone.
                </p>
              </div>
            </div>

            {clearError && (
              <p className="mt-3 text-xs text-destructive">{clearError}</p>
            )}

            <div className="mt-5 flex items-center justify-end gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsConfirmOpen(false)}
                disabled={isClearing}
              >
                Cancel
              </Button>
              <Button
                variant="destructive"
                size="sm"
                onClick={handleClearProgress}
                disabled={isClearing}
              >
                {isClearing ? "Clearing..." : "Clear Progress"}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
