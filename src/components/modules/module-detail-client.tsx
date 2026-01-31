"use client";

import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { modules, tasks } from "@/content/modules";
import { useProgress } from "@/hooks/use-progress";
import { ArrowRight, Check, CheckCircle2, Lock } from "lucide-react";

interface ModuleDetailClientProps {
  moduleId: string;
}

export function ModuleDetailClient({ moduleId }: ModuleDetailClientProps) {
  const { completions, isLoading } = useProgress();

  const currentModule = modules.find((m) => m.id === moduleId);
  const moduleTasks = tasks[moduleId] || [];

  const completedTaskIds = completions.map((c) => c.task_id);

  // Find the next module
  const nextModule = currentModule
    ? modules.find((m) => m.order_index === currentModule.order_index + 1)
    : undefined;

  if (!moduleId || isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-pulse text-muted-foreground">
          Loading module...
        </div>
      </div>
    );
  }

  if (!currentModule) {
    return (
      <div className="text-center py-12">
        <h2 className="text-xl font-bold text-foreground">Module Not Found</h2>
        <p className="text-muted-foreground mt-2">
          This module doesn&apos;t exist.
        </p>
        <Link href="/modules">
          <Button className="mt-4">Back to Modules</Button>
        </Link>
      </div>
    );
  }

  const completedCount = moduleTasks.filter((t) =>
    completedTaskIds.includes(t.id),
  ).length;
  const progress = (completedCount / moduleTasks.length) * 100;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <Link
            href="/modules"
            className="text-sm text-muted-foreground hover:text-foreground mb-2 inline-block"
          >
            ← Back to Modules
          </Link>
          <h1 className="text-3xl font-bold text-foreground">
            {currentModule.title}
          </h1>
          <p className="text-muted-foreground mt-1">
            {currentModule.description}
          </p>
        </div>
        <div className="text-right">
          <p className="text-2xl font-bold text-teal-400">
            {completedCount}/{moduleTasks.length}
          </p>
          <p className="text-sm text-muted-foreground">tasks complete</p>
        </div>
      </div>

      {/* Progress bar */}
      <div className="h-2 bg-muted rounded-full overflow-hidden">
        <div
          className="h-full bg-teal-500 transition-all duration-500"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Module complete CTA */}
      {completedCount === moduleTasks.length && moduleTasks.length > 0 && (
        <div className="p-4 rounded-lg bg-gradient-to-r from-teal-500/10 to-cyan-500/10 border border-teal-500/30 flex items-center justify-between animate-in fade-in slide-in-from-top-2">
          <div className="flex items-center gap-3">
            <CheckCircle2 className="w-6 h-6 text-teal-400" />
            <div>
              <p className="font-semibold text-foreground">Module Complete!</p>
              {nextModule ? (
                <p className="text-sm text-muted-foreground">
                  Continue to next module:{" "}
                  <span className="text-teal-400">{nextModule.title}</span>
                </p>
              ) : (
                <p className="text-sm text-muted-foreground">
                  You&apos;ve completed all modules!
                </p>
              )}
            </div>
          </div>
          {nextModule ? (
            <Link href={`/modules/${nextModule.id}`}>
              <Button className="bg-teal-500 hover:bg-teal-600 text-black font-semibold gap-2">
                Next
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          ) : (
            <Link href="/assessment/post">
              <Button className="bg-teal-500 hover:bg-teal-600 text-black font-semibold gap-2">
                Take Assessment
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          )}
        </div>
      )}

      {/* Tasks list */}
      <div className="space-y-4">
        {moduleTasks.map((task, index) => {
          const isCompleted = completedTaskIds.includes(task.id);
          const isLocked =
            index > 0 &&
            !completedTaskIds.includes(moduleTasks[index - 1].id) &&
            !isCompleted;

          return (
            <Card
              key={task.id}
              className={`glass-card ${isLocked ? "opacity-50" : ""}`}
            >
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg flex items-center gap-3">
                    <span
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                        isCompleted
                          ? "bg-teal-500 text-black"
                          : "bg-muted text-muted-foreground"
                      }`}
                    >
                      {isCompleted ? <Check className="h-4 w-4" /> : index + 1}
                    </span>
                    <span
                      className={
                        isCompleted
                          ? "text-muted-foreground"
                          : "text-foreground"
                      }
                    >
                      {task.title}
                    </span>
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <p className="text-sm text-muted-foreground">
                    {task.instructions?.substring(0, 100)}...
                  </p>
                  {!isLocked && (
                    <Link href={`/modules/${moduleId}/${task.id}`}>
                      <Button
                        size="sm"
                        variant={isCompleted ? "outline" : "default"}
                        className={
                          isCompleted
                            ? ""
                            : "bg-teal-500 hover:bg-teal-600 text-black font-semibold"
                        }
                      >
                        {isCompleted ? "Review" : "Start"}
                      </Button>
                    </Link>
                  )}
                  {isLocked && (
                    <span className="text-xs text-muted-foreground flex items-center gap-1">
                      <Lock className="h-3.5 w-3.5" />
                      Locked
                    </span>
                  )}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
