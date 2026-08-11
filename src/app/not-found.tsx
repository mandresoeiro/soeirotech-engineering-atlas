import Link from "next/link";

export default function NotFoundPage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-20">
      <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-400">
        404
      </p>
      <h1 className="mt-2 text-3xl font-bold">Registro não encontrado</h1>
      <p className="mt-3 text-slate-400">
        O item solicitado não existe ou já foi removido.
      </p>
      <Link
        href="/"
        className="mt-6 inline-flex rounded-xl border border-slate-700 px-4 py-2"
      >
        Voltar ao Dashboard
      </Link>
    </main>
  );
}
