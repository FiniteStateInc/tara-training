"use client";

import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ModuleStatus } from "@/types/training";
import { cn } from "@/lib/utils";

interface ModuleCardProps {
  module: {
    id: string;
    title: string;
    description: string;
    taskCount: number;
    order: number;
    status: ModuleStatus;
  };
  completedTasks?: number;
}

const statusConfig = {
  locked: {
    badge: "Locked",
    badgeVariant: "secondary" as const,
    cardClass: "opacity-50 cursor-not-allowed",
    showProgress: false,
  },
  available: {
    badge: "Available",
    badgeVariant: "outline" as const,
    cardClass: "hover:border-teal-500/50 transition-colors cursor-pointer",
    showProgress: false,
  },
  in_progress: {
    badge: "In Progress",
    badgeVariant: "default" as const,
    cardClass: "border-teal-500/50 hover:border-teal-500 transition-colors cursor-pointer glow-teal",
    showProgress: true,
  },
  completed: {
    badge: "Completed",
    badgeVariant: "default" as const,
    cardClass: "border-teal-500/30 cursor-pointer",
    showProgress: true,
  },
};

export function ModuleCard({ module, completedTasks = 0 }: ModuleCardProps) {
  const config = statusConfig[module.status];
  const progress = (completedTasks / module.taskCount) * 100;
  const isLocked = module.status === "locked";

  const cardContent = (
    <Card className={cn("glass-card h-full", config.cardClass)}>
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-muted flex items-center justify-center text-xs font-medium text-muted-foreground">
              {module.order}
            </span>
            <CardTitle className="text-lg">{module.title}</CardTitle>
          </div>
          <Badge
            variant={config.badgeVariant}
            className={cn(
              module.status === "completed" && "bg-teal-500/20 text-teal-400 border-teal-500/30",
              module.status === "in_progress" && "bg-teal-500/20 text-teal-400 border-teal-500/30"
            )}
          >
            {config.badge}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground mb-4">
          {module.description}
        </p>

        {/* Task count and progress */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">{module.taskCount} tasks</span>
            {config.showProgress && (
              <span className="text-teal-400">
                {completedTasks}/{module.taskCount} complete
              </span>
            )}
          </div>

          {config.showProgress && (
            <Progress value={progress} className="h-1.5" />
          )}

          {/* Action button */}
          {!isLocked && (
            <Button
              variant={module.status === "completed" ? "outline" : "default"}
              size="sm"
              className={cn(
                "w-full mt-3",
                module.status === "in_progress" && "bg-teal-500 hover:bg-teal-600 text-black font-semibold"
              )}
            >
              {module.status === "completed"
                ? "Review"
                : module.status === "in_progress"
                ? "Continue"
                : "Start"}
            </Button>
          )}

          {isLocked && (
            <div className="flex items-center justify-center gap-1 text-xs text-muted-foreground mt-3">
              <span>🔒</span>
              <span>Complete previous modules to unlock</span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );

  if (isLocked) {
    return cardContent;
  }

  return (
    <Link href={`/modules/${module.id}`}>
      {cardContent}
    </Link>
  );
}
