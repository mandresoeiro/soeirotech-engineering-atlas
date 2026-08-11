import Link from "next/link";

import { EmptyState, Eyebrow, SectionHeading, StatCard } from "@/components/ui";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const [
    projectCount,
    skillCount,
    evidenceCount,
    decisionCount,
    recentProjects,
    recentEvidences,
  ] = await Promise.all([
    prisma.project.count(),
    prisma.skill.count(),
    prisma.evidence.count(),
    prisma.architectureDecision.count(),
    prisma.project.findMany({
      orderBy: {
        updatedAt: "desc",
      },
      take: 4,
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
    prisma.evidence.findMany({
      orderBy: {
        createdAt: "desc",
      },
      take: 4,
      include: {
        project: true,
      },
    }),
  ]);

  return (
    <main className="mx-auto max-w-7xl px-6 py-12">
      <section className="overflow-hidden rounded-3xl border border-slate-800 bg-slate-900/35 p-8 shadow-2xl shadow-slate-950/30 md:p-12">
        <Eyebrow>SoeiroTech Engineering Atlas</Eyebrow>

        <h1 className="mt-3 max-w-4xl text-4xl font-bold tracking-tight sm:text-5xl">
          Transforme projeto em{" "}
          <span className="text-blue-400">evidência profissional.</span>
        </h1>

        <p className="mt-5 max-w-3xl text-base leading-8 text-slate-400">
          Registre o projeto, as skills realmente aplicadas, o contexto de uso
          e as evidências que demonstram o trabalho realizado.
        </p>

        <div className="mt-7 flex flex-wrap gap-3">
          <Link
            href="/projects/new"
            className="rounded-xl bg-blue-500 px-5 py-3 font-semibold text-white transition hover:bg-blue-400"
          >
            Novo projeto
          </Link>

          <Link
            href="/evidences/new"
            className="rounded-xl border border-slate-700 px-5 py-3 font-medium transition hover:border-blue-700"
          >
            Registrar evidência
          </Link>
        </div>
      </section>

      <section className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Link href="/projects">
          <StatCard label="Projetos" value={projectCount} helper="Abrir catálogo" />
        </Link>

        <Link href="/skills">
          <StatCard label="Skills" value={skillCount} helper="Ver habilidades" />
        </Link>

        <Link href="/evidences">
          <StatCard label="Evidências" value={evidenceCount} helper="Ver evidências" />
        </Link>

        <Link href="/showcase">
          <StatCard label="Decisões" value={decisionCount} helper="Visão profissional" />
        </Link>
      </section>

      <section className="mt-12">
        <SectionHeading
          title="Projetos recentes"
          description="Projetos atualizados mais recentemente."
          action={
            <Link
              href="/projects"
              className="text-sm text-blue-400 hover:underline"
            >
              Ver todos
            </Link>
          }
        />

        {recentProjects.length === 0 ? (
          <div className="mt-6">
            <EmptyState
              title="Nenhum projeto cadastrado"
              description="Crie o primeiro projeto para iniciar o Atlas."
            />
          </div>
        ) : (
          <div className="mt-6 grid gap-4 lg:grid-cols-2">
            {recentProjects.map((project) => (
              <Link
                key={project.id}
                href={`/projects/${project.id}`}
                className="rounded-2xl border border-slate-800 bg-slate-900/30 p-6 transition hover:-translate-y-0.5 hover:border-blue-800"
              >
                <h3 className="text-xl font-semibold">{project.name}</h3>
                <p className="mt-1 text-xs text-slate-500">{project.slug}</p>

                <div className="mt-5 flex flex-wrap gap-4 text-sm text-slate-400">
                  <span>{project._count.skillLinks} skills</span>
                  <span>{project._count.evidences} evidências</span>
                  <span>{project._count.decisions} decisões</span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>

      <section className="mt-12">
        <SectionHeading
          title="Evidências recentes"
          description="Últimos registros que demonstram trabalho concreto."
          action={
            <Link
              href="/evidences"
              className="text-sm text-blue-400 hover:underline"
            >
              Ver todas
            </Link>
          }
        />

        {recentEvidences.length === 0 ? (
          <div className="mt-6">
            <EmptyState
              title="Nenhuma evidência cadastrada"
              description="Quando uma entrega estiver pronta, registre-a aqui."
            />
          </div>
        ) : (
          <div className="mt-6 grid gap-4 lg:grid-cols-2">
            {recentEvidences.map((evidence) => (
              <Link
                key={evidence.id}
                href={`/evidences/${evidence.id}`}
                className="rounded-2xl border border-slate-800 bg-slate-900/30 p-5 transition hover:border-blue-800"
              >
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-400">
                  {evidence.type}
                </p>
                <h3 className="mt-2 font-semibold">{evidence.title}</h3>
                <p className="mt-2 text-sm text-slate-500">
                  {evidence.project.name}
                </p>
              </Link>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
