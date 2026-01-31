"use client";

import { cn } from "@/lib/utils";
import { Flame } from "lucide-react";

interface StreakIndicatorProps {
  streak: number;
  className?: string;
}

export function StreakIndicator({ streak, className }: StreakIndicatorProps) {
  const isActive = streak > 0;
  
  return (
    <div className={cn("flex items-center gap-1", className)}>
      <Flame
        className={cn(
          "h-4 w-4",
          isActive ? "text-orange-400 animate-pulse" : "text-muted-foreground"
        )}
      />
      <span className={cn(
        "font-bold",
        isActive ? "text-orange-400" : "text-muted-foreground"
      )}>
        {streak}
      </span>
      <span className="text-xs text-muted-foreground">day{streak !== 1 ? "s" : ""}</span>
    </div>
  );
}
