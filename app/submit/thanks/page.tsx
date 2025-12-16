import Link from "next/link";

export default function SubmitThanksPage() {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold">Thank you!</h1>
      <p className="text-slate-700">
        Your video has been submitted and is waiting for review.
      </p>
      <div className="flex gap-3">
        <Link className="rounded-lg border px-4 py-2 hover:bg-slate-50" href="/gallery">
          View gallery
        </Link>
        <Link className="rounded-lg bg-slate-900 px-4 py-2 text-white hover:opacity-90" href="/submit">
          Submit another
        </Link>
      </div>
    </div>
  );
}
