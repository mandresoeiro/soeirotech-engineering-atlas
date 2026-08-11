import Link from "next/link";

import { Eyebrow } from "@/components/ui";
import { prisma } from "@/lib/prisma";

import { createEvidence } from "./actions";

type NewEvidencePageProps = {
  searchParams: Promise<{
    projectId?: string;
    invalidProject?: string;
    invalidSkill?: string;
  }>;
};

export default async function NewEvidencePage({
  searchParams,
}: NewEvidencePageProps) {
  const query = await searchParams;

  const [projects, skills] = await Promise.all([
    prisma.project.findMany({
      where: {
        status: {
          not: "ARCHIVED",
        },
      },
      orderBy: {
        name: "asc",
      },
    }),
    prisma.skill.findMany({
      orderBy: {
        name: "asc",
      },
    }),
  ]);

  return (
    <main className="mx-auto max-w-3xl px-6 py-12">
      <Link
        href="/evidences"
        className="text-sm text-blue-400 hover:underline"
      >
        ← Evidências
      </Link>

      <header className="mt-8">
        <Eyebrow>Evidence v1</Eyebrow>
        <h1 className="mt-2 text-4xl font-bold tracking-tight">
          Nova evidência
        </h1>
        <p className="mt-3 leading-7 text-slate-400">
          Registre algo concreto que demonstre o trabalho realizado no
          projeto.
        </p>
      </header>

      {(query.invalidProject === "1" || query.invalidSkill === "1") && (
        <div className="mt-6 rounded-xl border border-amber-800 bg-amber-950/20 p-4 text-sm text-amber-300">
          {query.invalidSkill === "1"
            ? "A skill escolhida precisa estar vinculada ao projeto antes de ser usada como evidência."
            : "O projeto selecionado não foi encontrado."}
        </div>
      )}

      <form
        action={createEvidence}
        className="mt-8 space-y-6 rounded-2xl border border-slate-800 bg-slate-900/30 p-6"
      >
        <div>
          <label htmlFor="title" className="mb-2 block text-sm font-medium">
            Título
          </label>
          <input
            id="title"
            name="title"
            required
            placeholder="Ex.: Testes E2E do fluxo de projetos"
            className="w-full rounded-xl border border-slate-700 bg-slate-950/40 px-4 py-3 outline-none transition focus:border-blue-500"
          />
        </div>

        <div>
          <label
            htmlFor="description"
            className="mb-2 block text-sm font-medium"
          >
            Descrição
          </label>
          <textarea
            id="description"
            name="description"
            rows={6}
            placeholder="O que foi produzido, validado ou demonstrado?"
            className="w-full rounded-xl border border-slate-700 bg-slate-950/40 px-4 py-3 outline-none transition focus:border-blue-500"
          />
        </div>

        <div>
          <label
            htmlFor="projectId"
            className="mb-2 block text-sm font-medium"
          >
            Projeto
          </label>

          <select
            id="projectId"
            name="projectId"
            required
            defaultValue={query.projectId ?? ""}
            className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3"
          >
            <option value="" disabled>
              Selecione um projeto
            </option>

            {projects.map((project) => (
              <option key={project.id} value={project.id}>
                {project.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label
            htmlFor="skillId"
            className="mb-2 block text-sm font-medium"
          >
            Skill relacionada <span className="text-slate-500">(opcional)</span>
          </label>

          <select
            id="skillId"
            name="skillId"
            defaultValue=""
            className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3"
          >
            <option value="">Nenhuma skill específica</option>

            {skills.map((skill) => (
              <option key={skill.id} value={skill.id}>
                {skill.name}
              </option>
            ))}
          </select>

          <p className="mt-2 text-xs leading-5 text-slate-500">
            Se escolher uma skill, ela precisa estar previamente associada ao
            projeto em “Gerenciar skills”.
          </p>
        </div>

        <div className="rounded-xl border border-blue-950 bg-blue-950/20 p-4 text-sm leading-6 text-blue-200">
          Nesta versão, a evidência é registrada com o tipo <strong>OTHER</strong>.
          Isso mantém compatibilidade com o enum já confirmado no seed. Depois
          podemos ampliar os tipos sem arriscar o schema atual.
        </div>

        <div className="flex flex-wrap gap-3">
          <button
            type="submit"
            className="rounded-xl bg-blue-500 px-5 py-3 font-semibold text-white transition hover:bg-blue-400"
          >
            Criar evidência
          </button>

          <Link
            href="/evidences"
            className="rounded-xl border border-slate-700 px-5 py-3"
          >
            Cancelar
          </Link>
        </div>
      </form>
    </main>
  );
}
