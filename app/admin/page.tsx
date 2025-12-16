"use client";

import { useMemo, useState } from "react";
import { mockVideos } from "@/lib/mock";
import type { Video, VideoStatus } from "@/lib/types";
import { VideoCard } from "@/components/VideoCard";

export default function AdminPage() {
  const [videos, setVideos] = useState<Video[]>(mockVideos);

  const pending = useMemo(
    () => videos.filter((v) => v.status === "pending").sort((a, b) => b.createdAt.localeCompare(a.createdAt)),
    [videos]
  );

  function setStatus(id: string, status: VideoStatus) {
    setVideos((prev) => prev.map((v) => (v.id === id ? { ...v, status } : v)));
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Admin Review</h1>
        <p className="mt-2 text-sm text-slate-600">
          Admin-only page (we’ll add Supabase Auth later).（中文：后面会加管理员登录保护）
        </p>
      </div>

      <div className="rounded-2xl border bg-slate-50 p-5 text-sm text-slate-700">
        Pending videos: <span className="font-semibold text-slate-900">{pending.length}</span>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {pending.map((v) => (
          <VideoCard
            key={v.id}
            video={v}
            rightSlot={
              <div className="flex gap-2">
                <button
                  onClick={() => setStatus(v.id, "approved")}
                  className="rounded-lg bg-slate-900 px-3 py-1 text-xs text-white hover:opacity-90"
                >
                  Approve
                </button>
                <button
                  onClick={() => setStatus(v.id, "rejected")}
                  className="rounded-lg border px-3 py-1 text-xs hover:bg-white"
                >
                  Reject
                </button>
              </div>
            }
          />
        ))}
      </div>

      {pending.length === 0 ? (
        <div className="rounded-2xl border p-6 text-slate-600">No pending videos 🎉</div>
      ) : null}
    </div>
  );
}
