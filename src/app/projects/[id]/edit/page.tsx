import Link from "next/link";
import { notFound } from "next/navigation";

import {
  projectStatusLabels,
  projectStatusValues,
} from "@/lib/project-status";
import { prisma } from "@/lib/prisma";

import { updateProject } from "./actions";

type EditProjectPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function EditProjectPage({
  params,
}: EditProjectPageProps) {
  const { id } = await params;

  const project = await prisma.project.findUnique({
    where: {
      id,
    },
  });

  if (!project) {
    notFound();
  }

  const updateProjectWithId = updateProject.bind(null, project.id);

  return (
    <main className="mx-auto max-w-3xl px-6 py-12">
      <header>
        <Link
          href={`/projects/${project.id}`}
          className="text-sm text-blue-400 hover:underline"
        >
          ← Voltar
        </Link>

        <p className="mt-8 text-sm font-semibold uppercase tracking-[0.2em] text-blue-400">
          Projetos
        </p>
        <h1 className="mt-2 text-3xl font-bold">Editar projeto</h1>
      </header>

      <form
        action={updateProjectWithId}
        className="mt-10 space-y-6 rounded-2xl border border-slate-800 p-6"
      >
        <div>
          <label htmlFor="name" className="mb-2 block text-sm font-medium">
            Nome
          </label>
          <input
            id="name"
            name="name"
            required
            defaultValue={project.name}
            className="w-full rounded-xl border border-slate-700 bg-transparent px-4 py-3 outline-none focus:border-blue-500"
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
            rows={5}
            defaultValue={project.description ?? ""}
            className="w-full rounded-xl border border-slate-700 bg-transparent px-4 py-3 outline-none focus:border-blue-500"
          />
        </div>

        <div>
          <label htmlFor="status" className="mb-2 block text-sm font-medium">
            Status
          </label>
          <select
            id="status"
            name="status"
            defaultValue={project.status}
            className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3"
          >
            {projectStatusValues.map((status) => (
              <option key={status} value={status}>
                {projectStatusLabels[status]}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label
            htmlFor="repository"
            className="mb-2 block text-sm font-medium"
          >
            Repositório
          </label>
          <input
            id="repository"
            name="repository"
            type="url"
            defaultValue={project.repository ?? ""}
            className="w-full rounded-xl border border-slate-700 bg-transparent px-4 py-3 outline-none focus:border-blue-500"
          />
        </div>

        <div>
          <label htmlFor="demoUrl" className="mb-2 block text-sm font-medium">
            Demo
          </label>
          <input
            id="demoUrl"
            name="demoUrl"
            type="url"
            defaultValue={project.demoUrl ?? ""}
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
            href={`/projects/${project.id}`}
            className="rounded-xl border border-slate-700 px-5 py-3"
          >
            Cancelar
          </Link>
        </div>
      </form>
    </main>
  );
}
