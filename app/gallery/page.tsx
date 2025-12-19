"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import type { Video } from "@/lib/types";
import { VideoCard } from "@/components/VideoCard";

function uniqTags(videos: Video[]) {
  const s = new Set<string>();
  for (const v of videos) for (const t of v.tags) s.add(t);
  return Array.from(s).sort((a, b) => a.localeCompare(b));
}

export default function GalleryPage() {
  const [approved, setApproved] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  async function load() {
    setErr("");
    setLoading(true);
    try {
      const res = await fetch("/api/videos/list");
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data?.error || "Failed to load videos");
      setApproved(data.videos ?? []);
    } catch (e: any) {
      setErr(e?.message ?? "Failed to load videos");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

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
      <div className="flex items-start justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold">Gallery</h1>
          <p className="mt-2 text-sm text-slate-600">
            Only approved videos show here.（中文：只展示审核通过的视频）
          </p>
        </div>
        <button
          onClick={load}
          className="rounded-lg border px-3 py-1 text-xs hover:bg-slate-50"
        >
          Refresh
        </button>
      </div>

      {err ? (
        <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">
          {err}
        </div>
      ) : null}

      <div className="rounded-2xl border p-5">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <input
            className="w-full rounded-lg border px-3 py-2 outline-none focus:ring-2 focus:ring-slate-200 md:max-w-md"
            placeholder="Search title, description, or tags…"
            value={q}
            onChange={(e) => setQ(e.target.value)}
          />

          <div className="text-sm text-slate-600">
            Showing{" "}
            <span className="font-medium text-slate-900">{filtered.length}</span>{" "}
            videos
            {loading ? <span className="ml-2 text-xs">(loading…)</span> : null}
          </div>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          <button
            onClick={() => setTag("")}
            className={`rounded-full border px-3 py-1 text-xs ${
              tag === "" ? "bg-slate-900 text-white" : "bg-slate-50"
            }`}
          >
            All
          </button>
          {allTags.map((t) => (
            <button
              key={t}
              onClick={() => setTag(t)}
              className={`rounded-full border px-3 py-1 text-xs ${
                tag === t ? "bg-slate-900 text-white" : "bg-slate-50"
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="rounded-2xl border p-6 text-slate-600">Loading…</div>
      ) : filtered.length === 0 ? (
        <div className="rounded-2xl border p-6 text-slate-600">
          No approved videos yet.
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {filtered.map((v) => (
            <Link key={v.id} href={`/gallery/${v.id}`} className="block">
              <div className="transition hover:-translate-y-0.5 hover:shadow-sm">
                <VideoCard video={v} />
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
