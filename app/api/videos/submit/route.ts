import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  if (!body) return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });

  const title = String(body.title ?? "").trim();
  const description = String(body.description ?? "").trim();
  const tags = Array.isArray(body.tags) ? body.tags.map(String).filter(Boolean) : [];
  const gradeLevel = String(body.gradeLevel ?? "").trim();
  const schoolType = String(body.schoolType ?? "").trim();
  const videoUrl = String(body.videoUrl ?? "").trim(); // NEW

  if (!title) return NextResponse.json({ error: "Title is required" }, { status: 400 });
  if (!description) return NextResponse.json({ error: "Description is required" }, { status: 400 });
  if (tags.length === 0) return NextResponse.json({ error: "At least 1 tag is required" }, { status: 400 });
  if (!videoUrl) return NextResponse.json({ error: "videoUrl is required" }, { status: 400 });

  const { data, error } = await supabaseAdmin
    .from("videos")
    .insert({
      title,
      description,
      tags,
      grade_level: gradeLevel || null,
      school_type: schoolType || null,
      status: "pending",
      video_url: videoUrl, // NEW
    })
    .select("id")
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json({ id: data.id });
}
