import Link from "next/link";

import type { Prisma } from "@/generated/prisma/client";
import { projectStatusLabels, projectStatusValues } from "@/lib/project-status";
import { projectFiltersSchema } from "@/lib/validations/project-filters";
import { prisma } from "@/lib/prisma";

import { ArchiveProjectButton } from "./archive-project-button";

export const dynamic = "force-dynamic";

type ProjectsPageProps = {
  searchParams: Promise<{ q?: string | string[]; status?: string | string[] }>;
};

export default async function ProjectsPage({ searchParams }: ProjectsPageProps) {
  const filters = projectFiltersSchema.parse(await searchParams);
  const isFiltered = Boolean(filters.q || filters.status !== "ALL");
  const where: Prisma.ProjectWhereInput = {
    ...(filters.status !== "ALL" ? { status: filters.status } : {}),
    ...(filters.q
      ? {
          OR: [
            { name: { contains: filters.q, mode: "insensitive" } },
            { description: { contains: filters.q, mode: "insensitive" } },
          ],
        }
      : {}),
  };
  const [projects, totalCount] = await Promise.all([
    prisma.project.findMany({
      where,
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
    }),
    prisma.project.count(),
  ]);

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

      <form
        key={`${filters.q}:${filters.status}`}
        action="/projects"
        method="get"
        aria-label="Filtros de projetos"
        className="mt-8 grid gap-4 rounded-2xl border border-slate-800 bg-slate-900/30 p-5 sm:grid-cols-[minmax(0,1fr)_auto] lg:grid-cols-[minmax(0,1fr)_minmax(12rem,auto)_auto]"
      >
        <div>
          <label htmlFor="project-search" className="mb-2 block text-sm font-medium">
            Buscar projetos
          </label>
          <input
            id="project-search"
            name="q"
            type="search"
            defaultValue={filters.q}
            maxLength={120}
            placeholder="Nome ou descrição"
            className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3"
          />
        </div>
        <div>
          <label htmlFor="project-status" className="mb-2 block text-sm font-medium">
            Situação
          </label>
          <select
            id="project-status"
            name="status"
            defaultValue={filters.status}
            className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3"
          >
            <option value="ALL">Todas as situações</option>
            {projectStatusValues.map((value) => (
              <option key={value} value={value}>
                {projectStatusLabels[value]}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-wrap items-end gap-3 sm:col-span-2 lg:col-span-1">
          <button
            type="submit"
            className="rounded-xl bg-blue-500 px-5 py-3 font-medium text-white hover:bg-blue-400"
          >
            Filtrar
          </button>
          {isFiltered && (
            <Link href="/projects" className="rounded-xl border border-slate-700 px-4 py-3 text-sm">
              Limpar filtros
            </Link>
          )}
        </div>
      </form>
      <p role="status" aria-live="polite" className="mt-5 text-sm text-slate-400">
        {projects.length} de {totalCount} projetos
      </p>

      <section aria-label="Resultados de projetos" className="mt-5 grid gap-5 lg:grid-cols-2">
        {projects.length === 0 ? (
          <div className="rounded-2xl border border-slate-800 p-8">
            {isFiltered ? (
              <>
                <h2 className="font-semibold">Nenhum projeto encontrado</h2>
                <p className="mt-2 text-sm text-slate-400">
                  Experimente outro nome ou situação. Seus projetos continuam cadastrados.
                </p>
                <Link
                  href="/projects"
                  className="mt-4 inline-flex text-blue-300 underline underline-offset-4"
                >
                  Mostrar todos os projetos
                </Link>
              </>
            ) : (
              "Nenhum projeto cadastrado. Crie seu primeiro projeto para começar."
            )}
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
                  <p className="text-xs text-slate-500">Competências</p>
                  <p className="mt-1 text-lg font-semibold">{project._count.skillLinks}</p>
                </div>
                <div className="rounded-xl border border-slate-800 p-3">
                  <p className="text-xs text-slate-500">Evidências</p>
                  <p className="mt-1 text-lg font-semibold">{project._count.evidences}</p>
                </div>
                <div className="rounded-xl border border-slate-800 p-3">
                  <p className="text-xs text-slate-500">Decisões</p>
                  <p className="mt-1 text-lg font-semibold">{project._count.decisions}</p>
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
