import { NextRequest, NextResponse } from "next/server";
import { getSupabase } from "@/lib/supabase/client";

// GET /api/assessment?email=user@example.com
export async function GET(request: NextRequest) {
  const email = request.nextUrl.searchParams.get("email");

  if (!email) {
    return NextResponse.json({ error: "Email required" }, { status: 400 });
  }

  try {
    const supabase = getSupabase();

    // Get assessment results for user
    const { data: results, error } = await supabase
      .from("assessment_results")
      .select("*")
      .eq("user_email", email)
      .order("created_at", { ascending: false });

    if (error) throw error;

    // Find pre and post assessments
    const preAssessment = results?.find((r) => r.assessment_type === "pre");
    const postAssessment = results?.find((r) => r.assessment_type === "post");

    return NextResponse.json({
      pre: preAssessment || null,
      post: postAssessment || null,
    });
  } catch (error) {
    console.error("Error fetching assessment results:", error);
    return NextResponse.json(
      { error: "Failed to fetch assessment results" },
      { status: 500 }
    );
  }
}

// POST /api/assessment - Save assessment result
export async function POST(request: NextRequest) {
  try {
    const supabase = getSupabase();
    const body = await request.json();
    const { email, type, score, totalQuestions, answers, timeTakenSeconds } = body;

    if (!email || !type) {
      return NextResponse.json(
        { error: "Email and type required" },
        { status: 400 }
      );
    }

    // Ensure user exists
    await supabase
      .from("users")
      .upsert(
        { email, last_active_at: new Date().toISOString() },
        { onConflict: "email" }
      );

    // Save assessment result
    const { data, error } = await supabase
      .from("assessment_results")
      .insert({
        user_email: email,
        assessment_type: type,
        score,
        total_questions: totalQuestions,
        answers,
        time_taken_seconds: timeTakenSeconds || 0,
      })
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json({ success: true, result: data });
  } catch (error) {
    console.error("Error saving assessment result:", error);
    return NextResponse.json(
      { error: "Failed to save assessment result" },
      { status: 500 }
    );
  }
}
