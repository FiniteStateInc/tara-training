"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useUser } from "@/components/email-entry/user-context";
import { fetchUserProgress, completeTask } from "@/lib/progress";
import { modules } from "@/content/modules";
import { ModuleStatus } from "@/types/training";

export function useProgress() {
  const { email } = useUser();
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ["progress", email],
    queryFn: () => fetchUserProgress(email!),
    enabled: !!email,
    staleTime: 30 * 1000, // 30 seconds
  });

  const completeTaskMutation = useMutation({
    mutationFn: ({ moduleId, taskId }: { moduleId: string; taskId: string }) =>
      completeTask(email!, moduleId, taskId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["progress", email] });
    },
  });

  // Calculate module statuses based on progress
  const getModuleStatuses = (): Record<string, ModuleStatus> => {
    if (!query.data) {
      return modules.reduce((acc, m) => {
        acc[m.id] = m.prerequisites.length === 0 ? "available" : "locked";
        return acc;
      }, {} as Record<string, ModuleStatus>);
    }

    const { progress } = query.data;
    const completedModuleIds = progress
      .filter((p) => p.status === "completed")
      .map((p) => p.module_id);
    const inProgressModuleIds = progress
      .filter((p) => p.status === "in_progress")
      .map((p) => p.module_id);

    const statuses: Record<string, ModuleStatus> = {};

    for (const mod of modules) {
      if (completedModuleIds.includes(mod.id)) {
        statuses[mod.id] = "completed";
      } else if (inProgressModuleIds.includes(mod.id)) {
        statuses[mod.id] = "in_progress";
      } else {
        // Check prerequisites
        const prereqsMet = mod.prerequisites.every((p) =>
          completedModuleIds.includes(p)
        );
        statuses[mod.id] = prereqsMet ? "available" : "locked";
      }
    }

    return statuses;
  };

  // Get completed task IDs for a module
  const getCompletedTasks = (moduleId: string): string[] => {
    if (!query.data) return [];
    return query.data.completions
      .filter((c) => c.task_id.startsWith(moduleId.slice(0, 6)))
      .map((c) => c.task_id);
  };

  // Get gamification stats
  const getGamificationStats = () => {
    if (!query.data?.gamification) {
      return {
        currentStreak: 0,
        longestStreak: 0,
        shieldSegments: [],
        badges: [],
      };
    }

    const g = query.data.gamification;
    return {
      currentStreak: g.current_streak,
      longestStreak: g.longest_streak,
      shieldSegments: g.shield_segments_unlocked || [],
      badges: g.badges_earned || [],
    };
  };

  // Summary stats
  const getSummaryStats = () => {
    const statuses = getModuleStatuses();
    const completedModules = Object.values(statuses).filter(
      (s) => s === "completed"
    ).length;
    const totalTasks = query.data?.completions.length || 0;
    const gamification = getGamificationStats();

    return {
      modulesCompleted: completedModules,
      totalModules: modules.length,
      tasksCompleted: totalTasks,
      currentStreak: gamification.currentStreak,
    };
  };

  return {
    isLoading: query.isLoading,
    error: query.error,
    progress: query.data?.progress || [],
    completions: query.data?.completions || [],
    gamification: query.data?.gamification,
    getModuleStatuses,
    getCompletedTasks,
    getGamificationStats,
    getSummaryStats,
    completeTask: completeTaskMutation.mutate,
    isCompleting: completeTaskMutation.isPending,
  };
}
