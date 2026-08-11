import Link from "next/link";

import { EmptyState, Eyebrow } from "@/components/ui";
import { prisma } from "@/lib/prisma";

import { DeleteEvidenceButton } from "./delete-evidence-button";

export const dynamic = "force-dynamic";

export default async function EvidencesPage() {
  const evidences = await prisma.evidence.findMany({
    orderBy: {
      createdAt: "desc",
    },
    include: {
      project: true,
      skill: true,
    },
  });

  return (
    <main className="mx-auto max-w-7xl px-6 py-12">
      <header className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <Eyebrow>Engineering Atlas</Eyebrow>
          <h1 className="mt-2 text-4xl font-bold tracking-tight">
            Evidências
          </h1>
          <p className="mt-3 max-w-2xl leading-7 text-slate-400">
            Registros que demonstram resultados concretos: implementação,
            testes, documentação, entregas e outros artefatos profissionais.
          </p>
        </div>

        <Link
          href="/evidences/new"
          className="inline-flex w-fit rounded-xl bg-blue-500 px-5 py-3 font-semibold text-white transition hover:bg-blue-400"
        >
          Nova evidência
        </Link>
      </header>

      <section className="mt-10">
        {evidences.length === 0 ? (
          <EmptyState
            title="Nenhuma evidência cadastrada"
            description="Crie a primeira evidência e associe-a a um projeto. Uma skill pode ser vinculada quando fizer sentido."
            action={
              <Link
                href="/evidences/new"
                className="inline-flex rounded-xl border border-slate-700 px-4 py-2 text-sm"
              >
                Criar evidência
              </Link>
            }
          />
        ) : (
          <div className="grid gap-5 lg:grid-cols-2">
            {evidences.map((evidence) => (
              <article
                key={evidence.id}
                className="group rounded-2xl border border-slate-800 bg-slate-900/35 p-6 transition hover:-translate-y-0.5 hover:border-blue-800/80 hover:bg-slate-900/50"
              >
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-400">
                      {evidence.type}
                    </p>
                    <h2 className="mt-2 text-xl font-semibold">
                      {evidence.title}
                    </h2>
                  </div>

                  <time className="text-xs text-slate-500">
                    {evidence.createdAt.toLocaleDateString("pt-BR")}
                  </time>
                </div>

                <p className="mt-4 text-sm leading-6 text-slate-400">
                  {evidence.description ?? "Sem descrição cadastrada."}
                </p>

                <div className="mt-5 flex flex-wrap gap-2 text-xs">
                  <span className="rounded-full border border-slate-700 px-3 py-1 text-slate-300">
                    Projeto: {evidence.project.name}
                  </span>

                  {evidence.skill && (
                    <span className="rounded-full border border-blue-900 px-3 py-1 text-blue-300">
                      Skill: {evidence.skill.name}
                    </span>
                  )}
                </div>

                <div className="mt-6 flex flex-wrap gap-3">
                  <Link
                    href={`/evidences/${evidence.id}`}
                    className="rounded-xl border border-slate-700 px-4 py-2 text-sm transition hover:border-blue-700"
                  >
                    Abrir
                  </Link>

                  <Link
                    href={`/evidences/${evidence.id}/edit`}
                    className="rounded-xl border border-slate-700 px-4 py-2 text-sm transition hover:border-blue-700"
                  >
                    Editar
                  </Link>

                  <DeleteEvidenceButton
                    id={evidence.id}
                    title={evidence.title}
                  />
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
