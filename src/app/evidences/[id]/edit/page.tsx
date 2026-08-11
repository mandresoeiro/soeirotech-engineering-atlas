import Link from "next/link";
import { notFound } from "next/navigation";

import { Eyebrow } from "@/components/ui";
import { prisma } from "@/lib/prisma";

import { updateEvidence } from "./actions";

type EditEvidencePageProps = {
  params: Promise<{
    id: string;
  }>;
  searchParams: Promise<{
    invalidSkill?: string;
  }>;
};

export default async function EditEvidencePage({
  params,
  searchParams,
}: EditEvidencePageProps) {
  const { id } = await params;
  const query = await searchParams;

  const [evidence, projects, skills] = await Promise.all([
    prisma.evidence.findUnique({
      where: {
        id,
      },
    }),
    prisma.project.findMany({
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

  if (!evidence) {
    notFound();
  }

  const updateEvidenceWithId = updateEvidence.bind(
    null,
    evidence.id,
  );

  return (
    <main className="mx-auto max-w-3xl px-6 py-12">
      <Link
        href={`/evidences/${evidence.id}`}
        className="text-sm text-blue-400 hover:underline"
      >
        ← Voltar
      </Link>

      <header className="mt-8">
        <Eyebrow>Evidence v1</Eyebrow>
        <h1 className="mt-2 text-4xl font-bold tracking-tight">
          Editar evidência
        </h1>
      </header>

      {query.invalidSkill === "1" && (
        <div className="mt-6 rounded-xl border border-amber-800 bg-amber-950/20 p-4 text-sm text-amber-300">
          A skill escolhida precisa estar vinculada ao projeto antes de ser
          usada nesta evidência.
        </div>
      )}

      <form
        action={updateEvidenceWithId}
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
            defaultValue={evidence.title}
            className="w-full rounded-xl border border-slate-700 bg-slate-950/40 px-4 py-3 outline-none focus:border-blue-500"
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
            defaultValue={evidence.description ?? ""}
            className="w-full rounded-xl border border-slate-700 bg-slate-950/40 px-4 py-3 outline-none focus:border-blue-500"
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
            defaultValue={evidence.projectId}
            className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3"
          >
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
            defaultValue={evidence.skillId ?? ""}
            className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3"
          >
            <option value="">Nenhuma skill específica</option>

            {skills.map((skill) => (
              <option key={skill.id} value={skill.id}>
                {skill.name}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-wrap gap-3">
          <button
            type="submit"
            className="rounded-xl bg-blue-500 px-5 py-3 font-semibold text-white"
          >
            Salvar alterações
          </button>

          <Link
            href={`/evidences/${evidence.id}`}
            className="rounded-xl border border-slate-700 px-5 py-3"
          >
            Cancelar
          </Link>
        </div>
      </form>
    </main>
  );
}
