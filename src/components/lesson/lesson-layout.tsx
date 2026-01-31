"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import { TaraIframe } from "./tara-iframe";
import { LessonSidebar } from "./lesson-sidebar";
import { useUser } from "@/components/email-entry/user-context";
import { completeTask } from "@/lib/progress";
import { Button } from "@/components/ui/button";

interface LessonLayoutProps {
  moduleId: string;
  moduleTitle: string;
  task: {
    id: string;
    title: string;
    instructions: string;
    why_it_matters: string;
    tips: string[];
  };
  taskNumber: number;
  totalTasks: number;
  taraDeepLink?: string;
  nextTaskId?: string;
  isFinalTask?: boolean; // True if this is the last task of the last module
}

export function LessonLayout({
  moduleId,
  moduleTitle,
  task,
  taskNumber,
  totalTasks,
  taraDeepLink,
  nextTaskId,
  isFinalTask = false,
}: LessonLayoutProps) {
  const { email } = useUser();
  const router = useRouter();
  const queryClient = useQueryClient();
  const [isCompleted, setIsCompleted] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const handleMarkComplete = useCallback(async () => {
    if (!email || isCompleted) return;

    setIsSaving(true);

    const navigateToNext = () => {
      if (!isFinalTask) {
        setTimeout(() => {
          if (nextTaskId) {
            router.push(`/modules/${moduleId}/${nextTaskId}`);
          } else {
            router.push(`/modules/${moduleId}`);
          }
        }, 1500);
      }
    };

    try {
      const result = await completeTask(email, moduleId, task.id);
      if (result.success) {
        setIsCompleted(true);
        // Invalidate the progress cache so dashboard/modules pages update
        queryClient.invalidateQueries({ queryKey: ["progress", email] });
        navigateToNext();
      }
    } catch (error) {
      console.error("Failed to save progress:", error);
      // Still mark as complete locally and navigate even if API fails
      setIsCompleted(true);
      navigateToNext();
    } finally {
      setIsSaving(false);
    }
  }, [
    email,
    isCompleted,
    moduleId,
    task.id,
    nextTaskId,
    isFinalTask,
    router,
    queryClient,
  ]);

  return (
    <div className="h-[calc(100vh-8rem)]">
      {/* Top bar */}
      <div className="flex items-center justify-between mb-4">
        <Link
          href={`/modules/${moduleId}`}
          className="text-sm text-muted-foreground hover:text-foreground"
        >
          ← Back to {moduleTitle}
        </Link>
        <div className="flex items-center gap-2">
          {isCompleted && !isFinalTask && (
            <span className="text-sm text-green-400 flex items-center gap-1 animate-in fade-in">
              ✓ Completed
            </span>
          )}
        </div>
      </div>

      {/* Curriculum Complete Banner - shown only for final task completion */}
      {isCompleted && isFinalTask && (
        <div className="mb-4 p-6 rounded-lg bg-gradient-to-r from-teal-500/20 to-cyan-500/20 border border-teal-500/30 text-center animate-in fade-in slide-in-from-top-2">
          <div className="text-4xl mb-2">🎉</div>
          <h2 className="text-xl font-bold text-foreground mb-2">
            Congratulations! You&apos;ve completed the entire curriculum!
          </h2>
          <p className="text-muted-foreground mb-4">
            Now it&apos;s time to take your post-assessment to see how much
            you&apos;ve learned.
          </p>
          <Link href="/assessment/post">
            <Button className="bg-teal-500 hover:bg-teal-600 text-black font-semibold">
              Take Post-Assessment
            </Button>
          </Link>
        </div>
      )}

      {/* 70/30 Split Layout */}
      <div
        className={`flex gap-4 ${isCompleted && isFinalTask ? "h-[calc(100%-12rem)]" : "h-[calc(100%-4rem)]"}`}
      >
        {/* Left pane - 80% - TARA iframe */}
        <div className="w-[80%] h-full rounded-lg overflow-hidden border border-border/50">
          <TaraIframe path={taraDeepLink || "/dashboard"} />
        </div>

        {/* Right pane - 20% - Educational content */}
        <div className="w-[20%] h-full overflow-hidden">
          <LessonSidebar
            title={task.title}
            taskNumber={taskNumber}
            totalTasks={totalTasks}
            instructions={task.instructions}
            whyItMatters={task.why_it_matters}
            tips={task.tips}
            isCompleted={isCompleted}
            isSaving={isSaving}
            onMarkComplete={handleMarkComplete}
          />
        </div>
      </div>
    </div>
  );
}
