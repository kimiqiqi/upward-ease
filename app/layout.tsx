import "./globals.css";
import Link from "next/link";

export const metadata = {
  title: "UpwardEase",
  description: "Student stories for stress coping and study life.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-white text-slate-900">
        <header className="sticky top-0 z-50 border-b bg-white/80 backdrop-blur">
          <nav className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
            <Link href="/" className="font-semibold tracking-tight">
              UpwardEase
            </Link>

            <div className="flex items-center gap-4 text-sm">
              <Link href="/submit" className="hover:underline">
                Submit
              </Link>
              <Link href="/gallery" className="hover:underline">
                Gallery
              </Link>
              <Link href="/about" className="hover:underline">
                About
              </Link>
              <Link
                href="/admin"
                className="rounded-md border px-3 py-1 hover:bg-slate-50"
              >
                Admin
              </Link>
            </div>
          </nav>
        </header>

        <main className="mx-auto w-full max-w-5xl px-4 py-10">{children}</main>

        <footer className="border-t">
          <div className="mx-auto max-w-5xl px-4 py-6 text-sm text-slate-600">
            © {new Date().getFullYear()} UpwardEase. All rights reserved.
          </div>
        </footer>
      </body>
    </html>
  );
}
