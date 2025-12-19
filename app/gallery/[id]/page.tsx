import Link from "next/link";
import { notFound } from "next/navigation";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

export default async function VideoDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const { data, error } = await supabaseAdmin
    .from("videos")
    .select(
      "id,title,description,tags,grade_level,school_type,video_url,status,created_at"
    )
    .eq("id", id)
    .eq("status", "approved")
    .single();

  if (error || !data) return notFound();

  const videoUrl = data.video_url ?? null;

  return (
    <div className="space-y-6">
      <Link className="text-sm text-slate-600 hover:underline" href="/gallery">
        ← Back to gallery
      </Link>

      <div className="rounded-2xl border bg-white p-6">
        {videoUrl ? (
          <video
            controls
            className="aspect-video w-full rounded-xl border bg-black"
            src={videoUrl}
          />
        ) : (
          <div className="aspect-video w-full rounded-xl border bg-slate-50 flex items-center justify-center text-sm text-slate-500">
            Video playback will appear here after we connect Cloudinary.
          </div>
        )}

        <h1 className="mt-5 text-2xl font-semibold">{data.title}</h1>
        <p className="mt-2 text-slate-700">{data.description}</p>

        <div className="mt-4 flex flex-wrap gap-2">
          {(data.tags ?? []).map((t: string) => (
            <span
              key={t}
              className="rounded-full border bg-slate-50 px-3 py-1 text-xs"
            >
              {t}
            </span>
          ))}
        </div>

        <div className="mt-4 text-sm text-slate-600">
          {data.grade_level ? (
            <span className="mr-3">Grade: {data.grade_level}</span>
          ) : null}
          {data.school_type ? <span>School: {data.school_type}</span> : null}
        </div>

        <p className="mt-4 text-xs text-slate-500">
          Status: {data.status} • Created:{" "}
          {new Date(data.created_at).toLocaleString()}
        </p>
      </div>
    </div>
  );
}

