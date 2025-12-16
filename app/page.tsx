import Link from "next/link";

export default function HomePage() {
  return (
    <div className="space-y-10">
      <section className="rounded-2xl border bg-slate-50 p-8">
        <h1 className="text-3xl font-semibold tracking-tight">
          UpwardEase
        </h1>
        <p className="mt-3 max-w-2xl text-slate-700">
          A student-centered space to share real stories, stress-coping tips,
          and everyday study life — so nobody feels alone.
        </p>

        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            href="/submit"
            className="rounded-lg bg-slate-900 px-4 py-2 text-white hover:opacity-90"
          >
            Upload your story
          </Link>
          <Link
            href="/gallery"
            className="rounded-lg border px-4 py-2 hover:bg-white"
          >
            Watch others’ stories
          </Link>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl border p-5">
          <h2 className="font-semibold">This week’s topic</h2>
          <p className="mt-2 text-sm text-slate-700">
            How do you handle test anxiety?
          </p>
          <p className="mt-3 text-xs text-slate-500">
            (V1: we’ll set this manually. Later: Gemini can generate it.)
          </p>
        </div>

        <div className="rounded-2xl border p-5">
          <h2 className="font-semibold">What you can share</h2>
          <p className="mt-2 text-sm text-slate-700">
            Study tips, AP prep, a day-in-my-life vlog, or your personal story.
          </p>
        </div>

        <div className="rounded-2xl border p-5">
          <h2 className="font-semibold">Safety & respect</h2>
          <p className="mt-2 text-sm text-slate-700">
            Keep content respectful and student-safe. Admin review is required.
          </p>
        </div>
      </section>
    </div>
  );
}
