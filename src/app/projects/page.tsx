import Link from "next/link";

import { projectStatusLabels } from "@/lib/project-status";
import { prisma } from "@/lib/prisma";

import { ArchiveProjectButton } from "./archive-project-button";

export const dynamic = "force-dynamic";

export default async function ProjectsPage() {
  const projects = await prisma.project.findMany({
    orderBy: {
      updatedAt: "desc",
    },
    include: {
      _count: {
        select: {
          skillLinks: true,
          evidences: true,
          decisions: true,
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
          <h1 className="mt-2 text-3xl font-bold">Projetos</h1>
          <p className="mt-2 text-slate-400">
            Projetos de software registrados como evidência profissional.
          </p>
        </div>

        <Link
          href="/projects/new"
          className="inline-flex w-fit rounded-xl bg-blue-500 px-5 py-3 font-semibold text-white"
        >
          Novo projeto
        </Link>
      </header>

      <section className="mt-10 grid gap-5 lg:grid-cols-2">
        {projects.length === 0 ? (
          <div className="rounded-2xl border border-slate-800 p-8">
            Nenhum projeto cadastrado.
          </div>
        ) : (
          projects.map((project) => (
            <article
              key={project.id}
              className="rounded-2xl border border-slate-800 bg-slate-900/30 p-6 transition hover:border-blue-800"
            >
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <h2 className="text-xl font-semibold">{project.name}</h2>
                  <p className="mt-1 text-xs text-slate-500">{project.slug}</p>
                </div>

                <span className="rounded-full border border-slate-700 px-3 py-1 text-xs text-slate-300">
                  {projectStatusLabels[project.status]}
                </span>
              </div>

              <p className="mt-4 text-sm leading-6 text-slate-400">
                {project.description ?? "Sem descrição cadastrada."}
              </p>

              <div className="mt-6 grid grid-cols-3 gap-3">
                <div className="rounded-xl border border-slate-800 p-3">
                  <p className="text-xs text-slate-500">Skills</p>
                  <p className="mt-1 text-lg font-semibold">
                    {project._count.skillLinks}
                  </p>
                </div>
                <div className="rounded-xl border border-slate-800 p-3">
                  <p className="text-xs text-slate-500">Evidências</p>
                  <p className="mt-1 text-lg font-semibold">
                    {project._count.evidences}
                  </p>
                </div>
                <div className="rounded-xl border border-slate-800 p-3">
                  <p className="text-xs text-slate-500">Decisões</p>
                  <p className="mt-1 text-lg font-semibold">
                    {project._count.decisions}
                  </p>
                </div>
              </div>

              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  href={`/projects/${project.id}`}
                  className="rounded-xl border border-slate-700 px-4 py-2 text-sm"
                >
                  Abrir
                </Link>

                <Link
                  href={`/projects/${project.id}/edit`}
                  className="rounded-xl border border-slate-700 px-4 py-2 text-sm"
                >
                  Editar
                </Link>

                {project.status !== "ARCHIVED" && (
                  <ArchiveProjectButton id={project.id} name={project.name} />
                )}
              </div>
            </article>
          ))
        )}
      </section>
    </main>
  );
}
