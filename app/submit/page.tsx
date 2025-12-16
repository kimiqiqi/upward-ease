"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";

type FormState = {
  title: string;
  description: string;
  tagsText: string; // comma-separated
  gradeLevel: string;
  schoolType: string;
  videoFile: File | null;
};

export default function SubmitPage() {
  const router = useRouter();

  const [form, setForm] = useState<FormState>({
    title: "",
    description: "",
    tagsText: "",
    gradeLevel: "",
    schoolType: "",
    videoFile: null,
  });

  const tags = useMemo(() => {
    return form.tagsText
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean)
      .slice(0, 10);
  }, [form.tagsText]);

  const [error, setError] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (!form.title.trim()) return setError("Title is required.");
    if (!form.description.trim()) return setError("Description is required.");
    if (tags.length === 0) return setError("Please add at least 1 tag (comma-separated).");
    if (!form.videoFile) return setError("Please choose a video file.");

    // Optional: basic file type check
    if (!form.videoFile.type.startsWith("video/")) {
      return setError("Selected file is not a video.");
    }

    setIsSubmitting(true);

    // V1 (static): no backend yet → pretend success
    // Later: call /api/videos/submit (Cloudinary upload + Supabase insert)
    await new Promise((r) => setTimeout(r, 600));

    setIsSubmitting(false);
    router.push("/submit/thanks");
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Submit a video</h1>
        <p className="mt-2 text-sm text-slate-600">
          Share a student-safe story: study tips, AP prep, daily life, or stress-coping experiences.
          <span className="ml-1">（中文：内容保持尊重、适合学生观看；会先审核。）</span>
        </p>
      </div>

      <form onSubmit={onSubmit} className="space-y-5 rounded-2xl border p-6">
        {error ? (
          <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">
            {error}
          </div>
        ) : null}

        <div className="space-y-2">
          <label className="text-sm font-medium">Title *</label>
          <input
            className="w-full rounded-lg border px-3 py-2 outline-none focus:ring-2 focus:ring-slate-200"
            placeholder='e.g. "How I survived AP week"'
            value={form.title}
            onChange={(e) => update("title", e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Short description *</label>
          <textarea
            className="min-h-[120px] w-full rounded-lg border px-3 py-2 outline-none focus:ring-2 focus:ring-slate-200"
            placeholder="1–3 sentences: what is this video about?"
            value={form.description}
            onChange={(e) => update("description", e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Tags * (comma-separated)</label>
          <input
            className="w-full rounded-lg border px-3 py-2 outline-none focus:ring-2 focus:ring-slate-200"
            placeholder="AP, time management, stress, international student"
            value={form.tagsText}
            onChange={(e) => update("tagsText", e.target.value)}
          />
          {tags.length ? (
            <div className="flex flex-wrap gap-2 pt-1">
              {tags.map((t) => (
                <span key={t} className="rounded-full border bg-slate-50 px-3 py-1 text-xs">
                  {t}
                </span>
              ))}
            </div>
          ) : null}
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <label className="text-sm font-medium">Grade level (optional)</label>
            <select
              className="w-full rounded-lg border px-3 py-2"
              value={form.gradeLevel}
              onChange={(e) => update("gradeLevel", e.target.value)}
            >
              <option value="">Select…</option>
              <option value="middle">Middle school</option>
              <option value="9">9th</option>
              <option value="10">10th</option>
              <option value="11">11th</option>
              <option value="12">12th</option>
              <option value="college">College</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">School type (optional)</label>
            <select
              className="w-full rounded-lg border px-3 py-2"
              value={form.schoolType}
              onChange={(e) => update("schoolType", e.target.value)}
            >
              <option value="">Select…</option>
              <option value="public">Public school</option>
              <option value="private">Private school</option>
              <option value="community-college">Community college</option>
              <option value="university">University</option>
              <option value="other">Other</option>
            </select>
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Video file *</label>
          <input
            type="file"
            accept="video/*"
            className="w-full rounded-lg border px-3 py-2"
            onChange={(e) => update("videoFile", e.target.files?.[0] ?? null)}
          />
          <p className="text-xs text-slate-500">
            Tip: keep it short for V1. (Later we’ll enforce size/type on the server.)
          </p>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="rounded-lg bg-slate-900 px-4 py-2 text-white hover:opacity-90 disabled:opacity-60"
        >
          {isSubmitting ? "Submitting…" : "Submit for review"}
        </button>
      </form>
    </div>
  );
}
