"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { prisma } from "@/lib/prisma";

function revalidateEvidencePaths(
  evidenceId?: string,
  projectId?: string,
  skillId?: string | null,
) {
  revalidatePath("/");
  revalidatePath("/evidences");
  revalidatePath("/projects");
  revalidatePath("/skills");
  revalidatePath("/showcase");

  if (evidenceId) {
    revalidatePath(`/evidences/${evidenceId}`);
  }

  if (projectId) {
    revalidatePath(`/projects/${projectId}`);
  }

  if (skillId) {
    revalidatePath(`/skills/${skillId}`);
  }
}

export async function deleteEvidence(id: string) {
  const evidence = await prisma.evidence.findUnique({
    where: {
      id,
    },
    select: {
      id: true,
      projectId: true,
      skillId: true,
    },
  });

  if (!evidence) {
    redirect("/evidences");
  }

  await prisma.evidence.delete({
    where: {
      id,
    },
  });

  revalidateEvidencePaths(
    evidence.id,
    evidence.projectId,
    evidence.skillId,
  );

  redirect("/evidences");
}
