"use client";

import { useMemo, useState } from "react";
import { mockVideos } from "@/lib/mock";
import type { Video } from "@/lib/types";
import { VideoCard } from "@/components/VideoCard";

function uniqTags(videos: Video[]) {
  const s = new Set<string>();
  for (const v of videos) for (const t of v.tags) s.add(t);
  return Array.from(s).sort((a, b) => a.localeCompare(b));
}

export default function GalleryPage() {
  const approved = useMemo(
    () => mockVideos.filter((v) => v.status === "approved").sort((a, b) => b.createdAt.localeCompare(a.createdAt)),
    []
  );

  const allTags = useMemo(() => uniqTags(approved), [approved]);

  const [q, setQ] = useState("");
  const [tag, setTag] = useState<string>("");

  const filtered = useMemo(() => {
    const query = q.trim().toLowerCase();
    return approved.filter((v) => {
      const matchesQuery =
        !query ||
        v.title.toLowerCase().includes(query) ||
        v.description.toLowerCase().includes(query) ||
        v.tags.some((t) => t.toLowerCase().includes(query));
      const matchesTag = !tag || v.tags.includes(tag);
      return matchesQuery && matchesTag;
    });
  }, [approved, q, tag]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Gallery</h1>
        <p className="mt-2 text-sm text-slate-600">
          Only approved videos show here.（中文：只展示审核通过的视频）
        </p>
      </div>

      <div className="rounded-2xl border p-5">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <input
            className="w-full rounded-lg border px-3 py-2 outline-none focus:ring-2 focus:ring-slate-200 md:max-w-md"
            placeholder="Search title, description, or tags…"
            value={q}
            onChange={(e) => setQ(e.target.value)}
          />

          <div className="text-sm text-slate-600">
            Showing <span className="font-medium text-slate-900">{filtered.length}</span> videos
          </div>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          <button
            onClick={() => setTag("")}
            className={`rounded-full border px-3 py-1 text-xs ${tag === "" ? "bg-slate-900 text-white" : "bg-slate-50"}`}
          >
            All
          </button>
          {allTags.map((t) => (
            <button
              key={t}
              onClick={() => setTag(t)}
              className={`rounded-full border px-3 py-1 text-xs ${tag === t ? "bg-slate-900 text-white" : "bg-slate-50"}`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {filtered.map((v) => (
          <VideoCard key={v.id} video={v} />
        ))}
      </div>
    </div>
  );
}
