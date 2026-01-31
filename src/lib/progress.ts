import { UserProgress, TaskCompletion, UserGamification } from "@/types/training";

// Fetch user progress from API
export async function fetchUserProgress(email: string): Promise<{
  progress: UserProgress[];
  completions: TaskCompletion[];
  gamification: UserGamification | null;
}> {
  const response = await fetch(`/api/progress?email=${encodeURIComponent(email)}`);
  if (!response.ok) {
    throw new Error("Failed to fetch progress");
  }
  return response.json();
}

// Save task completion
export async function completeTask(
  email: string,
  moduleId: string,
  taskId: string
): Promise<{ success: boolean }> {
  const response = await fetch("/api/progress", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email,
      moduleId,
      taskId,
      action: "complete_task",
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to complete task");
  }

  return response.json();
}

// Calculate module status based on progress
export function getModuleStatus(
  moduleId: string,
  completedModules: string[],
  inProgressModules: string[],
  prerequisites: string[]
): "locked" | "available" | "in_progress" | "completed" {
  // Check if completed
  if (completedModules.includes(moduleId)) {
    return "completed";
  }

  // Check if in progress
  if (inProgressModules.includes(moduleId)) {
    return "in_progress";
  }

  // Check prerequisites
  const allPrerequisitesMet = prerequisites.every((p) =>
    completedModules.includes(p)
  );

  if (!allPrerequisitesMet) {
    return "locked";
  }

  return "available";
}
