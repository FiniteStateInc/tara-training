import { NextRequest, NextResponse } from "next/server";
import { getSupabase } from "@/lib/supabase/client";

// POST /api/admin/clear-user - Clear all data for a user (for testing)
export async function POST(request: NextRequest) {
  try {
    const supabase = getSupabase();
    const body = await request.json();
    const { email } = body;

    if (!email) {
      return NextResponse.json({ error: "Email required" }, { status: 400 });
    }

    // Delete in order to respect foreign key constraints
    const tables = [
      "assessment_results",
      "task_completions", 
      "user_progress",
      "user_gamification",
      "users",
    ];

    const results: Record<string, string> = {};

    for (const table of tables) {
      const { error } = await supabase
        .from(table)
        .delete()
        .eq(table === "users" ? "email" : "user_email", email);
      
      if (error) {
        results[table] = `Error: ${error.message}`;
      } else {
        results[table] = "Cleared";
      }
    }

    return NextResponse.json({ 
      success: true, 
      message: `Cleared all data for ${email}`,
      results 
    });
  } catch (error) {
    console.error("Error clearing user data:", error);
    return NextResponse.json(
      { error: "Failed to clear user data" },
      { status: 500 }
    );
  }
}
