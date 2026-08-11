import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function HealthPage() {
  let database = "ok";

  try {
    await prisma.$queryRaw`SELECT 1`;
  } catch {
    database = "error";
  }

  const healthy = database === "ok";

  return (
    <main className="mx-auto max-w-3xl px-6 py-12">
      <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-400">
        Health
      </p>

      <h1 className="mt-2 text-3xl font-bold">Status da aplicação</h1>

      <div className="mt-8 rounded-2xl border border-slate-800 p-6">
        <div className="flex items-center justify-between gap-4">
          <span>Aplicação</span>
          <span className={healthy ? "text-emerald-400" : "text-red-400"}>
            {healthy ? "Operacional" : "Com falha"}
          </span>
        </div>

        <div className="mt-4 flex items-center justify-between gap-4">
          <span>PostgreSQL</span>
          <span className={healthy ? "text-emerald-400" : "text-red-400"}>
            {database}
          </span>
        </div>
      </div>
    </main>
  );
}
