import Link from "next/link";
import { notFound } from "next/navigation";
import { mockVideos } from "@/lib/mock";

export default function VideoDetailPage({
  params,
}: {
  params: { id: string };
}) {
  // Only allow approved videos in public detail page
  const video = mockVideos.find((v) => v.id === params.id && v.status === "approved");
  if (!video) return notFound();

  return (
    <div className="space-y-6">
      <Link className="text-sm text-slate-600 hover:underline" href="/gallery">
        ← Back to gallery
      </Link>

      <div className="rounded-2xl border bg-white p-6">
        <div className="aspect-video w-full rounded-xl border bg-slate-50" />

        <h1 className="mt-5 text-2xl font-semibold">{video.title}</h1>
        <p className="mt-2 text-slate-700">{video.description}</p>

        <div className="mt-4 flex flex-wrap gap-2">
          {video.tags.map((t) => (
            <span key={t} className="rounded-full border bg-slate-50 px-3 py-1 text-xs">
              {t}
            </span>
          ))}
        </div>

        <div className="mt-4 text-sm text-slate-600">
          {video.gradeLevel ? <span className="mr-3">Grade: {video.gradeLevel}</span> : null}
          {video.schoolType ? <span>School: {video.schoolType}</span> : null}
        </div>

        <p className="mt-4 text-xs text-slate-500">
          (Mock detail page for V1. Later we’ll show real video playback from Cloudinary.)
        </p>
      </div>
    </div>
  );
}
