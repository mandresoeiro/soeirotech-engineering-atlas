import Link from "next/link";
import { notFound } from "next/navigation";

import { prisma } from "@/lib/prisma";

import { updateSkill } from "./actions";

type EditSkillPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function EditSkillPage({
  params,
}: EditSkillPageProps) {
  const { id } = await params;

  const skill = await prisma.skill.findUnique({
    where: {
      id,
    },
  });

  if (!skill) {
    notFound();
  }

  const updateSkillWithId = updateSkill.bind(null, skill.id);

  return (
    <main className="mx-auto max-w-3xl px-6 py-12">
      <header>
        <Link
          href={`/skills/${skill.id}`}
          className="text-sm text-blue-400 hover:underline"
        >
          ← Voltar
        </Link>

        <p className="mt-8 text-sm font-semibold uppercase tracking-[0.2em] text-blue-400">
          Skills
        </p>

        <h1 className="mt-2 text-3xl font-bold">Editar skill</h1>

        <p className="mt-2 text-slate-400">
          Atualize os dados da habilidade.
        </p>
      </header>

      <form
        action={updateSkillWithId}
        className="mt-10 space-y-6 rounded-2xl border border-slate-800 p-6"
      >
        <div>
          <label htmlFor="name" className="mb-2 block text-sm font-medium">
            Nome
          </label>

          <input
            id="name"
            name="name"
            type="text"
            required
            defaultValue={skill.name}
            className="w-full rounded-xl border border-slate-700 bg-transparent px-4 py-3 outline-none focus:border-blue-500"
          />

          <p className="mt-2 text-xs text-slate-500">
            Alterar o nome também atualizará o slug automaticamente.
          </p>
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
            rows={5}
            defaultValue={skill.description ?? ""}
            className="w-full rounded-xl border border-slate-700 bg-transparent px-4 py-3 outline-none focus:border-blue-500"
          />
        </div>

        <div className="flex flex-wrap gap-3">
          <button
            type="submit"
            className="rounded-xl bg-blue-500 px-5 py-3 font-semibold text-white"
          >
            Salvar alterações
          </button>

          <Link
            href={`/skills/${skill.id}`}
            className="rounded-xl border border-slate-700 px-5 py-3"
          >
            Cancelar
          </Link>
        </div>
      </form>
    </main>
  );
}
