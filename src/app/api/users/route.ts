import { NextRequest, NextResponse } from "next/server";
import { getSupabase } from "@/lib/supabase/client";

// POST /api/users - Create or update user
export async function POST(request: NextRequest) {
  try {
    const supabase = getSupabase();
    const body = await request.json();
    const { email } = body;

    if (!email) {
      return NextResponse.json({ error: "Email required" }, { status: 400 });
    }

    // Restrict to @finitestate.io emails only
    if (!email.toLowerCase().endsWith("@finitestate.io")) {
      return NextResponse.json({ error: "Access denied" }, { status: 403 });
    }

    // Create or update user
    const { error: userError } = await supabase
      .from("users")
      .upsert(
        { email, last_active_at: new Date().toISOString() },
        { onConflict: "email" },
      )
      .select()
      .single();

    if (userError) throw userError;

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error creating user:", error);
    return NextResponse.json(
      { error: "Failed to create user" },
      { status: 500 },
    );
  }
}
