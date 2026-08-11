import Link from "next/link";
import { notFound } from "next/navigation";

import { Eyebrow, StatCard } from "@/components/ui";
import { prisma } from "@/lib/prisma";

import { DeleteEvidenceButton } from "../delete-evidence-button";

export const dynamic = "force-dynamic";

type EvidencePageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function EvidencePage({
  params,
}: EvidencePageProps) {
  const { id } = await params;

  const evidence = await prisma.evidence.findUnique({
    where: {
      id,
    },
    include: {
      project: true,
      skill: true,
    },
  });

  if (!evidence) {
    notFound();
  }

  return (
    <main className="mx-auto max-w-6xl px-6 py-12">
      <Link
        href="/evidences"
        className="text-sm text-blue-400 hover:underline"
      >
        ← Evidências
      </Link>

      <header className="mt-8">
        <Eyebrow>{evidence.type}</Eyebrow>

        <div className="mt-2 flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h1 className="text-4xl font-bold tracking-tight">
              {evidence.title}
            </h1>
            <p className="mt-2 text-sm text-slate-500">
              Registrada em{" "}
              {evidence.createdAt.toLocaleDateString("pt-BR")}
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link
              href={`/evidences/${evidence.id}/edit`}
              className="rounded-xl bg-blue-500 px-4 py-2 font-medium text-white"
            >
              Editar
            </Link>

            <DeleteEvidenceButton
              id={evidence.id}
              title={evidence.title}
            />
          </div>
        </div>

        <div className="mt-8 rounded-2xl border border-slate-800 bg-slate-900/30 p-6">
          <p className="whitespace-pre-wrap leading-7 text-slate-300">
            {evidence.description ?? "Sem descrição cadastrada."}
          </p>
        </div>
      </header>

      <section className="mt-8 grid gap-4 sm:grid-cols-2">
        <Link href={`/projects/${evidence.project.id}`}>
          <StatCard
            label="Projeto"
            value={evidence.project.name}
            helper="Abrir projeto relacionado"
          />
        </Link>

        {evidence.skill ? (
          <Link href={`/skills/${evidence.skill.id}`}>
            <StatCard
              label="Skill"
              value={evidence.skill.name}
              helper="Abrir skill relacionada"
            />
          </Link>
        ) : (
          <StatCard
            label="Skill"
            value="—"
            helper="Nenhuma skill específica vinculada"
          />
        )}
      </section>
    </main>
  );
}
