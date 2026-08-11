import Link from "next/link";

import { prisma } from "@/lib/prisma";

import { DeleteSkillButton } from "./delete-skill-button";

export const dynamic = "force-dynamic";

export default async function SkillsPage() {
  const skills = await prisma.skill.findMany({
    orderBy: {
      name: "asc",
    },
    include: {
      _count: {
        select: {
          projectLinks: true,
          evidences: true,
        },
      },
    },
  });

  return (
    <main className="mx-auto max-w-7xl px-6 py-12">
      <header className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-400">
            Engineering Atlas
          </p>
          <h1 className="mt-2 text-3xl font-bold">Skills</h1>
          <p className="mt-2 text-slate-400">
            Tecnologias e conhecimentos aplicados nos projetos.
          </p>
        </div>

        <Link
          href="/skills/new"
          className="inline-flex w-fit rounded-xl bg-blue-500 px-5 py-3 font-semibold text-white"
        >
          Nova skill
        </Link>
      </header>

      <section className="mt-10">
        {skills.length === 0 ? (
          <div className="rounded-2xl border border-slate-800 p-8">
            <h2 className="text-lg font-semibold">
              Nenhuma skill cadastrada
            </h2>
            <p className="mt-2 text-slate-400">
              Cadastre a primeira habilidade para começar a relacioná-la aos
              projetos.
            </p>
          </div>
        ) : (
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {skills.map((skill) => {
              const hasRelations =
                skill._count.projectLinks > 0 ||
                skill._count.evidences > 0;

              return (
                <article
                  key={skill.id}
                  className="flex flex-col rounded-2xl border border-slate-800 bg-slate-900/30 p-6 transition hover:border-blue-800"
                >
                  <div className="flex-1">
                    <h2 className="text-xl font-semibold">{skill.name}</h2>
                    <p className="mt-1 text-xs text-slate-500">
                      {skill.slug}
                    </p>

                    <p className="mt-4 text-sm leading-6 text-slate-400">
                      {skill.description ?? "Sem descrição cadastrada."}
                    </p>

                    <div className="mt-6 grid grid-cols-2 gap-3">
                      <div className="rounded-xl border border-slate-800 p-3">
                        <p className="text-xs uppercase tracking-wide text-slate-500">
                          Projetos
                        </p>
                        <p className="mt-1 text-lg font-semibold">
                          {skill._count.projectLinks}
                        </p>
                      </div>

                      <div className="rounded-xl border border-slate-800 p-3">
                        <p className="text-xs uppercase tracking-wide text-slate-500">
                          Evidências
                        </p>
                        <p className="mt-1 text-lg font-semibold">
                          {skill._count.evidences}
                        </p>
                      </div>
                    </div>

                    {hasRelations && (
                      <p className="mt-4 text-xs text-amber-400">
                        Esta skill possui relacionamentos e não pode ser
                        excluída.
                      </p>
                    )}
                  </div>

                  <div className="mt-6 flex flex-wrap gap-3">
                    <Link
                      href={`/skills/${skill.id}`}
                      className="rounded-xl border border-slate-700 px-4 py-2 text-sm"
                    >
                      Abrir
                    </Link>

                    <Link
                      href={`/skills/${skill.id}/edit`}
                      className="rounded-xl border border-slate-700 px-4 py-2 text-sm"
                    >
                      Editar
                    </Link>

                    {!hasRelations && (
                      <DeleteSkillButton id={skill.id} name={skill.name} />
                    )}
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </section>
    </main>
  );
}
