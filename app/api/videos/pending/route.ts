import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

export async function GET() {
  const { data, error } = await supabaseAdmin
    .from("videos")
    .select("id,title,description,tags,grade_level,school_type,status,created_at")
    .eq("status", "pending")
    .order("created_at", { ascending: false });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json({
    videos: (data ?? []).map((row) => ({
      id: row.id,
      title: row.title,
      description: row.description,
      tags: row.tags ?? [],
      gradeLevel: row.grade_level ?? "",
      schoolType: row.school_type ?? "",
      status: row.status,
      createdAt: row.created_at,
    })),
  });
}
