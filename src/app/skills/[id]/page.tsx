import Link from "next/link";
import { notFound } from "next/navigation";

import { Eyebrow, SectionHeading, StatCard } from "@/components/ui";
import { prisma } from "@/lib/prisma";

import { DeleteSkillButton } from "../delete-skill-button";

export const dynamic = "force-dynamic";

type SkillPageProps = {
  params: Promise<{
    id: string;
  }>;
  searchParams: Promise<{
    deleteBlocked?: string;
  }>;
};

export default async function SkillPage({
  params,
  searchParams,
}: SkillPageProps) {
  const { id } = await params;
  const query = await searchParams;

  const skill = await prisma.skill.findUnique({
    where: {
      id,
    },
    include: {
      projectLinks: {
        include: {
          project: true,
        },
        orderBy: {
          createdAt: "asc",
        },
      },
      evidences: {
        include: {
          project: true,
        },
        orderBy: {
          createdAt: "desc",
        },
      },
      _count: {
        select: {
          projectLinks: true,
          evidences: true,
        },
      },
    },
  });

  if (!skill) {
    notFound();
  }

  const hasRelations =
    skill._count.projectLinks > 0 ||
    skill._count.evidences > 0;

  return (
    <main className="mx-auto max-w-6xl px-6 py-12">
      <Link href="/skills" className="text-sm text-blue-400 hover:underline">
        ← Skills
      </Link>

      <header className="mt-8 rounded-3xl border border-slate-800 bg-slate-900/30 p-7 md:p-9">
        <Eyebrow>Skill</Eyebrow>

        <h1 className="mt-2 text-4xl font-bold tracking-tight">
          {skill.name}
        </h1>
        <p className="mt-2 text-sm text-slate-500">{skill.slug}</p>

        <p className="mt-6 max-w-4xl leading-7 text-slate-300">
          {skill.description ?? "Sem descrição cadastrada."}
        </p>

        {query.deleteBlocked === "1" && (
          <p className="mt-5 rounded-xl border border-amber-800 bg-amber-950/20 p-4 text-sm text-amber-300">
            Esta skill possui relacionamentos e não pode ser excluída.
          </p>
        )}

        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            href={`/skills/${skill.id}/edit`}
            className="rounded-xl bg-blue-500 px-4 py-2 font-medium text-white"
          >
            Editar
          </Link>

          {!hasRelations && (
            <DeleteSkillButton id={skill.id} name={skill.name} />
          )}
        </div>
      </header>

      <section className="mt-8 grid gap-4 sm:grid-cols-2">
        <StatCard
          label="Projetos"
          value={skill._count.projectLinks}
          helper="Projetos onde foi aplicada"
        />
        <StatCard
          label="Evidências"
          value={skill._count.evidences}
          helper="Evidências ligadas à skill"
        />
      </section>

      <section className="mt-12">
        <SectionHeading
          title="Projetos relacionados"
          description="Contexto real de aplicação desta habilidade."
        />

        {skill.projectLinks.length === 0 ? (
          <p className="mt-5 text-slate-400">
            Esta skill ainda não foi relacionada a nenhum projeto.
          </p>
        ) : (
          <div className="mt-6 space-y-4">
            {skill.projectLinks.map((link) => (
              <article
                key={link.projectId}
                className="rounded-2xl border border-slate-800 bg-slate-900/30 p-5"
              >
                <Link
                  href={`/projects/${link.project.id}`}
                  className="font-semibold text-blue-400 hover:underline"
                >
                  {link.project.name}
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
          title="Evidências relacionadas"
          description="Resultados concretos vinculados a esta habilidade."
        />

        {skill.evidences.length === 0 ? (
          <p className="mt-5 text-slate-400">
            Nenhuma evidência relacionada.
          </p>
        ) : (
          <div className="mt-6 grid gap-4 lg:grid-cols-2">
            {skill.evidences.map((evidence) => (
              <Link
                key={evidence.id}
                href={`/evidences/${evidence.id}`}
                className="rounded-2xl border border-slate-800 bg-slate-900/30 p-5 transition hover:border-blue-800"
              >
                <p className="text-xs text-slate-500">
                  {evidence.project.name}
                </p>
                <p className="mt-2 font-semibold">{evidence.title}</p>
              </Link>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
