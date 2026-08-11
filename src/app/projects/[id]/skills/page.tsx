import Link from "next/link";
import { notFound } from "next/navigation";

import { prisma } from "@/lib/prisma";

import {
  addProjectSkill,
  removeProjectSkill,
  updateProjectSkillContext,
} from "./actions";

export const dynamic = "force-dynamic";

type ProjectSkillsPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function ProjectSkillsPage({
  params,
}: ProjectSkillsPageProps) {
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
    },
  });

  if (!project) {
    notFound();
  }

  const allSkills = await prisma.skill.findMany({
    orderBy: {
      name: "asc",
    },
  });

  const linkedSkillIds = new Set(
    project.skillLinks.map((link) => link.skillId),
  );

  const availableSkills = allSkills.filter(
    (skill) => !linkedSkillIds.has(skill.id),
  );

  const addProjectSkillWithProjectId = addProjectSkill.bind(
    null,
    project.id,
  );

  return (
    <main className="mx-auto max-w-6xl px-6 py-12">
      <Link
        href={`/projects/${project.id}`}
        className="text-sm text-blue-400 hover:underline"
      >
        ← Voltar ao projeto
      </Link>

      <header className="mt-8">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-400">
          Project Skills
        </p>
        <h1 className="mt-2 text-3xl font-bold">{project.name}</h1>
        <p className="mt-2 text-slate-400">
          Registre não apenas a tecnologia, mas onde e como ela foi aplicada.
        </p>
      </header>

      <section className="mt-10 rounded-2xl border border-slate-800 p-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-semibold">Associar uma skill</h2>
            <p className="mt-1 text-sm text-slate-400">
              Escolha uma skill existente e descreva o contexto real de uso.
            </p>
          </div>

          <Link
            href="/skills/new"
            className="text-sm text-blue-400 hover:underline"
          >
            Criar nova skill
          </Link>
        </div>

        {availableSkills.length === 0 ? (
          <p className="mt-6 text-sm text-slate-400">
            Todas as skills cadastradas já estão vinculadas a este projeto.
          </p>
        ) : (
          <form
            action={addProjectSkillWithProjectId}
            className="mt-6 space-y-5"
          >
            <div>
              <label
                htmlFor="skillId"
                className="mb-2 block text-sm font-medium"
              >
                Skill
              </label>

              <select
                id="skillId"
                name="skillId"
                required
                defaultValue=""
                className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3"
              >
                <option value="" disabled>
                  Selecione uma skill
                </option>

                {availableSkills.map((skill) => (
                  <option key={skill.id} value={skill.id}>
                    {skill.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label
                htmlFor="context"
                className="mb-2 block text-sm font-medium"
              >
                Contexto de aplicação
              </label>

              <textarea
                id="context"
                name="context"
                required
                rows={5}
                placeholder="Ex.: Prisma foi utilizado para modelar o domínio, executar migrations e acessar o PostgreSQL."
                className="w-full rounded-xl border border-slate-700 bg-transparent px-4 py-3 outline-none focus:border-blue-500"
              />
            </div>

            <button
              type="submit"
              className="rounded-xl bg-blue-500 px-5 py-3 font-semibold text-white"
            >
              Associar skill
            </button>
          </form>
        )}
      </section>

      <section className="mt-10">
        <h2 className="text-2xl font-bold">Skills aplicadas</h2>

        {project.skillLinks.length === 0 ? (
          <p className="mt-4 text-slate-400">
            Nenhuma skill relacionada a este projeto.
          </p>
        ) : (
          <div className="mt-6 space-y-5">
            {project.skillLinks.map((link) => {
              const updateAction = updateProjectSkillContext.bind(
                null,
                project.id,
                link.skillId,
              );

              const removeAction = removeProjectSkill.bind(
                null,
                project.id,
                link.skillId,
              );

              return (
                <article
                  key={link.skillId}
                  className="rounded-2xl border border-slate-800 p-6"
                >
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div>
                      <Link
                        href={`/skills/${link.skill.id}`}
                        className="text-lg font-semibold text-blue-400 hover:underline"
                      >
                        {link.skill.name}
                      </Link>

                      <p className="mt-1 text-xs text-slate-500">
                        {link.skill.slug}
                      </p>
                    </div>

                    <form action={removeAction}>
                      <button
                        type="submit"
                        className="rounded-xl border border-red-900 px-4 py-2 text-sm text-red-400"
                      >
                        Remover vínculo
                      </button>
                    </form>
                  </div>

                  <form action={updateAction} className="mt-5">
                    <label
                      htmlFor={`context-${link.skillId}`}
                      className="mb-2 block text-sm font-medium"
                    >
                      Contexto
                    </label>

                    <textarea
                      id={`context-${link.skillId}`}
                      name="context"
                      required
                      rows={4}
                      defaultValue={link.context ?? ""}
                      className="w-full rounded-xl border border-slate-700 bg-transparent px-4 py-3 outline-none focus:border-blue-500"
                    />

                    <button
                      type="submit"
                      className="mt-3 rounded-xl border border-blue-700 px-4 py-2 text-sm font-medium text-blue-400"
                    >
                      Salvar contexto
                    </button>
                  </form>
                </article>
              );
            })}
          </div>
        )}
      </section>
    </main>
  );
}
