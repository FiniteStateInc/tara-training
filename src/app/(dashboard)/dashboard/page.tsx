"use client";

import { useUser } from "@/components/email-entry/user-context";
import { WelcomeBanner } from "@/components/dashboard/welcome-banner";
import { SecurityShield } from "@/components/quest-board/security-shield";
import { SecurityInsightCard } from "@/components/dashboard/security-insight-card";
import { Card, CardContent } from "@/components/ui/card";
import { useProgress } from "@/hooks/use-progress";
import { BookOpen, CheckCircle2, Flame, Timer } from "lucide-react";

export default function DashboardPage() {
  const { email } = useUser();
  const { getSummaryStats, isLoading } = useProgress();
  const stats = getSummaryStats();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-pulse text-muted-foreground">Loading dashboard...</div>
      </div>
    );
  }

  const modulePercent = stats.totalModules > 0 
    ? Math.round((stats.modulesCompleted / stats.totalModules) * 100) 
    : 0;

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <WelcomeBanner email={email || ""} />

      {/* Main content - 50/50 split */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left side - Security Shield */}
        <SecurityShield />

        {/* Right side - Stats Cards (3 in a column) */}
        <div className="flex flex-col gap-4">
          {/* Modules Card */}
          <Card className="glass-card flex-1">
            <CardContent className="p-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Modules Completed</p>
                  <p className="text-3xl font-bold mt-1 text-teal-400">
                    {stats.modulesCompleted}
                    <span className="text-lg text-muted-foreground font-normal">/{stats.totalModules}</span>
                  </p>
                </div>
                <div className="w-14 h-14 rounded-full bg-teal-500/10 border border-teal-500/20 flex items-center justify-center">
                  <BookOpen className="h-6 w-6 text-teal-400" />
                </div>
              </div>
              <div className="mt-3">
                <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-teal-500 rounded-full transition-all duration-500"
                    style={{ width: `${modulePercent}%` }}
                  />
                </div>
                <p className="text-xs text-muted-foreground mt-1.5">
                  {modulePercent}% complete — {stats.modulesCompleted === 0 ? "Let's get started!" : "Keep it up!"}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Tasks Card */}
          <Card className="glass-card flex-1">
            <CardContent className="p-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Tasks Completed</p>
                  <p className="text-3xl font-bold mt-1 text-cyan-400">
                    {stats.tasksCompleted}
                  </p>
                </div>
                <div className="w-14 h-14 rounded-full bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center">
                  <CheckCircle2 className="h-6 w-6 text-cyan-400" />
                </div>
              </div>
              <p className="text-xs text-muted-foreground mt-3">
                {stats.tasksCompleted === 0 
                  ? "Complete tasks to build your skills" 
                  : stats.tasksCompleted < 10 
                    ? "Great progress! Keep going!" 
                    : "You're on a roll!"}
              </p>
            </CardContent>
          </Card>

          {/* Streak Card */}
          <Card className="glass-card flex-1">
            <CardContent className="p-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Current Streak</p>
                  <p className="text-3xl font-bold mt-1 text-purple-400">
                    {stats.currentStreak}
                    <span className="text-lg text-muted-foreground font-normal ml-1">days</span>
                  </p>
                </div>
                <div className="w-14 h-14 rounded-full bg-purple-500/10 border border-purple-500/20 flex items-center justify-center">
                  {stats.currentStreak > 0 ? (
                    <Flame className="h-6 w-6 text-purple-400" />
                  ) : (
                    <Timer className="h-6 w-6 text-purple-400" />
                  )}
                </div>
              </div>
              <p className="text-xs text-muted-foreground mt-3">
                {stats.currentStreak === 0 
                  ? "Start today to build your streak!" 
                  : stats.currentStreak < 3 
                    ? "Nice start! Come back tomorrow!" 
                    : "You're on fire! Don't break the chain!"}
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Did you know - Security Insight */}
      <SecurityInsightCard />
    </div>
  );
}
