export default function AboutPage() {
  return (
    <div className="space-y-8">
      <header className="space-y-2">
        <h1 className="text-2xl font-semibold">About UpwardEase</h1>
        <p className="text-slate-700">
          UpwardEase is a student-centered space for sharing real stories,
          stress-coping strategies, and everyday study life.
        </p>
        <p className="text-sm text-slate-600">
          中文：UpwardEase 是一个以学生为中心的平台，用真实经历与学习生活分享来帮助大家缓解压力、互相支持。
        </p>
      </header>

      <section className="grid gap-4 md:grid-cols-2">
        <div className="rounded-2xl border p-6">
          <h2 className="font-semibold">Mission</h2>
          <p className="mt-2 text-slate-700">
            Help students reduce academic stress and anxiety by sharing real
            stories and practical tips.
          </p>
        </div>

        <div className="rounded-2xl border p-6">
          <h2 className="font-semibold">What you can share</h2>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-slate-700">
            <li>Study tips & AP prep</li>
            <li>Day-in-my-life study vlogs</li>
            <li>Personal stories about stress, pressure, or adapting</li>
          </ul>
        </div>

        <div className="rounded-2xl border p-6 md:col-span-2">
          <h2 className="font-semibold">Safety & review</h2>
          <p className="mt-2 text-slate-700">
            All submissions are reviewed before appearing in the public gallery.
          </p>
          <p className="mt-2 text-sm text-slate-600">
            中文：所有投稿会先审核，通过后才会出现在公开画廊里（保证内容适合学生观看）。
          </p>
        </div>
      </section>
    </div>
  );
}

