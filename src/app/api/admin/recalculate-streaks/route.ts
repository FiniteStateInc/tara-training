import { NextRequest, NextResponse } from "next/server";
import { getSupabase } from "@/lib/supabase/client";

// POST /api/admin/recalculate-streaks - Recalculate streaks from completion history
export async function POST(request: NextRequest) {
  try {
    const supabase = getSupabase();
    const body = await request.json();
    const { email } = body;

    if (!email) {
      return NextResponse.json({ error: "Email required" }, { status: 400 });
    }

    // Get all task completions for this user, ordered by date
    const { data: completions, error: completionsError } = await supabase
      .from("task_completions")
      .select("completed_at")
      .eq("user_email", email)
      .order("completed_at", { ascending: true });

    if (completionsError) throw completionsError;

    if (!completions || completions.length === 0) {
      return NextResponse.json({
        success: true,
        message: "No completions found",
        streak: 0,
      });
    }

    // Extract unique dates (YYYY-MM-DD)
    const uniqueDates = Array.from(
      new Set(
        completions.map((c) => new Date(c.completed_at).toISOString().split("T")[0])
      )
    ).sort();

    // Calculate current streak by working backwards from today
    const today = new Date().toISOString().split("T")[0];
    let currentStreak = 0;
    let longestStreak = 0;
    let tempStreak = 0;

    // Check if there's activity today or yesterday to start counting
    const mostRecentDate = uniqueDates[uniqueDates.length - 1];
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayStr = yesterday.toISOString().split("T")[0];

    // Calculate longest streak (for historical purposes)
    for (let i = 0; i < uniqueDates.length; i++) {
      if (i === 0) {
        tempStreak = 1;
      } else {
        const prevDate = new Date(uniqueDates[i - 1]);
        const currDate = new Date(uniqueDates[i]);
        const diffDays = Math.floor(
          (currDate.getTime() - prevDate.getTime()) / (1000 * 60 * 60 * 24)
        );

        if (diffDays === 1) {
          tempStreak++;
        } else {
          longestStreak = Math.max(longestStreak, tempStreak);
          tempStreak = 1;
        }
      }
    }
    longestStreak = Math.max(longestStreak, tempStreak);

    // Calculate current streak (backwards from today/yesterday)
    if (mostRecentDate === today || mostRecentDate === yesterdayStr) {
      currentStreak = 1;
      for (let i = uniqueDates.length - 2; i >= 0; i--) {
        const prevDate = new Date(uniqueDates[i]);
        const nextDate = new Date(uniqueDates[i + 1]);
        const diffDays = Math.floor(
          (nextDate.getTime() - prevDate.getTime()) / (1000 * 60 * 60 * 24)
        );

        if (diffDays === 1) {
          currentStreak++;
        } else {
          break;
        }
      }
    } else {
      currentStreak = 0;
    }

    // Update the database
    await supabase.from("user_gamification").upsert(
      {
        user_email: email,
        current_streak: currentStreak,
        longest_streak: longestStreak,
        last_activity_date: mostRecentDate,
        updated_at: new Date().toISOString(),
      },
      { onConflict: "user_email" }
    );

    return NextResponse.json({
      success: true,
      message: `Recalculated streaks for ${email}`,
      currentStreak,
      longestStreak,
      uniqueDates: uniqueDates.length,
    });
  } catch (error) {
    console.error("Error recalculating streaks:", error);
    return NextResponse.json(
      { error: "Failed to recalculate streaks" },
      { status: 500 }
    );
  }
}
