import Link from "next/link";

import {
  projectStatusLabels,
  projectStatusValues,
} from "@/lib/project-status";

import { createProject } from "./actions";

export default function NewProjectPage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-12">
      <header>
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-400">
          Projetos
        </p>
        <h1 className="mt-2 text-3xl font-bold">Novo projeto</h1>
        <p className="mt-2 text-slate-400">
          Registre um projeto que será usado como evidência profissional.
        </p>
      </header>

      <form
        action={createProject}
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
            defaultValue="PLANNED"
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
            placeholder="https://github.com/..."
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
            placeholder="https://..."
            className="w-full rounded-xl border border-slate-700 bg-transparent px-4 py-3 outline-none focus:border-blue-500"
          />
        </div>

        <div className="flex gap-3">
          <button
            type="submit"
            className="rounded-xl bg-blue-500 px-5 py-3 font-semibold text-white"
          >
            Criar projeto
          </button>

          <Link
            href="/projects"
            className="rounded-xl border border-slate-700 px-5 py-3"
          >
            Cancelar
          </Link>
        </div>
      </form>
    </main>
  );
}
