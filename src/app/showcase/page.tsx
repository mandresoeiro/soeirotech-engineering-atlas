import Link from "next/link";

import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function ShowcasePage() {
  const projects = await prisma.project.findMany({
    where: {
      status: {
        not: "ARCHIVED",
      },
    },
    orderBy: {
      updatedAt: "desc",
    },
    include: {
      skillLinks: {
        include: {
          skill: true,
        },
        orderBy: {
          createdAt: "asc",
        },
      },
      _count: {
        select: {
          evidences: true,
          decisions: true,
        },
      },
    },
  });

  return (
    <main className="mx-auto max-w-7xl px-6 py-12">
      <header>
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-400">
          Showcase
        </p>
        <h1 className="mt-2 text-3xl font-bold">Projetos em evidência</h1>
        <p className="mt-2 text-slate-400">
          Visão resumida das tecnologias aplicadas e das evidências profissionais.
        </p>
      </header>

      <section className="mt-10 grid gap-5 lg:grid-cols-2">
        {projects.map((project) => (
          <article
            key={project.id}
            className="rounded-2xl border border-slate-800 p-6"
          >
            <h2 className="text-xl font-semibold">{project.name}</h2>

            {project.description && (
              <p className="mt-3 text-sm leading-6 text-slate-400">
                {project.description}
              </p>
            )}

            <div className="mt-5 flex flex-wrap gap-2">
              {project.skillLinks.map((link) => (
                <span
                  key={link.skillId}
                  className="rounded-full border border-slate-700 px-3 py-1 text-xs text-slate-300"
                >
                  {link.skill.name}
                </span>
              ))}
            </div>

            <div className="mt-6 flex gap-5 text-sm text-slate-400">
              <span>{project._count.evidences} evidências</span>
              <span>{project._count.decisions} decisões</span>
            </div>

            <Link
              href={`/projects/${project.id}`}
              className="mt-6 inline-flex text-sm font-medium text-blue-400 hover:underline"
            >
              Abrir projeto
            </Link>
          </article>
        ))}
      </section>
    </main>
  );
}
