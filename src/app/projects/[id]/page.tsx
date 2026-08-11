import Link from "next/link";
import { notFound } from "next/navigation";

import { Eyebrow, SectionHeading, StatCard } from "@/components/ui";
import { projectStatusLabels } from "@/lib/project-status";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

type ProjectPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { id } = await params;

  const project = await prisma.project.findUnique({
    where: {
      id,
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
      evidences: {
        orderBy: {
          createdAt: "desc",
        },
        take: 6,
      },
      decisions: {
        orderBy: {
          createdAt: "desc",
        },
        take: 5,
      },
      _count: {
        select: {
          skillLinks: true,
          evidences: true,
          decisions: true,
        },
      },
    },
  });

  if (!project) {
    notFound();
  }

  return (
    <main className="mx-auto max-w-7xl px-6 py-12">
      <Link href="/projects" className="text-sm text-blue-400 hover:underline">
        ← Projetos
      </Link>

      <header className="mt-8 rounded-3xl border border-slate-800 bg-slate-900/30 p-7 md:p-9">
        <div className="flex flex-wrap items-start justify-between gap-5">
          <div>
            <Eyebrow>Project</Eyebrow>
            <h1 className="mt-2 text-4xl font-bold tracking-tight">
              {project.name}
            </h1>
            <p className="mt-2 text-sm text-slate-500">{project.slug}</p>
          </div>

          <span className="rounded-full border border-blue-900 bg-blue-950/30 px-3 py-1 text-sm text-blue-300">
            {projectStatusLabels[project.status]}
          </span>
        </div>

        {project.description && (
          <p className="mt-6 max-w-4xl leading-7 text-slate-300">
            {project.description}
          </p>
        )}

        <div className="mt-7 flex flex-wrap gap-3">
          <Link
            href={`/projects/${project.id}/edit`}
            className="rounded-xl bg-blue-500 px-4 py-2 font-medium text-white transition hover:bg-blue-400"
          >
            Editar projeto
          </Link>

          <Link
            href={`/projects/${project.id}/skills`}
            className="rounded-xl border border-blue-800 px-4 py-2 text-blue-300 transition hover:bg-blue-950/30"
          >
            Gerenciar skills
          </Link>

          <Link
            href={`/evidences/new?projectId=${project.id}`}
            className="rounded-xl border border-slate-700 px-4 py-2 transition hover:border-blue-700"
          >
            Nova evidência
          </Link>

          {project.repository && (
            <a
              href={project.repository}
              target="_blank"
              rel="noreferrer"
              className="rounded-xl border border-slate-700 px-4 py-2 transition hover:border-blue-700"
            >
              Repositório ↗
            </a>
          )}

          {project.demoUrl && (
            <a
              href={project.demoUrl}
              target="_blank"
              rel="noreferrer"
              className="rounded-xl border border-slate-700 px-4 py-2 transition hover:border-blue-700"
            >
              Demo ↗
            </a>
          )}
        </div>
      </header>

      <section className="mt-8 grid gap-4 sm:grid-cols-3">
        <StatCard
          label="Skills"
          value={project._count.skillLinks}
          helper="Habilidades aplicadas"
        />
        <StatCard
          label="Evidências"
          value={project._count.evidences}
          helper="Resultados demonstráveis"
        />
        <StatCard
          label="Decisões"
          value={project._count.decisions}
          helper="Decisões técnicas"
        />
      </section>

      <section className="mt-12">
        <SectionHeading
          title="Skills aplicadas"
          description="Onde e como cada habilidade foi realmente utilizada."
          action={
            <Link
              href={`/projects/${project.id}/skills`}
              className="text-sm text-blue-400 hover:underline"
            >
              Gerenciar
            </Link>
          }
        />

        {project.skillLinks.length === 0 ? (
          <p className="mt-5 text-slate-400">Nenhuma skill relacionada.</p>
        ) : (
          <div className="mt-6 grid gap-4 lg:grid-cols-2">
            {project.skillLinks.map((link) => (
              <article
                key={link.skillId}
                className="rounded-2xl border border-slate-800 bg-slate-900/30 p-5"
              >
                <Link
                  href={`/skills/${link.skill.id}`}
                  className="font-semibold text-blue-400 hover:underline"
                >
                  {link.skill.name}
                </Link>

                <p className="mt-3 text-sm leading-6 text-slate-400">
                  {link.context ?? "Contexto ainda não registrado."}
                </p>
              </article>
            ))}
          </div>
        )}
      </section>

      <section className="mt-12">
        <SectionHeading
          title="Evidências"
          description="Resultados concretos relacionados a este projeto."
          action={
            <Link
              href={`/evidences/new?projectId=${project.id}`}
              className="text-sm text-blue-400 hover:underline"
            >
              Registrar evidência
            </Link>
          }
        />

        {project.evidences.length === 0 ? (
          <p className="mt-5 text-slate-400">
            Nenhuma evidência registrada.
          </p>
        ) : (
          <div className="mt-6 grid gap-4 lg:grid-cols-2">
            {project.evidences.map((evidence) => (
              <Link
                key={evidence.id}
                href={`/evidences/${evidence.id}`}
                className="rounded-2xl border border-slate-800 bg-slate-900/30 p-5 transition hover:border-blue-800"
              >
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-400">
                  {evidence.type}
                </p>
                <h3 className="mt-2 font-semibold">{evidence.title}</h3>
                <p className="mt-2 line-clamp-2 text-sm leading-6 text-slate-400">
                  {evidence.description ?? "Sem descrição cadastrada."}
                </p>
              </Link>
            ))}
          </div>
        )}
      </section>

      <section className="mt-12">
        <SectionHeading
          title="Decisões recentes"
          description="Decisões de arquitetura registradas no projeto."
        />

        {project.decisions.length === 0 ? (
          <p className="mt-5 text-slate-400">
            Nenhuma decisão registrada.
          </p>
        ) : (
          <div className="mt-6 grid gap-4 lg:grid-cols-2">
            {project.decisions.map((decision) => (
              <div
                key={decision.id}
                className="rounded-2xl border border-slate-800 bg-slate-900/30 p-5"
              >
                <p className="text-xs text-slate-500">{decision.code}</p>
                <p className="mt-1 font-medium">{decision.title}</p>
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
