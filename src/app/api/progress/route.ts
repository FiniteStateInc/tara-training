import { NextRequest, NextResponse } from "next/server";
import { getSupabase } from "@/lib/supabase/client";
import { tasks } from "@/content/modules";

// GET /api/progress?email=user@example.com
export async function GET(request: NextRequest) {
  const email = request.nextUrl.searchParams.get("email");

  if (!email) {
    return NextResponse.json({ error: "Email required" }, { status: 400 });
  }

  try {
    const supabase = getSupabase();

    // Get user progress
    const { data: progress, error: progressError } = await supabase
      .from("user_progress")
      .select("*")
      .eq("user_email", email);

    if (progressError) throw progressError;

    // Get task completions
    const { data: completions, error: completionsError } = await supabase
      .from("task_completions")
      .select("*")
      .eq("user_email", email);

    if (completionsError) throw completionsError;

    // Get gamification stats
    const { data: gamification } = await supabase
      .from("user_gamification")
      .select("*")
      .eq("user_email", email)
      .single();

    // gamification might not exist yet, that's okay

    return NextResponse.json({
      progress: progress || [],
      completions: completions || [],
      gamification: gamification || null,
    });
  } catch (error) {
    console.error("Error fetching progress:", error);
    return NextResponse.json(
      { error: "Failed to fetch progress" },
      { status: 500 },
    );
  }
}

// POST /api/progress - Save progress
export async function POST(request: NextRequest) {
  try {
    const supabase = getSupabase();
    const body = await request.json();
    const { email, moduleId, taskId, action } = body;

    if (!email) {
      return NextResponse.json({ error: "Email required" }, { status: 400 });
    }

    // Ensure user exists
    const { error: userError } = await supabase
      .from("users")
      .upsert(
        { email, last_active_at: new Date().toISOString() },
        { onConflict: "email" },
      )
      .select()
      .single();

    if (userError) throw userError;

    if (action === "complete_task" && taskId && moduleId) {
      // Mark task as complete
      const { error: taskError } = await supabase
        .from("task_completions")
        .upsert(
          {
            user_email: email,
            task_id: taskId,
            completed_at: new Date().toISOString(),
            verification_method: "manual",
          },
          { onConflict: "user_email,task_id" },
        );

      if (taskError) throw taskError;

      // Check if all tasks in this module are now complete
      const moduleTasks = tasks[moduleId] || [];
      const moduleTaskIds = moduleTasks.map((t) => t.id);

      // Get all completed tasks for this user in this module
      const { data: completedTasks } = await supabase
        .from("task_completions")
        .select("task_id")
        .eq("user_email", email)
        .in("task_id", moduleTaskIds);

      const completedTaskIds = new Set(
        completedTasks?.map((t) => t.task_id) || [],
      );
      // Add the current task being completed
      completedTaskIds.add(taskId);

      const allTasksComplete = moduleTaskIds.every((id) =>
        completedTaskIds.has(id),
      );

      // Update module progress
      const { error: progressError } = await supabase
        .from("user_progress")
        .upsert(
          {
            user_email: email,
            module_id: moduleId,
            status: allTasksComplete ? "completed" : "in_progress",
            started_at: new Date().toISOString(),
            ...(allTasksComplete && { completed_at: new Date().toISOString() }),
          },
          { onConflict: "user_email,module_id" },
        );

      if (progressError) throw progressError;

      // Update gamification (streak tracking)
      const today = new Date().toISOString().split("T")[0];
      const yesterdayDate = new Date();
      yesterdayDate.setDate(yesterdayDate.getDate() - 1);
      const yesterday = yesterdayDate.toISOString().split("T")[0];

      const { data: existingGamification } = await supabase
        .from("user_gamification")
        .select("current_streak, longest_streak, last_activity_date")
        .eq("user_email", email)
        .single();

      const lastActivity = existingGamification?.last_activity_date || null;
      const currentStreak = existingGamification?.current_streak || 0;
      const longestStreak = existingGamification?.longest_streak || 0;

      let nextStreak = currentStreak;
      if (lastActivity === today) {
        nextStreak = currentStreak;
      } else if (lastActivity === yesterday) {
        nextStreak = currentStreak + 1;
      } else {
        nextStreak = 1;
      }

      const nextLongest = Math.max(longestStreak, nextStreak);

      await supabase.from("user_gamification").upsert(
        {
          user_email: email,
          current_streak: nextStreak,
          longest_streak: nextLongest,
          last_activity_date: today,
          updated_at: new Date().toISOString(),
        },
        { onConflict: "user_email" },
      );

      return NextResponse.json({ success: true });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error saving progress:", error);
    return NextResponse.json(
      { error: "Failed to save progress" },
      { status: 500 },
    );
  }
}
