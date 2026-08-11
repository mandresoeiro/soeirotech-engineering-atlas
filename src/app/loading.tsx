export default function LoadingPage() {
  return (
    <main className="mx-auto max-w-7xl px-6 py-12">
      <div className="animate-pulse">
        <div className="h-3 w-32 rounded bg-slate-800" />
        <div className="mt-4 h-10 w-2/3 rounded bg-slate-800" />

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <div
              key={index}
              className="h-28 rounded-2xl border border-slate-800 bg-slate-900/30"
            />
          ))}
        </div>
      </div>
    </main>
  );
}
