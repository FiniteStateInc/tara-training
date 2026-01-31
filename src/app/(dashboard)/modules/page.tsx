"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ModuleCard } from "@/components/quest-board/module-card";
import { useProgress } from "@/hooks/use-progress";
import { modules, tasks } from "@/content/modules";
import { CheckCircle2 } from "lucide-react";

export default function ModulesPage() {
  const { getSummaryStats, getModuleStatuses, completions, isLoading } =
    useProgress();
  const stats = getSummaryStats();
  const statuses = getModuleStatuses();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-pulse text-muted-foreground">
          Loading modules...
        </div>
      </div>
    );
  }

  // Create lookup maps for task titles and module names
  const taskInfoMap: Record<string, { title: string; moduleId: string }> = {};
  Object.entries(tasks).forEach(([moduleId, moduleTasks]) => {
    moduleTasks.forEach((task) => {
      taskInfoMap[task.id] = { title: task.title, moduleId };
    });
  });

  // Create module title lookup
  const moduleTitleMap: Record<string, string> = {};
  modules.forEach((mod) => {
    moduleTitleMap[mod.id] = mod.title;
  });

  // Get recent completions (last 5)
  const recentActivity = completions
    .slice(-5)
    .reverse()
    .map((c) => {
      const taskInfo = taskInfoMap[c.task_id];
      return {
        type: "task" as const,
        title: taskInfo?.title || c.task_id,
        moduleName: taskInfo ? moduleTitleMap[taskInfo.moduleId] : undefined,
        timestamp: new Date(c.completed_at).toLocaleString(undefined, {
          month: "short",
          day: "numeric",
          hour: "numeric",
          minute: "2-digit",
        }),
      };
    });

  // Calculate completed tasks per module
  const completedTaskIds = new Set(completions.map((c) => c.task_id));

  const getCompletedTasksForModule = (moduleId: string): number => {
    const moduleTasks = tasks[moduleId] || [];
    return moduleTasks.filter((t) => completedTaskIds.has(t.id)).length;
  };

  // Map modules with real statuses
  const modulesWithStatus = modules.map((mod) => ({
    id: mod.id,
    title: mod.title,
    description: mod.description,
    taskCount: mod.task_count,
    order: mod.order_index,
    status: statuses[mod.id] || "locked",
    completedTasks: getCompletedTasksForModule(mod.id),
  }));

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Learning Modules</h1>
        <p className="text-muted-foreground mt-1">
          Complete modules to build your Security Shield and master product
          security.
        </p>
      </div>

      {/* Top metrics row - Overall Progress & Recent Activity */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Overall Progress */}
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="text-lg">Overall Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-6">
              <div className="w-20 h-20 relative flex-shrink-0">
                <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    fill="none"
                    stroke="rgba(255,255,255,0.1)"
                    strokeWidth="8"
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    fill="none"
                    stroke="#14b8a6"
                    strokeWidth="8"
                    strokeLinecap="round"
                    strokeDasharray={`${(stats.modulesCompleted / stats.totalModules) * 251.2} 251.2`}
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-lg font-bold text-teal-400">
                    {stats.totalModules > 0
                      ? Math.round(
                          (stats.modulesCompleted / stats.totalModules) * 100,
                        )
                      : 0}
                    %
                  </span>
                </div>
              </div>
              <div>
                <p className="text-2xl font-bold text-teal-400">
                  {stats.modulesCompleted}/{stats.totalModules}
                </p>
                <p className="text-sm text-muted-foreground">
                  modules complete
                </p>
                <p className="text-xs text-muted-foreground mt-2">
                  {stats.modulesCompleted === 0
                    ? "Start your first module below!"
                    : stats.modulesCompleted === stats.totalModules
                      ? "All complete!"
                      : "Keep up the momentum!"}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="text-lg">Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            {recentActivity.length > 0 ? (
              <div className="space-y-3 max-h-32 overflow-y-auto">
                {recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-center gap-3 text-sm">
                    <CheckCircle2 className="w-5 h-5 text-teal-400 flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="text-foreground truncate">
                        {activity.title}
                      </p>
                      {activity.moduleName && (
                        <p className="text-xs text-muted-foreground truncate">
                          {activity.moduleName}
                        </p>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground whitespace-nowrap">
                      {activity.timestamp}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-6 text-muted-foreground">
                <p className="text-sm">No activity yet</p>
                <p className="text-xs mt-1">
                  Complete tasks to see your progress here
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Module cards grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {modulesWithStatus.map((mod) => (
          <ModuleCard
            key={mod.id}
            module={mod}
            completedTasks={mod.completedTasks}
          />
        ))}
      </div>
    </div>
  );
}
