import Link from "next/link";

import { createSkill } from "./actions";

export default function NewSkillPage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-12">
      <header>
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-400">
          Skills
        </p>

        <h1 className="mt-2 text-3xl font-bold">Nova skill</h1>

        <p className="mt-2 text-slate-400">
          Cadastre uma tecnologia ou conhecimento aplicado.
        </p>
      </header>

      <form
        action={createSkill}
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
            placeholder="Ex.: TypeScript"
            className="w-full rounded-xl border border-slate-700 bg-transparent px-4 py-3 outline-none focus:border-blue-500"
          />

          <p className="mt-2 text-xs text-slate-500">
            O slug será criado automaticamente.
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
            placeholder="Descreva a habilidade."
            className="w-full rounded-xl border border-slate-700 bg-transparent px-4 py-3 outline-none focus:border-blue-500"
          />
        </div>

        <div className="flex flex-wrap gap-3">
          <button
            type="submit"
            className="rounded-xl bg-blue-500 px-5 py-3 font-semibold text-white"
          >
            Criar skill
          </button>

          <Link
            href="/skills"
            className="rounded-xl border border-slate-700 px-5 py-3"
          >
            Cancelar
          </Link>
        </div>
      </form>
    </main>
  );
}
