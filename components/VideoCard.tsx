"use client";

import type { Video } from "@/lib/types";

function formatDate(iso: string) {
  const d = new Date(iso);
  return d.toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" });
}

export function VideoCard({
  video,
  rightSlot,
}: {
  video: Video;
  rightSlot?: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border bg-white p-5">
      <div className="aspect-video w-full rounded-xl border bg-slate-50" />

      <div className="mt-4 flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h3 className="truncate font-semibold">{video.title}</h3>
          <p className="mt-1 line-clamp-2 text-sm text-slate-700">{video.description}</p>
        </div>
        {rightSlot ? <div className="shrink-0">{rightSlot}</div> : null}
      </div>

      <div className="mt-3 flex flex-wrap gap-2">
        {video.tags.slice(0, 6).map((t) => (
          <span key={t} className="rounded-full border bg-slate-50 px-3 py-1 text-xs">
            {t}
          </span>
        ))}
      </div>

      <div className="mt-3 flex flex-wrap gap-3 text-xs text-slate-500">
        <span>{formatDate(video.createdAt)}</span>
        {video.gradeLevel ? <span>Grade: {video.gradeLevel}</span> : null}
        {video.schoolType ? <span>School: {video.schoolType}</span> : null}
        <span className="rounded-full border px-2 py-0.5">{video.status}</span>
      </div>
    </div>
  );
}
