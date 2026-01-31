"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useUser } from "@/components/email-entry/user-context";

export default function SettingsPage() {
  const { email, clearEmail } = useUser();

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
            <Button variant="destructive" size="sm">
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
    </div>
  );
}
