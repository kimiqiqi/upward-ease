"use client";

import { useEffect, useMemo, useState } from "react";
import type { Video } from "@/lib/types";
import { VideoCard } from "@/components/VideoCard";

export default function AdminPage() {
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  async function load() {
    setErr("");
    setLoading(true);
    try {
      const res = await fetch("/api/videos/pending");
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data?.error || "Failed to load pending videos");
      setVideos(data.videos ?? []);
    } catch (e: any) {
      setErr(e?.message ?? "Failed to load");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  const pending = useMemo(
    () => videos.filter((v) => v.status === "pending"),
    [videos]
  );

  async function review(id: string, action: "approve" | "reject") {
    setErr("");
    try {
      const res = await fetch("/api/videos/review", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, action }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data?.error || "Review failed");
      // reload list
      await load();
    } catch (e: any) {
      setErr(e?.message ?? "Review failed");
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Admin Review</h1>
        <p className="mt-2 text-sm text-slate-600">
          Admin-only page (auth will come later).（中文：后面会加管理员登录保护）
        </p>
      </div>

      {err ? (
        <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">
          {err}
        </div>
      ) : null}

      <div className="rounded-2xl border bg-slate-50 p-5 text-sm text-slate-700 flex items-center justify-between">
        <div>
          Pending videos:{" "}
          <span className="font-semibold text-slate-900">{pending.length}</span>
        </div>
        <button
          onClick={load}
          className="rounded-lg border px-3 py-1 text-xs hover:bg-white"
        >
          Refresh
        </button>
      </div>

      {loading ? (
        <div className="rounded-2xl border p-6 text-slate-600">Loading…</div>
      ) : pending.length === 0 ? (
        <div className="rounded-2xl border p-6 text-slate-600">No pending videos 🎉</div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {pending.map((v) => (
            <VideoCard
              key={v.id}
              video={v}
              rightSlot={
                <div className="flex gap-2">
                  <button
                    onClick={() => review(v.id, "approve")}
                    className="rounded-lg bg-slate-900 px-3 py-1 text-xs text-white hover:opacity-90"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => review(v.id, "reject")}
                    className="rounded-lg border px-3 py-1 text-xs hover:bg-white"
                  >
                    Reject
                  </button>
                </div>
              }
            />
          ))}
        </div>
      )}
    </div>
  );
}
