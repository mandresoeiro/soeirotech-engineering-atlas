import Link from "next/link";
import { notFound } from "next/navigation";

import { Eyebrow, SectionHeading, StatCard } from "@/components/ui";
import { evidenceTypeLabels } from "@/lib/evidence-types";
import { summarizeProjectDocumentation } from "@/lib/project-documentation";
import { evidenceSourceSchema } from "@/lib/validations/evidence";
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

  const documentation = summarizeProjectDocumentation(project.skillLinks, project.evidences);
  const repository = evidenceSourceSchema.safeParse(project.repository);
  const demo = evidenceSourceSchema.safeParse(project.demoUrl);

  return (
    <main className="mx-auto max-w-7xl px-6 py-12">
      <Link href="/projects" className="text-sm text-blue-400 hover:underline">
        ← Projetos
      </Link>

      <header className="mt-8 rounded-3xl border border-slate-800 bg-slate-900/30 p-7 md:p-9">
        <div className="flex flex-wrap items-start justify-between gap-5">
          <div>
            <Eyebrow>Projeto</Eyebrow>
            <h1 className="mt-2 text-4xl font-bold tracking-tight">{project.name}</h1>
          </div>

          <span className="rounded-full border border-blue-900 bg-blue-950/30 px-3 py-1 text-sm text-blue-300">
            {projectStatusLabels[project.status]}
          </span>
        </div>

        {project.description && (
          <p className="mt-6 max-w-4xl leading-7 text-slate-300">{project.description}</p>
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
            Gerenciar competências
          </Link>

          <Link
            href={`/evidences/new?projectId=${project.id}`}
            className="rounded-xl border border-slate-700 px-4 py-2 transition hover:border-blue-700"
          >
            Nova evidência
          </Link>

          {repository.success && (
            <a
              href={repository.data}
              target="_blank"
              rel="noreferrer"
              className="rounded-xl border border-slate-700 px-4 py-2 transition hover:border-blue-700"
            >
              Ver código ↗
            </a>
          )}

          {demo.success && (
            <a
              href={demo.data}
              target="_blank"
              rel="noreferrer"
              className="rounded-xl border border-slate-700 px-4 py-2 transition hover:border-blue-700"
            >
              Ver site ↗
            </a>
          )}
        </div>
      </header>

      <section className="mt-8 grid grid-cols-3 gap-3 sm:gap-4">
        <StatCard
          label="Competências"
          value={project._count.skillLinks}
          helper={`${documentation.contextCount} com contexto`}
        />
        <StatCard
          label="Evidências"
          value={project._count.evidences}
          helper="Registros cadastrados"
        />
        <StatCard label="Com fonte" value={documentation.sourceCount} helper="Links cadastrados" />
      </section>

      <section
        aria-labelledby="documentation-heading"
        className="mt-8 rounded-2xl border border-slate-800 bg-slate-900/30 p-6"
      >
        <h2 id="documentation-heading" className="text-xl font-semibold">
          Próximos passos da documentação
        </h2>
        <p className="mt-2 text-sm leading-6 text-slate-400">
          Acompanhe o preenchimento dos registros. Esses números não avaliam seu domínio de uma
          tecnologia nem confirmam o conteúdo das fontes.
        </p>
        <ul className="mt-4 grid gap-3 text-sm">
          {project.skillLinks.length === 0 ? (
            <li>
              <Link
                className="text-blue-300 underline underline-offset-4"
                href={`/projects/${project.id}/skills`}
              >
                Associar a primeira competência e explicar seu uso →
              </Link>
            </li>
          ) : documentation.missingContexts > 0 ? (
            <li>
              <Link
                className="text-blue-300 underline underline-offset-4"
                href={`/projects/${project.id}/skills`}
              >
                Completar o contexto de {documentation.missingContexts} competência(s) →
              </Link>
            </li>
          ) : (
            <li className="text-slate-300">
              ✓ Todas as competências cadastradas têm contexto de uso.
            </li>
          )}
          {project._count.evidences === 0 ? (
            <li>
              <Link
                className="text-blue-300 underline underline-offset-4"
                href={`/evidences/new?projectId=${project.id}`}
              >
                Registrar a primeira evidência do projeto →
              </Link>
            </li>
          ) : documentation.missingSources > 0 ? (
            <li>
              <Link className="text-blue-300 underline underline-offset-4" href="#evidencias">
                Revisar {documentation.missingSources} evidência(s) sem fonte válida →
              </Link>
            </li>
          ) : (
            <li className="text-slate-300">
              ✓ Todas as evidências cadastradas têm um link de fonte.
            </li>
          )}
        </ul>
      </section>

      <section className="mt-12">
        <SectionHeading
          title="Competências aplicadas"
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
          <p className="mt-5 text-slate-400">
            Nenhuma competência associada. Adicione uma habilidade e explique como a utilizou.
          </p>
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

      <section id="evidencias" className="mt-12 scroll-mt-24">
        <SectionHeading
          title="Evidências"
          description="Evidências registradas. Abra o registro ou consulte a fonte diretamente."
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
          <p className="mt-5 text-slate-400">Nenhuma evidência registrada.</p>
        ) : (
          <div className="mt-6 grid gap-4 lg:grid-cols-2">
            {project.evidences.map((evidence) => {
              const source = evidenceSourceSchema.safeParse(evidence.url);
              return (
                <article
                  key={evidence.id}
                  className="rounded-2xl border border-slate-800 bg-slate-900/30 p-5"
                >
                  <p className="text-xs font-semibold uppercase tracking-[0.12em] text-blue-400">
                    {evidenceTypeLabels[evidence.type]}
                  </p>
                  <h3 className="mt-2 font-semibold">
                    <Link className="hover:underline" href={`/evidences/${evidence.id}`}>
                      {evidence.title}
                    </Link>
                  </h3>
                  <p className="mt-2 line-clamp-2 text-sm leading-6 text-slate-400">
                    {evidence.description ?? "Sem descrição cadastrada."}
                  </p>
                  <div className="mt-4 flex flex-wrap items-center gap-4 text-sm">
                    <Link
                      className="text-blue-300 underline underline-offset-4"
                      href={`/evidences/${evidence.id}`}
                    >
                      Ver registro
                    </Link>
                    {source.success ? (
                      <a
                        className="text-blue-300 underline underline-offset-4"
                        href={source.data}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Abrir fonte: ${evidence.title}`}
                      >
                        Abrir fonte ↗
                      </a>
                    ) : (
                      <span className="text-amber-300">Fonte ainda não informada</span>
                    )}
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </section>

      <section className="mt-12">
        <SectionHeading
          title="Decisões recentes"
          description="Decisões de arquitetura registradas no projeto."
        />

        {project.decisions.length === 0 ? (
          <p className="mt-5 text-slate-400">Nenhuma decisão registrada.</p>
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
