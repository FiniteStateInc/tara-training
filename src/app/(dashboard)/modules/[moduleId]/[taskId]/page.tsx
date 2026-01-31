"use client";

import { use } from "react";
import { modules, tasks } from "@/content/modules";
import { LessonLayout } from "@/components/lesson/lesson-layout";

interface TaskPageProps {
  params: Promise<{ moduleId: string; taskId: string }>;
}

export default function TaskPage({ params }: TaskPageProps) {
  const { moduleId, taskId } = use(params);

  const currentModule = modules.find((m) => m.id === moduleId);
  const moduleTasks = tasks[moduleId] || [];
  const currentTask = moduleTasks.find((t) => t.id === taskId);
  const currentIndex = moduleTasks.findIndex((t) => t.id === taskId);
  const nextTask = moduleTasks[currentIndex + 1];

  // Check if this is the final task of the final module
  const isLastModule = currentModule?.order_index === modules.length;
  const isLastTaskInModule = currentIndex === moduleTasks.length - 1;
  const isFinalTask = isLastModule && isLastTaskInModule;

  if (!currentModule || !currentTask) {
    return (
      <div className="text-center py-12">
        <h2 className="text-xl font-bold text-foreground">Task Not Found</h2>
        <p className="text-muted-foreground mt-2">
          This task doesn&apos;t exist.
        </p>
      </div>
    );
  }

  return (
    <LessonLayout
      moduleId={moduleId}
      moduleTitle={currentModule.title}
      task={{
        id: currentTask.id,
        title: currentTask.title,
        instructions: currentTask.instructions || "",
        why_it_matters: currentTask.why_it_matters || "",
        tips: currentTask.tips || [],
      }}
      taskNumber={currentIndex + 1}
      totalTasks={moduleTasks.length}
      taraDeepLink={currentTask.tara_deep_link}
      nextTaskId={nextTask?.id}
      isFinalTask={isFinalTask}
    />
  );
}
